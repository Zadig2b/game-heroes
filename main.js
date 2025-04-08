import { Hero } from './heroes.js';

const heroesContainer = document.getElementById('heroes-container');
const titre = document.getElementById('titre');
const powersContainer = document.getElementById('powers-container');
const pouvoirOutput = document.getElementById('pouvoir');

let currentHero = null;

// Fonction de préchargement d'image
function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

fetch('./data/heroes.json')
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) throw new Error('Format de données invalide');

    data.forEach(heroData => {
      const alias = heroData.alias;

      // Précharger l'image du héros
      preloadImage(`assets/heroes/${alias}/${alias}.webp`);

      const heroImage = document.createElement('img');
      heroImage.src = `assets/heroes/${alias}/${alias}.webp`;
      heroImage.alt = alias;
      heroImage.title = alias;
      heroImage.style.width = '150px';
      heroImage.style.margin = '10px';
      heroImage.style.cursor = 'pointer';

      heroImage.addEventListener('click', () => {
        currentHero = new Hero(
          heroData.nom,
          heroData.alias,
          heroData.apparence,
          heroData.pouvoirs,
          heroData.personnalite,
          heroData.origine
        );

        titre.textContent = currentHero.presentation();
        pouvoirOutput.textContent = '';
        powersContainer.innerHTML = ''; // Nettoyage des anciens pouvoirs

        // Générer les boutons de pouvoirs
        Object.entries(currentHero.pouvoirs).forEach(([nom, description]) => {
          const powerWrapper = document.createElement('div');
          powerWrapper.style.textAlign = 'center';
          powerWrapper.style.margin = '10px';

          const powerName = document.createElement('div');
          powerName.textContent = nom;
          powerName.style.fontWeight = 'bold';
          powerName.style.marginBottom = '5px';

          const powerImg = document.createElement('img');
          powerImg.src = `assets/heroes/${alias}/power/${nom}.webp`;
          powerImg.alt = nom;
          powerImg.title = description;
          powerImg.style.width = '100px';
          powerImg.style.cursor = 'pointer';
          powerImg.style.borderRadius = '10px';
          powerImg.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';

          // Précharger image du pouvoir
          preloadImage(powerImg.src);

          powerImg.addEventListener('click', () => {
            pouvoirOutput.textContent = currentHero.utiliserPouvoir(nom);
          });

          powerWrapper.appendChild(powerName);
          powerWrapper.appendChild(powerImg);
          powersContainer.appendChild(powerWrapper);
        });
      });

      heroesContainer.appendChild(heroImage);
    });
  })
  .catch(err => {
    console.error('Erreur chargement héros:', err);
    heroesContainer.textContent = 'Impossible de charger les héros.';
  });
