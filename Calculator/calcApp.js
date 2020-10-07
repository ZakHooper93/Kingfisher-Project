//to do
//Percentage button
//plus minus button
// do e values for 18 or more digits
// do not allow for string to be empty, undefined or 0 before an operator is pressed
// clear up that awful DOM string section.

let currentDisplayString;
function addNumberToDisplay(buttonID) {
    currentDisplayString = document.querySelector(".calc-display").textContent;

    if (currentDisplayString === "0" || currentDisplayString === "") {
        document.querySelector(".calc-display").textContent = buttonID; //Ensures the placeholder 0 is replaced with the first number pressed.

    } else if (buttonID === "." && currentDisplayString.includes(".")) {
        //Do nothing, only one decimal allowed, thank you!
    } else {
        document.querySelector(".calc-display").textContent = currentDisplayString + buttonID
    }
};

//Idea here is to store each number and each operator pressed in an array, so that the full mathmatical operation can be constructed via a loop when the = key is pressed.
let currentMathArray = [];
let currentOperatorArray = [];

function mathFunc(operatorType) {
    currentDisplayString = document.querySelector(".calc-display").textContent;

    document.querySelector(".second-display").textContent = operatorType + currentDisplayString;

    //Why isn't this working!? Its supposed to prevent operator buttons from working with invalid display strings.
    if (currentDisplayString !== "0" && currentDisplayString !== "" && typeof (currentDisplayString) !== undefined) {
        if (currentMathArray.length === 0) {

            currentMathArray.push(currentDisplayString);
            currentOperatorArray.push(operatorType);

            document.querySelector(".calc-display").textContent = ""

        } else {
            if (operatorType === "+") {
                arrStore("+");

            } else if (operatorType === "-") {
                arrStore("-");

            } else if (operatorType === "*") {
                arrStore("*");

            } else if (operatorType === "/") {
                arrStore("/");

            } else if (operatorType === "√") { //due to the nature of the square root, this structure doesnt work as it's format is e.g sqrt9 + =. My totalCalc function never gets run. Frustrating.
                arrStore("√");

            } else if (operatorType === "%") {
                arrStore("%");

            } else if (operatorType === "plus-minus") {
                arrStore("plus-minus");

            } else if (operatorType === "=") {
                totalCalc();
            }
        }
    }
}

function totalCalc() {

    currentDisplayString = document.querySelector(".calc-display").textContent;

    currentMathArray.push(currentDisplayString);

    let sumString = currentMathArray[0];
    for (i = 0; i < currentOperatorArray.length; i++) {
        if (currentOperatorArray[i] === "√") {
            sumString += `Math.sqrt(${currentMathArray[i]})`; // I can't seem to get this working yet. 
        } else if (currentOperatorArray[i] === "%") {
            sumString += `(${currentMathArray[i]} / 100) * ${currentMathArray[i + 1]}` //The nature of using strings to store the data was probably not good. Next time I would definitely just store them as numbers.
        } else if (currentOperatorArray[i] === "plus-minus") {

        }
        else {
            sumString += ` ${currentOperatorArray[i]} ${currentMathArray[i + 1]}`
        }
    }
    
    sumStringTotal = math.evaluate(sumString)

    document.querySelector(".calc-display").textContent = sumStringTotal;
    document.querySelector(".second-display").textContent = sumString;

    currentDisplayString = document.querySelector(".calc-display").textContent

    currentMathArray = [];
    currentOperatorArray = [];
}

function arrStore(opp) {

    currentDisplayString = document.querySelector(".calc-display").textContent;

    currentMathArray.push(currentDisplayString);
    currentOperatorArray.push(opp);

    document.querySelector(".second-display").textContent = opp + currentDisplayString;
    document.querySelector(".calc-display").textContent = "";
}

//In the next version, I would remove this blatant violation of DRY and use an ID for each button that I can interchangably construct a DOMstring from. 
//Should have used HTML button to provide info for a DOM string constructor.

document.getElementById("1-button").addEventListener("click", () => addNumberToDisplay("1"));
document.getElementById("2-button").addEventListener("click", () => addNumberToDisplay("2"));
document.getElementById("3-button").addEventListener("click", () => addNumberToDisplay("3"));
document.getElementById("4-button").addEventListener("click", () => addNumberToDisplay("4"));
document.getElementById("5-button").addEventListener("click", () => addNumberToDisplay("5"));
document.getElementById("6-button").addEventListener("click", () => addNumberToDisplay("6"));
document.getElementById("7-button").addEventListener("click", () => addNumberToDisplay("7"));
document.getElementById("8-button").addEventListener("click", () => addNumberToDisplay("8"));
document.getElementById("9-button").addEventListener("click", () => addNumberToDisplay("9"));
document.getElementById("0-button").addEventListener("click", () => addNumberToDisplay("0"));

document.getElementById(".-button").addEventListener("click", () => addNumberToDisplay("."));

document.getElementById("+-button").addEventListener("click", () => mathFunc("+"));
document.getElementById("--button").addEventListener("click", () => mathFunc("-"));
document.getElementById("*-button").addEventListener("click", () => mathFunc("*"));
document.getElementById("/-button").addEventListener("click", () => mathFunc("/"));
document.getElementById("√-button").addEventListener("click", () => mathFunc("√"));
document.getElementById("%-button").addEventListener("click", () => mathFunc("%"));
document.getElementById("plus-minus-button").addEventListener("click", () => mathFunc("plus-minus"));

document.getElementById("=-button").addEventListener("click", () => mathFunc("="));

document.getElementById("c-button").addEventListener("click", () => init());

function init() {
    document.querySelector(".calc-display").textContent = "0";
    document.querySelector(".second-display").textContent = "";

    currentDisplayString = "0"
    currentMathArray = [];
    currentOperatorArray = [];
}

init();