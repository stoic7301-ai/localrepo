

// basic math helpers
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Invalid operator");
    }
}

// UI state and helpers
let currentInput = '';
let previousInput = '';
let currentOperator = null;

function updateDisplay() {
    const display = document.getElementById('result');
    if (display) {
        if (currentOperator != null) {
            // show full expression when operator is active
            display.value = previousInput + ' ' + currentOperator + ' ' + currentInput;
        } else {
            display.value = currentInput;
        }
    }
}

function appendNumber(num) {
    // avoid multiple decimal points
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay(); // show operator immediately
}

function calculate() {
    if (currentOperator == null || previousInput === '' || currentInput === '') return;
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    const result = operate(currentOperator, a, b);
    currentInput = result.toString();
    previousInput = '';
    currentOperator = null;
    updateDisplay();
}

function clearResult() {
    currentInput = '';
    previousInput = '';
    currentOperator = null;
    updateDisplay();
}

// expose functions globally so onclicks can find them
window.appendNumber = appendNumber;
window.appendOperator = appendOperator;
window.calculate = calculate;
window.clearResult = clearResult;

// initialise display
updateDisplay();

