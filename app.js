// DOM
const numbers = document.querySelector('.text');
const buttons = document.querySelectorAll('.button');
const option = document.getElementById('option');
const bodyCoolClass = document.querySelector('.body-cool');
const h1 = document.querySelector('h1');
const wrapper = document.querySelector('.wrapper');
const html = document.querySelector('html');
const validKeys = ["Digit0", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Minus", "Equal", "KeyA", "KeyC", "KeyM", "KeyT", "Enter", "Period", "Slash"];

// also => multiply: "Key8" + ShiftKey=true; plus: "Equal" + ShiftKey=true


//Global Variables
let input = [];
let tempInput = [];
let storedInput = [];
let operand = [];
let answer = [];
let usedEqualSign = false;
let cool = true;

// All Functions
//doing the actual math here
const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const equals = () => {
  let a;
  let b;

  if (tempInput.length <= 0 || input.length > 0) {
    // just in case something weird comes through
    return;
  }

  if (input.length <= 0 && tempInput.length > 0 && storedInput.length <= 0) {
    storedInput = tempInput;
  }

  if (storedInput.length > 0 && storedInput.length < 2) {
    a = parseFloat(storedInput);
  } else {
    a = parseFloat(storedInput.join('').toString());
  }

  if (tempInput.length > 0 && tempInput.length < 2) {
    b = parseFloat(tempInput);
  } else {
    b = parseFloat(tempInput.join('').toString());
  }

  if (operand == '+') {
    math = add(a, b);
  } else if (operand == '-') {
    math = subtract(a, b);
  } else if (operand == '*') {
    math = multiply(a, b);
  } else if (operand == '/') {
    math = divide(a, b);
  }
  answer = [];
  answer.push(math);
  printAnswer(a, b);
};;

const printAnswer = (a, b) => {
  if (answer)
  numbers.textContent = answer.join('');
  adjustVariables(a, b)
};

const adjustVariables = (a, b) => {
  input = [];
  tempInput = [];
  tempInput = answer;
  storedInput = [];
  a = null;
  b = null;
};

//Routing functions

const clear = (e) => {
  if (e.target.id === 'all-clear') {
    input = [];
    tempInput = [];
    storedInput = [];
    numbers.textContent = '';
    operand = [];
    answer = [];
    usedEqualSign = false;

  } else if (e.target.id === 'clear') {
    input = [];
    numbers.textContent = '';
  }
};

const updateVarValues = () => { //accessed only by operand (+ - * /) buttons
  if (
    (input.length <= 0 && tempInput.length <= 0) ||
    (input.length <= 0 && tempInput.length > 0)
  ) {
    //no math to do here
    return;

  } else if (input.length > 0 && tempInput.length <= 0) {
    //brand new calculation
      tempInput = input;
      input = [];
      numbers.textContent = tempInput.join('');
      return;

  } else if (input.length > 0 && tempInput.length > 0) {
    //multi-operand calculation (eg. 1 + 1 + 1)
      storedInput = tempInput;
      tempInput = input;
      input = [];
      equals();
  };
};

const pushOperand = (op) => {
  operand = [];
  operand.push(op);
}

const routeOperator = (e) => {

  if (e.target.id === 'add') {
    pushOperand('+');
  } else if (e.target.id === 'subtract') {
    pushOperand('-');
  } else if (e.target.id === 'multiply') {
    pushOperand('*');
  } else if (e.target.id === 'divide') {
    pushOperand('/');
  };

  updateVarValues();
};

const isPlusMinus = (e) => {// only accessible by +/- button

  if (input.length <= 0 && tempInput.length <= 0){ //All variables empty...no math to do
    let a = (parseInt(tempInput.join('').toString()) * -1);
    tempInput = [];
    tempInput.push(a);
    numbers.textContent = tempInput.join('');
    return;

  } else if (input.length > 0 && tempInput.length <= 0) {
    let b = (parseInt(input.join('').toString()) * -1);
    input = [];
    input.push(b);
    numbers.textContent = input.join('');
    return;

  } else if (input.length <= 0 && tempInput.length > 0) {
    let f = (parseInt(tempInput.join('').toString()) * -1);
    tempInput = [];
    tempInput.push(f);
    numbers.textContent = tempInput.join('');
    return;

  } else if (input.length > 0 && tempInput.length > 0){
    let c = (parseInt(input.join('').toString()) * -1);
    input = [];
    input.push(c);
    numbers.textContent = input.join('');
    return;

  } else if (input.length <= 0 && tempInput.length > 0 && storedInput.length > 0){
    let d = (parseInt(tempInput.join('').toString()) * -1);
    tempInput = [];
    tempInput.push(d);
    numbers.textContent = tempInput.join('');
    return;
  };
};

const isEquals = () => {

  if (input.length <= 0 && tempInput.length <= 0){ //All variables empty...no math to do
    return;

  } else if (input.length > 0 && tempInput.length <= 0) {
    return;

  } else if (input.length > 0 && tempInput.length > 0 && operand.length <= 0){
    return;

  } else if (input.length > 0 && tempInput.length > 0 && operand.length > 0){
    usedEqualSign = true;
    storedInput = tempInput;
    tempInput = [];
    tempInput = input;
    input = [];
    equals();

  } else if (input.length <= 0 && tempInput.length > 0 && storedInput.length > 0){
    usedEqualSign = true;
    equals();

  } else if (input.length <= 0 && tempInput.length > 0 && operand.length > 0) {
    usedEqualSign = true;
    equals();
  }

};

const isDigit = (e) => {
  let tempNum = e.target.id;
  let regex = /[0-9]/;
  equalsSign = false;
  return regex.test(tempNum);
};

const isNotDigit = (e) => { //Split clear buttons from the operators
  if (e.target.id === 'all-clear') {
    clear(e);
  } else if (e.target.id === 'clear') {
    clear(e);
  } else if (e.target.id === 'equals'){
    isEquals();
  } else if (e.target.id === 'plus-minus'){
    isPlusMinus()
  } else {
    routeOperator(e);
  };
};

const onScreen = (e) => {
  input.push(e.target.id);
  numbers.textContent = input.join('');
};

const calc = (e) => { //Split numbers from non-numbers
  if (isDigit(e) === true) {
    onScreen(e);
  } else if (e.target.id === '.') {
    if(input.includes('.')) { return };
    onScreen(e);
  } else {
    isNotDigit(e);
  }
};

const warmOption = () => {
  if (input.length < 0) {
    numbers.textContent = input.join('');
  } else if (input.length <= 0 && tempInput.length > 0) {
    numbers.textContent = tempInput.join('');
  }
  buttons.border = '2px solid var(--orange)';
  h1.textContent = 'WARM CALCULATOR';
  h1.classList.add('h1-warm');
  bodyCoolClass.classList.remove('body-cool');
  bodyCoolClass.classList.add('body-warm');
  wrapper.classList.add('wrapper-warm');
  numbers.classList.add('text-warm');
  html.color = 'var(--orange)';
  buttons.forEach(button => button.classList.add('button-warm'));
};

const coolOption = () => {
  if (input.length < 0) {
    numbers.textContent = input.join('');
  } else if (input.length <= 0 && tempInput.length > 0) {
    numbers.textContent = tempInput.join('');
  }
  buttons.forEach(button => button.classList.remove('button-warm'));
  buttons.border = '2px solid var(--white)';
  h1.textContent = 'COOL CALCULATOR';
  h1.classList.remove('h1-warm');
  bodyCoolClass.classList.remove('body-warm');
  bodyCoolClass.classList.add('body-cool');
  wrapper.classList.remove('wrapper-warm');
  numbers.classList.remove('text-warm');
  html.color = 'color: var(--white)';
};

const switchAppearance = () => {
  console.log(cool);
  if (cool) {
    warmOption();
    cool = false;
  } else {
    coolOption();
    cool = true;
  }
};

const keyHandler = (e) => {
  if (!e.shiftKey) {
    switch (e.code) {
      case 'Equal':
        isEquals();
        break;
      case 'Minus':
        pushOperand('-');
        break;
      case 'Digit0':
        e.target.id = '0';
        onScreen(e);
        break;
      case 'Digit1':
        e.target.id = '1';
        onScreen(e);
        break;
      case 'Digit2':
        e.target.id = '2';
        onScreen(e);
        break;
      case 'Digit3':
        e.target.id = '3';
        onScreen(e);
        break;
      case 'Digit4':
        e.target.id = '4';
        onScreen(e);
        break;
      case 'Digit5':
        e.target.id = '5';
        onScreen(e);
        break;
      case 'Digit0':
        e.target.id = '0';
        onScreen(e);
        break;
      case 'Digit6':
        e.target.id = '6';
        onScreen(e);
        break;
      case 'Digit7':
        e.target.id = '7';
        onScreen(e);
        break;
      case 'Digit8':
        e.target.id = '8';
        onScreen(e);
        break;
      case 'Digit9':
        e.target.id = '9';
        onScreen(e);
        break;
      case 'Slash':
        e.target.id = 'divide';
        isNotDigit(e);
        break;
      case 'Minus':
        e.target.id = 'subtract';
        isNotDigit(e);
        break;
      case 'KeyA':
        e.target.id = 'all-clear';
        isNotDigit(e);
        break;
      case 'KeyC':
        e.target.id = 'clear';
        isNotDigit(e);
        break;
      case 'KeyM':
        e.target.id = 'plus-minus';
        isPlusMinus(e);
        break;
      case 'KeyT':
        switchAppearance();
        break;
      case 'Enter':
          e.target.id = 'equals';
          isEquals();
          break;
      case 'Period':
          e.target.id = '.';
          onScreen(e);
          break;
    }
  } else if (!!e.shiftKey) {
    switch (e.code) {
      case 'Equal': //Add
        e.target.id = 'add';
        routeOperator(e);
        break;
      case 'Digit8': //Multiply
        e.target.id = 'multiply';
        routeOperator(e);
    }
  }
};

//Event Listeners

buttons.forEach(button => button.addEventListener('click', calc));
option.addEventListener('click', switchAppearance);
document.addEventListener('keydown', keyHandler);