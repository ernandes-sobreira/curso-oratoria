/* Leitor local de PresentationML. Não executa macros nem consulta links do arquivo. */
(function(root){
  'use strict';
  const MAX_FILE=30*1024*1024, MAX_EXPANDED=120*1024*1024, MAX_PART=8*1024*1024;
  const words=s=>(String(s||'').match(/[\p{L}\p{N}]+/gu)||[]);
  const clean=s=>String(s||'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').replace(/[ \t]+/g,' ').trim();
  const all=(el,name)=>Array.from(el.getElementsByTagNameNS('*',name));
  function xml(text){
    if(/<!DOCTYPE|<!ENTITY/i.test(text)) throw Error('O arquivo contém declarações XML não permitidas.');
    const doc=new DOMParser().parseFromString(text,'application/xml');
    if(all(doc,'parsererror').length||!doc.documentElement) throw Error('Não foi possível ler uma parte XML da apresentação.');
    return doc;
  }
  function pathAt(base,target){
    if(!target||/^[a-z]+:/i.test(target)||target.includes('\\')) return null;
    const parts=(target.startsWith('/')?target.slice(1):base.slice(0,base.lastIndexOf('/')+1)+target).split('/'), out=[];
    for(const p of parts){if(p==='..'){if(!out.length)return null;out.pop();}else if(p&&p!=='.')out.push(p);}
    return out.join('/');
  }
  function paragraphs(doc){return all(doc,'p').map(p=>clean(all(p,'t').map(t=>t.textContent).join(''))).filter(Boolean);}
  function zipPreflight(buffer){
    const bytes=new Uint8Array(buffer),v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
    if(bytes.length>MAX_FILE)throw Error('Use um arquivo de até 30 MB. Comprima as imagens no PowerPoint e tente novamente.');
    let end=-1;
    for(let p=bytes.length-22;p>=Math.max(0,bytes.length-65557);p--){if(v.getUint32(p,true)===0x06054b50){end=p;break;}}
    if(end<0)throw Error('Este arquivo não é um PPTX válido. Para .ppt antigo, use Salvar como → Apresentação do PowerPoint (.pptx).');
    const n=v.getUint16(end+10,true),offset=v.getUint32(end+16,true),size=v.getUint32(end+12,true);
    if(n===65535||n>10000||offset+size>end||v.getUint16(end+4,true)!==0)throw Error('Estrutura de arquivo não suportada. Salve uma cópia em PPTX.');
    let pos=offset,total=0;
    for(let i=0;i<n;i++){
      if(pos+46>end||v.getUint32(pos,true)!==0x02014b50)throw Error('O arquivo está incompleto ou corrompido.');
      if(v.getUint16(pos+8,true)&1)throw Error('Remova a senha da apresentação antes de importar.');
      const unpacked=v.getUint32(pos+24,true); total+=unpacked;
      if(total>MAX_EXPANDED)throw Error('A apresentação descompactada é muito grande. Reduza as imagens ou divida o arquivo.');
      pos+=46+v.getUint16(pos+28,true)+v.getUint16(pos+30,true)+v.getUint16(pos+32,true);
      if(pos>end)throw Error('Diretório de arquivo inválido.');
    }
    return {entries:n,expanded:total};
  }
  // Limite também durante a descompactação: não confiar somente no tamanho declarado.
  function boundedPart(part,limit=MAX_PART){
    return new Promise((resolve,reject)=>{
      const chunks=[];let size=0,failed=false;
      const stream=part.internalStream('uint8array');
      stream.on('data',chunk=>{size+=chunk.length;if(size>limit){failed=true;stream.pause();reject(Error('Uma parte da apresentação excede o limite seguro de leitura.'));return;}chunks.push(chunk);});
      stream.on('error',reject);stream.on('end',()=>{if(failed)return;const out=new Uint8Array(size);let p=0;for(const c of chunks){out.set(c,p);p+=c.length;}resolve(out);});stream.resume();
    });
  }
  async function readPptx(buffer,name,onProgress=()=>{}){
    zipPreflight(buffer);
    const zip=await root.JSZip.loadAsync(buffer), decoder=new TextDecoder('utf-8'), cache=new Map();
    async function part(path,optional=false){
      if(cache.has(path))return cache.get(path);
      const file=zip.file(path);if(!file){if(optional)return null;throw Error('Parte ausente no PPTX: '+path);}
      const doc=xml(decoder.decode(await boundedPart(file)));cache.set(path,doc);return doc;
    }
    async function rels(path){
      const p=path.slice(0,path.lastIndexOf('/')+1)+'_rels/'+path.slice(path.lastIndexOf('/')+1)+'.rels';
      const doc=await part(p,true);return doc?all(doc,'Relationship').map(r=>({id:r.getAttribute('Id'),type:r.getAttribute('Type'),external:r.getAttribute('TargetMode')==='External',target:r.getAttribute('Target'),path:r.getAttribute('TargetMode')==='External'?null:pathAt(path,r.getAttribute('Target'))})):[];
    }
    const pres=await part('ppt/presentation.xml'),pr=await rels('ppt/presentation.xml');
    const ids=all(pres,'sldId');
    if(!ids.length)throw Error('A apresentação não contém slides.');
    if(ids.length>150)throw Error('Importe até 150 slides por apresentação. Divida o arquivo em partes.');
    const slides=[];let totalText=0,imageBudget=0;
    for(let i=0;i<ids.length;i++){
      const id=Array.from(ids[i].attributes).find(a=>a.localName==='id'&&a.namespaceURI)?.value||ids[i].getAttribute('r:id');
      const relation=pr.find(r=>r.id===id&&r.type.endsWith('/slide'));
      if(!relation?.path)throw Error('A ordem dos slides não pôde ser identificada.');
      const doc=await part(relation.path),sr=await rels(relation.path),lines=paragraphs(doc);
      const shapes=all(doc,'sp'),titleShape=shapes.find(s=>all(s,'ph').some(p=>['title','ctrTitle'].includes(p.getAttribute('type'))));
      const title=titleShape?paragraphs(titleShape).join(' '):(lines[0]||'Slide visual');
      const noteRel=sr.find(r=>r.type.endsWith('/notesSlide'));let notes=[];
      if(noteRel?.path){const nd=await part(noteRel.path);notes=all(nd,'sp').filter(s=>!all(s,'ph').some(p=>['sldNum','hdr','ftr','dt','sldImg'].includes(p.getAttribute('type')))).flatMap(paragraphs);}
      const charts=[];
      for(const cr of sr.filter(r=>r.type.endsWith('/chart')&&r.path)){
        const cd=await part(cr.path);
        for(const ser of all(cd,'ser')){
          const tx=all(ser,'tx')[0],cat=all(ser,'cat')[0]||all(ser,'xVal')[0],val=all(ser,'val')[0]||all(ser,'yVal')[0];
          const cached=el=>el?all(el,'pt').map(pt=>({idx:Number(pt.getAttribute('idx')),value:all(pt,'v')[0]?.textContent||''})).sort((a,b)=>a.idx-b.idx):[];
          charts.push({name:tx?all(tx,'v').map(v=>v.textContent).join(' '):'Série sem nome',categories:cached(cat),values:cached(val)});
        }
      }
      const images=[];
      for(const r of sr.filter(r=>r.type.endsWith('/image')&&r.path).slice(0,3)){
        if(!/\.(png|jpe?g|webp)$/i.test(r.path))continue;
        const f=zip.file(r.path);if(!f||f._data?.uncompressedSize>3*1024*1024||imageBudget>10*1024*1024)continue;
        try{const data=await boundedPart(f,3*1024*1024);imageBudget+=data.length;images.push({data,type:/\.png$/i.test(r.path)?'image/png':/\.webp$/i.test(r.path)?'image/webp':'image/jpeg'});}catch{/* Imagens são opcionais; texto não é descartado. */}
      }
      const hyperlinks=sr.filter(r=>r.external&&r.type.endsWith('/hyperlink')&&/^https?:\/\//i.test(r.target)).map(r=>r.target);
      totalText+=lines.join('').length+notes.join('').length+JSON.stringify(charts).length;
      if(totalText>1000000)throw Error('O texto extraído excede o limite de 1 milhão de caracteres. Divida a apresentação.');
      slides.push({number:i+1,title:clean(title),lines,notes,charts,hyperlinks,images,hidden:doc.documentElement.getAttribute('show')==='0',pictureCount:all(doc,'pic').length});
      onProgress(i+1,ids.length);await new Promise(r=>setTimeout(r,0));
    }
    return {name,importedAt:new Date().toISOString(),slides,method:'pptx-local-v2',notices:['Textos e notas são extraídos do arquivo. Isso não verifica a veracidade das afirmações.','Imagens não passam por OCR. Vídeos, animações, objetos incorporados e alguns diagramas podem não ser lidos.','Valores de gráficos vêm do cache salvo no PPTX; confira-os na planilha original.']};
  }
  const stop=new Set(('sobre para como uma umas uns dos das que pelo pela pelos pelas com sem mais menos este esta estes estas esse essa isso isto eles elas entre seu sua seus suas muito também hoje aqui pode podem ser são foi foram tem têm não sim cada todos todas apresentação slide aula fonte dados resultados exemplo pesquisa estudo').split(' '));
  function terms(s){return [...new Set(words(s.toLocaleLowerCase('pt-BR')).filter(w=>w.length>=4&&!stop.has(w)&&!/^\d+$/.test(w)))];}
  function analyzeSlide(slide){
    const body=slide.lines.filter(l=>l!==slide.title),numeric=body.filter(l=>/\d/.test(l)),full=slide.lines.join(' '),warnings=[];
    if(words(full).length>65)warnings.push('Muito texto: selecione uma mensagem e leve o detalhamento para a fala.');
    if(!body.length)warnings.push('Pouco texto extraível: descreva a imagem ou o gráfico no campo de mensagem.');
    if(slide.pictureCount)warnings.push('Há conteúdo em imagem. Confira visualmente; não foi interpretado automaticamente.');
    if(numeric.length&&!/(fonte|referência|doi|https?:|et al\.)/i.test(full+' '+slide.notes.join(' '))&&!slide.hyperlinks.length)warnings.push('Há números, mas não identifiquei uma referência textual. Confira fonte, unidade e período.');
    if(/\b(causa|provoca|determina|comprova|garante|resulta em)\b/i.test(full))warnings.push('Há linguagem causal ou categórica. Confira se o desenho do estudo sustenta essa conclusão.');
    if(slide.charts.length)warnings.push('Gráfico com valores armazenados no arquivo: confira eixos, unidades e atualização na fonte.');
    if(slide.hidden)warnings.push('Este slide está marcado como oculto no PowerPoint.');
    const candidate=body.find(l=>l.length>35&&l.length<260&&!/^(fonte|referência)/i.test(l))||body[0]||slide.title;
    return {candidate,numeric,warnings,wordCount:words(full).length,questions:[`Qual é a ideia principal de “${slide.title}” para este público?`,...(numeric.length?[`De onde vem o dado “${numeric[0]}” e quais são seus limites?`]:[]),...(slide.charts.length?['Qual comparação o gráfico permite, e o que ele não permite concluir?']:[]),'Que decisão ou compreensão este slide deve ajudar a construir?']};
  }
  function chartHighlights(slide){
    const number=v=>/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(String(v).trim())&&Number.isFinite(Number(v))?Number(v):null;
    const fmt=n=>n.toLocaleString('pt-BR',{maximumSignificantDigits:10});
    return slide.charts.flatMap((chart,index)=>{
      const points=chart.values.map(p=>({...p,n:number(p.value)})).filter(p=>p.n!==null);
      if(points.length<2)return [];
      const minimum=Math.min(...points.map(p=>p.n)),maximum=Math.max(...points.map(p=>p.n));
      const low=points.filter(p=>p.n===minimum),high=points.filter(p=>p.n===maximum);
      const label=p=>chart.categories.find(c=>c.idx===p.idx)?.value||`índice ${p.idx}`;
      const absent=chart.categories.filter(c=>!points.some(p=>p.idx===c.idx)).length;
      const text=minimum===maximum?`Na série “${chart.name||'sem nome'}”, os ${points.length} valores numéricos armazenados são iguais a ${fmt(minimum)}.`:`Na série “${chart.name||'sem nome'}”, o menor valor numérico armazenado é ${fmt(minimum)} (${label(low[0])}${low.length>1?'; com empate':''}) e o maior é ${fmt(maximum)} (${label(high[0])}${high.length>1?'; com empate':''}).`;
      return [{index,text,minimum,maximum,absent,count:points.length,context:`Comparação descritiva do cache deste gráfico. ${absent?absent+' categoria(s) sem valor numérico. ':''}Unidade e interpretação precisam ser conferidas no arquivo. Não é um teste estatístico.`}];
    });
  }
  function connections(slides){
    const pairs=[];
    for(let i=0;i<slides.length;i++)for(let j=i+1;j<slides.length;j++){
      const a=terms(slides[i].lines.join(' ')),b=new Set(terms(slides[j].lines.join(' '))),shared=a.filter(w=>b.has(w));
      if(shared.length<2)continue;
      pairs.push({from:i,to:j,shared:shared.slice(0,5),score:shared.length/Math.max(1,Math.min(a.length,b.size)),excerptA:slides[i].lines.find(l=>terms(l).some(w=>shared.includes(w)))||slides[i].title,excerptB:slides[j].lines.find(l=>terms(l).some(w=>shared.includes(w)))||slides[j].title});
    }
    return pairs.sort((a,b)=>b.score-a.score).slice(0,8);
  }
  function normalizeState(input){
    const out={profile:{name:'',goal:'',photoData:''},timeSec:0,selected:'L1',done:{},liked:{},watched:{},tplEdits:{},delivery:{},notes:{},quiz:{},practice:{}};
    if(!input||typeof input!=='object'||Array.isArray(input))return out;
    out.profile.name=String(input.profile?.name||'').slice(0,120);out.profile.goal=String(input.profile?.goal||'').slice(0,1000);
    const pic=String(input.profile?.photoData||'');if(/^data:image\/(png|jpeg|webp);base64,[a-z\d+/=]+$/i.test(pic)&&pic.length<2000000)out.profile.photoData=pic;
    out.timeSec=Math.max(0,Math.min(36000000,Number(input.timeSec)||0));
    if(/^L([1-9]|1\d|20)$/.test(input.selected))out.selected=input.selected;
    for(let n=1;n<=20;n++){const id='L'+n;out.done[id]=input.done?.[id]===true;out.liked[id]=[-1,0,1].includes(input.liked?.[id])?input.liked[id]:0;
      for(const field of ['delivery','notes'])out[field][id]=String(input[field]?.[id]||'').slice(0,30000);
      for(const field of ['watched','tplEdits','quiz','practice']){out[field][id]={};const obj=input[field]?.[id];if(obj&&typeof obj==='object'&&!Array.isArray(obj))for(const k of Object.keys(obj).filter(k=>/^\d{1,2}$/.test(k)).slice(0,30))out[field][id][k]=field==='tplEdits'?String(obj[k]).slice(0,10000):field==='quiz'?Number(obj[k]):obj[k]===true;}
    }
    return out;
  }
  root.OratoriaCore={readPptx,zipPreflight,analyzeSlide,chartHighlights,connections,normalizeState,words,clean,paragraphs,xml,pathAt};
  if(typeof module!=='undefined')module.exports=root.OratoriaCore;
})(typeof window!=='undefined'?window:globalThis);
