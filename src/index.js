import {createSodexoMenu, getSodexoMenu} from './modules/sodexo-data';
import {createFazerMenu} from './modules/fazer-data';


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


export {chooseRandomDish, sortArray};
