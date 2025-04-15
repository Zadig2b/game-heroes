import { renderAllPowers } from '../components/powerCard.js';

const heroesContainer = document.getElementById('heroes-container');
const titre = document.getElementById('titre');
const powersContainer = document.getElementById('powers-container');
const heroDetails = document.getElementById('hero-details');
const startGameButton = document.getElementById('start-game');

let selectedHeroes = [];
let currentStep = 0;
const playerLabels = ["Joueur 1", "Joueur 2"];

startGameButton.textContent = "Choisir un héros";
startGameButton.disabled = true;

function saveHeroesToLocalStorage() {
  localStorage.setItem('selectedHeroes', JSON.stringify(selectedHeroes));
}

fetch('./data/heroes.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(heroData => {
      const alias = heroData.alias;
      const heroImg = document.createElement('img');
      heroImg.src = `assets/heroes/${alias}/${alias}.webp`;
      heroImg.alt = alias;
      heroImg.classList.add("hero-card");

      heroImg.addEventListener('click', () => {
        // Empêche sélection du même héros par les deux joueurs
        if (selectedHeroes.some(h => h.alias === heroData.alias)) return;

        selectedHeroes.push(heroData);
        heroImg.classList.add("selected-hero");

        // Affiche les détails du héros sélectionné
        heroDetails.innerHTML = `
          <h3>Origine</h3>
          <p>${heroData.origine}</p>
          <h3>Personnalité</h3>
          <p>${heroData.personnalite.attitude}</p>
          <h3>Valeurs</h3>
          <ul>${heroData.personnalite.valeurs.map(v => `<li>${v}</li>`).join('')}</ul>
        `;

        renderAllPowers(powersContainer, alias, heroData.pouvoirs);

        currentStep++;

        if (currentStep >= 2) {
          startGameButton.disabled = false;
          startGameButton.textContent = "Commencer le combat";
          titre.textContent = `Les deux joueurs ont choisi leurs héros.`;
          saveHeroesToLocalStorage();
        } else {
          startGameButton.textContent = "Choisir un héros";
          titre.textContent = `Joueur 2 : choisissez votre héros`;
        }
      });

      heroesContainer.appendChild(heroImg);
    });

    // Message initial
    titre.textContent = `Joueur 1 : choisissez votre héros`;
  });

startGameButton.addEventListener('click', () => {
  window.location.href = 'game.html';
});
