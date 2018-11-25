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
  // set var min to 0
  min = 0;
  // set var max to 10
  max = 10;
  // set var random to min max range
  random = Math.floor(Math.random() * (+max - +min)) + +min;
};

// function for setting new random number for guess after win
function setNewNumber() {
  // set var min to current minus 10
  min -= 10;
  //parse max to an integer, was adding 10 to string of integer 
  max = parseInt(max);
  // set var max to current add 10
  max += 10;
  random = Math.floor(Math.random() * (+max - +min)) + +min;
}

// function for initial setting random number for selected range
function setSelectedNumber() {
  random = Math.floor(Math.random() * (+max - +min)) + +min;
}

// function for starting new game
function startGame() {
  // set random number with initial range
 setNumber();
  // set and display initial range available message
 setRangeMessage();
}

// on initial load, run function for starting game
document.onload = startGame();

// function for checking if guess input is number
function checkInput(inputVal) {
  // if input value is a number
  if (!isNaN(inputVal)) {
    // hide 'enter number' message div container
    errorMessage.classList.add('hide');
    // enable guess button
    guessButton.disabled = false;
  } else {
    // display 'enter number' message div container
      errorMessage.classList.remove('hide');
    // disable guess button
      guessButton.disabled = true;
  }
}

// function for checking if guess input is empty
function checkEmpty() {
  // if guess field empty
  if (input.value == '') {
    // disable guess button
    guessButton.disabled = true;
    // disable clear button
    clearButton.disabled = true;
  } else {
    // enable clear button
    clearButton.disabled = false;
  }
}

// function for checking if guess within range
function checkRange() {
  // if guess field is out of number range
   if (input.value < min || input.value > max) {
    //  disable guess button
    guessButton.disabled = true;
    // display range error message container
    rangeError.classList.remove('hide');
    // embed message in range error message container
    rangeError.innerHTML = `value is not between ${min} and ${max}`
  } else {
    // hide range error message container
    rangeError.classList.add('hide');
  }
}

// event listener for guess input to check if valid input, empty, and within range
input.addEventListener('keyup', function (event) {
  // check guess input is number
  checkInput(event.target.value);
  // check guess input empty
  checkEmpty(event.target.value);
  // check guess input within range
  checkRange(event.target.value);
})

// function for checking if guess is a match/too high/too low
function checkGuess() {
  // set var guess to guess input field value
  var guess = input.value
  // if guess matches secret number
  if (guess == random) {
    // embed success message into container
    message.innerHTML = 'BOOM!';
    // set a new number within wider range
    setNewNumber();
    // set and display new wider range
    setRangeMessage();
    // if guess is greater than secret number
  } else if (guess > random) {
    // embed too high message into container
    message.innerHTML = 'Too High'
  } else {
    // embed too low message into container
    message.innerHTML = 'Too Low'
  }
  // embed guess into recent guess container
  recent.innerHTML = guess
};

// event listener for guess button to check if correct guess
guessButton.addEventListener('click', function () {
  checkGuess();
});

// event listener for clear button to clear guess input field, messages
clearButton.addEventListener('click', function () {
  // clear guess input field
  input.value = '';
  // clear range error field
  rangeError.innerHTML = '';
  // bring cursor to guess input field
  input.focus();
  // disable clear and guess button
  clearButton.disabled = true;
  guessButton.disabled = true;
});

// function for restarting game
function restart() {
  // clear guess input field
  input.value = '';
  // clear min and max input fields
  minInput.value = '';
  maxInput.value = '';
  // disable select, guess, clear buttons
  selectButton.disabled = true;
  guessButton.disabled = true;  
  clearButton.disabled = true;  
  // clear and hide error messages
  message.innerHTML = '';
  recent.innerHTML = '';
  rangeEx.classList.add('hide');
  errorMessage.classList.add('hide');
  rangeError.innerHTML = '';
  // run start game function, sets initial range and number
  startGame();
  // brings cursor to guess input field
  input.focus();
};

// event listener for reset button to run restart function
resetButton.addEventListener('click', function () {
  restart();
});

// function for checking if selected range input is valid range
function checkValid() {
  // if value in min range input field greater than value in max range input field
  if (minInput.value > maxInput.value) {
    // embed error message in container
    rangeEx.innerHTML = 'min and max not valid';
    // display error message container
    rangeEx.classList.remove('hide');
  } else {
    // hide error message container
    rangeEx.classList.add('hide');
    // set min and max with values in input fields
    min = minInput.value;
    max = maxInput.value;
    // set new secret number with updated min and max from line above
    setSelectedNumber();
    // display new range message
    setRangeMessage();
    // clear range input fields
    minInput.value = '';
    maxInput.value = '';
    // disable select button
    selectButton.disabled = true;
  }
}

// function for checking if selected range input is empty
function checkRangeEmpty() {
  // if either range input field is empty
  if (minInput.value == '' || maxInput.value == '') {
    // disable select button
    selectButton.disabled = true;
    // if either range input field is not a number
  } else if (isNaN(minInput.value) || isNaN(maxInput.value) ) {
    // disable select button
    selectButton.disabled = true;
    // embed error message in container
    rangeEx.innerHTML = 'min and max not valid';
    // display error message container
    rangeEx.classList.remove('hide');
  } else {
    // enable select button
    selectButton.disabled = false;
    // hide error message container
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


