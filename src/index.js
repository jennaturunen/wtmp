import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';

const randomBtn = document.querySelector('#randomBtn');
const languageButton = document.querySelector('.language');
const ascBtn = document.querySelector('#ascBtn');
const descBtn = document.querySelector('#descBtn');

// Create empty arrays for days menu
let sodexoMenu = [];
let fazerMenu = [];

/**
 * Create restaurants menu
 * @param {*} restaurant - name of the restaurant
 * @param {*} dataArray - array of the restaurants menu
 * @returns list of the created menu for sorting...
 */
const createMenu = (restaurant, dataArray) => {
  const place = document.querySelector(`#${restaurant}List`);
  // List updates the sodexo/fazerMenu
  const list = [];
  place.innerHTML = '';
  const ul = document.createElement('ul');

  for (const meal of dataArray) {
    const li = document.createElement('li');
    li.textContent += meal;
    ul.append(li);

    list.push(meal);
  }

  place.appendChild(ul);
  return list;
};


/** Change the language of every menu with the button */
languageButton.addEventListener('click', () => {
  if (languageButton.textContent === 'ENG') {
    fazerMenu = createMenu('fazer', FazerData.englishMenuArray);
    sodexoMenu = createMenu('sodexo', SodexoData.englishMenuArray);
    languageButton.textContent = 'FI';
  } else {
    fazerMenu = createMenu('fazer', FazerData.finnishMenuArray);
    sodexoMenu = createMenu('sodexo', SodexoData.finnishMenuArray);
    languageButton.textContent = 'ENG';
  }
});


/** Show/hide dropdown for sorting */
const dropDownBar = document.querySelector('.sort');

dropDownBar.addEventListener('click', e => {
  e.target.nextElementSibling.classList.toggle('show');
});


/**
 * Sort menu-arrays in wanted order
 * @param {string} sort - wanted direction to sort
 * @param {Array} menuArray - wanted array to be sorted
 * @returns {Array} sorted menuArray
 */
const sortArray = (sort, menuArray) => {
  menuArray.sort();

  if (sort === 'asc') {
    menuArray.reverse();
  }

  return menuArray;
};


/**
 * Create menus in descending order
 */
descBtn.addEventListener('click', () => {
  const sortedSodexo = sortArray('desc', sodexoMenu);
  createMenu('sodexo', sortedSodexo);

  const sortedFazer = sortArray('desc', fazerMenu);
  createMenu('fazer', sortedFazer);
});


/**
 *  Create menus in ascending order
 */
ascBtn.addEventListener('click', () => {
  const sortedSodexo = sortArray('asc', sodexoMenu);
  createMenu('sodexo', sortedSodexo);

  const sortedFazer = sortArray('asc', fazerMenu);
  createMenu('fazer', sortedFazer);
});


/**
 * Select and return the random dish
 * @param {array} menuArray - Array from where the random dish gets picked
 */
const chooseRandomDish = menuArray => {
  const randomIndex = Math.floor(Math.random() * menuArray.length);
  return menuArray[randomIndex];
};


// Display random dish from both of the menus
randomBtn.addEventListener('click', () => {
  const randomFazer = chooseRandomDish(fazerMenu);
  document.querySelector('#fazerList').textContent = randomFazer;

  const randomSodexo = chooseRandomDish(sodexoMenu);
  document.querySelector('#sodexoList').textContent = randomSodexo;
});


// Create menus in Finnish by default
sodexoMenu = createMenu('sodexo', SodexoData.finnishMenuArray);
fazerMenu = createMenu('fazer', FazerData.finnishMenuArray);

