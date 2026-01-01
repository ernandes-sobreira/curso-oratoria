const STORAGE_KEY = "curso_oratoria_aluno_ZERO_v1"; // chave nova = reset real

const COURSE = {
  version: 1,
  totalHours: 20,
  profile: {
    name: "Ernandes (perfil acadêmico)",
    context: "Professor/pesquisador (Pantanal, clima, saúde, políticas públicas, extensão)",
    audiences: ["acadêmicos", "alunos", "gestores/policy makers", "sociedade/extensionistas"],
    goal: "Ser palestrante e storyteller científico: claro, influente, com presença e estrutura"
  },
  lessons: buildLessons()
};

function buildLessons(){
  // Cada aula ~60 min (estudo + 1–2 exemplos + tarefa + entrega)
  return [
    {
      id:"L1",
      title:"Aula 1 — O que é storytelling (sem ‘historinha’)",
      minutes:60,
      outcome:"Você entende storytelling como estrutura de transformação e define sua ‘ideia central’ em 1 frase.",
      study:[
        "Storytelling em ciência = organizar dados como transformação: realidade → tensão → virada → caminho → fecho.",
        "Palestra boa não despeja conteúdo: guia o público até UMA ideia que muda entendimento/decisão.",
        "Regra de ouro: se você não consegue dizer sua ideia central em 12–15 palavras, você ainda não tem palestra."
      ],
      resources:[
        {type:"video", label:"Nancy Duarte — The secret structure of great talks (YouTube)", url:"https://www.youtube.com/watch?v=LhGa0TNLUGA", note:"Estrutura (contraste) que segura atenção."},
        {type:"video", label:"Chris Anderson — TED’s secret to great public speaking (YouTube)", url:"https://www.youtube.com/watch?v=-FOCpMAww28", note:"Foco em ‘ideia que vale espalhar’."},
        {type:"pdf", label:"Toastmasters — Fundamentals of Public Speaking (PDF)", url:"https://ccdn.toastmasters.org/medias/files/department-documents/club-documents/fundamentals-of-public-speaking/fundamentals-of-public-speaking-english.pdf", note:"Base de organização e entrega."}
      ],
      templates:[
        {name:"Ideia central (12–15 palavras)", text:"Minha ideia central é: ________________________________ (verbo forte + consequência)."},
        {name:"Mapa do talk (1 linha)", text:"Vou te mostrar (1) ___, (2) ___, (3) ___, e terminar com ___. "}
      ],
      tasks:[
        "Assista 10–15 min da Duarte e anote: onde ela cria contraste?",
        "Assista 10–15 min do Anderson e anote: o que é ‘ideia central’?",
        "Escreva sua ideia central em 1 frase (12–15 palavras)."
      ],
      deliverables:[
        "Ideia central (1 frase).",
        "3 aprendizados da Duarte + 3 do Anderson."
      ],
      minToComplete: { resourcesWatched: 2 }
    },

    {
      id:"L2",
      title:"Aula 2 — Como começar a falar (aberturas que funcionam)",
      minutes:60,
      outcome:"Você cria 3 aberturas (acadêmico / gestor / extensão) e escolhe a melhor.",
      study:[
        "Abertura tem 3 funções: (1) ganhar atenção, (2) prometer valor, (3) dar direção (mapa).",
        "Erro comum: abrir com ‘contexto longo’. Abertura boa é curta e assertiva.",
        "No seu perfil: gestor quer risco/ação; aluno quer clareza; público geral quer sentido."
      ],
      resources:[
        {type:"video", label:"Julian Treasure — How to speak so that people want to listen (YouTube)", url:"https://www.youtube.com/watch?v=eIho2S0ZahI", note:"Vícios de fala e voz (prático)."},
        {type:"site", label:"TED (texto) — Chris Anderson talk (página)", url:"https://www.ted.com/talks/chris_anderson_ted_s_secret_to_great_public_speaking", note:"Releia os pontos-chave."}
      ],
      templates:[
        {name:"Abertura Acadêmica (mapa)", text:"Hoje eu vou responder: [pergunta]. Em 3 passos: (1) __, (2) __, (3) __. No final, eu deixo [limitação] e [próximo passo]."},
        {name:"Abertura Gestor (risco→ação)", text:"A decisão aqui é: [ação]. Se não, o risco é: [risco]. Em 5 min: (1) evidência, (2) impacto, (3) ação em 90 dias."},
        {name:"Abertura Extensão (cena)", text:"Deixa eu te contar uma cena rápida: [cena real]. Ela mostra por que [tema] importa. No final: uma ação simples."
        }
      ],
      tasks:[
        "Escreva 3 aberturas (acadêmico/gestor/extensão).",
        "Leia em voz alta e corte 20% (sem perder sentido).",
        "Escolha a melhor e refine para 25–35 segundos."
      ],
      deliverables:["3 aberturas escritas + 1 escolhida refinada."],
      minToComplete:{ resourcesWatched: 1 }
    },

    {
      id:"L3",
      title:"Aula 3 — Objetivo e resultado esperado (pra você e pro público)",
      minutes:60,
      outcome:"Você define objetivo (verbo) + resultado mensurável + CTA (chamada final).",
      study:[
        "Palestra boa tem 1 objetivo (verbo) e 1 resultado (medida).",
        "Ex.: ‘conscientizar’ é vago. Melhor: ‘fazer o público aceitar X e topar Y’.",
        "CTA: o que exatamente a pessoa faz depois?"
      ],
      resources:[
        {type:"pdf", label:"Toastmasters — Writing a Speech with Purpose (avaliação PDF)", url:"https://www.toastmasters.org/medias/files/department-documents/education-documents/evaluation-resources/english/8103e-evaluation-resource-ff.pdf", note:"Ajuda a definir propósito e organização."}
      ],
      templates:[
        {name:"Objetivo/Resultado/CTA", text:"Objetivo (verbo): fazer o público ________.\nResultado (medida): ao final, eles conseguem ________.\nCTA: eu quero que eles ________ até ________."}
      ],
      tasks:[
        "Escolha um tema (ex.: restauração e saúde).",
        "Preencha objetivo/resultado/CTA.",
        "Corte tudo que não serve ao resultado."
      ],
      deliverables:["Objetivo + resultado + CTA (1 versão)."],
      minToComplete:{ resourcesWatched: 1 }
    },

    {
      id:"L4",
      title:"Aula 4 — Estrutura 3 blocos (sem fala ‘espiral’)",
      minutes:60,
      outcome:"Você monta roteiro em 3 blocos com transições (pontes).",
      study:[
        "Estrutura robusta: (1) o que está acontecendo, (2) por que importa, (3) o que fazer.",
        "Cada bloco termina com uma ponte (uma frase que leva ao próximo).",
        "Uma evidência por bloco (não dez)."
      ],
      resources:[
        {type:"pdf", label:"Toastmasters — Fundamentals (revisão estrutura)", url:"https://ccdn.toastmasters.org/medias/files/department-documents/club-documents/fundamentals-of-public-speaking/fundamentals-of-public-speaking-english.pdf", note:"Abertura/corpo/conclusão."}
      ],
      templates:[
        {name:"Roteiro 3 blocos", text:"Bloco 1 (o que está acontecendo): ____ (1 evidência)\nPonte: “O ponto central é ____.”\nBloco 2 (por que importa): ____ (1 impacto)\nPonte: “Se isso é verdade, precisamos ____.”\nBloco 3 (o que fazer): ____ (3 ações)."}
      ],
      tasks:["Crie um roteiro 3 blocos para um talk de 6 min.","Escreva 2 pontes.","Leia cronometrando 6 min."],
      deliverables:["Roteiro 3 blocos + 2 pontes."],
      minToComplete:{ resourcesWatched: 1 }
    },

    {
      id:"L5",
      title:"Aula 5 — Ferramenta ‘Message Box’ (ciência → público/policy)",
      minutes:60,
      outcome:"Você distila sua mensagem para um público específico (gestor/policy).",
      study:[
        "A Message Box é uma ferramenta de comunicação científica: define problema, por que importa, soluções e benefícios para o público escolhido.",
        "Ela é perfeita para você: Pantanal + políticas públicas + tomada de decisão.",
        "Você vai usar isso como base do seu talk principal."
      ],
      resources:[
        {type:"site", label:"COMPASS — The Message Box (site)", url:"https://www.compassscicomm.org/leadership-development/the-message-box/", note:"Visão geral e uso."},
        {type:"pdf", label:"COMPASS — Message Box Workbook (PDF)", url:"https://www.compassscicomm.org/wp-content/uploads/2020/05/The-Message-Box-Workbook.pdf", note:"Workbook oficial."}
      ],
      templates:[
        {name:"Message Box (resumo)", text:"PROBLEMA: ________\nPOR QUE IMPORTA (para X): ________\nSOLUÇÕES: ________\nBENEFÍCIOS: ________\nSO WHAT? (uma frase): ________"}
      ],
      tasks:["Escolha o público: ‘gestor municipal/estadual’ ou ‘policy maker’.","Preencha a Message Box em 10–15 min.","Transforme o ‘So what’ em 1 frase de abertura."],
      deliverables:["Message Box preenchida + 1 frase ‘So what’."],
      minToComplete:{ resourcesWatched: 1 }
    },

    {
      id:"L6",
      title:"Aula 6 — Voz: ser ouvido e respeitado (sem gritar)",
      minutes:60,
      outcome:"Você aprende exercícios simples de voz e evita vícios que ‘matam’ autoridade.",
      study:[
        "Autoridade vem de: volume estável, final de frase firme, pausas, articulação.",
        "Vícios comuns: falar rápido, terminar frase ‘sumindo’, preencher com ‘né/então/é…’",
        "Treino curto diário funciona mais que ‘maratona’."
      ],
      resources:[
        {type:"video", label:"Julian Treasure — talk completo (YouTube)", url:"https://www.youtube.com/watch?v=eIho2S0ZahI", note:"Voz e hábitos."},
        {type:"pdf", label:"Toastmasters — Your Speaking Voice (PDF)", url:"https://ccdn.toastmasters.org/medias/files/department-documents/education-documents/199-your-speaking-voice.pdf", note:"Exercícios e controle."}
      ],
      templates:[
        {name:"Checklist de voz (3 itens)", text:"1) Final de frase firme? 2) Pausa antes da ideia-chave? 3) Articulou sem correr?"}
      ],
      tasks:["Faça 3 leituras de 30s: lento / normal / enérgico.","Grave 60s e compare.","Liste seus 2 vícios principais."],
      deliverables:["Lista de 2 vícios + 1 gravação 60s."],
      minToComplete:{ resourcesWatched: 1 }
    },

    // ... (para manter a mensagem viável: a lógica do app suporta mais aulas iguais)
    // Você pode duplicar no botão “Editar curso” e colar mais aulas.
    // Se você quiser, eu te mando em seguida L7–L20 prontas já preenchidas (mesmo padrão) sem cortar nada.
  ];
}

