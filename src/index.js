/*  NOPEIN TAPA ARVATA OIKEA NUMERO
- Pelaaja on onnekas ja tietää numeron olevan 1-100 väliltä
- Ensin arvataan puolivälistä numero > tässä tapauksessa 50
  ->  peli ilmoittaa onko arvaus liian pieni/suuri
    -> jos liian suuri > arvataan puoliväli 1-50 väliltä > arvataan seuraavaksi 25 (sitten 0-25 > 13 jne)
    -> jos liian pieni > arvataan puoliväli 50-100 väliltä > arvataan seuraavaksi 75 (sitten 75-100 > 88 jne)
- peliä jatketaan samaan tapaan arvaamalla aina puoliväli minimi- ja maksimiarvojen väliltä kunnes oikea numero arvataan
*/

import {startGame, checkGuess, resetGame, displayResults} from './modules/guess-game';

startGame();

const testGamePlay = () => {
  let guessHistory = [];
  let guessCounter = 0;
  let newGuess = 50;
  let maxValue = 100;
  let minValue = 0;
  let gameOver = false;

  while(!gameOver) {
    // Push new guess to history-array and guess again
    guessHistory.push(newGuess);
    let correctGuess = checkGuess(newGuess);
    guessCounter++;

    // When the guess is correct display all guesses and start new game
    if (correctGuess === 0) {
      gameOver = true;
      console.log('correct!');
      console.log('Guessed values in the game', guessHistory);
      resetGame();

      // When the guess is too low change minValue to previous guess and next guess higher
    } else if (correctGuess < 0){
      minValue = newGuess;
      newGuess = Math.round((maxValue + newGuess)/2);
      console.log('guess was too low, new guess is', newGuess);

      // When the guess is too high change maxValue to previous guess and next guess lower
    } else {
      maxValue = newGuess;
      newGuess = Math.round((minValue + newGuess)/2);
      console.log('guess was too high, new guess is', newGuess);
    }
  }

  return guessCounter;
};


let guessCounts = [];

for (let i = 0; i < 1000; i++) {
  guessCounts.push(testGamePlay());
}

console.log('guess counts', guessCounts);

const maxGuessCount = Math.max(...guessCounts);
console.log('max count', maxGuessCount);

const minGuessCount = Math.min(...guessCounts);
console.log('min count', minGuessCount);

const avg = array => array.reduce((a,b) => a + b)/array.length;
const averageGuessCount = avg(guessCounts);
console.log('average', averageGuessCount);

// Show results max, min and average of the counts in HTML
displayResults(maxGuessCount, minGuessCount, averageGuessCount);
