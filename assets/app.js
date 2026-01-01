"use strict";

/** =========================
 *  CONFIG / DADOS DO CURSO
 *  ========================= */
const COURSE = {
  version: 1,
  totalLessons: 20,
  lessons: [
    {
      id: "L1",
      title: "Aula 1 — O que é storytelling (sem historinha)",
      minutes: 60,
      outcome: "Definir sua ideia central em 12–15 palavras e entender a estrutura de uma fala memorável.",
      study: [
        "Storytelling em ciência NÃO é inventar: é organizar a verdade como transformação.",
        "Uma palestra boa muda algo no público: entendimento, decisão, prioridade ou ação.",
        "Você não precisa ser engraçado. Precisa ser claro. Clareza vira autoridade.",
        "Definição prática: Storytelling = (realidade atual) → (tensão) → (virada) → (caminho) → (fecho com ação).",
        "Sua regra de ouro (professor + pesquisador): 1 ideia central por fala. O resto serve a ela."
      ],
      links: [
        { label:"TED — Chris Anderson (ideia central e clareza) [EN/legendável]", url:"https://www.youtube.com/watch?v=-FOCpMAww28", type:"vídeo", note:"Como grande talk vira 1 ideia." },
        { label:"Nancy Duarte — estrutura secreta de grandes talks [EN/legendável]", url:"https://www.youtube.com/watch?v=LhGa0TNLUGA", type:"vídeo", note:"Estrutura (contraste) na prática." },
        { label:"Toastmasters — Fundamentals of Public Speaking (PDF)", url:"https://ccdn.toastmasters.org/medias/files/department-documents/club-documents/fundamentals-of-public-speaking/fundamentals-of-public-speaking-english.pdf", type:"PDF", note:"Base bem prática." }
      ],
      doDont: {
        do: [
          "Comece por 1 frase: o que você quer que o público leve pra casa.",
          "Use 1 exemplo real (Pantanal/saúde/extensão) para dar chão.",
          "Repita a ideia central 2–3x ao longo da fala (sem ficar chato)."
        ],
        dont: [
          "Não comece com currículo ou agradecimentos longos.",
          "Não jogue 20 resultados sem dizer por que importam.",
          "Não confunda ‘tema’ com ‘mensagem’."
        ]
      },
      templates: [
        { name:"Ideia central (12–15 palavras)", text:"Minha ideia central é: ________ (verbo forte) ________ para ________ (impacto/consequência)." },
        { name:"Mapa em 3 passos", text:"Vou te mostrar (1) ________, (2) ________, (3) ________. No final, você vai saber ________." }
      ],
      tasks: [
        "Escreva sua ideia central (12–15 palavras).",
        "Escolha 1 exemplo real do seu trabalho que prove essa ideia.",
        "Escreva um ‘mapa em 3 passos’ para a fala."
      ]
    },

    {
      id: "L2",
      title: "Aula 2 — Como começar a falar (aberturas que funcionam)",
      minutes: 60,
      outcome: "Criar 3 aberturas (acadêmico / gestor / extensão) e escolher a melhor.",
      study: [
        "Abertura tem 3 funções: (1) atenção, (2) promessa de valor, (3) direção (mapa).",
        "Erro clássico acadêmico: abrir com contexto longo. Resultado: o público desliga.",
        "Gestor/policy maker precisa sentir: ‘qual decisão está em jogo?’ antes do dado.",
        "Extensão precisa sentir: ‘isso toca a vida real de quem?’ — uma cena curta resolve.",
        "Meta: 25–35s. Depois disso, vira enrolação."
      ],
      links: [
        { label:"Julian Treasure — como falar para as pessoas quererem ouvir [EN/legendável]", url:"https://www.youtube.com/watch?v=eIho2S0ZahI", type:"vídeo", note:"Voz + hábitos práticos." },
        { label:"TED (página) — Chris Anderson talk (texto + vídeo)", url:"https://www.ted.com/talks/chris_anderson_ted_s_secret_to_great_public_speaking", type:"site", note:"Leia e anote 5 frases fortes." },
        { label:"TED — Sônia Bridi: mudança climática (PT)", url:"https://www.ted.com/talks/sonia_bridi_como_eu_testemunhei_a_mudanca_climatica", type:"vídeo", note:"Clima + narrativa brasileira." }
      ],
      doDont: {
        do: [
          "Abra com 1 pergunta real (não retórica vazia).",
          "Prometa o valor: ‘Em 5 min você vai entender X’",
          "Diga o mapa: 3 pontos, simples."
        ],
        dont: [
          "Não abra com ‘Bom dia… vou falar sobre…’ (zero energia).",
          "Não leia slide na abertura.",
          "Não faça ‘história longa’ antes de dizer por que importa."
        ]
      },
      templates: [
        { name:"Abertura acadêmica (mapa)", text:"Hoje eu vou responder: ________. Em 3 passos: (1) ___, (2) ___, (3) ___. No final, eu deixo ___ + próximo passo ___." },
        { name:"Abertura gestor (risco→ação)", text:"A decisão aqui é: ________. Se não, o risco é: ________. Em 5 min: evidência → impacto → ação em 90 dias." },
        { name:"Abertura extensão (cena)", text:"Cena real (30s): ________. Isso mostra por que ________ importa. No final eu te dou 1 ação simples: ________." }
      ],
      tasks: [
        "Escreva 3 aberturas (acadêmico/gestor/extensão).",
        "Leia em voz alta e corte 20% sem perder sentido.",
        "Escolha 1 e refine para 25–35 segundos."
      ]
    },

    {
      id: "L3",
      title: "Aula 3 — Objetivo, resultado esperado e CTA",
      minutes: 60,
      outcome: "Definir objetivo (verbo), resultado mensurável e chamada final (CTA) — no seu contexto (clima/saúde/extensão).",
      study: [
        "Você fala para QUÊ? Se você não sabe, o público também não sabe.",
        "Objetivo precisa de verbo forte: convencer, ensinar, mobilizar, destravar, fazer decidir.",
        "Resultado esperado é mensurável: ‘ao final, a pessoa consegue…’",
        "CTA (chamada) é o que acontece depois, com prazo: ‘nos próximos 30 dias…’",
        "No seu perfil: a mesma pesquisa vira 3 CTAs: aluno (aprender), gestor (decidir), sociedade (engajar)."
      ],
      links: [
        { label:"COMPASS — Message Box (workbook PDF)", url:"https://www.compassscicomm.org/wp-content/uploads/2020/05/The-Message-Box-Workbook.pdf", type:"PDF", note:"Ferramenta perfeita pra policy." },
        { label:"TED — falar de clima em festas (PT)", url:"https://www.ted.com/talks/matthew_shirts_como_falar_de_mudancas_climaticas_em_festas", type:"vídeo", note:"Tom humano e prático." }
      ],
      doDont: {
        do: [
          "Escreva objetivo em 1 frase com verbo forte.",
          "Defina ‘o que a pessoa consegue fazer’ ao final.",
          "Crie CTA com prazo e responsável."
        ],
        dont: [
          "Não use ‘conscientizar’ como objetivo (vago).",
          "Não termine sem dizer o próximo passo.",
          "Não coloque 4 objetivos na mesma fala."
        ]
      },
      templates: [
        { name:"Objetivo / Resultado / CTA", text:"Objetivo: fazer o público ________.\nResultado: ao final, eles conseguem ________.\nCTA: eu quero que eles ________ até ________." },
        { name:"CTA para gestor (90 dias)", text:"Em 90 dias, proponho: (1) ________, (2) ________, (3) ________. Indicador de sucesso: ________." }
      ],
      tasks: [
        "Escolha um tema seu (ex: restauração e saúde humana).",
        "Preencha Objetivo/Resultado/CTA em 3 versões: aluno, gestor, extensão.",
        "Escolha a versão ‘gestor’ e refine para 2 frases."
      ]
    },

    {
      id: "L4",
      title: "Aula 4 — Estrutura 3 blocos (sem fala em espiral)",
      minutes: 60,
      outcome: "Montar roteiro de 6–8 min em 3 blocos com transições claras.",
      study: [
        "Estrutura mais segura do mundo: (1) o que está acontecendo, (2) por que importa, (3) o que fazer.",
        "Cada bloco termina com uma ponte (1 frase que leva ao próximo).",
        "1 evidência por bloco. Não é ‘revisão bibliográfica oral’.",
        "Para clima/saúde: o bloco 2 precisa ter impacto humano e custo de não agir.",
        "Objetivo aqui: você sair com uma espinha dorsal repetível."
      ],
      links: [
        { label:"Nancy Duarte — estrutura (EN)", url:"https://www.youtube.com/watch?v=LhGa0TNLUGA", type:"vídeo", note:"Observe o contraste." },
        { label:"Toastmasters — Fundamentals (PDF)", url:"https://ccdn.toastmasters.org/medias/files/department-documents/club-documents/fundamentals-of-public-speaking/fundamentals-of-public-speaking-english.pdf", type:"PDF", note:"Abertura/meio/fecho." }
      ],
      doDont: {
        do: [
          "Escreva 3 títulos de blocos em frases.",
          "Faça 2 pontes curtas (uma por transição).",
          "Corte qualquer parte que não sirva ao bloco."
        ],
        dont: [
          "Não faça ‘vai e volta’ nos tópicos.",
          "Não explique método detalhado no meio do talk (só o necessário).",
          "Não use jargão sem traduzir."
        ]
      },
      templates: [
        { name:"Roteiro 3 blocos (6–8 min)", text:"Bloco 1 (o que acontece): ________ (1 evidência)\nPonte: “O ponto é ________.”\nBloco 2 (por que importa): ________ (impacto)\nPonte: “Então precisamos ________.”\nBloco 3 (o que fazer): 3 ações: (1) ___ (2) ___ (3) ___." }
      ],
      tasks: [
        "Monte um roteiro 3 blocos com 2 pontes.",
        "Leia cronometrando 6–8 min.",
        "Marque onde você travou e reescreva 2 frases."
      ]
    },

    {
      id: "L5",
      title: "Aula 5 — Fechamento que deixa rastro (memória + ação)",
      minutes: 60,
      outcome: "Criar 3 fechamentos e escolher 1 que seja memorável (com CTA).",
      study: [
        "O fechamento decide se você será lembrado.",
        "Formato 1: pergunta forte (decisão). Formato 2: convite prático (prazo). Formato 3: frase-marca (identidade).",
        "Seu fecho precisa reconectar com a ideia central da Aula 1.",
        "Para política pública: fecho precisa de ação executável (quem faz + quando).",
        "Objetivo: você sair com um fecho que você repete em qualquer palestra do tema."
      ],
      links: [
        { label:"TED — Sônia Bridi (PT) (rever final)", url:"https://www.ted.com/talks/sonia_bridi_como_eu_testemunhei_a_mudanca_climatica", type:"vídeo", note:"Veja o fecho." },
        { label:"COMPASS — Message Box Workbook (PDF)", url:"https://www.compassscicomm.org/wp-content/uploads/2020/05/The-Message-Box-Workbook.pdf", type:"PDF", note:"Use o ‘So what’ como fecho." }
      ],
      doDont: {
        do: [
          "Feche com 1 frase curta + CTA.",
          "Volte na ideia central (Aula 1).",
          "Finalize com calma (não acelerado)."
        ],
        dont: [
          "Não termine com ‘é isso’ ou ‘obrigado’ sem mensagem.",
          "Não termine abrindo assunto novo.",
          "Não peça desculpa por tempo/conteúdo no final."
        ]
      },
      templates: [
        { name:"Fecho pergunta", text:"“Se você tivesse que decidir hoje, escolheria ________ ou ________?”" },
        { name:"Fecho convite (30 dias)", text:"“Nos próximos 30 dias, vamos ________. Eu me comprometo com ________.”" },
        { name:"Fecho frase-marca (identidade)", text:"“No Pantanal, ________. E é por isso que ________.”" }
      ],
      tasks: [
        "Escreva 3 fechamentos (um de cada tipo).",
        "Leia em voz alta e escolha o mais forte.",
        "Refine para 20–25s com CTA."
      ]
    }
  ]
};

