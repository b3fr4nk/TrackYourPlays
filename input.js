const teamList = {}
const main = document.getElementById("main")

//template for player object
function Player(name){
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

function compareStats(player, stat){
    let delta = 0

    const stat1 = player[stat]
    const stat2 = player["next"][stat]

    if(stat1 > stat2){
        delta = -(stat1/stat2)
    }

    else{
        delta = stat1/stat2
    }

    console.log(stat1)
    console.log(stat2)
    
    const statChange = document.createElement("p")
    statChange.setAttribute("class", "statChange")
    statChange.setAttribute("id", `${stat1}/${stat2}-change`)

    statChange.innerHTML = delta

    return statChange
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
function renderStats(name, stats = ["goals", "shots", "time", "game"], nameID = name){

    const statsElem = document.createElement("section")
    statsElem.setAttribute("class", "stats")
    statsElem.setAttribute("id", `${nameID}-stats-${teamList[nameID]}`)


    for (let j = 0; j < stats.length; j++) {

        const statIn = document.createElement("input")
        statIn.setAttribute("type", "number")
        statIn.setAttribute("value", teamList[nameID][stats[j]])
        statIn.setAttribute("id", `${stats[j]}`)

        statIn.addEventListener("input", function (){

            updateStat(nameID, statIn.id, Number(statIn.value))
            
            statChange = compareStats(teamList[name], stats[j])
            
            console.log(teamList[nameID])

            statsElem.appendChild(statChange)
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
    const addGameButtonTemp = new addGameButton()
    addGameButtonTemp["button"].addEventListener("click", function () {
        // teamList[name]["game"]++
        // for (let i in teamList[name]) {
        //     if (i != "name") {
        //         if(i.includes("2")){
        //             break
        //         }
        //         addStat(`${i}${teamList[name]["game"]}`, name)
        //         stats.push(i)
        //     }
        // }
        newGame = Object.assign({}, teamList[name])
        newGame["game"]++
        newGame["name"] = `${name}${newGame["game"]}`
        
        addToTeam(newGame)
        teamList[name]["next"] = newGame

        stats = []

        for (let i in newGame) {
            if (i != "name") {
                stats.push(i)
            }
        }

        console.log(teamList)

        const rendered = renderStats(name, stats, newGame["name"])
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
