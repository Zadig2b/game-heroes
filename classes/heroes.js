import { Sort } from './sort.js';

export class Hero {
  constructor(nom, alias, apparence, personnalite, origine, stats, sorts) {
    this.nom = nom;
    this.alias = alias;
    this.apparence = apparence;
    this.personnalite = personnalite;
    this.origine = origine;

    this.agilite = stats.agilite;
    this.force = stats.force;
    this.defense = stats.defense;
    this.pv = 100;
    this.bouclier = 0;

    this.baseAgilite = stats.agilite;
    this.baseForce = stats.force;
    this.baseDefense = stats.defense;

    this.buffs = []; // liste des buffs et debuffs actifs avec durée
    this.sorts = sorts.map(s => new Sort(s.nom, s.type, s.cooldown, s.description, s.value, s.effect, s.sideEffect, s.duration, s.altdesc));
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

    let duration = sort.duration || 2;
    let effet = '';
    switch (sort.type) {
      case 'attaque': {
        const esquive = Math.random() * 100 < cible.agilite;
        if (esquive) {
          effet += `${cible.alias} esquive l'attaque avec son agilité (${cible.agilite}) !`;
          break;
        }

        let degats = sort.value * (1 + this.force / 100);

        if (sort.sideEffect === 'bonusDegatsStyleDom' && cible.agilite === 0) {
          degats *= 2;
          effet += `(bonus: cible affectée par styleDom)\n`;
        }

        const reduction = degats * (cible.defense / 100);
        const degatsReduits = degats - reduction;

        cible.appliquerDegats(Math.floor(degatsReduits));
        effet += `${this.alias} inflige ${Math.floor(degatsReduits)} dégâts à ${cible.alias} (réduction: ${Math.floor(reduction)}).`;
        break;
      }
      case 'bouclier': {
        this.pv += sort.value;
        effet = `${this.alias} génère un bouclier de ${sort.value}.`;
        break;
      }
      case 'bonus': {
        switch (sort.effect) {
          case 'boostAgilite':
            this.buffs.push({ stat: 'agilite', value: this.agilite, duration });
            this.agilite = sort.value;
            effet = `${this.alias} augmente son agilité à ${sort.value} pour ${duration} tours.`;
            break;
          case 'boostForce': {
            this.buffs.push({ stat: 'force', value: this.force, duration });
            const nouvelleForce = Math.floor(this.force * (sort.value / 100));
            this.force = nouvelleForce;
            effet = `${this.alias} multiplie sa force à ${nouvelleForce} (${sort.value}%) pour ${duration} tours.`;
            break;
          }
          case 'boostDefense': {
            this.buffs.push({ stat: 'defense', value: this.defense, duration });
            const nouvelleDefense = this.baseDefense + sort.value;
            this.defense = nouvelleDefense;
            effet = `${this.alias} augmente sa défense à ${nouvelleDefense} (+${sort.value}) pour ${duration} tours.`;
            break;
          }
          default:
            effet = `${this.alias} se renforce.`;
        }
        break;
      }
      case 'malus': {
        switch (sort.effect) {
          case 'reduceAgilite':
            cible.buffs.push({ stat: 'agilite', value: cible.agilite, duration });
            const newAgility= Math.floor(cible.agilite * (sort.value / 100));
            cible.agilite = newAgility;
            effet = `${cible.alias} voit son agilité réduite à ${newAgility} pour ${duration} tours.`;
            break;
          case 'reduceForce':
            cible.buffs.push({ stat: 'force', value: cible.force, duration });
            cible.force = sort.value;
            effet = `${cible.alias} voit sa force réduite à ${sort.value} pour ${duration} tours.`;
            break;
          case 'reduceDefense':
            cible.buffs.push({ stat: 'defense', value: cible.defense, duration });
            cible.defense = sort.value;
            effet = `${cible.alias} voit sa défense réduite à ${sort.value} pour ${duration} tours.`;
            break;
          default:
            effet = `${cible.alias} subit un malus.`;
        }
        break;
      }
      default:
        effet = `${this.alias} tente un sort inconnu...`;
        break;
    }

    return `${this.alias} lance ${sort.nom} : ${effet}`;
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
    this.buffs = this.buffs.filter(buff => {
      buff.duration--;
      if (1 + buff.duration <= 0) {
        switch (buff.stat) {
          case 'force':
            this.force = this.baseForce;
            break;
          case 'agilite':
            this.agilite = this.baseAgilite;
            break;
          case 'defense':
            this.defense = this.baseDefense;
            break;
        }
        return false;
      }
      return true;
    });
  }
  
}
