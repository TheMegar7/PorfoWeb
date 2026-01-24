const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
const tabButtons = Array.from(document.querySelectorAll(".tab"));
const views = Array.from(document.querySelectorAll(".view"));
const crumb = document.getElementById("crumb");

function setActiveButtons(name){
  navButtons.forEach(b => b.classList.toggle("is-active", b.dataset.view === name));
  tabButtons.forEach(b => b.classList.toggle("is-active", b.dataset.view === name));
}

function setView(name){
  setActiveButtons(name);
  views.forEach(v => v.classList.toggle("is-active", v.id === `view-${name}`));
  if (crumb) crumb.textContent = name.toUpperCase();
}

[...navButtons, ...tabButtons].forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});
