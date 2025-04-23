// game.js
import { Hero } from "../classes/heroes.js";
import { renderPower, renderSpells } from "../components/powerCard.js";

const playground = document.getElementById("playground");
const heroZone = document.getElementById("hero-zone");
const enemyZone = document.getElementById("enemy-zone");
const infoContainer = document.getElementById("info-container");

const selectedHeroes = JSON.parse(localStorage.getItem("selectedHeroes"));

let joueur1 = null;
let joueur2 = null;
let currentPlayerIndex = 0;
const zones = [heroZone, enemyZone];

if (!selectedHeroes || selectedHeroes.length < 2) {
  heroZone.innerHTML =
    "<p>Héros manquants. Merci de retourner à la sélection.</p>";
} else {
  joueur1 = new Hero(
    selectedHeroes[0].nom,
    selectedHeroes[0].alias,
    selectedHeroes[0].apparence,
    selectedHeroes[0].personnalite,
    selectedHeroes[0].origine,
    selectedHeroes[0].stats,
    selectedHeroes[0].sorts
  );
  joueur2 = new Hero(
    selectedHeroes[1].nom,
    selectedHeroes[1].alias,
    selectedHeroes[1].apparence,
    selectedHeroes[1].personnalite,
    selectedHeroes[1].origine,
    selectedHeroes[1].stats,
    selectedHeroes[1].sorts
  );


  afficherInfos(0);
  afficherInfos(1);
}

function afficherInfos(index) {
  const joueur = index === 0 ? joueur1 : joueur2;
  const zone = zones[index];
  const alias = joueur.alias
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <h2>${joueur.alias} <span class="pv-bar" data-index="${index}" style="--pv: 100%;">
  <span class="pv-label">${joueur.pv}</span>
</span>
</h2>
    <img src="assets/heroes/${alias.toLowerCase()}/${alias.toLowerCase()}.webp" alt="${alias.toLowerCase()}"  />
<div class="stat-container">

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
      const audio = document.getElementById("battle-audio");
      audio.volume = 0.3;
      audio.play().catch((e) => {
        console.warn(
          "Lecture audio bloquée par le navigateur. En attente d'une interaction."
        );
      });

      const cible = index === 0 ? joueur2 : joueur1;
      const feedback = joueur.lancerSort(sort.nom, cible);
      showToast(feedback);
      updatePVBar(index === 0 ? 1 : 0, cible.pv);
      flashHit(index === 0 ? 1 : 0);

      if (cible.pv <= 0) {
        finDuJeu(joueur, cible);
        return;
      }

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
  // Mettre à jour la classe active sur les zones
  zones.forEach((zone, i) => {
    if (zone) {
      zone.classList.toggle("active-player", i === currentPlayerIndex);
    }
  });
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
    infoContainer.appendChild(toast);
  }

  toast.textContent = message;
}

function finDuJeu(gagnant, perdant) {
  // Empêche toute autre interaction
  document
    .querySelectorAll(".powers-container")
    .forEach((c) => (c.innerHTML = ""));

  const message = document.createElement("div");
  message.className = "game-over";
  message.innerHTML = `
    <h2>💥 ${perdant.alias} est K.O. !</h2>
    <h1>🎉 ${gagnant.alias} remporte la victoire !</h1>
    <button id="restart-btn">Recommencer</button>
  `;
  message.style.textAlign = "center";
  message.style.padding = "20px";

  playground.appendChild(message);

  document.getElementById("restart-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
