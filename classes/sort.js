export class Sort {
    constructor(nom, type, cooldown, description, value = 0, sideEffect = null) {
      this.nom = nom;
      this.type = type;
      this.cooldown = cooldown;
      this.cooldownRestant = 0;
      this.description = description;
      this.value = value;
      this.sideEffect = sideEffect;
    }
  
    estDisponible() {
      return this.cooldownRestant === 0;
    }
  
    reduireCooldown() {
      if (this.cooldownRestant > 0) this.cooldownRestant--;
    }
  
    resetCooldown() {
      this.cooldownRestant = this.cooldown;
    }
  }
  