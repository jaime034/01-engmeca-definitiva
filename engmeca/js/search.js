const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const emptyClear = document.getElementById("empty-clear");
const searchStatus = document.getElementById("search-status");
const resourceGrid = document.getElementById("resource-grid");
const emptyState = document.getElementById("empty-state");
const resourceCards = [...document.querySelectorAll(".searchable-card")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let activeFilter = "all";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function updateResults() {
  const query = normalizeText(searchInput.value);
  let visibleCount = 0;

  resourceCards.forEach((card) => {
    const searchableContent = normalizeText(`${card.dataset.search} ${card.textContent}`);
    const matchesText = !query || searchableContent.includes(query);
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const isVisible = matchesText && matchesCategory;

    card.hidden = !isVisible;
    visibleCount += Number(isVisible);
  });

  searchClear.hidden = !query;
  resourceGrid.hidden = visibleCount === 0;
  emptyState.hidden = visibleCount !== 0;

  if (visibleCount === 1) {
    searchStatus.textContent = "1 recurso encontrado";
  } else {
    searchStatus.textContent = `${visibleCount} recursos encontrados`;
  }
}

function clearSearch() {
  searchInput.value = "";
  activeFilter = "all";

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === "all"));
  });

  updateResults();
  searchInput.focus();
}

searchInput?.addEventListener("input", updateResults);
searchClear?.addEventListener("click", clearSearch);
emptyClear?.addEventListener("click", clearSearch);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    updateResults();
  });
});

if (searchInput) {
  updateResults();
}
