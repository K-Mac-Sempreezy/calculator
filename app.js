// DOM
const numbers = document.querySelector('.text');
const buttons = document.querySelectorAll('.button');
const zero = document.querySelector('.zero');

//Global Variables
let input = [];
let tempInput = [];
let storedInput = [];
let operand = [];
let answer = [];
let usedEqualSign = false; 

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


// Get the global variables ready for math

// const plusMinus = (e) => {
//     let a = (parseInt(input.join('').toString()) * -1);
//     console.log(a);
// };

const equals = () => {
  let a;
  let b;

  if (tempInput.length <= 0 || input.length > 0) {
    // just in case something weird comes through
    return;
  }

  if (storedInput.length > 0 && storedInput.length < 2) {
    a = parseInt(storedInput);
  } else {
    a = parseInt(storedInput.join('').toString());
  }

  if (tempInput.length > 0 && tempInput.length < 2) {
    b = parseInt(tempInput);
  } else {
    b = parseInt(tempInput.join('').toString());
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
  numbers.textContent = answer;
  adjustVariables(a, b)
};

const adjustVariables = (a, b) => {
  if (usedEqualSign == true) {
    operand = [];
  };
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
    numbers.textContent = 0;
    operand = [];
    answer = [];
    usedEqualSign = false;
    
  } else if (e.target.id === 'clear') {
    input = [];
    numbers.textContent = 0;
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
      numbers.textContent = input;
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

const isPlusMinus = (e) => {// DO THIS AREA

  if (input.length <= 0 && tempInput.length <= 0){ //All variables empty...no math to do
    let a = (parseInt(tempInput.join('').toString()) * -1);
    tempInput = [];
    tempInput.push(a);
    numbers.textContent = tempInput;
    return;
    
  } else if (input.length > 0 && tempInput.length <= 0) {
    let b = (parseInt(input.join('').toString()) * -1);
    input = [];
    input.push(b);
    numbers.textContent = input;
    return;

  } else if (input.length <= 0 && tempInput.length > 0 && answer !== '') {
    let f = (parseInt(input.join('').toString()) * -1);
    tempInput = [];
    tempInput.push(f);
    numbers.textContent = tempInput;
    return;
    
  } else if (input.length > 0 && tempInput.length > 0){
    let c = (parseInt(input.join('').toString()) * -1);
    input = [];
    input.push(c);
    numbers.textContent = input;
    return;
    
  } else if (input.length <= 0 && tempInput.length > 0 && storedInput.length > 0){
    let d = (parseInt(tempInput.join('').toString()) * -1);
    tempInput = [];
    tempInput.push(d);
    numbers.textContent = tempInput;
    return;
  };
};

const isEquals = () => {
  usedEqualSign = true;

  if (input.length <= 0 && tempInput.length <= 0){ //All variables empty...no math to do
    console.log('i-, t-');
    return;
    
  } else if (input.length > 0 && tempInput.length <= 0) {
    console.log('i+, t-');
    return;
    
  } else if (input.length > 0 && tempInput.length > 0){
    console.log('i+, t+');
    storedInput = tempInput;
    tempInput = [];
    tempInput = input;
    input = [];
    equals();
    
  } else if (input.length <= 0 && tempInput.length > 0 && storedInput.length > 0){
    console.log('i-, t+, s+');
    equals();
  };

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
    onScreen(e);
  } else {
    isNotDigit(e);
  }
};


buttons.forEach(button => button.addEventListener('click', calc));
buttons.forEach(button => button.addEventListener('click', (e) => {
  console.log(e.target.id);
}));
zero.addEventListener('click', calc);
