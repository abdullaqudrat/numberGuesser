// delcares variable for available range statement div container
var range = document.querySelector('.range')

// delcares variable for NaN statement div container
var errorMessage = document.querySelector('.error-message')

// delcares variable for input range statement div container
var rangeError = document.querySelector('.range-error')

// delcares variable for error selected range statement div container
var rangeEx = document.querySelector('.range-ex')

// delcares variable for select button
var selectButton = document.querySelector('.select')

// delcares variable for guess button
var guessButton = document.querySelector('.guess')

// delcares variable for clear button
var clearButton = document.querySelector('.clear')

// delcares variable for reset button
var resetButton = document.querySelector('.reset')

// delcares variable for success/fail message container
var message = document.querySelector('.message')

// delcares variable for recent guess message container
var recent = document.querySelector('.recent')

// delcares variable for guess input field
var input = document.querySelector('.user-input')

// delcares variable for min range input field
var minInput = document.querySelector('.min-input')

// delcares variable for max range input field
var maxInput = document.querySelector('.max-input')

// delcares variable for initial minimum range
var min = 0;

// delcares variable for initial maximum range
var max = 10;

// function for placing determined message in range statment container
function setRangeMessage() {
  range.innerHTML = `Please pick a value from ${min} to ${max}`
}

// function for setting initial random number for guess
function setNumber() {
  min = 0;
  max = 10;
  random = Math.floor(Math.random() * (+max - +min)) + +min;
};

// function for setting new random number for guess after win
function setNewNumber() {
  min -= 10;
  max = parseInt(max);
  max += 10;
  random = Math.floor(Math.random() * (+max - +min)) + +min;
}

// function for initial setting random number for selected range
function setSelectedNumber() {
  random = Math.floor(Math.random() * (+max - +min)) + +min;
}

// function for starting new game
function startGame() {
 setNumber();
 setRangeMessage();
}

// on initial load, run function for starting game
document.onload = startGame();

// function for checking if guess input is number
function checkInput(inputVal) {
  if (!isNaN(inputVal)) {
    errorMessage.classList.add('hide');
    guessButton.disabled = false;
  } else {
      errorMessage.classList.remove('hide');
      guessButton.disabled = true;
  }
}

// function for checking if guess input is empty
function checkEmpty() {
  if (input.value == '') {
    guessButton.disabled = true;
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
  }
}

// function for checking if guess within range
function checkRange() {
   if (input.value < min || input.value > max) {
    guessButton.disabled = true;
    rangeError.classList.remove('hide');
    rangeError.innerHTML = `value is not between ${min} and ${max}`
  } else {
    rangeError.classList.add('hide');
  }
}

// event listener for guess input to check if valid input, empty, and within range
input.addEventListener('keyup', function (event) {
  checkInput(event.target.value);
  checkEmpty(event.target.value);
  checkRange(event.target.value);
})

// function for checking if guess is a match/too high/too low
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

// event listener for guess button to check if correct guess
guessButton.addEventListener('click', function () {
  checkGuess();
});

// event listener for clear button to clear guess input field, messages
clearButton.addEventListener('click', function () {
  input.value = '';
  rangeError.innerHTML = '';
  input.focus();
  clearButton.disabled = true;
  guessButton.disabled = true;
});

// function for restarting game
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

// event listener for reset button to run restart function
resetButton.addEventListener('click', function () {
  restart();
});

// function for checking if selected range input is valid range
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

// function for checking if selected range input is empty
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

// event listener for min input field to check if its empty
minInput.addEventListener('keyup', function (event) {
  checkRangeEmpty(event.target.value);
})

// event listener for max input field to check if its empty
maxInput.addEventListener('keyup', function (event) {
  checkRangeEmpty(event.target.value);
})

// event listener for range select button to check if its a valid range
selectButton.addEventListener('click', function () {
  checkValid();
});


