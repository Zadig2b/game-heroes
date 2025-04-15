// game.js
import { Hero } from "../classes/heroes.js";
import { renderPower, renderSpells } from "../components/powerCard.js";

const playground = document.getElementById("playground");
const heroZone = document.getElementById("hero-zone");

const selectedHeroes = JSON.parse(localStorage.getItem("selectedHeroes"));

let joueur1 = null;
let joueur2 = null;
let currentPlayerIndex = 0;
const zones = [heroZone, null];

if (!selectedHeroes || selectedHeroes.length < 2) {
  heroZone.innerHTML =
    "<p>Héros manquants. Merci de retourner à la sélection.</p>";
} else {
  joueur1 = new Hero(
    selectedHeroes[0].nom,
    selectedHeroes[0].alias,
    selectedHeroes[0].apparence,
    selectedHeroes[0].pouvoirs,
    selectedHeroes[0].personnalite,
    selectedHeroes[0].origine,
    selectedHeroes[0].stats,
    selectedHeroes[0].sorts
  );
  joueur2 = new Hero(
    selectedHeroes[1].nom,
    selectedHeroes[1].alias,
    selectedHeroes[1].apparence,
    selectedHeroes[1].pouvoirs,
    selectedHeroes[1].personnalite,
    selectedHeroes[1].origine,
    selectedHeroes[1].stats,
    selectedHeroes[1].sorts
  );

  const enemyZone = document.createElement("div");
  enemyZone.id = "enemy-zone";
  playground.appendChild(enemyZone);
  zones[1] = enemyZone;

  afficherInfos(0);
  afficherInfos(1);
}

function afficherInfos(index) {
  const joueur = index === 0 ? joueur1 : joueur2;
  const zone = zones[index];

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <h2>${joueur.alias} <span class="pv-bar" data-index="${index}" style="--pv: 100%;"></span></h2>
    <img src="assets/heroes/${joueur.alias}/${joueur.alias}.webp" alt="${joueur.alias}" style="width:150px;border-radius:10px;" />
    <p>${joueur.origine}</p>
    <p><strong>PV:</strong> <span class="pv-value">${joueur.pv}</span></p>

<div class="stat-item">
  🌀 <strong>Agilité:</strong> ${joueur.agilite}
  <span class="tooltip">Chances d'éviter les attaques (%)</span>
</div>
<div class="stat-item">
  💪 <strong>Force:</strong> ${joueur.force}
  <span class="tooltip">Augmente les dégâts des sorts (%)</span>
</div>
<div class="stat-item">
  🛡️ <strong>Défense:</strong> ${joueur.defense}
  <span class="tooltip">Réduction de dégâts (%)</span>
</div>

  `;

  const powersContainer = document.createElement("div");
  powersContainer.id = "powers-container";
  powersContainer.classList.add("powers-container");

  renderSpells({
    container: powersContainer,
    joueur,
    cible: index === 0 ? joueur2 : joueur1,
    isActivePlayer: index === currentPlayerIndex,
    onSpellCast: (sort) => {
      const cible = index === 0 ? joueur2 : joueur1;
      const feedback = joueur.lancerSort(sort.nom, cible);
      showToast(feedback);
      updatePVBar(index === 0 ? 1 : 0, cible.pv);
      flashHit(index === 0 ? 1 : 0);
      changerTour();
    },
  });

  zone.innerHTML = "";
  zone.appendChild(wrapper);
  zone.appendChild(powersContainer);
}

function changerTour() {
  // Réduire les cooldowns et effets du joueur qui a fini son tour
  const joueurActuel = currentPlayerIndex === 0 ? joueur1 : joueur2;
  joueurActuel.reduireCooldowns();

  currentPlayerIndex = 1 - currentPlayerIndex;

  afficherInfos(0);
  afficherInfos(1);
  updatePVBar(0, joueur1.pv);
  updatePVBar(1, joueur2.pv);
}


function updatePVBar(index, pv) {
  const zone = zones[index];
  const bar = zone.querySelector(".pv-bar");
  const valueText = zone.querySelector(".pv-value");
  const pourcentage = Math.max(0, Math.min(100, pv));
  bar.style.setProperty("--pv", `${pourcentage}%`);
  if (valueText) valueText.textContent = pv;
}

function flashHit(index) {
  const zone = zones[index];
  zone.classList.add("hit-effect");
  setTimeout(() => zone.classList.remove("hit-effect"), 400);
}

function showToast(message) {
  let toast = document.getElementById("toast-message");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-message";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
}
