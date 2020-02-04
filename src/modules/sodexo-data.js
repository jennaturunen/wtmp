import SodexoMenu from '../assets/json-data/sodexo';

/**
 * Create arrays for days menu
 */
let finnishMenuArray = [];
let englishMenuArray = [];

/**
 * Push dishes and allergies to arrays in both language
 */
const getSodexoMenu = () => {
  for (const lunches in SodexoMenu.courses) {
    finnishMenuArray.push(SodexoMenu.courses[lunches].title_fi + ` (${SodexoMenu.courses[lunches].properties})`);
    englishMenuArray.push(SodexoMenu.courses[lunches].title_en + ` (${SodexoMenu.courses[lunches].properties})`);
  }
};

getSodexoMenu();

console.log(finnishMenuArray);
//console.log(englishMenuArray);

const SodexoData = {finnishMenuArray, englishMenuArray};

export default SodexoData;
