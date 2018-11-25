var min=1;
var max=10;
var random =Math.floor(Math.random() * (+max - +min)) + +min;

var secretNumber = random
var number = document.querySelector('.number')


const guessButton = document.querySelector('.guess')
const clearButton = document.querySelector('.clear')
const resetButton = document.querySelector('.reset')

var message = document.querySelector('.message')
var recent = document.querySelector('.recent')
var input = document.querySelector('input')

guessButton.addEventListener('click', function () {
  var guess = input.value
  if (guess == secretNumber) {
    message.innerHTML = 'BOOM!'
  } else if (guess > secretNumber) {
    message.innerHTML = 'Too High'
  } else {
    message.innerHTML = 'Too Low'
  }

  recent.innerHTML = guess
});

