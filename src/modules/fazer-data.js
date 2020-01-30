import FazerFiMenu from '../assets/json-data/fazer-fi';
import FazerEngMenu from '../assets/json-data/fazer-eng';
import {chooseRandomDish, sortArray} from '../index';

const fazerKaramalmiList = document.querySelector('#fazerKaramalmi');
const fazerRandomBtn = document.querySelector('#fazerRandomBtn');
const fazerAscBtn = document.querySelector('#fazerAscBtn');
const fazerDescBtn = document.querySelector('#fazerDescBtn');
const fazerGlutenFreeBtn = document.querySelector('#fazerGlutenFreeBtn');

/** Save one days menu to array for later use */
let fazerMenu = [];
let glutenFreeMeals = [];

/**
 * Loop and display every meal of the day
 * Push to glutenFreeMeals-array every meal that includes 'G'
 * Save every 'group' to one p-element and push to FazerMenu-array for later use
 * Display every meal clearly and with correct whitespaces/commas...
 * @param {array} arrayMeals - array of the days Meal-part from json
 * @param {string} language - current language of the menus on the page
 */
const loopTheMeals = (arrayMeals, language) => {
  console.log('arr', arrayMeals);
  const p = document.createElement('p');

  for (let i = 0; i < arrayMeals.length; i++) {
    console.log('meal', arrayMeals[i].Name);

    if (arrayMeals[i].Diets.includes('G')) {
      glutenFreeMeals.push(arrayMeals[i].Name);
    }

    if (arrayMeals.length !== 1 && i === arrayMeals.length - 1) {
      if (language === 'ENG') {
        p.textContent += ' and ' + arrayMeals[i].Name;
      } else {
        p.textContent += ' ja ' + arrayMeals[i].Name;
      }
      break;
    }

    if (i === arrayMeals.length -2 || arrayMeals.length === 1) {
      p.textContent += arrayMeals[i].Name;
      continue;
    }

    p.textContent += arrayMeals[i].Name + ', ';
  }

  fazerKaramalmiList.appendChild(p);
  fazerMenu.push(p.textContent);
};


/**
 * Loop throw the dishes to get all the meals in correct language
 * @param {array} arraySetMenus - Array of the days SetMenus-part from json
 * @param {string} language - Current language on the page
 */
const loopTheDishes = (arraySetMenus, language) => {
  for (const dish of arraySetMenus) {
    console.log('dish', dish);
    if (language === 'FI') {
      loopTheMeals(dish.Meals, 'FI');
    } else {
      loopTheMeals(dish.Meals, 'ENG');
    }
  }
};


/**
 * When changing the language pick the day from the correct FazerMenu
 * @param {string} language - Current language of the menus in the page
 */
const createFazerMenu = (language) => {
  console.log(FazerEngMenu);
  console.log('create', FazerEngMenu.LunchMenus[0].SetMenus);

  fazerKaramalmiList.innerHTML = '';
  fazerMenu = [];
  glutenFreeMeals = [];

  if (language === 'FI') {
    loopTheDishes(FazerFiMenu.LunchMenus[0].SetMenus, 'FI');
  } else {
    loopTheDishes(FazerEngMenu.LunchMenus[0].SetMenus, 'ENG');
  }
};


/** By default create (mondays) menu in Finnish */
loopTheDishes(FazerFiMenu.LunchMenus[0].SetMenus, 'FI');


/**
 * Display/Create Fazermenu from the array
 * @param {array} arraySorted - (Sorted) FazerMenu-array
 */
const displayFazerMenu = (arraySorted) => {
  fazerKaramalmiList.innerHTML = '';
  for (const meal of arraySorted) {
    const p = document.createElement('p');
    p.textContent = meal;
    fazerKaramalmiList.appendChild(p);
  }
};


/** Display a random dish from the Fazermenu */
const randomFazerDish = () => {
  const random = chooseRandomDish(fazerMenu);
  fazerKaramalmiList.textContent = random;
};

fazerRandomBtn.addEventListener('click', randomFazerDish);


/**Sort FazerMenu in descending order */
const sortFazerDescending = () => {
  const sorted = sortArray('desc', fazerMenu);
  displayFazerMenu(sorted);
};

fazerDescBtn.addEventListener('click', sortFazerDescending);


/** Sort FazerMenu in ascending order */
const sortFazerAscending = () => {
  const sorted = sortArray('asc', fazerMenu);
  displayFazerMenu(sorted);
};

fazerAscBtn.addEventListener('click', sortFazerAscending);


/** Display days gluten free meals when pressing button */
const displayGlutenFreeMeals = () => {
  console.log('gluten', glutenFreeMeals);
  fazerKaramalmiList.textContent = glutenFreeMeals;
};

fazerGlutenFreeBtn.addEventListener('click', displayGlutenFreeMeals);


export{createFazerMenu};
