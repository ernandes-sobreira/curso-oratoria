const STORAGE_KEY = "curso_oratoria_aluno_v2";

const DEFAULT_COURSE = {
  version: 2,
  totalHours: 20,
  profile: {
    persona: "Professor/pesquisador (Pantanal, clima, saúde, políticas públicas, extensão)",
    typicalAudiences: ["acadêmicos", "alunos", "gestores públicos", "sociedade/extensionistas"],
    goal: "Ser palestrante e professor influente, com clareza, presença e storytelling científico"
  },
  lessons: [
    {
      id:"a1",
      title:"Aula 1 — O que é uma boa palestra (e o que é storytelling)",
      minutes:50,
      outcome:"Você entende o que é storytelling em contexto científico e consegue reconhecer uma boa abertura.",
      study: [
        "Storytelling (pra você) = organizar ciência como transformação: realidade → tensão → virada → caminho → fecho.",
        "Boa palestra não é despejar conteúdo: é guiar o público até uma ideia que muda algo.",
        "Seu padrão (Pantanal/política pública) pede: dado → risco → decisão → ação.",
      ],
      templates: [
        {
          name:"Abertura 1 (História + tese)",
          text:
`“Em [ano], em [lugar do Pantanal], aconteceu [evento real curto]. Na hora eu percebi uma coisa: [tese]. 
Hoje eu vou te mostrar [3 coisas] e terminar com [1 decisão prática].”`
        },
        {
          name:"Abertura 2 (Dado + pergunta)",
          text:
`“Se eu te disser que [dado forte], qual decisão você tomaria hoje?
Em 10 minutos, vou te dar um mapa simples: (1) o que está acontecendo, (2) por que importa, (3) o que fazer.”`
        }
      ],
      links: [
        { label:"TED — Nancy Duarte: The secret structure of great talks", url:"https://www.ted.com/talks/nancy_duarte_the_secret_structure_of_great_talks", note:"Estrutura de talks (contraste e chamada)."},
        { label:"TED — Chris Anderson: TED’s secret to great public speaking", url:"https://www.ted.com/talks/chris_anderson_ted_s_secret_to_great_public_speaking", note:"Princípios do que faz um talk funcionar."},
        { label:"Toastmasters PDF — Fundamentals of Public Speaking", url:"https://ccdn.toastmasters.org/medias/files/department-documents/club-documents/fundamentals-of-public-speaking/fundamentals-of-public-speaking-english.pdf", note:"Estrutura clássica: abertura, corpo, conclusão."}
      ],
      practice: [
        "Assista 10 min da Nancy Duarte e anote 3 coisas que ela faz na estrutura.",
        "Assista 10 min do Chris Anderson e anote 3 pontos sobre 'ideia central'.",
        "Escreva sua 'ideia central' em 1 frase (12–15 palavras)."
      ],
      deliverables: [
        "Lista: 3 aprendizados (Duarte) + 3 (Anderson).",
        "Sua ideia central em 1 frase."
      ]
    },

    {
      id:"a2",
      title:"Aula 2 — Abertura: como começar a falar sem enrolar",
      minutes:50,
      outcome:"Você sai com 3 aberturas prontas (acadêmico, gestor, extensão).",
      study:[
        "Abertura serve pra 3 coisas: (1) chamar atenção, (2) prometer valor, (3) dar direção (rota).",
        "Erro comum acadêmico: começar com definição e contexto longo demais.",
        "Abertura boa tem um 'gancho' e um 'mapa': o público sabe onde vai chegar."
      ],
      templates:[
        { name:"Abertura acadêmica (mapa em 3 tópicos)", text:
`“Hoje eu vou responder: [pergunta]. 
Vou fazer isso em 3 passos: (1) [contexto mínimo], (2) [evidência principal], (3) [implicação]. 
No final, eu deixo [limitação] e [próximo passo].”`},
        { name:"Abertura gestor (risco → ação)", text:
`“A decisão aqui é simples: [ação]. Se não, o risco é [risco]. 
Eu vou te mostrar rapidamente: (1) onde está o problema, (2) qual evidência sustenta, (3) o que dá pra fazer em 90 dias.”`},
        { name:"Abertura extensão (história curta)", text:
`“Eu vou te contar uma cena rápida: [cena]. 
Ela mostra por que [tema] importa na vida real. 
No final, você vai sair com [1 ação simples].”`}
      ],
      links:[
        { label:"Toastmasters — How to build a speech (artigo)", url:"https://www.toastmasters.org/magazine/magazine-issues/2021/june/how-to-build-a-speech", note:"Dicas práticas de abertura e propósito."}
      ],
      practice:[
        "Escolha 1 tema seu (ex.: restauração e saúde).",
        "Escreva 3 aberturas (acadêmico/gestor/extensão) usando os modelos.",
        "Leia em voz alta (1 min cada) e marque onde você tropeça."
      ],
      deliverables:["3 aberturas escritas (1 min cada)."]
    },

    {
      id:"a3",
      title:"Aula 3 — Objetivo e resultado esperado (pra você e pro público)",
      minutes:50,
      outcome:"Você define objetivo + resultado mensurável (o que muda após sua fala).",
      study:[
        "Uma fala forte tem 1 objetivo (verbo) e 1 resultado (medida).",
        "Ex.: 'convencer' é vago. Melhor: 'fazer o público aceitar X e topar Y'.",
        "Para seu perfil: resultado costuma ser decisão, apoio, mudança de prática ou entendimento claro."
      ],
      templates:[
        { name:"Objetivo/Resultado (modelo)", text:
`Objetivo (verbo): fazer o público ______________________.
Resultado esperado (medida): ao final, eles conseguem ______________________.
Ação final (CTA): ______________________.`}
      ],
      links:[
        { label:"Toastmasters evaluation — Writing a Speech with Purpose (PDF)", url:"https://www.toastmasters.org/medias/files/department-documents/education-documents/evaluation-resources/english/8103e-evaluation-resource-ff.pdf", note:"Ajuda a definir propósito e organização."}
      ],
      practice:[
        "Defina 1 palestra-alvo sua (12–15 min).",
        "Preencha objetivo/resultado/CTA.",
        "Corte tudo que não serve ao resultado."
      ],
      deliverables:["Objetivo + resultado + CTA (1 versão)."]
    },

    {
      id:"a4",
      title:"Aula 4 — Estrutura do meio: 3 blocos (sem aula ‘espiral’)",
      minutes:50,
      outcome:"Você monta um roteiro em 3 blocos com transições.",
      study:[
        "Estrutura simples que funciona: Bloco 1 (o que está acontecendo), Bloco 2 (por que importa), Bloco 3 (o que fazer).",
        "Cada bloco precisa terminar com uma frase de transição (ponte).",
        "Regra de ouro: 1 ideia por bloco, 1 evidência principal."
      ],
      templates:[
        { name:"Roteiro 3 blocos", text:
`Bloco 1 — O que está acontecendo: ____________________ (1 evidência)
Ponte: “Então, o ponto central é ________.”
Bloco 2 — Por que importa: ____________________ (1 impacto)
Ponte: “Se isso é verdade, precisamos ________.”
Bloco 3 — O que fazer: ____________________ (3 ações possíveis)` }
      ],
      links:[
        { label:"Toastmasters PDF — Fundamentals (estrutura)", url:"https://ccdn.toastmasters.org/medias/files/department-documents/club-documents/fundamentals-of-public-speaking/fundamentals-of-public-speaking-english.pdf", note:"Abertura/corpo/conclusão e organização."}
      ],
      practice:[
        "Monte 3 blocos para um tema seu.",
        "Escreva 2 frases de ponte (transição).",
        "Leia em voz alta cronometrando 6 min no total."
      ],
      deliverables:["Roteiro 3 blocos + 2 pontes."]
    },

    {
      id:"a5",
      title:"Aula 5 — Storytelling científico: dado + caso + decisão",
      minutes:50,
      outcome:"Você transforma um dado em narrativa de decisão (sem perder rigor).",
      study:[
        "Seu storytelling não é inventar: é escolher o caso real certo e o dado certo.",
        "Modelo forte pro seu trabalho: (1) caso real do Pantanal, (2) dado que confirma/contrasta, (3) decisão prática.",
        "O público lembra do caso; confia pelo dado; age pela decisão."
      ],
      templates:[
        { name:"Dado → Caso → Decisão", text:
`Caso (30s): “Aconteceu ________ em ________.”
Dado (15s): “Isso aparece nos dados como ________.”
Decisão (15s): “Então, a ação mais sensata agora é ________.”` }
      ],
      links:[
        { label:"Alan Alda Center (comunicação científica)", url:"https://www.aldacenter.org/", note:"Foco em conexão humana e clareza."}
      ],
      practice:[
        "Escolha 1 caso real (campo/extensão/aula).",
        "Escolha 1 dado (número, tendência, gráfico).",
        "Escreva a sequência (30s + 15s + 15s)."
      ],
      deliverables:["Mini-roteiro (60s) dado→caso→decisão."]
    },

    {
      id:"a6",
      title:"Aula 6 — Fechamento: como terminar deixando rastro",
      minutes:50,
      outcome:"Você cria 3 fechamentos e escolhe o mais forte para seu estilo.",
      study:[
        "Fechamento bom faz 1 coisa: fixa sentido e direciona ação.",
        "3 formatos: (1) pergunta que incomoda, (2) convite prático, (3) frase-marca (memorizável).",
        "Para policy makers: fecho com ação e prazo costuma funcionar muito bem."
      ],
      templates:[
        { name:"Fecho (pergunta)", text:`“Se você tivesse que decidir hoje, você escolheria ________ ou ________?”`},
        { name:"Fecho (convite prático)", text:`“Meu convite é simples: nos próximos 30 dias, vamos ________. Eu me comprometo com ________.”`},
        { name:"Fecho (frase-marca)", text:`“No Pantanal, ________. E é por isso que ________.”`}
      ],
      links:[
        { label:"Duarte — página do talk (apoio)", url:"https://www.duarte.com/resources/talks/the-secret-structure-of-great-talks/", note:"Reforça chamada à ação e estrutura."}
      ],
      practice:[
        "Crie 3 fechamentos para um tema seu.",
        "Leia em voz alta e marque o que soa natural.",
        "Escolha 1 e refine para 20–25 segundos."
      ],
      deliverables:["3 fechamentos + 1 escolhido refinado."]
    },

    // (Para manter sua resposta legível: o resto do curso segue o mesmo padrão.)
    // Você pode duplicar aulas e editar no app (botão “Editar”).
    // Se quiser, eu te mando a versão com as 24 aulas completas no mesmo formato em seguida.
  ]
};

