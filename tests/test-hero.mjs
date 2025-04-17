import { Hero } from './../classes/heroes.js';

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ ${message}\n  Attendu: ${expected}, Reçu: ${actual}`);
  } else {
    console.log(`✅ ${message}`);
  }
}

function testLancerSortInfligeDegats() {
  const sorts = [{
    nom: "Coup Puissant",
    type: "attaque",
    cooldown: 1,
    description: "Inflige des dégâts.",
    value: 20
  }];

  const hero1 = new Hero("Jean", "Le Brave", "", {}, {}, "Forêt", {
    agilite: 0,
    force: 50,
    defense: 0
  }, sorts);

  const hero2 = new Hero("Marc", "Le Fourbe", "", {}, {}, "Montagne", {
    agilite: 0,
    force: 10,
    defense: 0
  }, sorts);

  const pvInitial = hero2.pv;
  const message = hero1.lancerSort("Coup Puissant", hero2);
  const pvApres = hero2.pv;

  console.log(message);
  assertEquals(pvApres < pvInitial, true, "Le sort inflige des dégâts");
}

function testLancerSortCooldown() {
  const sorts = [{
    nom: "Coup Puissant",
    type: "attaque",
    cooldown: 2,
    description: "Inflige des dégâts.",
    value: 20
  }];

  const hero1 = new Hero("Jean", "Le Brave", "", {}, {}, "Forêt", {
    agilite: 0,
    force: 10,
    defense: 0
  }, sorts);

  const hero2 = new Hero("Marc", "Le Fourbe", "", {}, {}, "Montagne", {
    agilite: 0,
    force: 10,
    defense: 0
  }, sorts);

  hero1.lancerSort("Coup Puissant", hero2);
  const message = hero1.lancerSort("Coup Puissant", hero2);

  assertEquals(message.includes("ne peut pas lancer"), true, "Le sort est en cooldown");
}

// Lancer tous les tests
testLancerSortInfligeDegats();
testLancerSortCooldown();
