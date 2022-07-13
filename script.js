function updateInput() {
  document.querySelector(".input").setAttribute("value", currentInput);
}

let doMath = {
  add(x, y = 0) {
    return x + y;
  },
  subtract(x, y) {
    return x - y;
  },
  divide(x, y) {
    return x / y;
  },
  multiply(x, y) {
    return x * y;
  },
  equals(x) {
    return x;
  },
};

let currentInput = "";
let currentOperator = "";
let firstNum;
let secondNum;

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      currentInput += button.value;
      console.log("currentInput: " + currentInput);
      updateInput();
    }
    if (button.value == "clear") {
      currentInput = "";
      updateInput();
    }
    if (button.className == "operator" && button.value != "equals") {
      currentOperator = button.value;
      console.log(currentOperator);
      firstNum = currentInput;
      currentInput = "";
      updateInput();
    }
    if (button.value == "equals") {
      if (!firstNum) {
        console.log("notFirstNum");
        firstNum = currentInput;
        currentInput = "";
        return;
      }
      if (!currentInput) {
        return;
      }
      secondNum = currentInput;

      console.log("firstNum:" + firstNum + " secondNum: " + secondNum);
      let newValue = doMath[currentOperator](
        parseInt(firstNum),
        parseInt(secondNum)
      );
      currentInput = newValue;
      updateInput();
      secondNum = 0;
      firstNum = newValue;
      currentOperator = "";
    }

    if (button.value == "inverse") {
      currentInput = parseInt(currentInput) * -1;
      updateInput();
    }
  });
});
