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

// Alert user after 15 seconds of browsing and print text to document
const browsingTime = 15000;
const notificationH4 = document.querySelector('h4');

const alertUser = () => {
  console.log('Hurry up!');
  //alert('Hurry up!');
  notificationH4.textContent = 'Hurry up!';
};

const timer = setInterval(alertUser, browsingTime);


//--------- TASK 5 -------- //

// After 15seconds of idling, alert the user and print text to document
const idlingTime = 15000;
let timeoutId;
const notificationH3 = document.querySelector('h3');

const timeHasElapsed = () => {
  console.log('hurry up');
  //alert('Hurry up!');
  notificationH3.textContent = 'Hurry up, 15 seconds has elapsed!';
};

const startTimer = () => {
  timeoutId = window.setTimeout(timeHasElapsed, idlingTime);
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
