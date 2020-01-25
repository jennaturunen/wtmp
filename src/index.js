

// Create all menus
const menus = document.querySelectorAll('.menuList');

const createAllMenus = language => {
  for (const list of menus) {
    list.innerHTML = '';
    let dish;

    for (let meals in LunchMenu.courses) {
      if (language === 'FI') {
        dish = LunchMenu.courses[meals].title_fi;
      } else {
        dish = LunchMenu.courses[meals].title_en;
      }

      const meal = document.createElement('p');
      meal.textContent = dish;
      list.appendChild(meal);
    }
  }
};

// By default create all menus in Finnish
createAllMenus('FI');

// Change/create one specific menu
const changeMenu = (place, array) => {
  place.innerHTML = '';

  for (const meals of array) {
    const meal = document.createElement('p');
    meal.textContent = meals;
    place.appendChild(meal);
  }
};

// Change the language of the menu with button
const buttons = document.querySelectorAll('.language');

for (const btn of buttons) {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'ENG') {
      createAllMenus('ENG');
      for (const btn of buttons) {
        btn.textContent = 'FI';
      }
    } else {
      createAllMenus('FI');
      for (const btn of buttons) {
        btn.textContent = 'ENG';
      }
    }
  });
}

// Show/hide dropdown for sorting
const dropDownBars = document.querySelectorAll('.sort');

for (const dropdown of dropDownBars) {
  dropdown.addEventListener('click', e => {
    e.target.nextElementSibling.classList.toggle('show');
  });
}

// Sort menu-arrays in wanted order
const sortArray = (sort, array) => {
  array.sort();

  if (sort === 'asc') {
    array.reverse();
  }

  return array;
};

// Create menu in ascending order
const ascButtons = document.querySelectorAll('.asc');

for (const ascBtn of ascButtons) {
  ascBtn.addEventListener('click', e => {
    // Get the menuArea to display dish
    const dropdownContentDiv = e.target.parentNode;
    const dropDiv = dropdownContentDiv.parentNode;
    const nav = dropDiv.parentNode;
    const menuArea = nav.nextElementSibling.nextElementSibling;

    const lang = nav.firstElementChild.innerHTML;

    let lunchArray = [];

    if (lang === 'ENG') {
      for (let lunches in LunchMenu.courses) {
        lunchArray.push(LunchMenu.courses[lunches].title_fi);
      }
    } else {
      for (let lunches in LunchMenu.courses) {
        lunchArray.push(LunchMenu.courses[lunches].title_en);
      }
    }

    const sorted = sortArray('asc', lunchArray);
    changeMenu(menuArea, sorted);
  });
}

// Create menu in descending order
const descButtons = document.querySelectorAll('.desc');

for (const descBtn of descButtons) {
  descBtn.addEventListener('click', e => {
    // Get the menuarea to display dish
    const dropdownContentDiv = e.target.parentNode;
    const dropDiv = dropdownContentDiv.parentNode;
    const nav = dropDiv.parentNode;
    const menuArea = nav.nextElementSibling.nextElementSibling;

    const lang = nav.firstElementChild.innerHTML;

    let lunchArray = [];

    if (lang === 'ENG') {
      for (let lunches in LunchMenu.courses) {
        lunchArray.push(LunchMenu.courses[lunches].title_fi);
      }
    } else {
      for (let lunches in LunchMenu.courses) {
        lunchArray.push(LunchMenu.courses[lunches].title_en);
      }
    }

    const sorted = sortArray('desc', lunchArray);
    changeMenu(menuArea, sorted);
  });
}

// Select and return the random dish
const chooseRandomDish = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Choose a random dish from object and display it
const randomButtons = document.querySelectorAll('.random');

for (const randomBtn of randomButtons) {
  randomBtn.addEventListener('click', e => {
    let lunchArray = [];
    const lang = e.target.previousElementSibling.textContent;

    if (lang === 'FI') {
      for (let lunches in LunchMenu.courses) {
        lunchArray.push(LunchMenu.courses[lunches].title_en);
      }
    } else {
      for (let lunches in LunchMenu.courses) {
        lunchArray.push(LunchMenu.courses[lunches].title_fi);
      }
    }

    const random = chooseRandomDish(lunchArray);

    const nav = e.target.parentNode;
    const menuArea = nav.nextElementSibling.nextElementSibling;
    menuArea.textContent = random;
  });
}
