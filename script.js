let result = 0
let firstNum = 0
let secondNum = 0
let firstExists = false
let isRes = false
let number = ""
let symb = ""

const rows = document.querySelector(".btn-rows")
const expression = document.querySelector('.expression')
const screen = document.querySelector('.result')

rows.addEventListener('click', clickHandler)

function addToDisplay(txt){
    expression.innerHTML += txt
}

function clearAll(){
    expression.innerHTML = ""
    screen.innerHTML = 0
    result = 0
    firstNum = 0
    secondNum = 0
    firstExists = false
    isRes = false
    number = ""
    symb = ""
    return
}

function parseNum(){
    if (firstExists === false){
        firstNum = parseFloat(number)
        console.log(firstNum)
    }
    else{
        secondNum = parseFloat(number)
        
    }
}

function clickHandler(event){
    btn_txt = event.target.innerHTML
        if (isNaN(btn_txt))
            handleSymb(btn_txt)
        else{
            handleNum(btn_txt)
        }
}

function handleNum(n){
    if (expression.innerHTML.endsWith('=')){
        clearAll()
    }
    number += n
    parseNum()
    
    addToDisplay(n)
}

function handleSymb(s){
    if (expression.innerHTML.endsWith('=')){
        expression.innerHTML = firstNum
        screen.innerHTML = 0 
    }
    //if (firstNum === 0 && number === "" && exp.innerHTML === "")
    if (firstExists === false && number === "" && s !== '+/-')
        return
    if (s === "."){
        if (number.indexOf(".") === -1){
            number += '.'
            addToDisplay('.')
        } 
        return
    }
    if (s === 'AC'){
        clearAll()
        return
    }
    if (s === '='){
        calculateExpression()
        addToDisplay('=')
        screen.innerHTML = result
        firstNum = result
        result = 0
        secondNum = 0
        number = ""
        symb = ""
        isRes = false
        return
    }
    if (s=== '+/-'){
        console.log(parseFloat(number))
        if (parseFloat(number) > 0){
            expression.innerHTML = expression.innerHTML.replace(number, ('-' + number))
            number =  '-' + number
            parseNum()
        }
        else if (parseFloat(number) < 0){
            expression.innerHTML = expression.innerHTML.replace(number, number.slice(1))
            number = number.slice(1)
            parseNum()
        }
        // else{
        //     addToDisplay('-')
        //     number =  '-' + number
        // }
        return
    }
    console.log(isRes)
    
    firstExists = true
    number = ""
    addToDisplay(s)
    calculateExpression()
    symb = s
    if (isRes)
        firstNum = result
    return
}

function calculateExpression(){
    console.log(firstNum)
    console.log(secondNum)
    console.log(symb)
    switch(symb){
        case('+'): 
        result = firstNum + secondNum
        break
        case('-'):
        result = firstNum - secondNum
        break
        case('×'):
        result = firstNum * secondNum
        break
        case('÷'):
        result = firstNum / secondNum
        break
        case('%'):
        result = firstNum % secondNum
        break
        default:
            if (secondNum < 0){
                result = firstNum + secondNum
                break
            }
            else
                return
    }
    isRes = true
    return
}