// ------- estado -------
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return { course: DEFAULT_COURSE, done:{}, notes:{}, deliveries:{}, selected:null, today:null };
    const s = JSON.parse(raw);
    return {
      course: s.course?.lessons ? s.course : DEFAULT_COURSE,
      done: s.done || {},
      notes: s.notes || {},
      deliveries: s.deliveries || {},
      selected: s.selected || null,
      today: s.today || null
    };
  }catch{
    return { course: DEFAULT_COURSE, done:{}, notes:{}, deliveries:{}, selected:null, today:null };
  }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();
const el = (id)=>document.getElementById(id);

function totals(){
  const total = state.course.lessons.length;
  const done = Object.values(state.done).filter(Boolean).length;
  const pct = total ? Math.round((done/total)*100) : 0;
  const hours = state.course.totalHours || 20;
  const hoursDone = total ? Math.round((done/total)*hours*10)/10 : 0;
  return { total, done, pct, hours, hoursDone };
}

function pickToday(){
  const lessons = state.course.lessons;
  const next = lessons.find(l=>!state.done[l.id]) || lessons[lessons.length-1];
  state.today = next?.id || null;
  saveState();
}

function renderToday(){
  if(!state.today) pickToday();
  const l = state.course.lessons.find(x=>x.id===state.today);
  if(!l) return;
  el("todayBox").innerHTML = `
    <div class="lTitle">${l.title}</div>
    <div class="small muted">${l.minutes} min • ${l.outcome}</div>
    <div class="small muted">${state.done[l.id] ? "✅ concluída" : "⏳ pendente"}</div>
  `;
}

