import { renderAllPowers } from "../components/powerCard.js";

const heroesContainer = document.getElementById("heroes-container");
const titre = document.getElementById("titre");
const powersContainer = document.getElementById("powers-container");
const heroDetails = document.getElementById("hero-details");
const startGameButton = document.getElementById("start-game");
const player1Img = document.getElementById("player1Img");
const player2Img = document.getElementById("player2Img");

let selectedHeroes = [];
let currentStep = 0;
let candidateHero = null;
let previousSelectedImg = null;

const playerLabels = ["Joueur 1", "Joueur 2"];

startGameButton.textContent = "Choisir un héros";
startGameButton.disabled = true;



function saveHeroesToLocalStorage() {
  localStorage.setItem("selectedHeroes", JSON.stringify(selectedHeroes));
}

fetch("./data/heroes.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((heroData) => {
      const alias = heroData.alias;
      const heroImgContainer = document.createElement("div");
      const heroImg = document.createElement("img");
      heroImg.src = `assets/heroes/${alias.toLowerCase()}/${alias.toLowerCase()}.webp`;
      heroImg.alt = alias;
      heroImgContainer.classList.add("hero-card");
      heroImgContainer.appendChild(heroImg);
      heroImg.addEventListener("click", () => {

        const audio = document.getElementById("title-audio");
        audio.volume = 0.3; // optionnel : volume réduit
        audio.play().catch((e) => {
          console.warn("Lecture audio bloquée par le navigateur. En attente d'une interaction.");
        });
        // Supprime la sélection précédente
        if (previousSelectedImg) {
          previousSelectedImg.classList.remove("selected-hero");
        }

        // Applique la sélection
        heroImg.classList.add("selected-hero");
        previousSelectedImg = heroImg;
        candidateHero = heroData;

        // Affiche les détails
        heroDetails.innerHTML = `
          <h3>Origine</h3>
          <p>${heroData.origine}</p>
          <h3>Personnalité</h3>
          <p>${heroData.personnalite.attitude}</p>
          <h3>Valeurs</h3>
          <ul>${heroData.personnalite.valeurs
            .map((v) => `<li>${v}</li>`)
            .join("")}</ul>
        `;
        const pouvoirs = Object.fromEntries(heroData.sorts.map(s => [s.nom, s["alt-desc"]]));
        renderAllPowers(powersContainer, alias, pouvoirs);
                heroDetails.appendChild(powersContainer);

        // Active le bouton
        startGameButton.disabled = false;
        startGameButton.textContent = "Valider ce héros";
      });

      heroesContainer.appendChild(heroImgContainer);
    });

    titre.textContent = `Joueur 1 : choisissez votre héros`;
  });

startGameButton.addEventListener("click", () => {
  if (selectedHeroes.length < 2 && candidateHero) {
    // Empêche le doublon
    if (selectedHeroes.some((h) => h.alias === candidateHero.alias)) return;

    selectedHeroes.push(candidateHero);

    // Affiche le portrait du héros choisi dans la zone correspondante
    const imgClone = document.createElement("img");
    imgClone.src = `assets/heroes/${candidateHero.alias.toLowerCase()}/${candidateHero.alias.toLowerCase()}.webp`;
    imgClone.alt = candidateHero.alias;
    // imgClone.classList.add("selected-hero");

    if (currentStep === 0) {
      player1Img.innerHTML = ""; // clean
      player1Img.appendChild(imgClone);
    } else if (currentStep === 1) {
      player2Img.innerHTML = "";
      player2Img.appendChild(imgClone);
    }

    // Réinitialisation temporaire
    previousSelectedImg.classList.remove("selected-hero");
    previousSelectedImg.remove();
    previousSelectedImg = null;
    candidateHero = null;
    startGameButton.disabled = true;
    heroDetails.innerHTML = "";
    powersContainer.innerHTML = "";

    currentStep++;

    if (currentStep >= 2) {
      saveHeroesToLocalStorage();
      startGameButton.textContent = "Commencer le combat";
      startGameButton.disabled = false;
      titre.textContent = "Les deux joueurs ont choisi leurs héros.";
      heroesContainer.style.display="none"
      heroDetails.style.display="none"
    } else {
      startGameButton.textContent = "Choisir un héros";
      titre.textContent = "Joueur 2 : choisissez votre héros";
    }
  } else if (selectedHeroes.length === 2) {
    window.location.href = "game.html";
  }
});
