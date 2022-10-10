const teamList = []
const main = document.getElementById("main")

function player(name){
    this.name = name
}

function addStat(statName, playerIndex){
    teamList[playerIndex][1][statName] = 0
    render()
}

function askForStat(){
    const statNameQuery = document.createElement("input")
    statNameQuery.setAttribute("type", "text")

    popupArea.appendChild(statNameQuery)

    statNameQuery.addEventListener("keypress", function (e) {
        if(e.key == "Enter"){
            addStat(statNameQuery.innerHTML)
            statNameQuery.remove()
        }
    })
}

function addToTeam(player){
    teamList.push(player)
    render()
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
// const addStatButton = document.getElementById("add-stat")

addPlayerButton.addEventListener("click", () => {
    askForPlayer()
})

// addStatButton.addEventListener("click", () => {
//     askForStat()
// })

function render(){
    for (let i = 0; i < teamList.length; i++) {
        console.log(teamList[i])

        const player = document.createElement("section")
        player.setAttribute("class", "player")

        const heading = document.createElement("h2")
        heading.innerHTML = teamList[i]["name"]

        player.appendChild(heading)

        for (let j in teamList[i]) {
            if (j != "name") {
                const stat = document.createElement("input")
                stat.setAttribute("type", "number")
                stat.setAttribute("value", teamList[i][j])

                player.appendChild(stat)
            }
            else {
                continue
            }
        }
        main.appendChild(player)
    }
}
