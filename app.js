class Calculator {
    constructor(history, result) {
        this.history = history;
        this.result = result;
        this.clear();
    }

    clear() {
        this.currentResult = '';
        this.previousResult = '';
        this.history.innerText = '';
        this.operation = undefined;
    }

    delete() {
        this.currentResult = this.currentResult.slice(0, -1);
    }

    appendNumber(number) {
        if (number == '.' && this.currentResult.includes('.')) return;
        this.currentResult = String(this.currentResult) + String(number);
    }

    chooseOperation(operation) {
        if (this.currentResult == '') return;
        if (this.previousResult !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousResult = this.currentResult;
        this.currentResult = '';
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousResult);
        const current = parseFloat(this.currentResult);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '×':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        this.operation = undefined;
        this.currentResult = computation;
        this.previousResult = '';
    }

    updateDisplay() {
        this.result.innerText = this.currentResult;
        if (this.operation != undefined) {
            this.history.innerText = `${this.previousResult} ${this.operation}`;
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const changeThemeButton = document.querySelector('[data-theme]');
const containerElement = document.querySelector('.container');
const calculatorElement = document.querySelector('.calculator');
const history = document.querySelector('[data-history]');
const result = document.querySelector('[data-result]');

const calculator = new Calculator(history, result);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

changeThemeButton.addEventListener('click', () => {
    containerElement.classList.toggle('dark');
    calculatorElement.classList.toggle('dark');
    const src = document.querySelector('#theme-icon').src;
    if (src == 'https://i.imgur.com/T1AeDNs.png') document.querySelector('#theme-icon').src = 'https://i.imgur.com/DdpfQov.png';
    else document.querySelector('#theme-icon').src = 'https://i.imgur.com/T1AeDNs.png';
});