/** =========================
 *  ESTADO (SALVAMENTO)
 *  ========================= */
const KEY = "curso_oratoria_state_v1";

function loadState(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return {
      profile:{ name:"", goal:"", photoData:"" },
      timeSec: 0,
      timerRunning: false,
      selected: "L1",
      done: {},               // done[lessonId]=true
      liked: {},              // liked[lessonId]= 1 | -1 | 0
      watched: {},            // watched[lessonId][idx]=true
      tplEdits: {},           // tplEdits[lessonId][tplIdx]=text
      delivery: {},           // delivery[lessonId]=text
      notes: {}               // notes[lessonId]=text
    };
    const s = JSON.parse(raw);
    return s;
  }catch(e){
    return null;
  }
}

let state = loadState();
if(!state){
  state = {
    profile:{ name:"", goal:"", photoData:"" },
    timeSec: 0,
    timerRunning: false,
    selected: "L1",
    done: {},
    liked: {},
    watched: {},
    tplEdits: {},
    delivery: {},
    notes: {}
  };
}

function saveState(){
  localStorage.setItem(KEY, JSON.stringify(state));
}

function $(id){ return document.getElementById(id); }
function showError(msg){
  const el = $("errorBar");
  el.textContent = "ERRO: " + msg;
  el.classList.remove("hidden");
}
function hideError(){ $("errorBar").classList.add("hidden"); }

