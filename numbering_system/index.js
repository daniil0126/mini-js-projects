const btn = document.getElementById('openbtn')

btn.addEventListener('click', () => {
    const symbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
    while (true) {
        let choice = parseInt(
            prompt(
                "Выбери режим:\n1 - двоичная система\n2 - десятичная система\n3 - с любой на любую (диапазон: 2 - 64)\n4 - выход с программы"
            )
        )
        if (choice === 1) {
            let number = prompt("Введи число в двоичной системе: ")
            let result = 0
            for(let ch in number){
                if(ch != 0 && ch != 1){
                    alert("Ошибка: неверный формат")
                    break
                }
            }
            number = number.split("").reverse().join("")
            for (let i = 0; i < number.length; i++) {
                result += ((2 ** i) * parseInt(number[i]))
            }
            alert(`Ответ: ${result} (десятичная система)`)
        }
        else if (choice === 2) {
            let number = parseInt(prompt("Введи число в десятичной системе: "))
            let result = ""
            console.log(number % 2)
            while (number) {
                result += number % 2
                console.log(result)
                number /= 2
                number = Math.floor(number)
            }
            alert(`Ответ: ${result.split("").reverse().join("")} (двоичная система)`)
        }
        else if(choice === 3){
            let system1 = parseInt(prompt("Введи конвертируемую систему счисления (из которой будем конвертировать): "))
            let value = prompt("Введи значение для конвертации (В ТОЙ СИСТЕМЕ КОТОРУЮ ВЫБРАЛ): ")
            let system2 = parseInt(prompt("Введи конвертированную систему счисления (в которую будем конвертировать): "))
            if(system1 > 64 || system2 > 64){
                alert("Максимальная система счисления - 64")
                break
            }
            if(system1 < 2 || system2 < 2){
                alert("Недопустимое значение")
                break
            }
            if(!system1 || !system2){
                alert("Непредвиденная ошибка")
                break
            }
    
            const convertation = (sys1, sys2, value) => {
                let decimal = 0
                let index = value.length
                for(let i = 0; i < value.length; i++){
                    let digit = isNaN(parseInt(value[i])) ? symbols.indexOf(value[i]) : parseInt(value[i])
                    decimal += (digit * (sys1**(index-=1)))
                }
                let result = ""
                let integer
                while(integer != 0){
                    integer = Math.floor(decimal/sys2) 
                    decimal%=sys2
                    result += integer != 0 ? integer : symbols[decimal]
                }
                alert(result)
            }
            convertation(system1, system2, value)
        }
        else if(choice == 4) {
            break
        }
        else{
            alert("Непредвиденная ошибка")
        }
    }
})

