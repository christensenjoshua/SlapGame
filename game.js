// Creating a Fighter (Name, Health, Kick Damage, Punch Damage, Uppercut Damage, Hadouken Damage, Mobility, Image Source)
let opponent = {}
let opponents = {
    ken: new CreateFighter('Ken', 100, 20, 15, 30, 40, 35, 'https://vignette.wikia.nocookie.net/streetfighter/images/b/b4/Kenrender.png/revision/latest?cb=20170728171332'),
    ryu: new CreateFighter('Ryu', 100, 15, 10, 25, 60, 55, 'https://vignette.wikia.nocookie.net/streetfighter/images/4/46/Ryurender.png/revision/latest?cb=20170728171704')
}
let items = {
    shield: new CreateItem('Shield', 0.3, 'This is an awesome shield!', 'http://www.thinkgeek.com/images/products/zoom/kgii_loz_hylian_shield_backpack.jpg'),
    helmet: new CreateItem('Helmet', 0.1, 'A pretty sad-looking helmet', 'https://i.pinimg.com/236x/e2/85/29/e285292b51ca023900848faccbb7721a--novi-sad-il-tempo.jpg'),
    bodyArmor: new CreateItem('Body Armor', 0.7, 'A heavy suit of armor', 'http://www.darkknightarmoury.com/images/Product/medium/ED6223.png')
}
function slap(reduction) {
    let modifiers = addMods()
    console.log(modifiers + ' for modifiers')
    console.log(opponent.health + ' early health')
    console.log(opponent)
    opponent.health -= Math.round(reduction * modifiers)
    opponent.hits++
    console.log('opponents health is ' + opponent.health)
    if (opponent.health < 0) {
        console.log('opponents health was ' + opponent.health + ' setting to 0')
        opponent.health = 0
    }
    update()
    if (opponent.health == 0) {
        updateWin()
    }
}
function update() {
    document.getElementById('health').innerText = opponent.health
    // document.getElementById('healthbar').aria.valuenow = opponent.health
    let healthbar = `
    <div class="progress-bar" id="progresshealth" role="progressbar" aria-valuenow="${opponent.health}" aria-valuemin="0" aria-valuemax="100" style="width:${opponent.health}%;"></div>
    `
    document.getElementById('healthbar').innerHTML = healthbar
    document.getElementById('hits').innerText = opponent.hits
}
function updateWin() {
    alert('You won!!')
    reInitialize()
}
function CreateFighter(name, health, kick, punch, uppercut, hadouken, mobility, image) {
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
function CreateItem(name, modifier, description, image) {
    this.name = name
    this.modifier = modifier
    this.description = description
    this.image = image
}
function addMods() {
    let mods = 1
    for (let i = 0; i < opponent.items.length; i++) {
        const element = opponent.items[i];
        mods -= element.modifier
    }
    if (mods < 0.1) {
        mods = 0.1
    }
    return mods
}
function chooseOpponent(name) {
    opponent = JSON.parse(JSON.stringify(opponents[name]))
    document.getElementById('name').innerText = opponent.name
    document.getElementById('opponentChoice').style.display = 'none'
    document.getElementById('opponentPicture').src = opponent.image
    document.getElementById('opponentPicture').style.display = 'inline'
    document.getElementById('fightingOptions').style.display = 'block'
    document.getElementById('opponentStats').style.display = 'block'
    document.getElementById('items').style.display = 'block'
    update()
}
function giveItem(item) {
    if (opponent.items.length < 3) {
        opponent.items.push(items[item])
        let itemList = ''
        for (let i = 0; i < opponent.items.length; i++) {
            const element = opponent.items[i];
            itemList += '<img src="'+element.image+'" width="50px" data-toggle="tooltip" data-placement"bottom" title="'+element.name+': '+element.description+'\nDefensive Modifier: '+element.modifer+'" alt="'+element.description+'" />'
        }
        document.getElementById('opponentItems').innerHTML = itemList
    }
}
function reInitialize() {
    opponent = {}
    document.getElementById('name').innerText = 'Choose Your Opponent!'
    document.getElementById('opponentChoice').style.display = 'block'
    document.getElementById('opponentPicture').style.display = 'none'
    document.getElementById('fightingOptions').style.display = 'none'
    document.getElementById('opponentStats').style.display = 'none'
    document.getElementById('opponentItems').innerHTML = '--'
    document.getElementById('items').style.display = 'none'
}