// -------- estado --------
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return { course: COURSE, selected:null, today:null, watched:{}, deliveries:{}, notes:{}, doneLessons:{} };
    const s = JSON.parse(raw);
    return {
      course: s.course?.lessons ? s.course : COURSE,
      selected: s.selected || null,
      today: s.today || null,
      watched: s.watched || {},        // watched[lessonId][resourceIndex] = true
      deliveries: s.deliveries || {},  // deliveries[lessonId] = text
      notes: s.notes || {},            // notes[lessonId] = text
      doneLessons: s.doneLessons || {} // doneLessons[lessonId] = true
    };
  }catch{
    return { course: COURSE, selected:null, today:null, watched:{}, deliveries:{}, notes:{}, doneLessons:{} };
  }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();

const $ = (id)=>document.getElementById(id);
const dashboard = $("dashboard");
const lessonView = $("lessonView");

function lessonById(id){ return state.course.lessons.find(l=>l.id===id); }

function countAllResources(){
  let total = 0, seen = 0;
  state.course.lessons.forEach(l=>{
    const r = l.resources || [];
    total += r.length;
    const w = state.watched[l.id] || {};
    seen += Object.values(w).filter(Boolean).length;
  });
  return { total, seen };
}

function totals(){
  const totalLessons = state.course.lessons.length;
  const doneLessons = Object.values(state.doneLessons).filter(Boolean).length;
  const pct = totalLessons ? Math.round((doneLessons/totalLessons)*100) : 0;

  const hours = state.course.totalHours || 20;
  const hoursDone = totalLessons ? Math.round((doneLessons/totalLessons)*hours*10)/10 : 0;

  const r = countAllResources();
  return { totalLessons, doneLessons, pct, hours, hoursDone, resTotal:r.total, resSeen:r.seen };
}