/** =========================
 *  TIMER
 *  ========================= */
let timerInt = null;
function formatTime(sec){
  const h = String(Math.floor(sec/3600)).padStart(2,"0");
  const m = String(Math.floor((sec%3600)/60)).padStart(2,"0");
  const s = String(sec%60).padStart(2,"0");
  return `${h}:${m}:${s}`;
}
function startTimer(){
  if(timerInt) return;
  state.timerRunning = true;
  timerInt = setInterval(()=>{
    state.timeSec += 1;
    $("timerText").textContent = formatTime(state.timeSec);
    saveState();
    renderProgress();
  }, 1000);
}
function stopTimer(){
  state.timerRunning = false;
  if(timerInt){ clearInterval(timerInt); timerInt = null; }
  saveState();
}

/** =========================
 *  PROGRESSO
 *  ========================= */
function countWatched(){
  let total = 0;
  COURSE.lessons.forEach(l=>{
    total += l.links.length;
  });
  let seen = 0;
  for(const lid in state.watched){
    seen += Object.values(state.watched[lid] || {}).filter(Boolean).length;
  }
  return {total, seen};
}

function renderProgress(){
  const doneCount = Object.values(state.done).filter(Boolean).length;
  const pct = Math.round((doneCount / COURSE.totalLessons) * 100);
  $("progFill").style.width = `${pct}%`;
  $("progText").textContent = `${pct}%`;
  $("progCount").textContent = `${doneCount}/${COURSE.totalLessons} aulas`;

  const w = countWatched();
  $("pillSeen").textContent = `${w.seen} itens vistos`;
  $("pillTime").textContent = `${Math.round((state.timeSec/3600)*10)/10}h estudadas`;
}

