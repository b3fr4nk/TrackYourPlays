const teamList = {}
const main = document.getElementById("main")

//template for player object
function player(name){
    this.name = name

    this.goals = 0
    this.shots = 0
    this.time = 0
    this.game = 1
}

//template for addGameButton and Label
function addGameButton(playerName) {
    this.button = document.createElement("input")
    this.button.setAttribute("id", `${playerName}-add-game`)
    this.button.setAttribute("type", "button")

    this.label = document.createElement("label")
    this.label.setAttribute("for", `${playerName}-add-game`)
    this.label.innerHTML = "Add Game"
}

//template for addStatButton and Label
function addStatButton(playerName){
    this.button = document.createElement("input")
    this.button.setAttribute("id", `${playerName}-add-stat`)
    this.button.setAttribute("type", "button")

    this.label = document.createElement("label")
    this.label.setAttribute("for", `${playerName}-add-stat`)
    this.label.innerHTML = "Add Stat"
}

function addStat(statName, playerName){
    teamList[playerName][statName] = 0
}

function updateStat(playername, statName, newValue){
    teamList[playername][statName] = newValue
}

function getGameNum(playerName){
    return teamList[playerName]["game"]
}

//creates a input field for name of new stat
function askForStat(playerName){
    const statNameQuery = document.createElement("input")
    statNameQuery.setAttribute("type", "text")

    popupArea.appendChild(statNameQuery)

    statNameQuery.addEventListener("keypress", function (e) {
        if(e.key == "Enter"){
            addStat(statNameQuery.value, playerName)
            statNameQuery.remove()
        }
    })
}

//adds a new player to the team and adds them to the page
function addToTeam(player){
    teamList[player["name"]] = player

    render(main, renderPlayer(player["name"]))
}

//creates an input field for the name of new player
function askForPlayer() {
    const playerNameQuery = document.createElement("input")
    playerNameQuery.setAttribute("type", "text")

    popupArea.appendChild(playerNameQuery)

    playerNameQuery.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            addToTeam(new player(playerNameQuery.value))
            popupArea.removeChild(playerNameQuery)
        }
    })
}

const popupArea = document.getElementById("popup")

const addPlayerButton = document.getElementById("add-player")

const addStatButtons = []

addPlayerButton.addEventListener("click", () => {
    askForPlayer()
})

//creates html element for specified player and their stats
function renderStats(name, stats = ["goals", "shots", "time", "game"]){

    const statsElem = document.createElement("section")
    statsElem.setAttribute("class", "stats")
    statsElem.setAttribute("id", `${name}-stats}`)


    for (let j = 0; j < stats.length; j++) {

        const stat = document.createElement("input")
        stat.setAttribute("type", "number")
        stat.setAttribute("value", teamList[name][stats[j]])
        stat.setAttribute("id", `${name}-${stats[j]}`)

        stat.addEventListener("input", function (){
            updateStat(name, Number(stats[j]), stat.value)
            console.log(teamList[name])
        })
        // stat.setAttribute("class", teamList[i].key(j))

        const statLabel = document.createElement("label")
        statLabel.setAttribute("for", `${name}-${stats[j]}`)
        statLabel.innerHTML = `${stats[j]}`

        statsElem.appendChild(statLabel)
        statsElem.appendChild(stat)
    }

    return statsElem

}

//creates an html element for specified player and standard stats for player
function renderPlayer(name){
    console.log(teamList[name])

    const player = document.createElement("section")
    player.setAttribute("id", `${name}`)
    player.setAttribute("class", "player")

    const heading = document.createElement("h2")
    heading.innerHTML = name

    player.appendChild(heading)

    // adds add stat button and label to each player
    const addStatButtonTemp = new addStatButton(name)
    addStatButtonTemp["button"].addEventListener("click", function () {
        askForStat(name)
    })

    //adds add game button and label to each player
    const addGameButtonTemp = new addGameButton(name)
    addGameButtonTemp["button"].addEventListener("click", function () {
        stats = []
        teamList[name]["game"]++
        for (let i in teamList[name]) {
            if (i != "name") {
                if(i.includes("2")){
                    break
                }
                addStat(`${i} ${getGameNum(name)}`, name)
                stats.push(i)
            }
        }


        const rendered = renderStats(name, stats)
        render(player, rendered)
    })

    player.appendChild(addStatButtonTemp["label"])
    player.appendChild(addStatButtonTemp["button"])

    player.appendChild(addGameButtonTemp["label"])
    player.appendChild(addGameButtonTemp["button"])

    render(player, renderStats(name))

    

    return player
}

//adds an element as a child of parentElem
function render(parentElem, elem){
    parentElem.appendChild(elem)
}
