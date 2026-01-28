// ===== Config editable =====
const PROFILE = {
  // Cambia esto por tu fecha real si quieres edad automática:
  // Formato: YYYY-MM-DD
  birthDate: "1997-01-01",

  // Misiones (proyectos/experiencia) — placeholders
  missions: [
    {
      id: "main-01",
      type: "main",
      title: "MISIÓN PRINCIPAL — Proyecto destacado",
      atAGlance: "Stack · impacto · rol",
      description: "Descripción larga del proyecto/experiencia. Qué hiciste, qué aprendiste, resultados.",
      tags: ["C++", "Unreal", "Gameplay"],
      images: [] // luego: ["assets/img/..png"]
    },
    {
      id: "side-01",
      type: "side",
      title: "MISIÓN SECUNDARIA — Proyecto pequeño",
      atAGlance: "Herramienta · experimento",
      description: "Un experimento o mini-proyecto. Qué demuestra.",
      tags: ["JS", "UI", "Tools"],
      images: []
    }
  ]
};

// ===== Helpers =====
function calcAge(birthDateStr){
  const d = new Date(birthDateStr);
  if (Number.isNaN(d.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

// ===== Navigation =====
const tabs = qsa(".tab");
const views = qsa(".view");
const crumb = qs("#crumb");
const btnOverview = qs("#btn-overview");

function setView(name){
  tabs.forEach(t => t.classList.toggle("is-active", t.dataset.view === name));
  views.forEach(v => v.classList.toggle("is-active", v.id === `view-${name}`));
  if (crumb) crumb.textContent = name.toUpperCase();
  // opcional: cerrar About al navegar
  closeAbout();
}

tabs.forEach(t => t.addEventListener("click", () => setView(t.dataset.view)));
btnOverview?.addEventListener("click", () => setView("overview"));

// Overview cards -> navegan
qsa(".ov-card").forEach(card => {
  card.addEventListener("click", () => setView(card.dataset.view));
});

// ===== About drawer =====
const aboutTab = qs("#about-tab");
const aboutDrawer = qs("#about-drawer");
const aboutClose = qs("#about-close");

function openAbout(){
  aboutDrawer?.classList.add("is-open");
  aboutDrawer?.setAttribute("aria-hidden", "false");
  aboutTab?.setAttribute("aria-expanded", "true");
}
function closeAbout(){
  aboutDrawer?.classList.remove("is-open");
  aboutDrawer?.setAttribute("aria-hidden", "true");
  aboutTab?.setAttribute("aria-expanded", "false");
}
function toggleAbout(){
  const isOpen = aboutDrawer?.classList.contains("is-open");
  if (isOpen) closeAbout();
  else openAbout();
}

aboutTab?.addEventListener("click", toggleAbout);
aboutClose?.addEventListener("click", closeAbout);

// cerrar con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAbout();
});

// ===== Age binding =====
const ageEl = qs("#age");
const computedAge = calcAge(PROFILE.birthDate);
if (ageEl){
  ageEl.textContent = computedAge ?? "--";
}

// ===== Diario: render misiones =====
const missionsRoot = qs("#missions");
const missionDetail = qs("#mission-detail");

function renderMissions(){
  if (!missionsRoot) return;

  missionsRoot.innerHTML = "";
  PROFILE.missions.forEach(m => {
    const btn = document.createElement("button");
    btn.className = "mission";
    btn.type = "button";
    btn.dataset.id = m.id;
    btn.innerHTML = `
      <div class="ov-title">${m.title}</div>
      <div class="ov-sub">${m.atAGlance}</div>
    `;
    btn.addEventListener("click", () => selectMission(m.id));
    missionsRoot.appendChild(btn);
  });
}

function selectMission(id){
  const m = PROFILE.missions.find(x => x.id === id);
  if (!m || !missionDetail) return;

  qsa(".mission").forEach(b => b.classList.toggle("is-active", b.dataset.id === id));

  const tags = (m.tags || []).map(t => `<span class="badge">${t}</span>`).join(" ");
  const imgs = (m.images || []).length
    ? `<div class="grid-2">${m.images.map(src => `<div class="card"><img src="${src}" alt="" style="width:100%;height:auto;display:block;"></div>`).join("")}</div>`
    : `<div class="muted">Sin imágenes (por ahora).</div>`;

  missionDetail.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline;">
      <div>
        <div class="ov-title">${m.title}</div>
        <div class="muted" style="margin-top:6px;">${m.atAGlance}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">${tags}</div>
    </div>
    <div style="margin-top:12px;color:rgba(240,247,255,.80);line-height:1.6;">
      ${m.description}
    </div>
    <div style="margin-top:14px;">${imgs}</div>
  `;
}

// Inicial
renderMissions();

// ===== Contact form placeholder =====
const contactForm = qs("#contact-form");
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Formulario aún no conectado. (Luego lo enlazamos a un servicio.)");
});
