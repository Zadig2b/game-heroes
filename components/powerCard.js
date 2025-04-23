// powerCard.js
export function renderPower(alias, nom, description) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('power', 'stat-item'); // On réutilise stat-item pour le tooltip

  const label = document.createElement('div');
  label.textContent = nom;

  const img = document.createElement('img');
  img.src = `assets/heroes/${alias.toLowerCase()}/power/${nom.toLowerCase()}.webp`;

  const tooltip = document.createElement('span');
  tooltip.classList.add('tooltip');
  tooltip.textContent = description;

  wrapper.appendChild(label);
  wrapper.appendChild(img);
  wrapper.appendChild(tooltip); // Ajoute le tooltip dans la carte

  return wrapper;
}

  
  export function renderAllPowers(container, alias, pouvoirs) {
    container.innerHTML = '';
    Object.entries(pouvoirs).forEach(([nom, description]) => {
      const powerElement = renderPower(alias, nom, description);
      container.appendChild(powerElement);
    });
  }

  export function renderSpells({ container, joueur, cible, isActivePlayer, onSpellCast }) {
    container.innerHTML = '';
    joueur.sorts.forEach((sort) => {
      const isAvailable = isActivePlayer && sort.estDisponible();
      const powerElement = renderPower(joueur.alias, sort.nom, sort.description);
  
      if (isAvailable) {
        powerElement.addEventListener('click', () => onSpellCast(sort));
      } else {
        powerElement.style.opacity = "0.5";
        powerElement.style.cursor = "not-allowed";
  
        const cdLabel = document.createElement("span");
        cdLabel.textContent = sort.cooldownRestant;
        cdLabel.classList.add("cooldown-label");
        powerElement.style.position = "relative";
        powerElement.appendChild(cdLabel);
      }
  
      container.appendChild(powerElement);
    });
  }
  