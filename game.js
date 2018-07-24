// Creating a Fighter (Name, Health, Kick Damage, Punch Damage, Uppercut Damage, Hadouken Damage, Mobility, Image Source)
let opponent = {}
let opponents = {
    ken:new CreateFighter('Ken', 100, 20, 15, 30, 40, 35, 'https://vignette.wikia.nocookie.net/streetfighter/images/b/b4/Kenrender.png/revision/latest?cb=20170728171332'),
    ryu:new CreateFighter('Ryu', 100, 15, 10, 25, 60, 55, 'https://vignette.wikia.nocookie.net/streetfighter/images/4/46/Ryurender.png/revision/latest?cb=20170728171704')
}
let items = {
    shield:new CreateItem('Shield',0.3,'This is an awesome shield!'),
    helmet:new CreateItem('Helmet',0.1,'A pretty sad-looking helmet'),
    bodyArmor:new CreateItem('Body Armor',0.7,'A heavy suit of armor')
}
function slap(reduction){
    console.log(opponent)
    opponent.health -= reduction * addMods()
    opponent.hits ++
    update()
}
function update(){
    document.getElementById('name').innerText = opponent.name
    document.getElementById('health').innerText = opponent.health
    document.getElementById('hits').innerText = opponent.hits
}
function CreateFighter(name, health, kick, punch, uppercut, hadouken, mobility, image){
    this.name = name
    this.health = health
    this.attacks = {}
    this.attacks.kick = kick
    this.attacks.punch = punch
    this.attacks.uppercut = uppercut
    this.attacks.hadouken = hadouken
    this.mobility = mobility
    this.items = []
    this.hits = 0
    this.image = image
}
function CreateItem(name, modifier, description){
    this.name = name
    this.modifier = modifier
    this.description = description
}
function giveShield(){
    opponent.items.push(items['shield'])
}
function addMods(){
    let mods = 1
    for (let i = 0; i < opponent.items.length; i++) {
        const element = opponent.items[i];
        mods -= element
    }
    return mods
}
function chooseOpponent(name){
    opponent = opponents[name]
    document.getElementById('opponentChoice').style.display = 'none'
    document.getElementById('opponentPicture').src = opponent.image
    document.getElementById('opponentPicture').style.display = 'block'
    document.getElementById('fightingOptions').style.display = 'block'
    document.getElementById('opponentStats').style.display = 'block'
    update()
}