/** =========================
 *  PERFIL
 *  ========================= */
function renderProfile(){
  $("inpName").value = state.profile.name || "";
  $("inpGoal").value = state.profile.goal || "";

  const box = $("profilePreview");
  if(!state.profile.name && !state.profile.goal && !state.profile.photoData){
    box.innerHTML = `<div class="muted small">Preencha seu perfil para personalizar o curso.</div>`;
    return;
  }
  box.innerHTML = `
    <div><b>${state.profile.name || "—"}</b></div>
    <div class="muted">${state.profile.goal ? state.profile.goal : ""}</div>
    ${state.profile.photoData ? `<img src="${state.profile.photoData}" alt="foto" />` : ""}
  `;
}

/** =========================
 *  LISTA DE AULAS
 *  ========================= */
function renderLessonList(){
  const list = $("lessonList");
  list.innerHTML = "";

  COURSE.lessons.forEach((l)=>{
    const div = document.createElement("div");
    const isActive = state.selected === l.id;
    div.className = "lessonItem" + (isActive ? " active" : "");
    const done = !!state.done[l.id];
    div.innerHTML = `
      <div class="t">${done ? "✅ " : ""}${l.title}</div>
      <div class="m">${l.minutes} min • ${l.outcome}</div>
    `;
    div.onclick = ()=>{
      state.selected = l.id;
      saveState();
      renderAll();
    };
    list.appendChild(div);
  });
}