function renderSidebar(){
  const t = totals();
  el("progressFill").style.width = `${t.pct}%`;
  el("progressText").textContent = `${t.pct}%`;
  el("hoursText").textContent = `${t.hoursDone}/${t.hours}h`;
  el("pillDone").textContent = `${t.done} concluídas`;
  el("pillTotal").textContent = `${t.total} aulas`;

  const list = el("lessonList");
  list.innerHTML = "";
  state.course.lessons.forEach((l)=>{
    const div = document.createElement("div");
    div.className = "lesson" + (state.selected===l.id ? " active":"");
    div.onclick = ()=>{ state.selected = l.id; saveState(); renderLesson(); renderSidebar(); };
    div.innerHTML = `
      <div class="lTitle">${state.done[l.id] ? "✅ " : ""}${l.title}</div>
      <div class="lMeta">${l.minutes} min • ${l.outcome}</div>
    `;
    list.appendChild(div);
  });
}

function renderLesson(){
  const l = state.course.lessons.find(x=>x.id===state.selected);
  if(!l){
    el("curTitle").textContent="Selecione uma aula";
    el("curMeta").textContent="—";
    el("curDesc").textContent="Use 'Aula de hoje' para seguir no automático.";
    el("studyText").innerHTML="";
    el("linksBox").innerHTML="";
    el("templatesBox").innerHTML="";
    el("stepsBox").innerHTML="";
    el("deliverablesBox").innerHTML="";
    el("notes").value="";
    return;
  }

  el("curTitle").textContent = l.title;
  el("curMeta").textContent = `${l.minutes} min • Resultado esperado: ${l.outcome}`;
  el("curDesc").textContent = state.done[l.id]
    ? "✅ Concluída. Se quiser, refaça e compare evolução."
    : "⏳ Estude → copie modelo → pratique → entregue.";

  // estudo
  el("studyText").innerHTML = (l.study||[]).map(p=>`<div class="block">${p}</div>`).join("");

  // links
  el("linksBox").innerHTML = (l.links||[]).map(x=>`
    <div class="block">
      <div><a href="${x.url}" target="_blank" rel="noopener">${x.label}</a></div>
      <div class="small muted">${x.note||""}</div>
    </div>
  `).join("") || `<div class="muted">Sem links nesta aula.</div>`;

  // modelos
  el("templatesBox").innerHTML = (l.templates||[]).map(t=>`
    <div class="block">
      <div style="font-weight:900">${t.name}</div>
      <pre style="white-space:pre-wrap;margin:8px 0 0 0;font-family:inherit">${t.text}</pre>
    </div>
  `).join("") || `<div class="muted">Sem modelos nesta aula.</div>`;

  // prática
  el("stepsBox").innerHTML = (l.practice||[]).map(s=>`
    <div class="block">✅ ${s}</div>
  `).join("") || `<div class="muted">Sem prática definida.</div>`;

  // entregas
  el("deliverablesBox").innerHTML = (l.deliverables||[]).map(d=>`<div class="block">📦 ${d}</div>`).join("");

  // notas/entrega
  el("notes").value = state.notes[l.id] || "";
  el("deliveryInput").value = state.deliveries[l.id] || "";
  el("doneMsg").textContent = state.done[l.id] ? "Concluída ✅" : "Pendente ⏳";
}

