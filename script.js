let add = (x,y) => x+y;
let sub = (x,y) => x-y;
let mult = (x,y) => x*y;
let div = (x,y) => x/y; //JS handles x/0 as NaN already

let num1;
let operator;
let num2; 

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