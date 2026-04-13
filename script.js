// Show Pokémon details in modal
function showDetails(name, img) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('modal-name').textContent = data.name.toUpperCase();
      document.getElementById('modal-img').src = img;

      const modalDetails = document.getElementById('modal-details');
      modalDetails.innerHTML = `
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Base Experience:</strong> ${data.base_experience}</p>
        <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
      `;

      document.getElementById('modal').style.display = 'flex';
    });
}

// Close the modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Add selected Pokémon to the bag
function addToBag(name, img) {
  const div = document.createElement('div');
  div.className = 'pokemon-card';
  div.innerHTML = `
    <img src="${img}" alt="${name}">
    <p>${name}</p>
    <button onclick="showDetails('${name}', '${img}')">View</button>
    <button onclick="this.parentElement.remove()">Release</button>
  `;
  document.getElementById('bag-container').appendChild(div);
}

// Load first 50 Pokémon into the grid
function loadPokemons() {
  const grid = document.getElementById('pokemon-grid');
  for (let i = 1; i <= 50; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(res => res.json())
      .then(data => {
        const name = data.name;
        const img = data.sprites.front_default;
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
          <img src="${img}" alt="${name}">
          <p>${name}</p>
          <button onclick="showDetails('${name}', '${img}')">View</button>
          <button onclick="addToBag('${name}', '${img}')">Add</button>
        `;
        grid.appendChild(card);
      });
  }
}

// Switch section view based on hash
function handleHashChange() {
  document.querySelectorAll('.page-section').forEach(section => {
    section.style.display = 'none';
  });
  const hash = location.hash || '#home';
  const active = document.querySelector(hash);
  if (active) active.style.display = 'block';
}

// Load initial data and setup listeners
window.addEventListener('load', () => {
  handleHashChange();
  loadPokemons();
});

window.addEventListener('hashchange', handleHashChange);

// Toggle mobile menu
function toggleMenu() {
  const nav = document.querySelector("nav.navbar");
  nav.classList.toggle("show");
}
