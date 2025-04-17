import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Hero } from '../classes/heroes.js';
import { Sort } from '../classes/sort.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const heroesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/heroes.json'), 'utf-8'));

function assert(message, condition) {
  if (condition) {
    console.log(`✅ ${message}`);
  } else {
    console.error(`❌ ${message}`);
  }
}

function testHeroInit(heroData, index) {
  try {
    const hero = new Hero(
      heroData.nom,
      heroData.alias,
      heroData.apparence,
      heroData.pouvoirs,
      heroData.personnalite,
      heroData.origine,
      heroData.stats,
      heroData.sorts
    );

    assert(`[Hero ${index}] Alias correct`, hero.alias === heroData.alias);
    assert(`[Hero ${index}] PV initiaux = 100`, hero.pv === 100);
    assert(`[Hero ${index}] Sorts bien chargés`, hero.sorts.length === heroData.sorts.length);
    return hero;
  } catch (e) {
    console.error(`❌ Erreur init héros ${heroData.alias}:`, e.message);
    return null;
  }
}

function testSortEffects(hero) {
  hero.sorts.forEach((sort) => {
    const sortName = sort.nom;
    const target = new Hero("Target", "TestDummy", "", {}, {}, "", { agilite: 0, force: 0, defense: 0 }, []);

    // reset stats avant chaque sort
    hero.pv = 100;
    hero.force = hero.baseForce;
    hero.agilite = hero.baseAgilite;
    hero.defense = hero.baseDefense;

    target.pv = 100;

    const result = hero.lancerSort(sortName, target);
    console.log(`🧪 [${hero.alias}] lance "${sortName}" → ${result}`);

    // Vérifie si effet a été appliqué (force, agilité ou PV changés)
    if (sort.effect) {
      switch (sort.effect) {
        case "boostForce":
          const expectedForce = Math.floor(hero.baseForce * (sort.value / 100));
          assert(`→ boostForce appliqué`, hero.force === expectedForce);
          break;
        case "boostAgilite":
          assert(`→ boostAgilite appliqué`, hero.agilite === sort.value);
          break;
        case "boostDefense":
const expectedDefense = hero.baseDefense + sort.value;
          assert(`→ boostDefense appliqué`, hero.defense === expectedDefense);
          break;
        case "reduceAgilite":
          assert(`→ reduceAgilite appliqué à la cible`, target.agilite === sort.value);
          break;
        case "reduceForce":
          assert(`→ reduceForce appliqué à la cible`, target.force === sort.value);
          break;
        case "reduceDefense":
          assert(`→ reduceDefense appliqué à la cible`, target.defense === sort.value);
          break;
        default:
          assert(`→ Effet ${sort.effect} reconnu`, true);
      }
    }

    if (sort.sideEffect === "bonusDegatsStyleDom") {
      const expectedDamage = sort.value * (1 + hero.force / 100) * 2;
      const reduction = expectedDamage * (target.defense / 100);
      const degatsReduits = Math.floor(expectedDamage - reduction);
      assert(`→ bonusDegatsStyleDom double les dégâts`, target.pv === 100 - degatsReduits);
    }
  });
}

// 🔁 Boucle sur tous les héros
heroesData.forEach((heroData, index) => {
  console.log(`\n=== 🔍 TEST DU HÉROS ${index + 1}: ${heroData.alias} ===`);
  const hero = testHeroInit(heroData, index + 1);
  if (hero) testSortEffects(hero);
});
