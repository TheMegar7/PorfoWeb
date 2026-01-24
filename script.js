const buttons = Array.from(document.querySelectorAll(".nav-btn"));
const views = Array.from(document.querySelectorAll(".view"));
const crumb = document.getElementById("crumb");

function setView(name){
  buttons.forEach(b => b.classList.toggle("is-active", b.dataset.view === name));
  views.forEach(v => v.classList.toggle("is-active", v.id === `view-${name}`));
  crumb.textContent = name.toUpperCase();
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});