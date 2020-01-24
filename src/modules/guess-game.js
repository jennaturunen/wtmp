const max = 100;
const min = 1;
const maxGuessCount = 100;

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

console.log('random number', randomNumber);

const checkGuess = (input) => {

  let userGuess;

  if (typeof input === 'object') {
    userGuess = Number(guessField.value);
  } else {
    userGuess = input;
  }

  console.log('arvaus', userGuess);

  if (guessCount === 1) {
    startTime = Date.now();
    guesses.textContent = 'Previous guesses: ';
  }

  guesses.textContent += userGuess + ' ';


  // Return values -1: too low, 1: too high, 0: correct
  if (userGuess === randomNumber) {
    finishTime = Date.now();
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHigh.textContent = '';

    const timeElapsed = (finishTime - startTime)/1000;
    //console.log('time elapsed', timeElapsed);

    guessFacts.textContent = `You guessed ${guessCount} times and it took ${timeElapsed} seconds.`;

    setGameOver();
    return 0;

  } else if (guessCount === maxGuessCount) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();

  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';

    if (userGuess < randomNumber) {
      lowOrHigh.textContent = 'Last guess was too low!';
      return -1;
    } else if (userGuess > randomNumber) {
      lowOrHigh.textContent = 'Last guess was too high!';
      return 1;
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();

};

const startGame = () => {
  guessSubmit.addEventListener('click', checkGuess);
};

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
  console.log('randomi', randomNumber);

};




export {startGame, checkGuess, resetGame};
