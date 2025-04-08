const playground = document.getElementById('playground');
const heroZone = document.getElementById('hero-zone');

const storedHero = localStorage.getItem('selectedHero');
if (storedHero) {
  const heroData = JSON.parse(storedHero);

  heroZone.innerHTML = `
    <h2>${heroData.alias}</h2>
    <img src="assets/heroes/${heroData.alias}/${heroData.alias}.webp" alt="${heroData.alias}" style="width:150px;border-radius:10px;" />
    <p>${heroData.origine}</p>
  `;
} else {
  heroZone.innerHTML = "<p>Aucun héros sélectionné.</p>";
}
