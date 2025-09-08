const balanceCount = document.getElementById('balanceNum')
const depositInput = document.getElementById('deposit')
const depositBtn = document.getElementById('depoBtn')
const errorMessage = document.getElementById('errorMsg')
const limitMessage = document.getElementById('limitMsg')

const coolDownTime = 60
const maxValue = 10000
const minValue = 100

let balance = 0
let limit = coolDownTime
let interval

function deposit() {
    let amount = Number(depositInput.value)
    errorMessage.hidden = true
    limitMessage.hidden = true
    depositBtn.disabled = false

    if (isNaN(amount) || amount <= 0) {
        errorMessage.innerText = "Введите число"
        errorMessage.hidden = false
        return
    } else if (amount < minValue) {
        errorMessage.innerText = `Минимальная сумма взноса ${minValue}`
        errorMessage.hidden = false
        return
    } else if (amount > maxValue) {
        errorMessage.innerText = `Максимальная сумма взноса ${maxValue}`
        errorMessage.hidden = false
        return
    }

    balance += amount
    balanceCount.innerText = balance
    depositInput.value = ''

    depositBtn.disabled = true
    depositBtn.style.backgroundColor = 'rgb(43, 43, 175)'
    depositBtn.style.cursor = 'not-allowed'

    limit = coolDownTime
    interval = setInterval(() => {
        limitMessage.hidden = false
        limitMessage.innerText =
            `До следующего пополнения осталось: ${limit} секунд`
        limit--

        if (limit < 0) {
            clearInterval(interval)
            limitMessage.hidden = true
            depositBtn.disabled = false
            depositBtn.style.backgroundColor = 'rgb(54, 54, 215)'
            depositBtn.style.cursor = 'pointer'
        }
    }, 1000);
}

const first = document.getElementById('bananaIcon')
const second = document.getElementById('cherryIcon')
const third = document.getElementById('sevenIcon')

const symbols = ['banana.png', 'cherry.png', 'seven.png']
const slots = [first, second, third]

const minBetValue = 100
const betInput = document.getElementById('bet')

const betError = document.getElementById('betError')
const successMessage = document.getElementById('betValue')

const spinBtn = document.getElementById('spinBtn')

let slotsValue = []

function spin() {
    betError.hidden = true
    successMessage.style.color = 'rgb(0, 201, 0)'
    successMessage.hidden = true
    let bet = Number(betInput.value)

    if (isNaN(bet) || bet <= 0) {
        betError.hidden = false
        betError.innerText = "Введите ставку"
        return
    }

    if (bet < minBetValue) {
        betError.hidden = false
        betError.innerText = `Ставка не может быть меньше ${minBetValue}`
        return
    }

    if (balance < bet) {
        betError.hidden = false
        betError.innerText = `На балансе недостаточно средств`
        return
    }

    balance -= bet
    balanceCount.innerText = balance

    successMessage.hidden = false
    successMessage.innerText = `Ваша ставка: ${bet}`
    betInput.value = ''

    slotsValue = [] 
    for (let i = 0; i < slots.length; i++) {
        spinBtn.style.cursor = 'not-allowed'
        spinBtn.disabled = true
        let interval = setInterval(() => {
            const randomItem = symbols[Math.floor(Math.random() * symbols.length)]
            slots[i].src = `./src/${randomItem}`
        }, 100);
        setTimeout(() => {
            clearInterval(interval)

            const fileName = slots[i].src.split('/').pop()
            slotsValue.push(fileName)
            console.log(`добавлено в массив: ${fileName}`)

            if (i === 2) {
                spinBtn.style.cursor = 'pointer'
                spinBtn.disabled = false
                console.log("Остановлено"); 
                isSpining = false
                const isEqual = slotsValue.every(slot => slot === slotsValue[0])
                if(isEqual){
                    console.log("Джекпот");
                    bet *= 5
                    balance += bet
                    balanceCount.innerText = balance
                    successMessage.hidden = false
                    successMessage.innerText = `Джекпот! Выигрыш составляет ${bet} денег. Баланс: ${balance}`
                }
                else {
                    console.log("Проигрыш");
                    successMessage.hidden = false
                    successMessage.style.color = 'red'
                    successMessage.innerText = 'Проигрыш'
                }
            }
        }, 3000 + i * 500);
    }
}