function pickToday(){
  const next = state.course.lessons.find(l=>!state.doneLessons[l.id]) || state.course.lessons[0];
  state.today = next?.id || null;
  saveState();
}

function showDashboard(){
  lessonView.classList.add("hidden");
  dashboard.classList.remove("hidden");
  $("btnHome").textContent = "←";
}

function showLesson(){
  dashboard.classList.add("hidden");
  lessonView.classList.remove("hidden");
  $("btnHome").textContent = "← Painel";
}

function renderProgress(){
  const t = totals();
  $("progressFill").style.width = `${t.pct}%`;
  $("progressText").textContent = `${t.pct}%`;
  $("hoursText").textContent = `${t.hoursDone}/${t.hours}h`;
  $("pillLessons").textContent = `${t.doneLessons}/${t.totalLessons} aulas`;
  $("pillItems").textContent = `${t.resSeen}/${t.resTotal} itens vistos`;
}

function renderProfile(){
  const p = state.course.profile;
  $("profileBox").innerHTML = `
    <div><b>Contexto:</b> ${p.context}</div>
    <div><b>Públicos:</b> ${p.audiences.join(", ")}</div>
    <div><b>Meta:</b> ${p.goal}</div>
  `;
}

function renderToday(){
  if(!state.today) pickToday();
  const l = lessonById(state.today);
  if(!l) return;
  const status = state.doneLessons[l.id] ? "✅ assistida" : "⏳ pendente";
  $("todayBox").innerHTML = `
    <div class="lTitle">${l.title}</div>
    <div class="lMeta">${l.minutes} min • ${l.outcome}</div>
    <div class="lMeta">${status}</div>
  `;
}

