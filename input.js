const teamList = {}
const main = document.getElementById("main")

//template for player object
function Player(name){
    this.name = name

    this.goals = 0
    this.shots = 0
    this.time = 0
    this.games = 1
}

//template for addGameButton and Label
function addGameButton(playerName) {
    this.button = document.createElement("button")
    this.button.setAttribute("id", `${playerName}-add-games`)
    this.button.setAttribute("type", "button")
    this.button.innerHTML = "Add Game"

    // this.label = document.createElement("label")
    // this.label.setAttribute("for", `${playerName}-add-games`)
    // this.label.innerHTML = "Add Game"
}

//template for addStatButton and Label
function addStatButton(playerName){
    this.button = document.createElement("button")
    this.button.setAttribute("id", `${playerName}-add-stat`)
    this.button.setAttribute("type", "button")
    this.button.innerHTML = "Add Stat"
}

function addStat(statName, playerName){
    teamList[playerName][statName] = 0
}

function updateStat(playername, statName, newValue){
    teamList[playername][statName] = newValue

    console.log(teamList[playername])
}

//compare stats between two games and return new stat change elem or update previous element
function compareStats(player, stat){
    let delta = 0

    const playerName = player["name"]

    const stat1 = player[stat]
    const stat2 = player["next"][stat]

    delta = stat2/stat1

    delta *= 100
    delta -= 100

    delta = Math.round(delta)

    //check if there is already a stat change element for stat if not create a new one
    if (typeof teamList[playerName]["statChange"] !== "undefined" && teamList[playerName]["statChange"].id === `${stat}-change`){
        teamList[playerName]["statChange"].innerHTML = `${stat}: ${delta}%`

        if(delta > 0){
            teamList[playerName]["statChange"].style.color = "#0f0"
        }
        else{
            teamList[playerName]["statChange"].style.color = "#f00"

        }

        return null
    }
        
    else{

        const statChange = document.createElement("p")
        statChange.setAttribute("class", "statChange-value")
        statChange.setAttribute("id", `${stat}-change`)

        statChange.innerHTML = `${stat}: ${delta}%`

        teamList[playerName]["statChange"] = statChange

        return statChange

    }
    
    
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
}

//creates an input field for the name of new player
function askForPlayer() {
    const playerNameQuery = document.createElement("input")
    playerNameQuery.setAttribute("type", "text")

    popupArea.appendChild(playerNameQuery)

    playerNameQuery.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            addToTeam(new Player(playerNameQuery.value))
            render(main, renderPlayer(playerNameQuery.value))
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
function renderStats(name, stats = ["goals", "shots", "time", "games"], nameID = name){

    const statsElem = document.createElement("section")
    statsElem.setAttribute("class", "stats")
    statsElem.setAttribute("id", `${nameID}-stats`)


    for (let j = 0; j < stats.length; j++) {

        const statIn = document.createElement("input")
        statIn.setAttribute("type", "number")
        statIn.setAttribute("value", teamList[nameID][stats[j]])
        statIn.setAttribute("id", `${stats[j]}`)

        statIn.addEventListener("input", function (){

            updateStat(nameID, statIn.id, Number(statIn.value))

            if(nameID !== name){
                statChange = compareStats(teamList[name], stats[j])
                if (statChange != null) {
                    const gameStats = document.getElementById(`${nameID}-statChange`)
                    gameStats.appendChild(statChange)
                }
            }
            
        })
        // stat.setAttribute("class", teamList[i].key(j))

        const statLabel = document.createElement("label")
        statLabel.setAttribute("for", `${nameID}-${stats[j]}`)
        statLabel.innerHTML = `${stats[j]}`

        statsElem.appendChild(statLabel)
        statsElem.appendChild(statIn)
    }

    return statsElem

}

//creates an html element for specified player and standard stats for player
function renderPlayer(name){

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

    //adds add games button and label to each player
    const addGameButtonTemp = new addGameButton(name)
    addGameButtonTemp["button"].addEventListener("click", function () {

        teamList[name]["games"]++

        newGame = Object.assign({}, teamList[name])
        newGame["name"] = `${name}${newGame["games"]}`
        
        addToTeam(newGame)
        teamList[name]["next"] = newGame

        stats = []

        for (let i in newGame) {
            if (i != "name" && i != "statChange" && i != "next") {
                stats.push(i)
            }
        }

        const rendered = renderStats(name, stats, newGame["name"])
        const statChangeDiv = document.createElement("section")
        statChangeDiv.setAttribute("id", `${newGame["name"]}-statChange`)
        statChangeDiv.setAttribute("class", "statChange")
        render(player, rendered)
        render(player, statChangeDiv)
    })

    player.appendChild(addStatButtonTemp["button"])

    player.appendChild(addGameButtonTemp["button"])

    render(player, renderStats(name))

    return player
}

//adds an element as a child of parentElem
function render(parentElem, elem){
    parentElem.appendChild(elem)
}
