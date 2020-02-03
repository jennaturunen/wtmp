import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';


const fazerRandomBtn = document.querySelector('#fazerRandomBtn');
const fazerAscBtn = document.querySelector('#fazerAscBtn');
const fazerDescBtn = document.querySelector('#fazerDescBtn');
const fazerGlutenFreeBtn = document.querySelector('#fazerGlutenFreeBtn');

const sodexoAscBtn = document.querySelector('#sodexoAscBtn');
const sodexoDescBtn = document.querySelector('#sodexoDescBtn');
const sodexoRandomBtn = document.querySelector('#sodexoRandomBtn');
const sodexoGlutenFreeBtn = document.querySelector('#sodexoGlutenFreeBtn');
const languageBtn = document.querySelector('.language');


const createMenu = (restaurant, array) => {
  const place = document.querySelector(`#${restaurant}List`);
  place.innerHtml = '';
  console.log('create', array);
  const ul = document.createElement('ul');
  for (const meal of array) {
    const li = document.createElement('li');
    console.log(meal);
    console.log(meal[0][0]);

    li.textContent += meal[0][0];
    ul.append(li);

  }
  place.appendChild(ul);
};


/** Change the language of every menu with the button */
const buttons = document.querySelectorAll('.language');

for (const btn of buttons) {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'ENG') {
      createSodexoMenu(getSodexoMenu('ENG'));
      createFazerMenu('ENG');
      for (const btn of buttons) {
        btn.textContent = 'FI';
      }
    } else {
      createSodexoMenu(getSodexoMenu('FI'));
      createFazerMenu('FI');
      for (const btn of buttons) {
        btn.textContent = 'ENG';
      }
    }
  });
}


/** Show/hide dropdown for sorting */
const dropDownBars = document.querySelectorAll('.sort');

for (const dropdown of dropDownBars) {
  dropdown.addEventListener('click', e => {
    e.target.nextElementSibling.classList.toggle('show');
  });
}


/**
 * Sort menu-arrays in wanted order
 * @param {string} sort - wanted direction to sort
 * @param {*} array - wanted array to be sorted
 */
const sortArray = (sort, array) => {
  array.sort();

  if (sort === 'asc') {
    array.reverse();
  }

  return array;
};

/**
 * Select and return the random dish
 * @param {array} array - Array from where the random dish gets picked
 */
const chooseRandomDish = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

createMenu('sodexo', SodexoData.finnishMenuArray);
createMenu('fazer', FazerData.finnishMenuArray);


console.log('index', SodexoData);
console.log('index', SodexoData.finnishMenuArray[1]);

console.log('fasu', FazerData);
console.log('index', FazerData.finnishMenuArray[1]);
