//DOM
const balanceCount = document.getElementById('balanceNum') //balance view
const depositInput = document.getElementById('deposit') //input for deposit top up
const depositBtn = document.getElementById('depoBtn') //button for top up
const depositError = document.getElementById('errorMsg') // error message for deposit actions
const limitMessage = document.getElementById('limitMsg') // message for waiting to top up
const first = document.getElementById('bananaIcon') // first slot
const second = document.getElementById('cherryIcon') // second slot
const third = document.getElementById('sevenIcon') // third slot
const betInput = document.getElementById('bet') // input for bet 
const betError = document.getElementById('betError') // error message for bet actions
const successMessage = document.getElementById('betValue') //success message for bet actions
const spinBtn = document.getElementById('spinBtn') // spin button

// auxiliary constants
const coolDownTime = 60 // cooldown time for deposit
const maxValue = 10000 // maximum top up value
const minValue = 100 // minimum top up value
const minBetValue = 100 // minimum bet value
const jackpotMultiplier = 5 // jackpot multiplier value

//array constants
const symbols = ['banana.png', 'cherry.png', 'seven.png'] // slot src icons
const slots = [first, second, third] // every slot array

// changing variables
let slotsValue = [] // after spinning result slots
let balance = 0 // balance changing value

// auxiliary functions
function showErrorMessage(messageText, errorType){ // error message showing function
    errorType.hidden = false
    errorType.innerText = messageText
}

function showSuccessMessage(messageText, succesType){ // success message showing function
    succesType.hidden = false
    successMessage.innerText = messageText
}

function buttonStateUpdate(btnType, disableState){ // button state changing function
    btnType.disabled = disableState
    if(disableState === true){
        btnType.style.backgroundColor = 'rgb(43, 43, 175)'
        btnType.style.cursor = 'not-allowed'
    }
    else {
        btnType.style.backgroundColor = 'rgb(54, 54, 215)'
        btnType.style.cursor = 'pointer'
    }
}

function updateBalanceData(balanceView, balance){ // balance view updating function
    balanceView.innerText = balance
}

function startMessageState(messageType){ // message state at start
    messageType.hidden = true
}

// main top up function
function deposit() { 
    let amount = Number(depositInput.value)
    startMessageState(depositError)
    startMessageState(limitMessage)
    depositBtn.disabled = false

    if (isNaN(amount) || amount <= 0) {
        showErrorMessage("Введите число", depositError)
        return
    } else if (amount < minValue) {
        showErrorMessage(`Минимальная сумма взноса ${minValue}`, depositError)
        return
    } else if (amount > maxValue) {
        showErrorMessage(`Максимальная сумма взноса ${maxValue}`, depositError)
        return
    }

    balance += amount
    updateBalanceData(balanceCount, balance)
    depositInput.value = ''

    buttonStateUpdate(depositBtn, true)

    let limit = coolDownTime
    let interval = setInterval(() => {
        limitMessage.hidden = false
        limitMessage.innerText =
            `До следующего пополнения осталось: ${limit} секунд`
        limit--

        if (limit < 0) {
            clearInterval(interval)
            limitMessage.hidden = true
            buttonStateUpdate(depositBtn, false)
        }
    }, 1000);
}

//main spin button function
function spin() {
    successMessage.style.color = 'rgb(0, 201, 0)'
    successMessage.hidden = true
    betError.hidden = true
    let bet = Number(betInput.value)

    if (isNaN(bet) || bet <= 0) {
        showErrorMessage("Введите ставку", betError)
        return
    }

    if (bet < minBetValue) {
        showErrorMessage(`Ставка не может быть меньше ${minBetValue}`, betError)
        return
    }

    if (balance < bet) {
        showErrorMessage("На балансе недостаточно средств", betError)
        return
    }

    balance -= bet
    updateBalanceData(balanceCount, balance)
    showSuccessMessage( `Ваша ставка: ${bet}`, successMessage)

    betInput.value = ''

    slotsValue = [] 
    for (let i = 0; i < slots.length; i++) {
        buttonStateUpdate(spinBtn, true)
        let interval = setInterval(() => {
            const randomItem = symbols[Math.floor(Math.random() * symbols.length)]
            slots[i].src = `./src/${randomItem}`
        }, 100);
        setTimeout(() => {
            clearInterval(interval)

            const fileName = slots[i].src.split('/').pop()
            slotsValue.push(fileName)

            if (i === 2) {
                buttonStateUpdate(spinBtn, false)
                isSpining = false
                const isEqual = slotsValue.every(slot => slot === slotsValue[0])
                if(isEqual){
                    bet *= jackpotMultiplier
                    balance += bet
                    updateBalanceData(balanceCount, balance)
                    showSuccessMessage(`Джекпот! Выигрыш составляет ${bet} денег. Баланс: ${balance}`, successMessage)
                }
                else {
                    successMessage.hidden = true
                    showErrorMessage("Проигрыш", betError)
                }
            }
        }, 3000 + i * 500);
    }
}

