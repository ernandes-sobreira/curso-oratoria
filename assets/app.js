let data = JSON.parse(localStorage.getItem("cursoData")) || {
  profile: {},
  time: 0,
  running: false,
  lessonsDone: {}
};

const lessons = [
  {
    id: 1,
    title: "O que é storytelling (sem historinha)",
    text: `
Storytelling é organizar ideias como transformação.
Não é contar história bonita — é guiar o público de um estado inicial
para um novo entendimento ou decisão.
`,
    video: "https://www.youtube.com/watch?v=-FOCpMAww28"
  },
  {
    id: 2,
    title: "Como começar a falar (aberturas)",
    text: `
Toda boa abertura faz 3 coisas:
1. Chama atenção
2. Promete valor
3. Mostra o caminho
`,
    video: "https://www.youtube.com/watch?v=eIho2S0ZahI"
  },
  {
    id: 3,
    title: "Objetivo e resultado esperado",
    text: "Você fala para quê? Se não sabe, o público também não.",
    video: "https://www.youtube.com/watch?v=LhGa0TNLUGA"
  },
  {
    id: 4,
    title: "Estrutura em 3 blocos",
    text: "Problema → Por que importa → O que fazer",
    video: "https://www.youtube.com/watch?v=8S0FDjFBj8o"
  },
  {
    id: 5,
    title: "Fechamento forte",
    text: "O fechamento decide se você será lembrado.",
    video: "https://www.ted.com/talks/sonia_bridi_como_eu_testemunhei_a_mudanca_climatica"
  }
];

function save() {
  localStorage.setItem("cursoData", JSON.stringify(data));
}

function saveProfile() {
  data.profile = {
    name: nameInput.value,
    goal: goalInput.value,
    photo: photoInput.value
  };
  save();
  renderProfile();
}

function renderProfile() {
  if (!data.profile.name) return;
  profileView.innerHTML = `
    <p><b>${data.profile.name}</b></p>
    <p>${data.profile.goal}</p>
    ${data.profile.photo ? `<img src="${data.profile.photo}" width="120">` : ""}
  `;
}

function renderLessons() {
  lessonsDiv.innerHTML = "";
  lessons.forEach(l => {
    const div = document.createElement("div");
    div.className = "lesson" + (data.lessonsDone[l.id] ? " done" : "");
    div.innerHTML = `
      <h3>${l.title}</h3>
      <p>${l.text}</p>
      <a href="${l.video}" target="_blank">▶ assistir</a><br><br>
      <button onclick="completeLesson(${l.id})">Marcar como concluída</button>
    `;
    lessonsDiv.appendChild(div);
  });
}

function completeLesson(id) {
  data.lessonsDone[id] = true;
  save();
  updateProgress();
  renderLessons();
}

function updateProgress() {
  const done = Object.keys(data.lessonsDone).length;
  progressBar.value = done;
  progressText.innerText = `${done} de ${lessons.length} aulas concluídas`;
}

let interval;
function startTimer() {
  if (data.running) return;
  data.running = true;
  interval = setInterval(() => {
    data.time++;
    updateTimer();
    save();
  }, 1000);
}

function stopTimer() {
  data.running = false;
  clearInterval(interval);
}

function updateTimer() {
  const h = String(Math.floor(data.time / 3600)).padStart(2,"0");
  const m = String(Math.floor(data.time % 3600 / 60)).padStart(2,"0");
  const s = String(data.time % 60).padStart(2,"0");
  timer.innerText = `${h}:${m}:${s}`;
}

function exportData() {
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "meu_curso_oratoria.json";
  a.click();
}

function importData(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    data = JSON.parse(reader.result);
    save();
    location.reload();
  };
  reader.readAsText(file);
}

const lessonsDiv = document.getElementById("lessons");
renderProfile();
renderLessons();
updateProgress();
updateTimer();
