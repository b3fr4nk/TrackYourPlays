const teamList = {}
const main = document.getElementById("main")

function player(name){
    this.name = name

    this.goals = 0
    this.shots = 0
    this.time = 0
}

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

function addToTeam(player){
    teamList[player["name"]] = player

    render(main, renderPlayer(player["name"]))
}

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

function renderStats(name, stats = ["goals", "shots", "time"]){

    const statsElem = document.createElement("section")
    statsElem.setAttribute("class", "stats")
    statsElem.setAttribute("id", `${name}-stats}`)


    for (let j = 0; j < stats.length; j++) {
        if (j != "name") {

            const stat = document.createElement("input")
            stat.setAttribute("type", "number")
            stat.setAttribute("value", teamList[name][stats[j]])
            stat.setAttribute("id", `${teamList[name]}-${teamList[name][stats[j]]}`)
            // stat.setAttribute("class", teamList[i].key(j))

            const statLabel = document.createElement("label")
            statLabel.setAttribute("for", `${teamList[name]}-${teamList[name][stats[j]]}`)
            statLabel.innerHTML = `${stats[j]}`

            statsElem.appendChild(statLabel)
            statsElem.appendChild(stat)
        }
        else {
            continue
        }
    }

    return statsElem

}

//displays all players and stats for each player
function renderPlayer(name){
    console.log(teamList[name])

    const player = document.createElement("section")
    player.setAttribute("id", teamList[name]["name"])
    player.setAttribute("class", "player")

    const heading = document.createElement("h2")
    heading.innerHTML = teamList[name]["name"]

    player.appendChild(heading)

    render(player, renderStats(name))
    // adds add stat button and label to each player
    const addStatButtonTemp = new addStatButton(teamList[name]["name"])
    addStatButtonTemp["button"].addEventListener("click", function () {
        askForStat(teamList[name]["name"])
    })

    player.appendChild(addStatButtonTemp["label"])
    player.appendChild(addStatButtonTemp["button"])

    return player
}

function render(parentElem, elem){
    parentElem.appendChild(elem)
}
