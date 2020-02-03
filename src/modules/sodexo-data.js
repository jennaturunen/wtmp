import SodexoMenu from '../assets/json-data/sodexo';

/**Save menu to arrays for later use*/
let finnishMenuArray = [];
let englishMenuArray = [];

/**
 * Create Sodexo-menu
 * @param {array} menuArray - Array of every meal for the day
 */
const createSodexoMenu = menuArray => {
  //console.log('menuarray', menuArray);
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

const getSodexoMenu = () => {
  for (const lunches in SodexoMenu.courses) {
    finnishMenuArray.push([[SodexoMenu.courses[lunches].title_fi,SodexoMenu.courses[lunches].properties]]);
    englishMenuArray.push([[SodexoMenu.courses[lunches].title_en,SodexoMenu.courses[lunches].properties]]);
  }
};

getSodexoMenu();

console.log(finnishMenuArray);
//console.log(englishMenuArray);

const SodexoData = {finnishMenuArray, englishMenuArray};

export default SodexoData;
