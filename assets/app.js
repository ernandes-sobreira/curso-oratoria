const STORAGE_KEY = "curso_oratoria_aluno_coursejson_v1";

const $ = (id)=>document.getElementById(id);

function showError(msg){
  const bar = $("errorBar");
  bar.textContent = "ERRO: " + msg;
  bar.classList.remove("hidden");
}

function hideError(){
  $("errorBar").classList.add("hidden");
}

let state = null;

function defaultState(course){
  return {
    course,
    selected: null,
    today: null,
    watched: {},       // watched[lessonId][resourceIndex] = true
    deliveries: {},    // deliveries[lessonId] = text
    notes: {},         // notes[lessonId] = text
    doneLessons: {}    // doneLessons[lessonId] = true
  };
}

function loadState(course){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState(course);
    const s = JSON.parse(raw);
    if(!s?.course?.lessons?.length) return defaultState(course);
    // sempre substitui o course pelo do JSON atual (para atualizar aulas sem perder progresso)
    s.course = course;
    return s;
  }catch{
    return defaultState(course);
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function lessonById(id){
  return state.course.lessons.find(l=>l.id===id);
}

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
  $("lessonView").classList.add("hidden");
  $("dashboard").classList.remove("hidden");
  $("btnHome").textContent = "←";
}

function showLesson(){
  $("dashboard").classList.add("hidden");
  $("lessonView").classList.remove("hidden");
  $("btnHome").textContent = "← Painel";
}

function renderProfile(){
  const p = state.course.profile;
  $("profileBox").innerHTML = `
    <div><b>Contexto:</b> ${p.context}</div>
    <div><b>Públicos:</b> ${p.audiences.join(", ")}</div>
    <div><b>Meta:</b> ${p.goal}</div>
  `;
}

function renderProgress(){
  const t = totals();
  $("progressFill").style.width = `${t.pct}%`;
  $("progressText").textContent = `${t.pct}%`;
  $("hoursText").textContent = `${t.hoursDone}/${t.hours}h`;
  $("pillLessons").textContent = `${t.doneLessons}/${t.totalLessons} aulas`;
  $("pillItems").textContent = `${t.resSeen}/${t.resTotal} itens vistos`;
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

function minWatchedOK(l){
  const min = l.minToComplete?.resourcesWatched ?? 1;
  const w = state.watched[l.id] || {};
  const seen = Object.values(w).filter(Boolean).length;
  return seen >= min;
}

function renderLesson(){
  const l = lessonById(state.selected);
  if(!l){ showDashboard(); return; }

  $("curTitle").textContent = l.title;
  $("curMeta").textContent = `${l.minutes} min • Objetivo: ${l.outcome}`;
  $("curOutcome").textContent = `Resultado esperado: ${l.outcome}`;

  $("badgeStatus").textContent = state.doneLessons[l.id] ? "Assistida ✅" : "Pendente ⏳";

  $("studyBox").innerHTML = (l.study||[]).map(p=>`<div class="block">${p}</div>`).join("");

  // resources
  const box = $("resourcesBox");
  box.innerHTML = "";
  const watchedMap = state.watched[l.id] || {};
  (l.resources||[]).forEach((r, idx)=>{
    const checked = !!watchedMap[idx];
    const div = document.createElement("div");
    div.className = "block";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; gap:10px; align-items:flex-start;">
        <div>
          <div><a href="${r.url}" target="_blank" rel="noopener">${r.label}</a></div>
          <div class="muted small">${(r.type||"link").toUpperCase()} • ${r.note||""}</div>
        </div>
        <label class="muted small" style="display:flex; gap:8px; align-items:center; white-space:nowrap;">
          <input type="checkbox" ${checked?"checked":""} />
          visto/lido
        </label>
      </div>
    `;
    div.querySelector("input").addEventListener("change", (e)=>{
      state.watched[l.id] = state.watched[l.id] || {};
      state.watched[l.id][idx] = e.target.checked;
      saveState();
      renderProgress();
    });
    box.appendChild(div);
  });

  // templates
  $("templatesBox").innerHTML = (l.templates||[]).map(t=>`
    <div class="block">
      <div style="font-weight:980">${t.name}</div>
      <pre style="white-space:pre-wrap;margin:8px 0 0 0;font-family:inherit">${t.text}</pre>
    </div>
  `).join("");

  // tasks
  $("tasksBox").innerHTML = (l.tasks||[]).map(s=>`<div class="block">✅ ${s}</div>`).join("");

  // deliverables
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

async function loadCourseJSON(){
  // caminho relativo funciona em GitHub Pages
  const res = await fetch("assets/course.json", { cache: "no-store" });
  if(!res.ok) throw new Error(`Não consegui carregar assets/course.json (HTTP ${res.status}).`);
  const course = await res.json();
  if(!course?.lessons?.length) throw new Error("course.json sem lessons[] (vazio).");
  return course;
}

document.addEventListener("DOMContentLoaded", async ()=>{
  try{
    hideError();
    const course = await loadCourseJSON();
    state = loadState(course);
    if(!state.today) pickToday();
    renderAll();
    showDashboard();
  }catch(err){
    showError(err.message + " — confira se existe o arquivo assets/course.json e se está na pasta certa.");
    // cria estado mínimo pra UI não morrer
    state = defaultState({
      version: 1,
      totalHours: 20,
      profile: { context:"—", audiences:["—"], goal:"—" },
      lessons:[]
    });
    renderAll();
    showDashboard();
  }

  $("btnHome").onclick = ()=> showDashboard();

  $("btnStartToday").onclick = ()=>{
    if(!state.today) pickToday();
    state.selected = state.today;
    saveState();
    renderAll();
    showLesson();
  };

  $("btnNext").onclick = ()=>{
    const lessons = state.course.lessons;
    if(!lessons.length) return;
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

  $("btnMarkLesson").onclick = ()=>{
    const l = lessonById(state.selected);
    if(!l) return;
    const min = l.minToComplete?.resourcesWatched ?? 1;
    if(!minWatchedOK(l)){
      alert(`Ainda não. Marque pelo menos ${min} link(s) como visto/lido.`);
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

  $("btnSaveDelivery").onclick = ()=>{
    const l = lessonById(state.selected);
    if(!l) return;
    state.deliveries[l.id] = $("deliveryInput").value.trim();
    saveState();
    $("deliveryMsg").textContent = "Entrega salva ✓";
    setTimeout(()=>$("deliveryMsg").textContent="", 1200);
  };

  $("btnSaveNotes").onclick = ()=>{
    const l = lessonById(state.selected);
    if(!l) return;
    state.notes[l.id] = $("notes").value;
    saveState();
    $("notesMsg").textContent = "Notas salvas ✓";
    setTimeout(()=>$("notesMsg").textContent="", 1200);
  };

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
    if(!confirm("Resetar progresso neste navegador?")) return;
    localStorage.removeItem(STORAGE_KEY);
    // recarrega a página (mais seguro)
    location.reload();
  };
});
