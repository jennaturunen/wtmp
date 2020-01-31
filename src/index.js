//--------- TASK 1 -------- //

const secretPassword = "juhuu";
const inputField = document.querySelector("#inputPassword");
let guessedWord = "";

// Compare users typed letters to secretPassword
const checkGuessedWord = event => {
  // When input-field is empty, delete previously guessed letters
  if (inputField.value === "") {
    guessedWord = "";
  }

  // Ignore keys that don't produce a character value (modifier keys)
  if (event.key.length === 1) {
    console.log(event.key);
    guessedWord += event.key;
    console.log(guessedWord);
  }

  if (guessedWord === secretPassword) {
    alert("Congratulations! You guessed the correct secret password!");
    guessedWord = "";
  }
};

inputField.addEventListener("keyup", checkGuessedWord);

//--------- TASK 2 -------- //

// Shows the x and y coordinates of mouse double-clicks on the page
const showCoordinates = event => {
  console.log(
    `Coordinates of the click in browser window, X: ${event.clientX} and Y: ${event.clientY}`
  );
  console.log(
    `Coordinates of the click in the whole webpage, X: ${event.pageX} and Y: ${event.pageY}`
  );
};

document.addEventListener("dblclick", showCoordinates);

//--------- TASK 3 -------- //

const touchableElement = document.querySelector("h2");

// React only touches not clicks
touchableElement.addEventListener("touchstart", () => {
  console.log("You touched the element!");
});

//--------- TASK 4 -------- //
/*
const countfifth = () => {
  let counter = 1;
  let timer = setInterval(() => {
    console.log(`${counter++}. tick.`);
    if (counter > 15) {
      clearInterval(timer);
      mouseStop();
    }
  }, 1000);
};

const mouseStop = () => {
  console.log("loopu");
};

let counter = 0;
liikkuuko = false;
let time = 4000;
let touchInterval;

const noAction = () => {
  console.log('noaction');
};

const startInt = () => {
  clearInterval(touchInterval);
  touchInterval = setInterval(noAction, 3000);
};

document.addEventListener('mousemove', startInt);
*/

//--------- TASK 5 -------- //

// After 15seconds of idling, alert the user and print text to document
const time = 15000;
let timeoutId;
const notification = document.querySelector('h3');

const timeHasElapsed = () => {
  console.log('hurry up');
  alert('Hurry up!');
  notification.textContent = 'Hurry up, 15 seconds has elapsed!';
};

const startTimer = () => {
  timeoutId = window.setTimeout(timeHasElapsed, time);
};

const resetTimer = () => {
  window.clearTimeout(timeoutId);
  startTimer();
};

const initTimers = () => {
  document.addEventListener('mousemove', resetTimer);
  document.addEventListener('mousedown', resetTimer);
  document.addEventListener('mousewheel', resetTimer);
  document.addEventListener('keydown', resetTimer);
  document.addEventListener('touchstart', resetTimer);

  startTimer();
};

initTimers();
