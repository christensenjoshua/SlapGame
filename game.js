let health = 100
let name ="Evildoer"
let hits = 0
function initialize(){
    document.getElementById('name').innerText = name
    update()
}
function slap(reduction){
    health -= reduction
    hits ++
    update()
}
function update(){
    document.getElementById('health').innerText = health
    document.getElementById('hits').innerText = hits
}
initialize()