function renderLessonList(){
  const list = $("lessonList");
  list.innerHTML = "";
  state.course.lessons.forEach(l=>{
    const div = document.createElement("div");
    div.className = "lesson" + (state.selected===l.id ? " active":"");
    div.innerHTML = `
      <div class="lTitle">${state.doneLessons[l.id] ? "✅ " : ""}${l.title}</div>
      <div class="lMeta">${l.minutes} min • ${l.outcome}</div>
    `;
    div.onclick = ()=>{
      state.selected = l.id;
      saveState();
      renderAll();
      showLesson();
    };
    list.appendChild(div);
  });
}

function isLessonComplete(l){
  const min = l.minToComplete || { resourcesWatched: 1 };
  const watched = state.watched[l.id] || {};
  const seenCount = Object.values(watched).filter(Boolean).length;
  return seenCount >= (min.resourcesWatched || 1);
}

function renderLesson(){
  const l = lessonById(state.selected);
  if(!l){
    showDashboard();
    return;
  }

  $("curTitle").textContent = l.title;
  $("curMeta").textContent = `${l.minutes} min • Objetivo: ${l.outcome}`;
  $("curOutcome").textContent = `Resultado esperado: ${l.outcome}`;

  const status = state.doneLessons[l.id] ? "Assistida ✅" : "Pendente ⏳";
  $("badgeStatus").textContent = status;

  // Study
  $("studyBox").innerHTML = (l.study||[]).map(p=>`<div class="block">${p}</div>`).join("");

  // Resources with “visto”
  const resourcesBox = $("resourcesBox");
  resourcesBox.innerHTML = "";
  const watchedMap = state.watched[l.id] || {};
  (l.resources||[]).forEach((r, idx)=>{
    const checked = !!watchedMap[idx];
    const div = document.createElement("div");
    div.className = "block";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:10px; align-items:flex-start;">
        <div>
          <div><a href="${r.url}" target="_blank" rel="noopener">${r.label}</a></div>
          <div class="muted small">${r.type.toUpperCase()} • ${r.note || ""}</div>
        </div>
        <label class="muted small" style="display:flex; gap:8px; align-items:center; white-space:nowrap;">
          <input type="checkbox" ${checked ? "checked":""} data-idx="${idx}" />
          visto/lido
        </label>
      </div>
    `;
    const cb = div.querySelector("input[type=checkbox]");
    cb.addEventListener("change", ()=>{
      state.watched[l.id] = state.watched[l.id] || {};
      state.watched[l.id][idx] = cb.checked;
      saveState();
      renderProgress();
    });
    resourcesBox.appendChild(div);
  });

  // Templates
  $("templatesBox").innerHTML = (l.templates||[]).map(t=>`
    <div class="block">
      <div style="font-weight:950">${t.name}</div>
      <pre style="white-space:pre-wrap;margin:8px 0 0 0;font-family:inherit">${t.text}</pre>
    </div>
  `).join("") || `<div class="muted">Sem modelos.</div>`;

  // Tasks
  $("tasksBox").innerHTML = (l.tasks||[]).map(s=>`<div class="block">✅ ${s}</div>`).join("");

  // Deliverables
  $("deliverablesBox").innerHTML = (l.deliverables||[]).map(d=>`<div class="block">📦 ${d}</div>`).join("");
  $("deliveryInput").value = state.deliveries[l.id] || "";
  $("notes").value = state.notes[l.id] || "";
}

function renderAll(){
  renderProfile();
  renderProgress();
  renderToday();
  renderLessonList();
  if(state.selected) renderLesson();
}

document.addEventListener("DOMContentLoaded", ()=>{
  // Home/back
  $("btnHome").onclick = ()=>{
    if(!dashboard.classList.contains("hidden")){
      // já está no painel -> nada
      return;
    }
    showDashboard();
  };

  // Start today
  $("btnStartToday").onclick = ()=>{
    if(!state.today) pickToday();
    state.selected = state.today;
    saveState();
    renderAll();
    showLesson();
  };

  // Next (próxima pendente)
  $("btnNext").onclick = ()=>{
    const lessons = state.course.lessons;
    const idx = lessons.findIndex(l=>l.id===state.today);
    let next = null;
    for(let i=idx+1;i<lessons.length;i++){
      if(!state.doneLessons[lessons[i].id]) { next = lessons[i]; break; }
    }
    if(!next) next = lessons.find(l=>!state.doneLessons[l.id]) || lessons[0];
    state.today = next.id;
    saveState();
    renderAll();
  };

  // Mark lesson as watched
  $("btnMarkLesson").onclick = ()=>{
    const l = lessonById(state.selected);
    if(!l) return;
    if(!isLessonComplete(l)){
      alert(`Ainda não. Marque pelo menos ${l.minToComplete?.resourcesWatched || 1} link(s) como visto/lido nesta aula.`);
      return;
    }
    state.doneLessons[l.id] = true;
    pickToday();
    saveState();
    renderAll();
  };

  $("btnUnmarkLesson").onclick = ()=>{
    const l = lessonById(state.selected);
    if(!l) return;
    delete state.doneLessons[l.id];
    saveState();
    renderAll();
  };

  // Save delivery
  $("btnSaveDelivery").onclick = ()=>{
    const l = lessonById(state.selected);
    if(!l) return;
    state.deliveries[l.id] = $("deliveryInput").value.trim();
    saveState();
    $("deliveryMsg").textContent = "Entrega salva ✓";
    setTimeout(()=>$("deliveryMsg").textContent="", 1200);
  };

  // Save notes
  $("btnSaveNotes").onclick = ()=>{
    const l = lessonById(state.selected);
    if(!l) return;
    state.notes[l.id] = $("notes").value;
    saveState();
    $("notesMsg").textContent = "Notas salvas ✓";
    setTimeout(()=>$("notesMsg").textContent="", 1200);
  };

  // Export / Import / Reset
  $("btnExport").onclick = ()=>{
    const payload = { exportedAt:new Date().toISOString(), version:1, state };
    const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json;charset=utf-8"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "curso_oratoria_progresso.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importDlg = $("importDlg");
  $("btnImport").onclick = ()=>{ $("importText").value=""; importDlg.showModal(); };
  $("btnDoImport").onclick = (e)=>{
    e.preventDefault();
    try{
      const parsed = JSON.parse($("importText").value.trim());
      if(!parsed?.state) throw new Error("JSON inválido.");
      state = parsed.state;
      saveState();
      importDlg.close();
      renderAll();
    }catch(err){
      alert("Falha ao importar: " + err.message);
    }
  };

  $("btnReset").onclick = ()=>{
    if(!confirm("Resetar tudo (curso + progresso) neste navegador?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    saveState();
    state.selected = null;
    renderAll();
    showDashboard();
  };

  // Edit course
  const editDlg = $("editDlg");
  $("btnEditCourse").onclick = ()=>{
    $("courseEditor").value = JSON.stringify(state.course, null, 2);
    editDlg.showModal();
  };
  $("btnSaveCourse").onclick = (e)=>{
    e.preventDefault();
    try{
      const next = JSON.parse($("courseEditor").value);
      if(!next?.lessons || !Array.isArray(next.lessons)) throw new Error("Faltou lessons[].");
      state.course = next;
      saveState();
      editDlg.close();
      renderAll();
    }catch(err){
      alert("Erro ao salvar: " + err.message);
    }
  };

  // init
  renderAll();
  showDashboard();
});
