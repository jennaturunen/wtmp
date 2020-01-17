const max = 50;
const min = 0;

let startTime;
let finishTime;

let randomNumber = Math.floor(Math.random() * max) + min;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHigh');
const guessFacts = document.querySelector('.guessFacts');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

console.log(randomNumber);

const checkGuess = () => {

  let userGuess= Number(guessField.value);

  if (guessCount === 1) {
    startTime = Date.now();
    guesses.textContent = 'Previous guesses: ';
  }

  guesses.textContent += userGuess + ' ';


  if (userGuess === randomNumber) {
    finishTime = Date.now();
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHigh.textContent = '';

    const timeElapsed = (finishTime - startTime)/1000;
    console.log(timeElapsed);

    guessFacts.textContent = `You guessed ${guessCount} times and it took ${timeElapsed} seconds.`;

    setGameOver();

  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';

    if (userGuess < randomNumber) {
      lowOrHigh.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
      lowOrHigh.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();

};

guessSubmit.addEventListener('click', checkGuess);


const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;

  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);

  resetButton.addEventListener('click', resetGame);

};


const resetGame = () => {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');

  for (const arvo of resetParas) {
    arvo.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * max) + min;
  console.log(randomNumber);

};


