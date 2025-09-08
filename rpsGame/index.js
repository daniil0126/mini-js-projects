const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')

const GameButtons = ['rock', 'paper', 'scissors']

let wins = document.getElementById('winColumn')
let loses = document.getElementById('loseColumn')
let draws = document.getElementById('drawColumn')

let score = {
    winColumn: 0,
    loseColumn: 0,
    drawColumn: 0
}

function game(playerChoice) {
    let winCounter, loseCounter, drawCounter = 0

    let player = document.getElementById('playersChoice')
    let machine = document.getElementById('machinesChoice')

    let machinesChoice = GameButtons[Math.floor(Math.random() * 3)]

    wins.innerHTML = winCounter
    loses.innerText = loseCounter
    draws.innerText = drawCounter

    player.innerText = "You: " + playerChoice
    machine.innerText = "Machine: " + machinesChoice

    let result = document.getElementById('result')
    if (playerChoice === machinesChoice) {
        score.drawColumn++
        result.innerText = "Draw"
        result.hidden = false
        setTimeout(() => {
            result.hidden = true
        }, 1000);
    }
    else if (
        (playerChoice === 'rock' && machinesChoice === 'scissors') ||
        (playerChoice === 'scissors' && machinesChoice === 'paper') ||
        (playerChoice === 'paper' && machinesChoice === 'rock')
    ) {
        score.winColumn++
        result.innerText = "Win"
        result.hidden = false
        setTimeout(() => {
            result.hidden = true
        }, 1000);
    }
    else {
        score.loseColumn++
        result.innerText = "Lose"
        result.hidden = false
        setTimeout(() => {
            result.hidden = true
        }, 1000);
    }
    updateScoreTable()
}

function updateScoreTable() {
    for (let key in score) {
        document.getElementById(key).innerText = score[key]
    }
}

function reset(){
    score = {
        winColumn: 0,
        loseColumn: 0,
        drawColumn: 0
    }
    updateScoreTable()
}