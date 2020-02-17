import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';

const randomBtn = document.querySelector('#randomBtn');
const languageButton = document.querySelector('.language');
const ascBtn = document.querySelector('#ascBtn');
const descBtn = document.querySelector('#descBtn');

// Create empty arrays for days menu
let sodexoDayMenu = [];
let fazerDayMenu = [];

// Save names of the days to an array for weekly menu
const daysInFinnish = ['Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai'];
const daysInEnglish = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


/**
 * Create restaurants menu
 * @param {*} restaurant - name of the restaurant
 * @param {*} dataArray - array of the restaurants menu
 * @returns list of the created menu for sorting...
 */
const createDailyMenu = (restaurant, dataArray) => {
  console.log('arr', dataArray);
  const place = document.querySelector(`#${restaurant}List`);
  place.innerHTML = '';

  // List updates the sodexo/fazerDayMenu-array
  const list = [];
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


/**
 * Create the whole weeks list
 * @param {*} restaurant - The restaurant which menu will be displayed
 * @param {*} weeksDataArray - Whole weeks menu in an array
 */
const createWeeklyMenu = (restaurant, language, weeksDataArray) => {
  const place = document.querySelector(`#${restaurant}WeeklyList`);
  place.innerHTML = '';
  let dayOfWeekIndex = 0;
  // Create menus for each day in different lists
  for (const day of weeksDataArray) {
    // Put days name as a header for the list in correct language
    const h3 = document.createElement('h3');

    if (language === 'FI') {
      h3.textContent = daysInFinnish[dayOfWeekIndex];
    } else {
      h3.textContent = daysInEnglish[dayOfWeekIndex];
    }

    dayOfWeekIndex++;

    const ul = document.createElement('ul');
    ul.appendChild(h3);

    for (const item of day) {
      // Create and append every dish as a list-element
      const li = document.createElement('li');
      li.textContent = item;
      ul.append(li);
      place.append(ul);
    }
  }
};


/** Change the language of every menu with the button */
languageButton.addEventListener('click', async () => {
  const lang = languageButton.textContent;

  sodexoDayMenu = createDailyMenu('sodexo', await SodexoData.getData('day', lang));
  createWeeklyMenu('sodexo', lang, await SodexoData.getData('weekly', lang));

  fazerDayMenu = createDailyMenu('fazer', await FazerData.getData('day', lang));
  createWeeklyMenu('fazer', lang, await FazerData.getData('weekly', lang));

  if (languageButton.textContent === 'EN') {
    languageButton.textContent = 'FI';
  } else {
    languageButton.textContent = 'EN';
  }
});


/** Show/hide dropdown for sorting and changing the color-theme */
const dropDownBar = document.querySelectorAll('.sort');

for (const dropDown of dropDownBar) {
  dropDown.addEventListener('click', e => {
    e.target.nextElementSibling.classList.toggle('show');
  });

}


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
  const sortedSodexo = sortArray('desc', sodexoDayMenu);
  createDailyMenu('sodexo', sortedSodexo);

  const sortedFazer = sortArray('desc', fazerDayMenu);
  createDailyMenu('fazer', sortedFazer);
});


/**
 *  Create menus in ascending order
 */
ascBtn.addEventListener('click', () => {
  const sortedSodexo = sortArray('asc', sodexoDayMenu);
  createDailyMenu('sodexo', sortedSodexo);

  const sortedFazer = sortArray('asc', fazerDayMenu);
  createDailyMenu('fazer', sortedFazer);
});


/**
 * Select and return the random dish
 * @param {array} menuArray - Array from where the random dish gets picked
 */
const chooseRandomDish = menuArray => {
  const randomIndex = Math.floor(Math.random() * menuArray.length);
  return menuArray[randomIndex];
};


/**
 *  Display random dish from both of the menus
 */
randomBtn.addEventListener('click', () => {
  const randomFazer = chooseRandomDish(fazerDayMenu);
  document.querySelector('#fazerList').textContent = randomFazer;

  const randomSodexo = chooseRandomDish(sodexoDayMenu);
  document.querySelector('#sodexoList').textContent = randomSodexo;
});


const allRestaurantContainers = document.querySelectorAll('.restaurant');
const searchByRestaurant = document.querySelector('#searchByRestaurant');
const searchByRestaurantBtn = document.querySelector('#searchRestaurantBtn');

/**
 * Compare the value user has typed to every restaurants name and show those which include the value
 */
searchByRestaurantBtn.addEventListener('click', () => {
  // Convert input value and the restaurants name to lowercase
  const searchedRestaurant = searchByRestaurant.value.toLowerCase();

  // Hide every restaurant from the page
  for (const restaurantContainer of allRestaurantContainers) {
    restaurantContainer.style.display = 'none';
    const h3 = restaurantContainer.firstElementChild.textContent.toLowerCase();

    // Show only restaurants that include the value
    if (h3.includes(searchedRestaurant)) {
      restaurantContainer.style.display = 'flex';
    }
  }
});