function exportAll(){
  const payload = { exportedAt:new Date().toISOString(), version:2, state };
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "curso_oratoria_progresso_v2.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function importAll(txt){
  const parsed = JSON.parse(txt);
  if(!parsed?.state) throw new Error("JSON inválido (faltou state).");
  state = parsed.state;
  saveState();
  renderAll();
}

function renderAll(){
  if(!state.today) pickToday();
  if(!state.selected) state.selected = state.today;
  renderToday();
  renderSidebar();
  renderLesson();
}

document.addEventListener("DOMContentLoaded", ()=>{
  el("btnStartToday").onclick = ()=>{
    if(!state.today) pickToday();
    state.selected = state.today; saveState(); renderAll();
  };
  el("btnPickAnother").onclick = ()=>{
    const lessons = state.course.lessons;
    const idx = lessons.findIndex(x=>x.id===state.today);
    let next = null;
    for(let i=idx+1;i<lessons.length;i++){
      if(!state.done[lessons[i].id]){ next = lessons[i]; break; }
    }
    if(!next) next = lessons.find(x=>!state.done[x.id]) || lessons[0];
    state.today = next.id;
    saveState(); renderAll();
  };

  el("btnMarkDone").onclick = ()=>{
    const l = state.course.lessons.find(x=>x.id===state.selected);
    if(!l) return;
    state.done[l.id] = true;
    pickToday();
    saveState();
    el("doneMsg").textContent = "Concluída ✅";
    renderAll();
  };

  el("btnUnmark").onclick = ()=>{
    const l = state.course.lessons.find(x=>x.id===state.selected);
    if(!l) return;
    delete state.done[l.id];
    saveState();
    renderAll();
  };

  el("btnSaveDelivery").onclick = ()=>{
    const l = state.course.lessons.find(x=>x.id===state.selected);
    if(!l) return;
    state.deliveries[l.id] = el("deliveryInput").value.trim();
    saveState();
    el("deliveryMsg").textContent = "Entrega salva ✓";
    setTimeout(()=>el("deliveryMsg").textContent="", 1200);
  };

  el("btnSaveNotes").onclick = ()=>{
    const l = state.course.lessons.find(x=>x.id===state.selected);
    if(!l) return;
    state.notes[l.id] = el("notes").value;
    saveState();
    el("notesMsg").textContent = "Notas salvas ✓";
    setTimeout(()=>el("notesMsg").textContent="", 1200);
  };

  el("btnExport").onclick = exportAll;

  const importDlg = el("importDlg");
  el("btnImport").onclick = ()=>{ el("importText").value=""; importDlg.showModal(); };
  el("btnDoImport").onclick = (e)=>{
    e.preventDefault();
    try{ importAll(el("importText").value.trim()); importDlg.close(); }
    catch(err){ alert("Falha ao importar: " + err.message); }
  };

  el("btnReset").onclick = ()=>{
    if(!confirm("Zerar curso e progresso neste navegador?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    saveState();
    renderAll();
  };

  const editDlg = el("editDlg");
  el("btnEditCourse").onclick = ()=>{
    el("courseEditor").value = JSON.stringify(state.course, null, 2);
    editDlg.showModal();
  };
  el("btnSaveCourse").onclick = (e)=>{
    e.preventDefault();
    try{
      const next = JSON.parse(el("courseEditor").value);
      if(!next.lessons || !Array.isArray(next.lessons)) throw new Error("Faltou lessons[].");
      state.course = next;
      saveState();
      renderAll();
      editDlg.close();
    }catch(err){
      alert("Erro ao salvar: " + err.message);
    }
  };

  renderAll();
});
