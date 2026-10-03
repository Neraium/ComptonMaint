document.body.classList.add("js");
const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
nav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 1101px)").addEventListener("change", closeMenu);
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("estimateForm");
form.querySelector('button[type="submit"]').disabled = false;
const summary = document.getElementById("projectSummary");
const status = document.getElementById("formStatus");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const details = new FormData(form);
  summary.value = [
    "Compton Family Maintenance — estimate inquiry",
    `Name: ${details.get("name").trim()}`,
    `Contact: ${details.get("contact").trim()}`,
    `Property type: ${details.get("type")}`,
    `Location: ${details.get("location").trim()}`,
    "",
    "Work requested:",
    details.get("project").trim(),
  ].join("\n");
  document.getElementById("summaryPanel").hidden = false;
  status.textContent =
    "Summary prepared. No request has been sent. Copy these details to share through your existing contact with the company.";
  summary.focus();
});
document.getElementById("copySummary").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    status.textContent =
      "Summary copied. Share it through your existing contact with the company. No request has been sent.";
  } catch {
    summary.focus();
    summary.select();
    status.textContent =
      "Select and copy the summary manually. No request has been sent.";
  }
});
