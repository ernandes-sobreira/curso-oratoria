// DOM integration tests. This is not a browser layout or microphone-device test.
const {JSDOM}=require('jsdom'),fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const dom=new JSDOM(html,{url:'https://ernandes-sobreira.github.io/curso-oratoria/',runScripts:'outside-only'}),w=dom.window,d=w.document;
w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};w.confirm=()=>true;w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=()=>{};
let interval;w.setInterval=f=>{interval=f;return 1;};w.localStorage.setItem('curso_oratoria_state_v1',JSON.stringify({done:{L1:true},selected:'L2',timeSec:123,delivery:{L1:'Registro anterior de Ernandes'},notes:{L1:'Nota anterior'},tplEdits:{L1:{0:'Modelo anterior'}}}));
for(const f of ['assets/presentation.js','assets/course-data.js','assets/app.js'])w.eval(fs.readFileSync(f,'utf8'));
const click=id=>d.getElementById(id).click(),input=(id,v)=>{d.getElementById(id).value=v;d.getElementById(id).dispatchEvent(new w.Event('input',{bubbles:true}));},change=(id,v)=>{const el=d.getElementById(id);if(typeof v==='boolean')el.checked=v;else el.value=v;el.dispatchEvent(new w.Event('change',{bubbles:true}));};
const test=async()=>{
 assert.equal(d.querySelectorAll('.lesson-item').length,20);assert.equal(d.getElementById('courseProgressText').textContent,'1 de 20 aulas');assert.ok(d.getElementById('lessonDetail').textContent.includes('Aberturas que criam atenção'));
 d.querySelector('[data-view="course"]').click();assert.equal(d.getElementById('course').hidden,false);assert.equal(d.getElementById('studio').hidden,true);
 for(let n=1;n<=20;n++){d.querySelector(`[data-lesson="L${n}"]`).click();assert.equal(d.querySelectorAll('[data-practice]').length,4);assert.equal(d.querySelectorAll('input[name="lessonQuiz"]').length,3);}
 d.querySelector('[data-lesson="L2"]').click();input('lessonDelivery','Minha abertura foi construída com uma pergunta verificável e clara.');
 for(const el of d.querySelectorAll('[data-practice]')){el.checked=true;el.dispatchEvent(new w.Event('change'));}
 const radio=d.querySelector('input[name="lessonQuiz"][value="1"]');radio.checked=true;click('checkQuiz');click('completeLesson');assert.equal(d.getElementById('courseProgressText').textContent,'2 de 20 aulas');
 const saved=JSON.parse(w.localStorage.getItem('curso_oratoria_state_v1'));assert.equal(saved.delivery.L1,'Registro anterior de Ernandes');assert.equal(saved.notes.L1,'Nota anterior');assert.equal(saved.tplEdits.L1[0],'Modelo anterior');
 d.querySelector('[data-view="studio"]').click();click('pasteOpen');input('pasteTitle','Teste de conteúdo não executável');input('pasteContent','<img src=x onerror="alert(1)">\nExemplo de água e carbono com 12 unidades.\n---\nÁgua e carbono no segundo slide\nOutra comparação de água e carbono.');click('importPaste');
 assert.equal(d.getElementById('deckWorkspace').hidden,false);assert.equal(d.querySelectorAll('.slide-item').length,2);assert.equal(d.querySelectorAll('#slideDetail img').length,0);assert.ok(d.getElementById('slideDetail').textContent.includes('<img src=x'));
 click('useCandidate');assert.ok(d.getElementById('editMessage').value.includes('12 unidades'));
 change('reviewedSlide',true);assert.equal(d.getElementById('reviewedSlide').checked,false);
 input('editEvidence','Fonte sintética de teste; unidade ilustrativa.');input('editLimitation','Não são dados científicos.');input('editImportance','treinamos uma leitura fiel.');click('assembleSpeech');assert.ok(d.getElementById('editScript').value.includes('12 unidades'));change('reviewedSlide',true);assert.equal(d.getElementById('reviewedSlide').checked,true);
 change('prioritySlide',true);assert.ok(d.getElementById('deckStats').textContent.includes('1/2'));
 click('nextSlide');assert.ok(d.getElementById('slideDetail').textContent.includes('segundo slide'));click('prevSlide');assert.ok(d.getElementById('editEvidence').value.includes('sintética'));
 input('slideSearch','nao existe');assert.equal(d.querySelectorAll('.slide-item').length,0);input('slideSearch','');assert.equal(d.querySelectorAll('.slide-item').length,2);
 d.querySelector('[data-view="rehearsal"]').click();click('loadScript');assert.ok(d.getElementById('rehearsalScript').value.includes('12 unidades'));click('recordToggle');assert.ok(d.getElementById('toast').textContent.includes('não oferece gravação'));
 input('rehearsalNotes','Explicar unidade.');click('nextQuestion');assert.ok(d.getElementById('promptQuestion').textContent.includes('evidência'));
 click('profileOpen');input('profileName','<script>alert(2)</script>');click('saveProfile');assert.equal(d.querySelectorAll('#profileOpen script').length,0);assert.ok(w.localStorage.getItem('curso_oratoria_original_v1'));
 const originalGet=w.Storage.prototype.setItem;w.Storage.prototype.setItem=function(){throw new w.DOMException('Full','QuotaExceededError');};input('profileGoal','Teste de quota');click('saveProfile');assert.equal(d.getElementById('storageAlert').hidden,false);w.Storage.prototype.setItem=originalGet;
 // Restore a real parsed fixture into a new DOM session, exercising cache and chart rendering.
 const studio=JSON.parse(w.localStorage.getItem('curso_oratoria_studio_v2'));studio.deck=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));studio.edits={};studio.selected=0;
 const file={size:JSON.stringify(studio).length,text:async()=>JSON.stringify({schema:'oratoria-backup',version:2,state:saved,studio})};
 await d.getElementById('backupFile').onchange({target:{files:[file]}});await new Promise(r=>setTimeout(r,10));click('confirmRestore');assert.equal(d.querySelectorAll('.slide-item').length,3);assert.ok(d.getElementById('slideDetail').textContent.includes('Ausente'));assert.ok(d.getElementById('slideDetail').textContent.includes('12.5'));
 console.log('PASS: navigation, all 20 lessons, course completion gates, legacy records, pasted slides, XSS escaping, message/evidence editing, review flags, slide search, speech assembly, rehearsal, denied microphone, quota failure, backup restore and chart missing values.');dom.window.close();
};test().catch(e=>{console.error(e);dom.window.close();process.exit(1)});
