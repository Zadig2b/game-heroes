import { Sort } from './sort.js';

export class Hero {
  constructor(nom, alias, apparence, pouvoirs, personnalite, origine, stats, sorts) {
    this.nom = nom;
    this.alias = alias;
    this.apparence = apparence;
    this.pouvoirs = pouvoirs;
    this.personnalite = personnalite;
    this.origine = origine;

    this.agilite = stats.agilite;
    this.force = stats.force;
    this.defense = stats.defense;
    this.pv = 100;
    this.bouclier = 0;

    this.sorts = sorts.map(s => new Sort(s.nom, s.type, s.cooldown, s.description, s.value, s.sideEffect));
  }

  presentation() {
    return `Je suis ${this.alias}, aussi connu sous le nom de ${this.nom}.`;
  }

  lancerSort(nom, cible) {
    const sort = this.sorts.find(s => s.nom === nom);
    if (!sort || !sort.estDisponible()) {
      return `${this.alias} ne peut pas lancer ${nom} maintenant.`;
    }

    sort.resetCooldown();

    let effet = '';
    switch (sort.type) {
      case 'attaque':
        const baseDegats = sort.value;
        const degats = baseDegats * (1 + this.force / 100);
        cible.appliquerDegats(Math.floor(degats));
        effet = `${this.alias} inflige ${Math.floor(degats)} dégâts à ${cible.alias}.`;
        break;
      case 'bouclier':
        this.bouclier += sort.value;
        effet = `${this.alias} génère un bouclier de ${sort.value}.`;
        break;
      case 'malus':
        if (sort.sideEffect === 'zeroAgilite') cible.agilite = 0;
        effet = `${cible.alias} perd son agilité !`;
        break;
      case 'bonus':
        if (sort.sideEffect === 'boostAgilite') this.agilite = 100;
        effet = `${this.alias} devient ultra agile !`;
        break;
    }

    return `${this.alias} lance ${sort.nom} : ${sort.description}\n${effet}`;
  }

  appliquerDegats(degats) {
    let degatsRestants = degats - this.bouclier;
    this.bouclier = Math.max(0, this.bouclier - degats);
    if (degatsRestants > 0) {
      this.pv -= degatsRestants;
    }
  }

  reduireCooldowns() {
    this.sorts.forEach(s => s.reduireCooldown());
  }
}
