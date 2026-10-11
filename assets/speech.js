/* Diagnóstico textual explicável e transcrição opcional pela API do navegador. */
(function(root){
'use strict';
const key=s=>s.normalize('NFC').toLocaleLowerCase('pt-BR');
const common=new Set('a o as os um uma uns umas de do da dos das em no na nos nas por para com sem e ou mas que se eu você vocês ele ela eles elas nós meu minha seu sua seus suas nosso nossa é são era foi ser estar está estão tem ter como quando onde porque isso isto esse essa esses essas este esta estes estas ao aos à às mais menos muito já também não sim'.split(' '));
const fillers=['né','tipo assim','tipo','assim','entendeu','sabe','tá','então','basicamente','na verdade','ou seja','digamos','vamos dizer','de certa forma','literalmente','aham','hum'];
const glossary=[
 ['stakeholders','Diga quem são as pessoas ou organizações envolvidas neste caso.'],['benchmark','Explique qual referência está usando para comparar.'],['framework','Apresente a estrutura ou o método e mostre um exemplo.'],['insight','Explicite a observação e o que ela ajuda a entender.'],['feedback','Diga que tipo de retorno ou avaliação você precisa.'],['sinergia','Explique como as partes se ajudam e qual efeito foi observado.'],['disruptivo','Nomeie a mudança concreta em vez de apenas qualificá-la.'],['paradigma','Explique o modelo de pensamento e dê um exemplo.'],['escalabilidade','Diga o que pode crescer e quais são os limites.'],['pipeline','Mostre as etapas do processo.'],['kpi','Diga qual indicador será acompanhado e por quê.'],['roi','Explique o retorno em relação ao investimento e como foi calculado.'],
 ['antrópico','Explique a ação humana específica a que se refere.'],['mitigação','Diga que impacto se pretende reduzir e como.'],['resiliência','Defina como usa o termo neste contexto e como o observa.'],['serviços ecossistêmicos','Dê um exemplo do benefício que as pessoas obtêm do ecossistema.'],['eutrofização','Explique o enriquecimento por nutrientes e os efeitos no ambiente estudado.'],['limnologia','Apresente a área de estudo das águas continentais.'],['edafoclimático','Explique quais características do solo e do clima estão envolvidas.'],['heterocedasticidade','Explique por que a variação dos erros muda e o que isso afeta na análise.'],['significância estatística','Explique o critério do teste; não a confunda com tamanho ou importância do efeito.'],['p-valor','Explique o que o teste avalia e suas hipóteses; não o apresente como probabilidade de a hipótese ser verdadeira.'],['correlação','Explique quais variáveis variam juntas; isso, sozinho, não demonstra causa.'],['multivariado','Diga quais variáveis são consideradas em conjunto.'],['intervalo de confiança','Explique como o intervalo foi obtido e o nível de confiança usado.'],['robustez','Diga a quais mudanças ou verificações o resultado resistiu.']
];
function tokenize(text){return Array.from(text.matchAll(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu),m=>({text:m[0],key:key(m[0]),start:m.index,end:m.index+m[0].length}));}
function diagnose(raw,custom=''){
 const text=String(raw||'').slice(0,60000),tokens=tokenize(text),n=tokens.length;
 const example=(a,b)=>text.slice(Math.max(0,a-48),Math.min(text.length,b+66)).replace(/\s+/g,' ');
 const pack=(term,positions,tip='')=>({term,count:positions.length,per100:n?Math.round(positions.length/n*1000)/10:0,examples:positions.slice(0,3).map(([a,b])=>example(a,b)),tip});
 const wordMap=new Map();tokens.forEach(t=>{if(!common.has(t.key)&&t.key.length>=3&&!/^\d+$/.test(t.key)){if(!wordMap.has(t.key))wordMap.set(t.key,[]);wordMap.get(t.key).push([t.start,t.end]);}});
 const repeatedWords=[...wordMap].filter(([,p])=>p.length>=3).map(([t,p])=>pack(t,p)).sort((a,b)=>b.count-a.count||a.term.localeCompare(b.term)).slice(0,15);
 const phrases=new Map();
 for(let size=2;size<=5;size++)for(let i=0;i<=tokens.length-size;i++){
  const slice=tokens.slice(i,i+size);if(slice.every(t=>common.has(t.key))||/[.!?;\n]/.test(text.slice(slice[0].end,slice.at(-1).start)))continue;
  const term=slice.map(t=>t.key).join(' ');if(!phrases.has(term))phrases.set(term,[]);const p=phrases.get(term);if(!p.length||p.at(-1)[1]<=slice[0].start)p.push([slice[0].start,slice.at(-1).end]);
 }
 const repeatedPhrases=[...phrases].filter(([,p])=>p.length>=2).map(([t,p])=>pack(t,p)).sort((a,b)=>b.count-a.count||b.term.length-a.term.length).slice(0,300).filter((p,i,arr)=>!arr.some((q,j)=>j<i&&q.count===p.count&&(` ${q.term} `).includes(` ${p.term} `))).slice(0,10);
 function matches(term,occupied){const terms=tokenize(term).map(t=>t.key),out=[];for(let i=0;terms.length&&i<=n-terms.length;i++){if(terms.every((t,j)=>tokens[i+j].key===t)&&!/[.!?;\n]/.test(text.slice(tokens[i].end,tokens[i+terms.length-1].start))){const a=tokens[i].start,b=tokens[i+terms.length-1].end;if(!occupied||!occupied.some(([x,y])=>a<y&&b>x)){out.push([a,b]);if(occupied)occupied.push([a,b]);}i+=terms.length-1;}}return out;}
 const occupied=[];const fillerResults=fillers.slice().sort((a,b)=>b.length-a.length).map(t=>pack(t,matches(t,occupied),'Pode ter função legítima na frase. Escute o trecho e veja se cabe uma pausa.')).filter(p=>p.count).sort((a,b)=>b.count-a.count);
 const terms=new Map(glossary.map(([t,tip])=>[key(t),tip]));for(const t of custom.split(/[,;\n]/).map(t=>t.trim()).filter(Boolean).slice(0,50)){if(t.length<=80)terms.set(key(t),'Termo indicado por você. Decida se precisa de definição ou exemplo para este público.');}
 const jargon=[...terms].map(([t,tip])=>pack(t,matches(t),tip)).filter(p=>p.count).sort((a,b)=>b.count-a.count);
 const longSentences=text.split(/[.!?\n]+/).map(t=>t.trim()).filter(t=>tokenize(t).length>35).map(t=>({text:t.slice(0,300),words:tokenize(t).length})).slice(0,5);
 const tips=[];
 if(repeatedWords.length)tips.push(`“${repeatedWords[0].term}” aparece ${repeatedWords[0].count} vezes. Veja se a repetição reforça a ideia ou se alguma ocorrência pode ser retirada. Evite trocar termos técnicos só para variar.`);
 if(repeatedPhrases.length)tips.push(`Releia as ocorrências de “${repeatedPhrases[0].term}”. Se for uma retomada intencional da mensagem, mantenha; se apenas repetir o raciocínio, encurte.`);
 if(fillerResults.length)tips.push(`Escute os trechos com “${fillerResults[0].term}”. Faça outra rodada trocando uma ocorrência desnecessária por uma pausa.`);
 if(jargon.length)tips.push(`Explique “${jargon[0].term}” na primeira ocorrência e acrescente um exemplo do seu contexto. Termos técnicos podem ser necessários para seu público.`);
 if(n<80)tips.push('A amostra é curta. Use um trecho maior do ensaio para observar padrões com mais contexto.');
 return {words:n,repeatedWords,repeatedPhrases,fillers:fillerResults,jargon,longSentences,tips};
}
function createTranscriber(Recognition,callbacks){
 let recognition=null,active=false,base='',limitTimer;
 const state=s=>callbacks.onState?.(s);
 return {get active(){return active;},start(text=''){
  if(active)return;recognition=new Recognition();const current=recognition;base=text.trim();active=true;
  current.lang='pt-BR';current.continuous=true;current.interimResults=true;current.maxAlternatives=1;state('starting');
  current.onstart=()=>{if(recognition===current)state('listening');};
  current.onresult=e=>{if(recognition!==current)return;let final=[],interim=[];for(let i=0;i<e.results.length;i++){const r=e.results[i],s=r[0]?.transcript||'';(r.isFinal?final:interim).push(s);}const full=[base,final.join(' ')].filter(Boolean).join('\n');callbacks.onChange?.(full.slice(0,60000),interim.join(' '));if(full.length>60000){callbacks.onError?.('A transcrição atingiu 60 mil caracteres. Salve esta parte e inicie outra.');current.stop();}};
  current.onerror=e=>{if(recognition!==current)return;const errors={'not-allowed':'Microfone ou transcrição não autorizados. Confira a permissão do navegador.','service-not-allowed':'O serviço de transcrição não está disponível neste navegador.','network':'O serviço de transcrição não respondeu. Confira a conexão ou cole uma transcrição.','audio-capture':'Microfone indisponível. Feche outros aplicativos que possam estar usando o áudio.','no-speech':'Nenhuma fala reconhecida. Confira o microfone e tente novamente.'};if(e.error!=='aborted')callbacks.onError?.(errors[e.error]||'A transcrição foi interrompida. Confira o texto antes de continuar.');};
  current.onend=()=>{if(recognition!==current)return;active=false;recognition=null;clearTimeout(limitTimer);state('stopped');};
  try{current.start();limitTimer=setTimeout(()=>{if(active)current.stop();},30*60*1000);}catch{active=false;recognition=null;state('stopped');callbacks.onError?.('Não consegui iniciar a transcrição. Tente em outro navegador ou cole o texto.');}
 },stop(){if(active)recognition?.stop();},abort(){clearTimeout(limitTimer);const r=recognition;recognition=null;active=false;r?.abort();state('stopped');}};
}
root.OratoriaSpeech={diagnose,tokenize,createTranscriber};if(typeof module!=='undefined'&&module.exports)module.exports=root.OratoriaSpeech;
})(typeof window!=='undefined'?window:globalThis);
