/* Documentos viram fontes textuais; nenhum código, macro ou link é executado. */
(function(root){
'use strict';
const C=root.OratoriaCore, MAX_TEXT=1000000, MAX_PART=8*1024*1024;
const all=(n,name)=>Array.from(n.getElementsByTagNameNS('*',name));
const attr=(n,name)=>Array.from(n.attributes||[]).find(a=>a.localName===name)?.value||'';
const local=n=>n.localName||n.nodeName.split(':').pop();
const pdfURL=typeof document!=='undefined'?new URL('vendor/pdf.min.mjs',document.currentScript?.src||new URL('assets/documents.js',document.baseURI)):null;
const notices=['O texto extraído é uma fonte de preparação; as afirmações e referências precisam de conferência.','A leitura prioriza conteúdo. Layout, imagens e ordem de tabelas ou colunas podem exigir revisão no original.'];
function section(title,lines,i,label='Trecho'){return {number:i+1,title:C.clean(title)||`${label} ${i+1}`,lines:lines.map(C.clean).filter(Boolean),notes:[],charts:[],hyperlinks:[],images:[],pictureCount:0,hidden:false,sourceLabel:`${label} ${i+1}`};}
function deck(name,slides,method,extra=[]){
 if(!slides.length||!slides.some(s=>s.lines.join('').trim()))throw Error('Não encontrei texto extraível neste documento. Se ele contém apenas imagens, faça OCR ou cole a transcrição do conteúdo.');
 if(slides.length>150)throw Error('O documento excede 150 trechos ou páginas. Divida-o em partes.');
 if(slides.reduce((n,s)=>n+s.lines.join('').length,0)>MAX_TEXT)throw Error('O documento excede 1 milhão de caracteres. Divida-o em partes.');
 return {name,importedAt:new Date().toISOString(),method,slides,notices:[...extra,...notices]};
}
function fromBlocks(blocks,name,method,extra=[]){
 let slides=[],lines=[],title='',length=0;
 const flush=()=>{if(lines.length){slides.push(section(title||lines[0].slice(0,180),lines,slides.length));lines=[];length=0;}};
 let total=0;
 for(const b of blocks){
  const text=C.clean(typeof b==='string'?b:b.text);if(!text)continue;total+=text.length;
  if(total>MAX_TEXT)throw Error('O texto excede 1 milhão de caracteres. Divida o arquivo.');
  if(b.heading){flush();title=text;}
  for(let p=0;p<text.length;p+=6000){const piece=text.slice(p,p+6000);if(length+piece.length>6000||lines.length>=160)flush();lines.push(piece);length+=piece.length;if(slides.length>=150)throw Error('O documento excede 150 trechos. Divida-o em partes.');}
 }
 flush();return deck(name,slides,method,extra);
}
function decode(bytes){
 if(bytes[0]===255&&bytes[1]===254)return new TextDecoder('utf-16le').decode(bytes);
 if(bytes[0]===254&&bytes[1]===255)return new TextDecoder('utf-16be').decode(bytes);
 try{return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{return new TextDecoder('windows-1252').decode(bytes);}
}
function readHTML(text,name){
 // Template mantém imagens, iframes e scripts inertes. Seu conteúdo nunca é anexado à página.
 const template=document.createElement('template');template.innerHTML=text;
 const content=template.content;
 content.querySelectorAll('script,style,iframe,object,embed,link,meta,noscript,template,svg,canvas').forEach(n=>n.remove());
 const textOf=n=>{function walk(x){if(x.nodeType===3)return x.textContent;if(x.nodeType!==1&&x.nodeType!==11)return '';if(x.tagName==='BR')return '\n';return Array.from(x.childNodes).map(walk).join('')+(/^(TD|TH)$/.test(x.tagName)?' | ':'');}return C.clean(walk(n));};
 function blocks(node){const out=[];function visit(n){if(n.nodeType===3){if(C.clean(n.textContent))out.push({text:n.textContent});return;}if(n.nodeType!==1&&n.nodeType!==11)return;if(/^(H[1-6]|P|LI|TR|PRE|BLOCKQUOTE|FIGCAPTION|DT|DD)$/.test(n.tagName)){out.push({text:textOf(n),heading:/^H[12]$/.test(n.tagName)});return;}for(const c of n.childNodes)visit(c);}visit(node);return out;}
 const candidates=Array.from(content.querySelectorAll('.slide,[data-slide],.reveal .slides > section')).filter(n=>!n.parentElement?.closest('.slide,[data-slide]'));
 if(candidates.length){const slides=[];candidates.forEach((n,i)=>{const lines=blocks(n).map(b=>b.text),title=textOf(n.querySelector('h1,h2,h3')||n).slice(0,180);if(!lines.join('').trim())return;const parsed=fromBlocks(lines,name,'html-local');for(const s of parsed.slides){s.number=slides.length+1;s.sourceLabel='Slide '+(i+1);s.title=title;slides.push(s);}});return deck(name,slides,'html-local',['HTML lido como texto: scripts, estilos, objetos e recursos externos não são executados ou carregados.']);}
 return fromBlocks(blocks(content),name,'html-local',['HTML lido como texto. Revise a sequência dos títulos e parágrafos; menus podem aparecer no conteúdo.']);
}
async function openZip(buffer){
 C.zipPreflight(buffer);const zip=await root.JSZip.loadAsync(buffer);let expanded=0;
 async function part(path){const f=zip.file(path);if(!f)throw Error('Parte ausente no documento: '+path);const bytes=await C.boundedPart(f,MAX_PART);expanded+=bytes.length;if(expanded>120*1024*1024)throw Error('O conteúdo descompactado excede 120 MB.');return C.xml(decode(bytes));}
 return {zip,part};
}
async function readOffice(buffer,name,progress){
 const {zip,part}=await openZip(buffer);
 if(zip.file('ppt/presentation.xml')){const d=await C.readPptx(buffer,name,progress);d.slides.forEach((s,i)=>s.sourceLabel='Slide '+(i+1));d.notices.push('PPTX, PPSX, POTX e variantes com macros usam a mesma leitura. Macros não são executadas.');return d;}
 if(zip.file('word/document.xml')){
  const doc=await part('word/document.xml');const blocks=all(doc,'p').map(p=>({text:all(p,'t').map(t=>t.textContent).join(''),heading:/^(heading|t[ií]tulo)[12]$/i.test(attr(all(p,'pStyle')[0]||{},'val'))}));
  return fromBlocks(blocks,name,'word-local',['Texto principal e células de tabelas do Word. Comentários, cabeçalhos, notas de rodapé e imagens não são extraídos. Macros não são executadas.']);
 }
 if(zip.file('xl/workbook.xml')){
  const workbook=await part('xl/workbook.xml'),rels=await part('xl/_rels/workbook.xml.rels'),shared=zip.file('xl/sharedStrings.xml')?all(await part('xl/sharedStrings.xml'),'si').map(si=>all(si,'t').map(t=>t.textContent).join('')):[];
  const blocks=[];
  for(const sheet of all(workbook,'sheet')){const id=attr(sheet,'id'),r=all(rels,'Relationship').find(r=>attr(r,'Id')===id);if(!r||attr(r,'TargetMode')==='External')continue;const path=C.pathAt('xl/workbook.xml',attr(r,'Target'));if(!path)continue;blocks.push({text:attr(sheet,'name'),heading:true});const doc=await part(path);
   for(const row of all(doc,'row')){const cells=all(row,'c').map(c=>{const t=attr(c,'t'),value=t==='inlineStr'?all(c,'t').map(t=>t.textContent).join(''):all(c,'v')[0]?.textContent||'';const v=t==='s'?(shared[Number(value)]||''):value;return `${attr(c,'r')}: ${v||'[sem valor salvo]'}`;});if(cells.length)blocks.push({text:cells.join(' | ')});}
  }
  return fromBlocks(blocks,name,'xlsx-local',['Planilha: células com endereços e valores salvos. Fórmulas não são executadas; datas podem aparecer como números. Confira formatos e valores no original.']);
 }
 if(zip.file('content.xml')){
  const doc=await part('content.xml'),pages=all(doc,'page');
  if(pages.length)return deck(name,pages.map((p,i)=>section(attr(p,'name'),all(p,'p').map(p=>p.textContent),i,'Slide')),'odp-local');
  return fromBlocks(Array.from(doc.getElementsByTagName('*')).filter(n=>['h','p'].includes(local(n))).map(n=>({text:n.textContent,heading:local(n)==='h'})),name,'odt-local');
 }
 throw Error('Este arquivo compactado não é um PowerPoint, Word, planilha XLSX ou documento OpenDocument compatível.');
}
async function readPDF(buffer,name,progress=()=>{},library){
 const pdf=library||await import(pdfURL.href);if(!library)pdf.GlobalWorkerOptions.workerSrc=new URL('pdf.worker.min.mjs',pdfURL).href;
 let task,doc;
 try{
  task=pdf.getDocument({data:new Uint8Array(buffer),isEvalSupported:false,useWorkerFetch:false,disableFontFace:true,useSystemFonts:true,stopAtErrors:true});doc=await task.promise;
  if(doc.numPages>150)throw Error('O PDF tem mais de 150 páginas. Divida-o em partes.');
  const slides=[];let total=0,empty=0;
  for(let i=1;i<=doc.numPages;i++){
   const page=await doc.getPage(i),content=await page.getTextContent(),lines=[];let line='',lastY=null;
   for(const item of content.items){if(!('str' in item))continue;const y=item.transform?.[5];if(lastY!==null&&y!==undefined&&Math.abs(y-lastY)>3&&line){lines.push(C.clean(line));line='';}line+=item.str+' ';lastY=y;if(item.hasEOL&&line){lines.push(C.clean(line));line='';}}
   if(line)lines.push(C.clean(line));const clean=lines.filter(Boolean);total+=clean.join('').length;if(total>MAX_TEXT)throw Error('O PDF excede 1 milhão de caracteres.');if(!clean.length)empty++;
   // Limitar blocos longos, preservando a página de origem em cada trecho.
   if(clean.length){const d=fromBlocks(clean,name,'pdf-local');for(const s of d.slides){s.number=slides.length+1;s.sourceLabel='Página '+i;s.title='Página '+i+' · '+s.title;sidesPush(s);}}
   else {const s=section('Página '+i+' · sem texto extraível',[],slides.length,'Página');s.sourceLabel='Página '+i;sidesPush(s);}
   function sidesPush(s){if(slides.length>=150)throw Error('O PDF exige mais de 150 trechos. Divida-o em partes.');slides.push(s);}
   page.cleanup();progress(i,doc.numPages);
  }
  return deck(name,slides,'pdf-local',[...(empty?[`${empty} página(s) sem texto extraível: podem ser imagens. Faça OCR no original ou descreva essas páginas; a ferramenta não inventa seu conteúdo.`]:[]),'PDF: texto por página. PDFs digitalizados precisam de OCR; gráficos, imagens, fórmulas e colunas podem perder contexto.']);
 }catch(e){if(e.name==='PasswordException')throw Error('O PDF está protegido por senha. Exporte uma cópia sem senha.');if(e.name==='InvalidPDFException')throw Error('Não foi possível abrir este PDF. Salve uma nova cópia e tente novamente.');throw e;}finally{if(task)await task.destroy();}
}
function fileBytes(file){if(typeof file.arrayBuffer==='function')return file.arrayBuffer();return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('Não consegui ler o arquivo no dispositivo. Tente selecionar uma cópia baixada.'));reader.readAsArrayBuffer(file);});}
async function readFile(file,progress=()=>{}){
 if(file.size>30*1024*1024)throw Error('Use um arquivo de até 30 MB. Divida documentos maiores.');
 const buffer=await fileBytes(file),bytes=new Uint8Array(buffer),name=file.name||'Documento',ext=name.split('.').pop().toLowerCase();
 if(!bytes.length)throw Error('O arquivo está vazio.');
 if(bytes[0]===0x50&&bytes[1]===0x4b)return readOffice(buffer,name,progress);
 if(new TextDecoder().decode(bytes.slice(0,5))==='%PDF-')return readPDF(buffer,name,progress);
 if(bytes[0]===0xd0&&bytes[1]===0xcf||['ppt','doc','xls'].includes(ext))throw Error('Formato antigo ou Office criptografado. Abra no PowerPoint, Word ou LibreOffice e salve uma cópia sem senha como PPTX, DOCX ou XLSX; também pode exportar PDF.');
 if(['html','htm'].includes(ext))return readHTML(decode(bytes),name);
 if(['txt','md','markdown','csv','tsv','json'].includes(ext)){
  const text=decode(bytes);if(text.includes('\u0000'))throw Error('Este arquivo parece conter dados binários. Exporte seu conteúdo como texto ou PDF.');
  return fromBlocks(text.split(/\r?\n/).map(t=>({text:t,heading:ext==='md'&&/^#{1,2}\s/.test(t)})),name,'texto-local',['Texto lido na ordem do arquivo. CSV, TSV e JSON são tratados como texto, sem executar fórmulas ou código.']);
 }
 if(['pptx','ppsx','potx','pptm','ppsm','potm','docx','dotx','docm','dotm','xlsx','xltx','xlsm','odt','odp','pdf'].includes(ext))throw Error('A extensão indica um documento compatível, mas o conteúdo não corresponde ao formato. Baixe o arquivo completo ou salve uma nova cópia.');
 throw Error('Formato ainda não suportado. Exporte como PDF com texto, DOCX, PPTX, HTML ou TXT. Imagens, áudios e PDFs digitalizados precisam de transcrição ou OCR antes da importação.');
}
root.OratoriaDocuments={readFile,readHTML,readOffice,readPDF,fromBlocks,decode};
if(typeof module!=='undefined'&&module.exports)module.exports=root.OratoriaDocuments;
})(typeof window!=='undefined'?window:globalThis);
