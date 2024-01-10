let add = (x,y) => x+y;
let sub = (x,y) => x-y;
let mult = (x,y) => x*y;
let div = (x,y) => x/y; //JS handles x/0 as NaN already


const NUMDISPLAY_DEFAULT = null;
const OPERATOR_DEFAULT = null;

const MAX_DIGITS = 12;

let num1 = null;
let operator = OPERATOR_DEFAULT;
let num2 = null; 
let numDisplay = NUMDISPLAY_DEFAULT;

let display = document.querySelector("#display-contents");
let clrButton = document.querySelector("#clr");
let numberButtons = document.querySelectorAll(".row > .num");
let opButtons = document.querySelectorAll(".row > .op");
let evalButton = document.querySelector(".row > .eval");

numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        switch(numDisplay == NUMDISPLAY_DEFAULT) {
        case true: 
            numDisplay = event.target.getAttribute("id");
            break;
        case false:
            numDisplay = isNaN(numDisplay) ? event.target.getAttribute("id") : numDisplay;
            numDisplay = `${numDisplay}${event.target.getAttribute("id")}`;
            numDisplay = numDisplay.slice(0, MAX_DIGITS - 1);
            break;
        }
        updateDisplay();
    });
});

opButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        parseOperation();
        operator = event.target.getAttribute("id");
        num2 = null;
        numDisplay = NUMDISPLAY_DEFAULT;
    });
});

evalButton.addEventListener("click", (event) => {
    parseOperation();
    operator = OPERATOR_DEFAULT;
});

clrButton.addEventListener("click",(event) => {
    numDisplay = NUMDISPLAY_DEFAULT;
    num1 = null;
    num2 = null;
    operator = OPERATOR_DEFAULT;
    updateDisplay();
});

function operate(x,op,y) {
    console.table(`Evaluating ${x} ${op} ${y}`);
    if(x == null || y == null || isNaN(x) || isNaN(y)) return null;
    switch(op) {
    case "+":
        return add(x, y);
    case "-":
        return sub(x, y);
    case "*":
        return mult(x, y);
    case "/":
        return div(x, y);
    }
    return null;
}

function parseOperation() {
    if(operator != OPERATOR_DEFAULT) {
        num2 = parseFloat(numDisplay);
        let res = operate(num1, operator, num2);
        if(res != null) {
            num1 = res;
            numDisplay = `${res}`; 
            displayResults();
        }
    }
    else {
        num1 = parseFloat(numDisplay);
    }
}

function handleInfinity() {
    display.style.fontSize = "2.8vmin";
    display.textContent = "I'm not that easy to break";
    //alert("You really think you can outsmart a perfect, immortal machine?");
}

function displayResults() {
    let digitsBeforeDec = Math.floor(Math.log10(parseFloat(numDisplay)));
    if(digitsBeforeDec > MAX_DIGITS || digitsBeforeDec < -MAX_DIGITS + 1) {
        numDisplay = parseFloat(numDisplay).toExponential(MAX_DIGITS - 4 - (1 + Math.floor(Math.log10(digitsBeforeDec))));
        // 1.23E+5 => 2 precision gives 4 chars + 2 chars after decimals
        // + chars from exponent
    }
    else {
        numDisplay = Number(parseFloat(numDisplay).toFixed(MAX_DIGITS - Math.max(digitsBeforeDec, 1) - 1));
    }
    updateDisplay();
}

function updateDisplay() {
    display.style.fontSize = "5vmin";
    switch(numDisplay) {
    case NUMDISPLAY_DEFAULT:
        display.textContent = 0;
        break;
    case Infinity:
        handleInfinity();
        break;
    case -Infinity:
        handleInfinity();
        break;
    default: 
        display.textContent = numDisplay;
    }
    //DEFAULT indicates no input, the user may desire inputting 0
    //This prevents sequential operator presses from evaluating
    //with num2 = 0 which would delete the user's calculations
}
