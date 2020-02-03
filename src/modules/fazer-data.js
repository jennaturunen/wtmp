import FazerFiMenu from '../assets/json-data/fazer-fi';
import FazerEngMenu from '../assets/json-data/fazer-eng';

/** Save one days menu to array for later use */
let finnishMenuArray = [];
let englishMenuArray = [];

/**
 * Loop throw all the meals and push the meals and diets to array
 * @param {*} arrayMeals - Meals part from json-file
 * @param {*} language - Wanted language
 */
const loopTheMeals = (arrayMeals, language) => {
  console.log(arrayMeals);

  const names = arrayMeals.join(', ');
  console.log('names', names.Name);
  for (const meals of arrayMeals) {
    const diets = meals.Diets.join(', ');

    if (language === 'FI') {
      finnishMenuArray.push([[names, diets]]);
    } else {
      englishMenuArray.push([[meals.Name, diets]]);
    }
  };
};


/**
 * Create FazerMenus to correct arrays in wanted language and pick the day
 * @param {*} language - Wanted language of the menu
 * @param {*} dayOfWeek - Choose which days menu to get
 */
const createFazerMenu = (language, dayOfWeek) => {
  let lunchList = '';
  if (language === 'FI') {
    lunchList = FazerFiMenu.LunchMenus[dayOfWeek].SetMenus;
    for (const dish of lunchList) {
      loopTheMeals(dish.Meals, 'FI');
    }
  } else {
    lunchList = FazerEngMenu.LunchMenus[dayOfWeek].SetMenus;
    for (const dish of lunchList) {
      loopTheMeals(dish.Meals, 'ENG');
    }
  }

};

console.log('menu', FazerEngMenu);

// Get the menus to the arrays
createFazerMenu('FI', 0);
createFazerMenu('EN', 0);

const FazerData = {finnishMenuArray, englishMenuArray};

export default FazerData;