/**
 *  Show all restaurant lists
 */
const showAllRestaurantsBtn = document.querySelector('#showAllRestaurantsBtn');

showAllRestaurantsBtn.addEventListener('click', () => {
  for (const restaurantContainer of allRestaurantContainers) {
    restaurantContainer.style.display = 'flex';
  }
});


const allergyBtn = document.querySelector('#searchByAllergiesBtn');
const allergies = document.querySelector('#searchByAllergies');

/**
 *  Get the allergy-value user has selected and search from the daily menus all the matching dishes
 */
allergyBtn.addEventListener('click', () => {
  const allergyValue = allergies.value;

  const menus = {sodexo: sodexoDayMenu, fazer: fazerDayMenu};

  Object.entries(menus).forEach(([restaurant, menuArray]) => {
    searchByAllergy(allergyValue, restaurant, menuArray);
  });
});


/**
 * Get every dish from the menuArray that includes the allergy and display only those dishes
 * @param {*} allergyValue - Allergy property that user wants to search (Vegan, glutenfree...)
 * @param {*} place - Restaurants name
 * @param {*} menuArray - MenuArray of the restaurants dishes
 */
const searchByAllergy = (allergyValue, place, menuArray) => {
  let list = [];

  for (const dish of menuArray) {
      const splittedDish = dish.split('(');

      if (splittedDish[1].includes(allergyValue)) {
        list.push(dish);
      }
  }

  createDailyMenu(place, list);
};


/**
 *  Change color-theme by clicking the button
 *  Replace the old theme-value with the new theme
 */
const themeButtons= document.querySelectorAll('.themeBtn');

for (const themeBtn of themeButtons) {
  themeBtn.addEventListener('click', (e) => {
    const previousTheme = localStorage.getItem('theme');
    const newTheme = e.target.id;
    localStorage.setItem('theme', newTheme);
    updateUI(previousTheme);
  });

}

/**
 * Update the colors on the page by removing the previousTheme and adding the newTheme to classlist
 * @param {*} previousTheme - The previous color-theme
 */
const updateUI = (previousTheme) => {
  const newTheme = localStorage.getItem('theme');
  const infoText = document.querySelector('.info-text');
  const restaurantContainers = document.querySelectorAll('.restaurant');

  document.body.classList.remove(previousTheme);
  document.body.classList.add(newTheme);

  infoText.classList.remove(previousTheme);
  infoText.classList.add(newTheme);

  for (const restaurant of restaurantContainers) {
    restaurant.classList.remove(previousTheme);
    restaurant.classList.add(newTheme);
  }
};


/**
 *  Make every restaurant-article draggable, user can change the places of the restaurants
 */
let id;
const draggableDivs = document.querySelectorAll('.draggable');

// Allow elements to been dropped
const allowDrop = (e) => {
  e.preventDefault();
};

// When dropping the element, save the order of the restaurants to the localStorage
const drop = (e) => {
  e.target.append(document.getElementById(id));
  const draggables = document.querySelectorAll('.draggable');

  let orderInList = [];
  for (const div of draggables) {
    orderInList.push(div.id);
  }

  localStorage.setItem('order', orderInList);
};

// Save the id of the moving element
const dragStart = (e) => {
  id = e.target.id;
};


for (const restaurantContainer of allRestaurantContainers) {
  restaurantContainer.addEventListener('dragover', allowDrop);
  restaurantContainer.addEventListener('drop', drop);
}

for (const div of draggableDivs) {
  div.addEventListener('dragstart', dragStart);
}


/**
 *  When loading the page, get the last order of the restaurants and place them correctly
 */
const updateOrderOfTheRestaurants = () => {
  const orderInString = localStorage.getItem('order');
  // If user has changed the order
  if (orderInString) {
    const orderInArray = orderInString.split(',');

    for (let i = 0; i < orderInArray.length;) {
      for (const dragDiv of draggableDivs) {
        if (dragDiv.id === orderInArray[i]) {
          allRestaurantContainers[i].append(dragDiv);
          i++;
        }
      }
    }
  }
};


/**
 * Create all menus in Finnish by default
 */
const initMenus = async () => {
  try {
    sodexoDayMenu = createDailyMenu('sodexo', await SodexoData.getData('day', 'FI'));
    createWeeklyMenu('sodexo', 'FI', await SodexoData.getData('weekly', 'FI'));

    fazerDayMenu = createDailyMenu('fazer', await FazerData.getData('day', 'FI'));
    createWeeklyMenu('fazer', 'FI', await FazerData.getData('weekly', 'FI'));
  } catch (error) {
    console.log(error);
  }
};


/**
 *  When loading the page, update color-theme, order of the restaurants and the content of the menus
 */
updateUI();
updateOrderOfTheRestaurants();
initMenus();
