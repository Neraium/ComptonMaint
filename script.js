document.body.classList.add("js");
const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const dialog = document.getElementById("estimateDialog");
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
  if (
    event.key === "Escape" &&
    !dialog.open &&
    nav.classList.contains("open")
  ) {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!dialog.open && !event.target.closest(".site-header, .estimate-dialog"))
    closeMenu();
});
window.matchMedia("(min-width: 1101px)").addEventListener("change", closeMenu);
document.getElementById("year").textContent = new Date().getFullYear();

// Tabs enhance fully readable, static panels; task details use native accordions.
const tablist = document.querySelector(".audience-tabs");
const tabs = [...tablist.querySelectorAll("button")];
const panels = [...document.querySelectorAll(".audience-panel")];
tablist.setAttribute("role", "tablist");
let selectedPanel = "residential";
function selectPanel(id, focus = false) {
  if (!panels.some((panel) => panel.id === id)) return;
  selectedPanel = id;
  tabs.forEach((tab) => {
    const active = tab.dataset.panel === id;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  panels.forEach((panel) => {
    panel.hidden = panel.id !== id;
  });
}
tabs.forEach((tab, index) => {
  tab.disabled = false;
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", tab.dataset.panel);
  tab.addEventListener("click", () => selectPanel(tab.dataset.panel));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectPanel(tabs[next].dataset.panel, true);
    }
  });
});
panels.forEach((panel) => {
  panel.setAttribute("role", "tabpanel");
  panel.tabIndex = 0;
});
function selectHashPanel() {
  const id = location.hash.slice(1);
  if (panels.some((panel) => panel.id === id)) selectPanel(id);
}
selectPanel(selectedPanel);
selectHashPanel();
window.addEventListener("hashchange", selectHashPanel);
// Reveal the commercial panel before the browser follows its anchor.
document.querySelectorAll('a[href="#commercial"]').forEach((link) => {
  link.addEventListener("click", () => selectPanel("commercial"));
});

const form = document.getElementById("estimateForm");
const fields = document.getElementById("estimateFields");
const summaryPanel = document.getElementById("summaryPanel");
const summary = document.getElementById("projectSummary");
const status = document.getElementById("formStatus");
const property = document.getElementById("type");
const project = document.getElementById("project");
const propertyNames = {
  residential: "Residential",
  commercial: "Commercial",
  "property-management": "Property management",
};
let triggeringCTA;
let savedScroll = 0;
function editDetails() {
  fields.hidden = false;
  summaryPanel.hidden = true;
  status.textContent = "";
}
document.querySelectorAll("[data-estimate]").forEach((button) => {
  button.disabled = false;
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-controls", "estimateDialog");
  button.addEventListener("click", () => {
    triggeringCTA = button;
    property.value = button.dataset.property || propertyNames[selectedPanel];
    if (button.hasAttribute("data-recurring") && !project.value.trim())
      project.value = "Recurring maintenance: ";
    editDetails();
    savedScroll = window.scrollY;
    document.body.style.top = `-${savedScroll}px`;
    document.body.classList.add("dialog-open");
    dialog.showModal();
  });
});
dialog
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
// Native dialog handles Escape and inertness; explicitly wrap Tab at both ends.
dialog.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const focusable = [
    ...dialog.querySelectorAll(
      'button:not(:disabled), input, select, textarea, a[href], [tabindex="0"]',
    ),
  ].filter((element) => element.getClientRects().length);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  document.body.style.top = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  // A resize may have hidden a mobile navigation trigger.
  if (triggeringCTA?.getClientRects().length)
    triggeringCTA.focus({ preventScroll: true });
  else menu.focus({ preventScroll: true });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const details = new FormData(form);
  summary.value = [
    "Compton Family Maintenance — estimate inquiry",
    `Property type: ${details.get("type")}`,
    `Location: ${details.get("location").trim()}`,
    "",
    "Work requested:",
    details.get("project").trim(),
  ].join("\n");
  fields.hidden = true;
  summaryPanel.hidden = false;
  status.textContent = "Ready to copy. Nothing has been sent.";
  summary.focus();
});
document.getElementById("editSummary").addEventListener("click", () => {
  editDetails();
  project.focus();
});
document.getElementById("copySummary").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    status.textContent =
      "Copied. Share through your existing contact with us; nothing has been sent.";
  } catch {
    summary.focus();
    summary.select();
    status.textContent =
      "Select and copy the summary manually. Nothing has been sent.";
  }
});
