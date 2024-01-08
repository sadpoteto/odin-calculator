let add = (x,y) => x+y;
let sub = (x,y) => x-y;
let mult = (x,y) => x*y;
let div = (x,y) => x/y; //JS handles x/0 as NaN already

let num1;
let operator;
let num2; 
let numDisplay = 0;

let display = document.querySelector("#display");

let numberButtons = document.querySelectorAll(".row > .num");
numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        numDisplay = parseInt(`${numDisplay}${event.target.getAttribute("id")}`);
        updateDisplay();
    });
});

function operate(x,op,y) {
    switch(op) {
    case "+":
        return add(parseInt(x), parseInt(y));
    case "-":
        return sub(parseInt(x), parseInt(y));
    case "*":
        return mult(parseInt(x), parseInt(y));
    case "/":
        return div(parseInt(x), parseInt(y));
    }
}

function updateDisplay() {
    display.textContent = numDisplay;
}