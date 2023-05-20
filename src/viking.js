// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength
  }

  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength)
    this.name = name
  }

  receiveDamage(damage) {
    this.health -= damage;

    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }

  battleCry() {
    return "Odin Owns You All!";
  }

}

// Saxon
class Saxon extends Soldier {
  constructor(health, strength) {
    super(health, strength);
  }

  receiveDamage(damage) {
    this.health -= damage;

    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return "A Saxon has died in combat";
    }
  }
}

// War
class War {
  constructor(vikingArmy = [], saxonArmy = []) {
    this.vikingArmy = vikingArmy;
    this.saxonArmy = saxonArmy;
  }

  addViking(viking) {
    this.vikingArmy.push(viking)
  }

  addSaxon(saxon) {
    this.saxonArmy.push(saxon)
  }

  vikingAttack() {
    // Getting random saxon from the saxon army
    const randomSaxon = this.getRandomSaxon();

    // Getting random viking 
    const randomViking = this.getRandomViking();

    //viking's strength
    const vikingStrength = randomViking.attack();
    const oldHealth = randomSaxon.health

    // reducing saxon's health with viking's strength
    const attackResult = randomSaxon.receiveDamage(vikingStrength);

    if (this.isSaxonDead(randomSaxon)) {
      this.removeSaxon(randomSaxon)
    }
  
    return attackResult;
  }


  saxonAttack() {
    // Getting random saxon from the saxon army
    const randomSaxon = this.getRandomSaxon();

    // Getting random viking 
    const randomViking = this.getRandomViking();

    //viking's strength
    const saxonStrength = randomSaxon.attack();

    // reducing saxon's health with viking's strength
    const attackResult = randomViking.receiveDamage(saxonStrength);

    if (this.isVikingDead(randomViking)) {
      this.removeViking(randomViking)
    }

    return attackResult;
  }

  showStatus(){
    if(!this.saxonArmy.length){
      return "Vikings have won the war of the century!"
    }else if(!this.vikingArmy.length){
      return "Saxons have fought for their lives and survived another day..."
    }else{
      return "Vikings and Saxons are still in the thick of battle."
    }
  }


  getRandomSaxon() {
    const randomIndex = Math.floor(Math.random() * this.saxonArmy.length)
    return this.saxonArmy[randomIndex]
  }

  getRandomViking() {
    const randomIndex = Math.floor(Math.random() * this.vikingArmy.length)
    return this.vikingArmy[randomIndex]
  }

  isSaxonDead(saxon) {
    return saxon.health <= 0;
  }

  isVikingDead(viking) {
    return viking.health <= 0
  }

  removeSaxon(saxon) {
    const saxonIndex = this.saxonArmy.indexOf(saxon);
    this.saxonArmy.splice(saxonIndex, 1)
  }


  removeViking(viking) {
    const vikingIndex = this.vikingArmy.indexOf(viking);
    this.vikingArmy.splice(vikingIndex, 1)
  }
}
