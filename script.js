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
    console.log("clicked: " + button.value + " currentInput: " + currentInput);
    console.log("firstNum:" + firstNum + " secondNum: " + secondNum);
    if (button.classList.contains("number")) {
      currentInput += button.value;
      updateInput();
    }
    if (button.value == "clear") {
      currentInput = "";
      firstNum = "";
      secondNum = "";
      updateInput();
    }
    if (button.className == "operator" && button.value != "equals") {
      //currentOperator = button.value;
      if (!firstNum) {
        firstNum = currentInput;
        currentInput = "";
      }
      if (!secondNum) {
        secondNum = currentInput;
        console.log("added 2nd num: " + secondNum);
        currentInput = "";
      }
      if (firstNum && secondNum) {
        let newValue = operate(firstNum, secondNum);
        /* currentInput = newValue;
        updateInput();
        secondNum = "";
        firstNum = newValue;*/
        //currentOperator = "";
      }
      currentInput = "";
      //updateInput();
    }
    if (button.value == "equals") {
      console.log("operator: " + currentOperator);
      if (!firstNum) {
        firstNum = currentInput;
        currentInput = "";
        return;
      }
      if (!currentInput) {
        return;
      }
      if (!secondNum) {
        secondNum = currentInput;
      }

      if (currentOperator == "" || currentOperator == "equals") {
        currentInput = firstNum;
        updateInput();
        return;
      }
      let newValue = operate(firstNum, secondNum);
      /* currentInput = newValue;
      updateInput();
      firstNum = newValue;
      currentInput = "";
      secondNum = "";
      currentOperator = "";*/
    }

    if (button.value == "inverse") {
      currentInput = document.querySelector(".input").value;
      currentInput = parseFloat(currentInput) * -1;
      updateInput();
    }

    if (button.value == "percent") {
      currentInput = document.querySelector(".input").value;
      currentInput = parseFloat(currentInput) * 0.01;
      updateInput();
    }

    if (button.value == ".") {
      currentInput = document.querySelector(".input").value;
      console.log("in decimal" + currentInput);
      if (currentInput.includes(".")) return;
      addDecimal();
      updateInput();
    }
  });
});

window.addEventListener("keydown", userKeyPress);

function updateInput() {
  document.querySelector(".input").setAttribute("value", currentInput);
}

function userKeyPress(e) {
  console.log(e);
  if (e.key == "Backspace") deleteNumber();
}

function deleteNumber() {
  currentInput = currentInput.slice(0, -1);
  updateInput();
}

function addDecimal() {
  currentInput += ".";
}

function operate(num1, num2) {
  let newValue = doMath[currentOperator](parseFloat(num1), parseFloat(num2));
  currentInput = newValue;
  updateInput();
  firstNum = newValue;
  currentInput = "";
  secondNum = "";
  //currentOperator = "";
  return newValue;
}
