let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += num;
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += currentInput === '' ? '0.' : '.';
        updateDisplay();
    }
}

function appendOperator(op) {
    if (currentInput === '' && previousValue === null) return;
    
    if (previousValue !== null && currentInput !== '' && operator) {
        calculate();
    }
    
    operator = op;
    previousValue = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || currentInput === '' || previousValue === null) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}