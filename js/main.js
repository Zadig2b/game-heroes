import { Hero } from '../classes/heroes.js';

const heroesContainer = document.getElementById('heroes-container');
const titre = document.getElementById('titre');
const powersContainer = document.getElementById('powers-container');
const heroDetails = document.getElementById('hero-details');
const startGameButton = document.getElementById('start-game');

let currentHero = null;

// Sauvegarde temporaire
function saveHeroToLocalStorage(heroData) {
  localStorage.setItem('selectedHero', JSON.stringify(heroData));
}

fetch('./data/heroes.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(heroData => {
      const alias = heroData.alias;
      const heroImg = document.createElement('img');
      heroImg.src = `assets/heroes/${alias}/${alias}.webp`;
      heroImg.alt = alias;

      heroImg.addEventListener('click', () => {
        currentHero = new Hero(
          heroData.nom,
          heroData.alias,
          heroData.apparence,
          heroData.pouvoirs,
          heroData.personnalite,
          heroData.origine
        );

        // Affiche titre
        titre.textContent = currentHero.presentation();

        // Active bouton
        startGameButton.disabled = false;

        // Affiche détails
        heroDetails.innerHTML = `
          <h3>Origine</h3>
          <p>${currentHero.origine}</p>
          <h3>Personnalité</h3>
          <p>${currentHero.personnalite.attitude}</p>
          <h3>Valeurs</h3>
          <ul>${currentHero.personnalite.valeurs.map(v => `<li>${v}</li>`).join('')}</ul>
        `;

        // Affiche pouvoirs
        powersContainer.innerHTML = '';
        Object.entries(currentHero.pouvoirs).forEach(([nom, description]) => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('power');

          const label = document.createElement('div');
          label.textContent = nom;

          const img = document.createElement('img');
          img.src = `assets/heroes/${alias}/power/${nom}.webp`;
          img.title = description;

          wrapper.appendChild(label);
          wrapper.appendChild(img);
          powersContainer.appendChild(wrapper);
        });

        // Sauvegarde en localStorage
        saveHeroToLocalStorage(heroData);
      });

      heroesContainer.appendChild(heroImg);
    });
  });

// Redirection au clic sur "Start Game"
startGameButton.addEventListener('click', () => {
  window.location.href = 'game.html';
});
