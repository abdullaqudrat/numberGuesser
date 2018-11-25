var range = document.querySelector('.range')

var errorMessage = document.querySelector('.error-message')
var rangeError = document.querySelector('.range-error')
var rangeEx = document.querySelector('.range-ex')


var selectButton = document.querySelector('.select')
var guessButton = document.querySelector('.guess')
var clearButton = document.querySelector('.clear')
var resetButton = document.querySelector('.reset')

var message = document.querySelector('.message')
var recent = document.querySelector('.recent')
var input = document.querySelector('.user-input')
var minInput = document.querySelector('.min-input')
var maxInput = document.querySelector('.max-input')

var min = 0;
var max = 10;


function setRangeMessage() {
  range.innerHTML = `Please pick a value from ${min} to ${max}`
}

function setNumber() {
  min = 0;
  max = 10;
  random = Math.floor(Math.random() * (+max - +min)) + +min;
};

function setNewNumber() {
  min -= 10;
  max = parseInt(max);
  max += 10;
  random = Math.floor(Math.random() * (+max - +min)) + +min;
}

function setSelectedNumber() {
  random = Math.floor(Math.random() * (+max - +min)) + +min;
}

function startGame() {
 setNumber();
 setRangeMessage();
}

document.onload = startGame();

function checkInput(inputVal) {
  if (!isNaN(inputVal)) {
    errorMessage.classList.add('hide');
    guessButton.disabled = false;
  } else {
      errorMessage.classList.remove('hide');
      guessButton.disabled = true;
  }
}

function checkEmpty() {
  if (input.value == '') {
    guessButton.disabled = true;
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
  }
}

function checkRange() {
   if (input.value < min || input.value > max) {
    guessButton.disabled = true;
    rangeError.classList.remove('hide');
    rangeError.innerHTML = `value is not between ${min} and ${max}`
  } else {
    rangeError.classList.add('hide');
  }
}

input.addEventListener('keyup', function (event) {
  checkInput(event.target.value);
  checkEmpty(event.target.value);
  checkRange(event.target.value);
})

function checkGuess() {
  var guess = input.value
  if (guess == random) {
    message.innerHTML = 'BOOM!';
    setNewNumber();
    setRangeMessage();
  } else if (guess > random) {
    message.innerHTML = 'Too High'
  } else {
    message.innerHTML = 'Too Low'
  }
  recent.innerHTML = guess
};

guessButton.addEventListener('click', function () {
  checkGuess();
});

clearButton.addEventListener('click', function () {
  input.value = '';
  rangeError.innerHTML = '';
  input.focus();
  clearButton.disabled = true;
  guessButton.disabled = true;
});

resetButton.addEventListener('click', function () {
  restart();
});

function checkValid() {
  if (minInput.value > maxInput.value) {
    rangeEx.innerHTML = 'min and max not valid';
    rangeEx.classList.remove('hide');
  } else {
    rangeEx.classList.add('hide');
    min = minInput.value;
    max = maxInput.value;
    setSelectedNumber();
    setRangeMessage();
    minInput.value = '';
    maxInput.value = '';
    selectButton.disabled = true;
  }
}

function checkRangeEmpty() {
  if (minInput.value == '' || maxInput.value == '') {
    selectButton.disabled = true;
  } else if (isNaN(minInput.value) || isNaN(maxInput.value) ) {
    selectButton.disabled = true;
    rangeEx.innerHTML = 'min and max not valid';
    rangeEx.classList.remove('hide');
  } else {
    selectButton.disabled = false;
    rangeEx.classList.add('hide')
  }
}

minInput.addEventListener('keyup', function (event) {
  checkRangeEmpty(event.target.value);
})

maxInput.addEventListener('keyup', function (event) {
  checkRangeEmpty(event.target.value);
})

selectButton.addEventListener('click', function () {
  checkValid();
});

input.addEventListener('keyup', function (event) {
  checkInput(event.target.value);
  checkEmpty(event.target.value);
  checkRange(event.target.value);
})

function restart() {
  input.value = '';
  minInput.value = '';
  maxInput.value = '';
  selectButton.disabled = true;
  guessButton.disabled = true;  
  clearButton.disabled = true;  
  message.innerHTML = '';
  recent.innerHTML = '';
  rangeEx.classList.add('hide');
  errorMessage.classList.add('hide');
  rangeError.innerHTML = '';
  startGame();
  input.focus();
};