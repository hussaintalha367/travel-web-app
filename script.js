const resultsEl   = document.getElementById("results");
const categoryEl  = document.getElementById("category");
const budgetEl    = document.getElementById("budget");
const recommendBtn= document.getElementById("recommendBtn");

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

function recommend() {
  const cat    = categoryEl.value;
  const budget = Number(budgetEl.value) || Infinity;
  const filtered = destinations.filter(d =>
    (cat === "all" || d.category === cat) && d.price <= budget
  );
  render(filtered);
}

recommendBtn.addEventListener("click", recommend);
window.addEventListener("DOMContentLoaded", recommend);