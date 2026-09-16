/* =================== ELEMENTS =================== */
const resultsEl    = document.getElementById("results");
const categoryEl   = document.getElementById("category");
const budgetEl     = document.getElementById("budget");
const recommendBtn = document.getElementById("recommendBtn");

const searchInput  = document.getElementById("searchInput");
const searchBtn    = document.getElementById("searchBtn");
const clearBtn     = document.getElementById("clearBtn");

/* =================== RENDER =================== */
function render(list) {
  if (!list.length) {
    resultsEl.innerHTML = "<p>No destinations match your preferences.</p>";
    return;
  }
  resultsEl.innerHTML = list.map(d => `
    <article class="card">
      <img src="${d.image}" alt="${d.name}" loading="lazy"/>
      <div class="card-body">
        <span class="tag">${d.category}</span>
        <h3>${d.name}</h3>
        <p class="country">📍 ${d.country}</p>
        <p class="price">$${d.price.toLocaleString()}</p>
      </div>
    </article>
  `).join("");
}

/* =================== FILTERS =================== */
function applyFilters() {
  const cat    = categoryEl.value;
  const budget = Number(budgetEl.value) || Infinity;
  const query  = searchInput.value.trim().toLowerCase();

  const filtered = destinations.filter(d => {
    const matchesCategory = (cat === "all" || d.category === cat);
    const matchesBudget   = d.price <= budget;

    const matchesSearch =
      !query ||
      d.name.toLowerCase().includes(query) ||
      d.category.toLowerCase().includes(query) ||
      (d.country && d.country.toLowerCase().includes(query)) ||
      (query === "country" && d.country); // "country" matches any destination with a country

    return matchesCategory && matchesBudget && matchesSearch;
  });

  render(filtered);
}

/* =================== EVENT LISTENERS =================== */
recommendBtn.addEventListener("click", applyFilters);
searchBtn.addEventListener("click", applyFilters);

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    applyFilters();
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryEl.value  = "all";
  budgetEl.value    = 5000;
  render(destinations);
});

/* =================== INIT =================== */
window.addEventListener("DOMContentLoaded", () => render(destinations));