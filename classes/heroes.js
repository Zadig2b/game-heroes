// heroes.js

export class Hero {
    constructor(nom, alias, apparence, pouvoirs, personnalite, origine) {
      this.nom = nom;
      this.alias = alias;
      this.apparence = apparence;
      this.pouvoirs = pouvoirs;
      this.personnalite = personnalite;
      this.origine = origine;
      this.life = 100;
    }
  
    presentation() {
      return `Je suis ${this.alias}, aussi connu sous le nom de ${this.nom}.`;
    }
  
    utiliserPouvoir(nomPouvoir) {
      return this.pouvoirs[nomPouvoir]
        ? `Pouvoir activé : ${this.pouvoirs[nomPouvoir]}`
        : `Pouvoir "${nomPouvoir}" inconnu pour ce héros.`;
    }

    frapper(cible) {
      cible.life -= this.force;
      console.log(`${this.alias} frappe ${cible.alias}`);
    }
    
  }
  