export class Sort {
  constructor(nom, type, cooldown, description, value = 0, effect = null, sideEffect = null, duration = 2, altdesc) {
    this.nom = nom;
    this.type = type;
    this.cooldown = cooldown;
    this.cooldownRestant = 0;
    this.description = description;
    this.value = value;
    this.effect = effect;
    this.sideEffect = sideEffect;
    this.duration = duration;
    this.altdesc = altdesc
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