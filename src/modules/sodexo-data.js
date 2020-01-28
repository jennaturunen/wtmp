import SodexoMenu from '../assets/json-data/sodexo';
import {chooseRandomDish, sortArray} from '../index';


const sodexoMyyrmakiList = document.querySelector('#sodexoMyyrmaki');
const sodexoAscBtn = document.querySelector('#sodexoAscBtn');
const sodexoDescBtn = document.querySelector('#sodexoDescBtn');
const sodexoRandomBtn = document.querySelector('#sodexoRandomBtn');
const sodexoGlutenFreeBtn = document.querySelector('#sodexoGlutenFreeBtn');
const languageBtn = document.querySelector('.language');


/**Save menu to arrays for later use*/
let lunchMenuArray = [];
let glutenFreeArray = [];

/**
 * Create Sodexo-menu
 * @param {array} menuArray - Array of every meal for the day
 */
const createSodexoMenu = (menuArray) => {
  console.log('menuarray', menuArray);
  sodexoMyyrmakiList.innerHTML = '';

  for (const lunch of menuArray) {
    const p = document.createElement('p');
    p.textContent = lunch;
    sodexoMyyrmakiList.appendChild(p);
  }
};


/**
 * Get SodexoMenu-array in selected language and save to array(s)
 * @param {string} language - Wanted language of the menu
 */
const getSodexoMenu = (language) => {
  lunchMenuArray = [];
  glutenFreeArray = [];

  for (const lunches in SodexoMenu.courses) {
    if (language === 'FI') {
      lunchMenuArray.push(SodexoMenu.courses[lunches].title_fi);
    } else {
      lunchMenuArray.push(SodexoMenu.courses[lunches].title_en);
    }

    glutenFreeArray.push(SodexoMenu.courses[lunches]);
  }
  return lunchMenuArray;
};


/** Create menu in Finnish by default */
createSodexoMenu(getSodexoMenu('FI'));


/** Display random dish from the Sodexo-menu */
const randomSodexoDish = () => {
  const random = chooseRandomDish(lunchMenuArray);
  sodexoMyyrmakiList.textContent = random;
};

sodexoRandomBtn.addEventListener('click', randomSodexoDish);


/** Sort Sodexo-menu in descending order */
const sortSodexoDescending = () => {
  let sorted = sortArray('desc', lunchMenuArray);
  createSodexoMenu(sorted);
};

sodexoDescBtn.addEventListener('click', sortSodexoDescending);


/** Sort Sodexo-menu in ascending order */
const sortSodexoAscending = () => {
  let sorted = sortArray('asc', lunchMenuArray);
  createSodexoMenu(sorted);
};

sodexoAscBtn.addEventListener('click', sortSodexoAscending);

/** Display every gluten free dish of the menu */
const displayGlutenFreeDishes = () => {
  const glutenFreeMeals = array => array.filter(array => array.properties.includes('G'));
  const arr = glutenFreeMeals(glutenFreeArray);

  sodexoMyyrmakiList.innerHTML = '';

  for (const meal of arr) {
    if (languageBtn.textContent === 'FI') {
      sodexoMyyrmakiList.textContent += meal.title_en + ', ';
    } else {
    sodexoMyyrmakiList.textContent += meal.title_fi + ', ';
    }
  }
};

sodexoGlutenFreeBtn.addEventListener('click', displayGlutenFreeDishes);


export {createSodexoMenu, getSodexoMenu};
