/*  NOPEIN TAPA ARVATA OIKEA NUMERO
- Pelaaja on onnekas ja tietää numeron olevan 1-100 väliltä
- Ensin arvataan puolivälistä numero > tässä tapauksessa 50
  ->  peli ilmoittaa onko arvaus liian pieni/suuri
    -> jos liian suuri > arvataan puoliväli 1-50 väliltä > arvataan seuraavaksi 25 > sitten 0-25 > 13 jne
    -> jos liian pieni > arvataan puoliväli 50-100 väliltä > arvataan seuraavaksi 75 > sitten 75-100 > 88 jne
- peliä jatketaan samaan tapaan arvaamalla aina puolet edellisestä arvatusta numerosta kunnes oikea numero arvataan
*/

import {startGame, checkGuess, resetGame} from './modules/guess-game';

startGame();

const testGamePlay = () => {
  let guessCounter = 0;
  let newGuess = 50;
  let maxValue = 100;
  let minValue = 1;
  let gameOver = false;

  while(!gameOver) {
    let correctGuess = checkGuess(newGuess);
    guessCounter++;

    // Jos arvaus on oikea
    if (correctGuess === 0) {
      gameOver = true;
      console.log('oikea arvaus');
      resetGame();

      // Jos arvaus on liian pieni
    } else if (correctGuess < 0){
      console.log(newGuess = Math.round((maxValue + newGuess)/2));
      console.log('uusi arvaus liian pieni', newGuess);
      // Jos arvaus on liian suuri
    } else {
      console.log(newGuess = Math.round((minValue + newGuess)/2));
      console.log('uusi arvaus liian suuri', newGuess);
    }
  }

  return guessCounter;
};


let guessCounts = [];

for (let i = 0; i < 10; i++) {
  guessCounts.push(testGamePlay());
}

console.log('guess counts', guessCounts);

const maxGuessCount = Math.max(...guessCounts);
console.log('maximi arvaus', maxGuessCount);
