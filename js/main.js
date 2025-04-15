
// main.js
import { Hero } from '../classes/heroes.js';
import { renderPower } from '../components/powerCard.js';

const heroesContainer = document.getElementById('heroes-container');
const titre = document.getElementById('titre');
const powersContainer = document.getElementById('powers-container');
const heroDetails = document.getElementById('hero-details');
const startGameButton = document.getElementById('start-game');

let selectedHeroes = [];
let currentStep = 0;
const playerLabels = ["Joueur 1", "Joueur 2"];

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

      heroImg.addEventListener('click', () => {
        if (selectedHeroes.some(h => h.alias === heroData.alias)) return;

        selectedHeroes.push(heroData);
        titre.textContent = `${playerLabels[currentStep]} a choisi ${heroData.alias}`;

        heroDetails.innerHTML = `
          <h3>Origine</h3>
          <p>${heroData.origine}</p>
          <h3>Personnalité</h3>
          <p>${heroData.personnalite.attitude}</p>
          <h3>Valeurs</h3>
          <ul>${heroData.personnalite.valeurs.map(v => `<li>${v}</li>`).join('')}</ul>
        `;

        powersContainer.innerHTML = '';
        Object.entries(heroData.pouvoirs).forEach(([nom, description]) => {
          powersContainer.appendChild(renderPower(alias, nom, description));
        });

        currentStep++;

        if (currentStep >= 2) {
          startGameButton.disabled = false;
          titre.textContent = `Les deux joueurs ont choisi leurs héros.`;
          saveHeroesToLocalStorage();
        } else {
          titre.textContent = `Joueur 2 : choisissez votre héros`;
        }
      });

      heroesContainer.appendChild(heroImg);
    });
  });

startGameButton.addEventListener('click', () => {
  window.location.href = 'game.html';
});
