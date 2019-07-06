// Write your JS here
const hero = {
  name: '',
  heroic: true,
  inventory: [],
  health: 10,
  weapon: {
    type: '',
    damage: 2
  }
}

const enemyMiya = {
  name: 'Miya',
  heroic: true,
  inventory: [],
  health: 10,
  weapon: {
    type: 'Arrow',
    damage: 2
  }
}

const enemyBoss = {
  name: 'Pharsa',
  heroic: true,
  inventory: [],
  health: 10,
  weapon: {
    type: 'Dark Magic',
    damage: 4
  }
}

const dagger = {
  type: 'dagger',
  damage: 2
}

const sword = {
  type: 'sword',
  damage: 3
}

let fightBoss = false

function rest(creature) {
  //restore health to 10
  if (creature.health < 10) {
    creature.health = 10
  }
  if (creature.health === 10) {
    alert('Restored health to 10')
  }
  const heroHealth = document.getElementById('heroHealth')
  heroHealth.classList.remove('color-red')
  displayStats()
  
  return creature
}

function pickUpItem(creature, item) {
  // to pick up weapon/item to inventory
  creature.inventory.push(item)
  // hide pickup item
  if (Object.keys(item).length > 0) {
    const hideItem = document.getElementById(item.type)
    hideItem.classList.add('hidden')
  }
}

function equipWeapon(creature) {
  //to change/equip weapon from inventory
  if (creature.inventory.length === 0) {
    return null
  }
  creature.weapon = creature.inventory[0]
  displayStats()
}

function startGame(){
  // get player's name
  const playersName = document.getElementById('playersName')
  hero.name = playersName.value
  // name validation 
  if (!hero.name) {
    return null
  }
  // start the game/ hide form
  const startForm = document.getElementById('startForm')
  startForm.classList.add('hidden')
  // show items
  const gameItem = document.getElementById('gameItem')
  gameItem.classList.remove('hidden')
  // show dagger
  const daggerImage = document.getElementById('dagger')
  daggerImage.classList.remove('hidden')
  displayStats(enemyMiya)
}

function displayStats(enemy) {
  // displaying hero name
  const heroName = document.getElementById('heroName')
  heroName.innerHTML = hero.name
  // displaying hero health
  const heroHealth = document.getElementById('heroHealth')
  heroHealth.innerHTML = hero.health
  // displaying hero damage
  const heroDamage = document.getElementById('heroDamage')
  heroDamage.innerHTML = hero.weapon.damage
  // displaying hero weapon damage
  const heroWeapon = document.getElementById('heroWeapon')
  heroWeapon.innerHTML = hero.weapon.type

  if (enemy) {
    // enemy stats
    const enemyName = document.getElementById('enemyName')
    enemyName.innerHTML = enemy.name
    
    const enemyHealth = document.getElementById('enemyHealth')
    enemyHealth.innerHTML = enemy.health
    
    const enemyDamage = document.getElementById('enemyDamage')
    enemyDamage.innerHTML = enemy.weapon.damage
    
    const enemyWeapon = document.getElementById('enemyWeapon')
    enemyWeapon.innerHTML = enemy.weapon.type
  }
  
}

function fightEnemy(enemy) {
  // first to attack hero

  // enemy health will decrease 
  enemy.health = enemy.health - hero.weapon.damage

  // enemy low health 
  if (enemy.health <= 5) {
    const enemyHealth = document.getElementById('enemyHealth')
    enemyHealth.classList.add('color-red')
  }

  // check enemy health
  if (enemy.health <= 0) {
    // enemy died/remove
    const enemyImage = document.getElementById(enemy.name)
    enemyImage.classList.add('hidden')
    displayStats(enemy)

    // load second enemy
    if (!fightBoss) {
      loadEnemyBoss()
    } else { 
      displayStats(enemy)

      if(confirm('You Defeat the Enemies! Play Again?')){
        window.location.reload();  
      }
    }
    return null
  }
  
  // then enemy attack

  // hero health will decrease
  hero.health = hero.health - enemy.weapon.damage
  
  // hero low health 
  if (hero.health <= 5) {
    const heroHealth = document.getElementById('heroHealth')
    heroHealth.classList.add('color-red')
  }
  if (hero.health <= 0) {
    displayStats(enemy)
    if(confirm('You Lose! Reset game?')){
      window.location.reload();  
    }
  }
  displayStats(enemy)
}

function loadEnemyBoss() {
  displayStats(enemyBoss)

  const enemyHealth = document.getElementById('enemyHealth')
  enemyHealth.classList.remove('color-red')

  const enemyPharsa = document.getElementById('Pharsa')
  enemyPharsa.classList.remove('hidden')

  const showSword = document.getElementById('sword')
  showSword.classList.remove('hidden')
  
  fightBoss = true
}

document.getElementById('bg').loop = true;