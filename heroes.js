// heroes.js

export class Hero {
    constructor(nom, alias, apparence, pouvoirs, personnalite, origine) {
      this.nom = nom;
      this.alias = alias;
      this.apparence = apparence;
      this.pouvoirs = pouvoirs;
      this.personnalite = personnalite;
      this.origine = origine;
    }
  
    presentation() {
      return `Je suis ${this.alias}, aussi connu sous le nom de ${this.nom}.`;
    }
  
    utiliserPouvoir(nomPouvoir) {
      return this.pouvoirs[nomPouvoir]
        ? `Pouvoir activé : ${this.pouvoirs[nomPouvoir]}`
        : `Pouvoir "${nomPouvoir}" inconnu pour ce héros.`;
    }
  }
  