/** =========================
 *  RENDER AULA
 *  ========================= */
function getLesson(){
  return COURSE.lessons.find(x=>x.id===state.selected) || COURSE.lessons[0];
}

function renderLesson(){
  const l = getLesson();
  if(!l) return;

  $("lessonTitle").textContent = l.title;
  $("lessonMeta").textContent = `${l.minutes} min • Resultado: ${l.outcome}`;

  const done = !!state.done[l.id];
  $("badgeStatus").textContent = done ? "Concluída ✅" : "Pendente ⏳";

  // like/dislike
  const fb = state.liked[l.id] || 0;
  $("btnLike").style.borderColor = fb===1 ? "rgba(79,99,218,.55)" : "";
  $("btnDislike").style.borderColor = fb===-1 ? "rgba(177,75,214,.55)" : "";

  // study
  $("studyBox").innerHTML = l.study.map(p=>`<div class="block color">${p}</div>`).join("");

  // links + watched + feedback
  state.watched[l.id] = state.watched[l.id] || {};
  const linksBox = $("linksBox");
  linksBox.innerHTML = "";
  l.links.forEach((r, idx)=>{
    const checked = !!state.watched[l.id][idx];
    const div = document.createElement("div");
    div.className = "block";
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
        <div>
          <div><a href="${r.url}" target="_blank" rel="noopener">${r.label}</a></div>
          <div class="muted small">${r.type.toUpperCase()} • ${r.note || ""}</div>
        </div>
        <label class="muted small" style="display:flex;gap:8px;align-items:center;white-space:nowrap">
          <input type="checkbox" ${checked?"checked":""} /> visto
        </label>
      </div>
    `;
    const cb = div.querySelector("input");
    cb.onchange = (e)=>{
      state.watched[l.id][idx] = e.target.checked;
      saveState();
      renderProgress();
    };
    linksBox.appendChild(div);
  });

  // do/don't
  const dd = l.doDont;
  $("doDontBox").innerHTML = `
    <div class="block">
      <div style="font-weight:1000">✅ Faça</div>
      <ul>${dd.do.map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="block">
      <div style="font-weight:1000">❌ Evite</div>
      <ul>${dd.dont.map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
  `;

  // templates editáveis
  state.tplEdits[l.id] = state.tplEdits[l.id] || {};
  const tplBox = $("tplBox");
  tplBox.innerHTML = "";
  l.templates.forEach((t, ti)=>{
    const val = state.tplEdits[l.id][ti] ?? t.text;
    const wrap = document.createElement("div");
    wrap.className = "block";
    wrap.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
        <div style="font-weight:1000">${t.name}</div>
        <button class="btn ghost mini" data-save-tpl="${ti}">Salvar</button>
      </div>
      <textarea class="textarea" style="min-height:120px" data-tpl="${ti}">${val}</textarea>
      <div class="muted small">Você pode refinar esse texto ao longo do curso.</div>
    `;
    tplBox.appendChild(wrap);
  });
  tplBox.querySelectorAll("[data-save-tpl]").forEach(btn=>{
    btn.onclick = ()=>{
      const ti = btn.getAttribute("data-save-tpl");
      const ta = tplBox.querySelector(`textarea[data-tpl="${ti}"]`);
      state.tplEdits[l.id][ti] = ta.value;
      saveState();
      btn.textContent = "Salvo ✓";
      setTimeout(()=>btn.textContent="Salvar", 900);
    };
  });

  // tasks
  $("tasksBox").innerHTML = l.tasks.map(x=>`<div class="block">✅ ${x}</div>`).join("");

  // delivery & notes
  $("inpDelivery").value = state.delivery[l.id] || "";
  $("inpNotes").value = state.notes[l.id] || "";
}

/** =========================
 *  NAVEGAÇÃO
 *  ========================= */
function goNext(){
  const idx = COURSE.lessons.findIndex(x=>x.id===state.selected);
  if(idx < COURSE.lessons.length - 1){
    state.selected = COURSE.lessons[idx+1].id;
    saveState();
    renderAll();
  }
}
function goPrev(){
  const idx = COURSE.lessons.findIndex(x=>x.id===state.selected);
  if(idx > 0){
    state.selected = COURSE.lessons[idx-1].id;
    saveState();
    renderAll();
  }
}

/** =========================
 *  EXPORT / IMPORT
 *  ========================= */
function exportData(){
  const payload = { version: 1, exportedAt: new Date().toISOString(), state };
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "meu_curso_oratoria_progresso.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function doImport(text){
  const parsed = JSON.parse(text);
  if(!parsed?.state) throw new Error("JSON inválido: não encontrei 'state'.");
  state = parsed.state;
  saveState();
  location.reload();
}

/** =========================
 *  EVENTOS
 *  ========================= */
function bindEvents(){
  $("btnSaveProfile").onclick = ()=>{
    state.profile.name = $("inpName").value.trim();
    state.profile.goal = $("inpGoal").value.trim();
    saveState();
    renderProfile();
  };

  $("inpPhoto").onchange = async (e)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      state.profile.photoData = reader.result;
      saveState();
      renderProfile();
    };
    reader.readAsDataURL(f);
  };

  $("btnClearPhoto").onclick = ()=>{
    state.profile.photoData = "";
    saveState();
    renderProfile();
  };

  $("btnTimerStart").onclick = startTimer;
  $("btnTimerStop").onclick = stopTimer;

  $("btnPrev").onclick = goPrev;
  $("btnNext").onclick = goNext;

  $("btnDone").onclick = ()=>{
    const l = getLesson();
    state.done[l.id] = true;
    saveState();
    renderAll();
  };
  $("btnUndone").onclick = ()=>{
    const l = getLesson();
    delete state.done[l.id];
    saveState();
    renderAll();
  };

  $("btnLike").onclick = ()=>{
    const l = getLesson();
    state.liked[l.id] = (state.liked[l.id]===1) ? 0 : 1;
    saveState();
    renderLesson();
  };
  $("btnDislike").onclick = ()=>{
    const l = getLesson();
    state.liked[l.id] = (state.liked[l.id]===-1) ? 0 : -1;
    saveState();
    renderLesson();
  };

  $("btnSaveDelivery").onclick = ()=>{
    const l = getLesson();
    state.delivery[l.id] = $("inpDelivery").value.trim();
    saveState();
    $("msgDelivery").textContent = "Entrega salva ✓";
    setTimeout(()=>$("msgDelivery").textContent="", 1200);
  };

  $("btnSaveNotes").onclick = ()=>{
    const l = getLesson();
    state.notes[l.id] = $("inpNotes").value;
    saveState();
    $("msgNotes").textContent = "Notas salvas ✓";
    setTimeout(()=>$("msgNotes").textContent="", 1200);
  };

  $("btnExport").onclick = exportData;

  const dlg = $("dlgImport");
  $("btnImportOpen").onclick = ()=>{ $("importText").value=""; dlg.showModal(); };
  $("btnDoImport").onclick = (e)=>{
    e.preventDefault();
    try{ doImport($("importText").value.trim()); }
    catch(err){ alert("Falha ao importar: " + err.message); }
  };

  $("btnReset").onclick = ()=>{
    if(!confirm("Resetar TUDO neste navegador?")) return;
    localStorage.removeItem(KEY);
    location.reload();
  };
}

/** =========================
 *  RENDER GERAL
 *  ========================= */
function renderAll(){
  hideError();
  renderProfile();
  $("timerText").textContent = formatTime(state.timeSec);
  renderProgress();
  renderLessonList();
  renderLesson();
}

/** =========================
 *  BOOT
 *  ========================= */
document.addEventListener("DOMContentLoaded", ()=>{
  try{
    bindEvents();
    renderAll();
    if(state.timerRunning) startTimer();
  }catch(err){
    showError(err.message || String(err));
  }
});
