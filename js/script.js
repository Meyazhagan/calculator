class Calculator {
  constructor(prevOperation, currOperation) {
    this.prevOperation = prevOperation;
    this.currOperation = currOperation;
    this.clear();
  }

  clear() {
    this.operator = undefined;
    this.currContent = "";
    this.prevContent = "";
  }

  delete() {
    this.currContent = this.currContent.toString().slice(0, -1);
  }

  append(number) {
    if (number === "." && this.currContent.includes(".")) return;
    this.currContent = this.currContent.toString() + number.toString();
  }

  setOperator(operator) {
    if (this.currContent === "" && this.prevContent !== "")
      this.operator = operator;
    if (this.currContent === "") return;
    if (this.prevContent !== "") this.compute();
    this.prevContent = this.currContent;
    this.currContent = "";
    this.operator = operator;
  }

  compute() {
    let computed = 0;
    let prev = parseFloat(this.prevContent);
    let curr = parseFloat(this.currContent);
    if (isNaN(curr) || isNaN(prev)) return;
    switch (this.operator) {
      case "+":
        computed = prev + curr;
        break;
      case "-":
        computed = prev - curr;
        break;
      case "×":
        computed = prev * curr;
        break;
      case "÷":
        computed = prev / curr;
        break;
      default:
        return;
    }
    this.prevContent = "";
    this.currContent = computed;
    this.operator = undefined;
  }

  format(string) {
    if (this.operator) return `${string} ${this.operator}`;

    return string;
  }

  updateDisplay() {
    this.currOperation.innerText = this.currContent;
    this.prevOperation.innerText = this.format(this.prevContent);
  }
}

const numbers = document.querySelectorAll("[number]");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
const allClear = document.querySelector("#all-clear");
const prevOperation = document.querySelector("#prev-operation");
const currOperation = document.querySelector("#curr-operation");

const calculator = new Calculator(prevOperation, currOperation);

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.append(button.innerText);
    calculator.updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.setOperator(button.innerText);
    calculator.updateDisplay();
  });
});

equal.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

clear.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keypress", (e) => {
  console.log(e.key, e.keyCode, e.DOM_KEY_LOCATION_STANDARD);
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    calculator.append(e.key);
  }

  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    switch (e.key) {
      case "+":
        calculator.setOperator(e.key);
        break;
      case "-":
        calculator.setOperator(e.key);
        break;
      case "*":
        calculator.setOperator("×");
        break;
      case "/":
        calculator.setOperator("÷");
        break;
    }
  }
  if (e.code === "NumpadEnter") {
    calculator.compute();
  }

  if (e.key === "A" || e.key === "a") {
    calculator.clear();
  }

  if (e.key === "C" || e.key === "c") {
    calculator.delete();
  }

  calculator.updateDisplay();
});
