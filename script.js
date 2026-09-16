const resultsEl    = document.getElementById("results");
const categoryEl   = document.getElementById("category");
const budgetEl     = document.getElementById("budget");
const recommendBtn = document.getElementById("recommendBtn");

const searchInput  = document.getElementById("searchInput");
const searchBtn    = document.getElementById("searchBtn");
const clearBtn     = document.getElementById("clearBtn");

// ------- Render -------
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
        <p class="price">$${d.price.toLocaleString()}</p>
      </div>
    </article>
  `).join("");
}

// ------- Main filter logic (combines category + budget + search) -------
function applyFilters() {
  const cat    = categoryEl.value;
  const budget = Number(budgetEl.value) || Infinity;
  const query  = searchInput.value.trim().toLowerCase();

  const filtered = destinations.filter(d => {
    const matchesCategory = (cat === "all" || d.category === cat);
    const matchesBudget   = d.price <= budget;
    const matchesSearch   = !query || d.name.toLowerCase().includes(query);
    return matchesCategory && matchesBudget && matchesSearch;
  });

  render(filtered);
}

// ------- Event listeners -------
recommendBtn.addEventListener("click", applyFilters);

// Search button triggers the filter (search term included)
searchBtn.addEventListener("click", applyFilters);

// Pressing Enter inside search box also searches
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    applyFilters();
  }
});

// Clear button resets search box, category, budget and re-renders all
clearBtn.addEventListener("click", () => {
  searchInput.value  = "";
  categoryEl.value   = "all";
  budgetEl.value     = 3000;
  render(destinations);
});

// Initial render
window.addEventListener("DOMContentLoaded", () => render(destinations));