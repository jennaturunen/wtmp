const coursesEn = [
  'Hamburger, cream sauce and poiled potates',
  'Goan style fish curry and whole grain rice',
  'Vegan Chili sin carne and whole grain rice',
  'Broccoli puree soup, side salad with two napas',
  'Lunch baguette with BBQ-turkey filling',
  'Cheese / Chicken / Vege / Halloum burger and french fries'
];

const coursesFi = [
  'Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa',
  'Goalaista kalacurrya ja täysjyväriisiä',
  'vegaani Chili sin carne ja täysjyväriisi',
  'Parsakeittoa,lisäkesalaatti kahdella napaksella',
  'Lounaspatonki BBQ-kalkkuna täytteellä',
  'Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset'
];

const menus = document.querySelectorAll('.menuList');

// Create All Menus
const createAllMenus = array => {
  for (const list of menus) {
    list.innerHTML = '';

    for (const meals of array) {
      const meal = document.createElement('p');
      meal.textContent = meals;
      list.appendChild(meal);
    }
  }
};

// By default create all menus in Finnish
createAllMenus(coursesFi);

// Change/create one specific menu
const changeMenu = (place, array) => {
  place.innerHTML = '';

  for (const meals of array) {
    const meal = document.createElement('p');
    meal.textContent = meals;
    place.appendChild(meal);
  }
};

// Sort menu-arrays in wanted order
const sortArray = (sort, array) => {
  array.sort();

  if (sort === 'asc') {
    array.reverse();
  }

  return array;
};

// Select and return the random dish
const chooseRandomDish = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Choose the action based on className
const checkClass = e => {
  const target = e.target;

  // Change the language by pressing button
  if (target.className === 'language') {
    const nav = target.parentNode;
    const menuArea = nav.nextElementSibling.nextElementSibling;
    const lang = target.textContent;

    if (lang === 'ENG') {
      target.textContent = 'FI';
      changeMenu(menuArea, coursesEn);
    } else {
      target.textContent = 'ENG';
      changeMenu(menuArea, coursesFi);
    }
  }

  // Show/hide dropdown for sorting
  if (target.className === 'sort') {
    target.nextElementSibling.classList.toggle('show');
  }

  // Sort menu in ascending order
  if (target.className === 'asc') {
    const dropdownContentDiv = target.parentNode;
    const dropDiv = dropdownContentDiv.parentNode;
    const nav = dropDiv.parentNode;
    const menuArea = nav.nextElementSibling.nextElementSibling;

    const lang = nav.firstElementChild.innerHTML;

    if (lang === 'ENG') {
      const sorted = sortArray('asc', coursesFi);
      changeMenu(menuArea, sorted);
    }

    if (lang === 'FI') {
      const sorted = sortArray('asc', coursesEn);
      changeMenu(menuArea, sorted);
    }
  }

  // Create menu in descending order
  if (target.className === 'desc') {
    const dropdownContentDiv = target.parentNode;
    const dropDiv = dropdownContentDiv.parentNode;
    const nav = dropDiv.parentNode;
    const menuArea = nav.nextElementSibling.nextElementSibling;

    const lang = nav.firstElementChild.innerHTML;

    if (lang === 'ENG') {
      const sorted = sortArray('desc', coursesFi);
      changeMenu(menuArea, sorted);
    }

    if (lang === 'FI') {
      const sorted = sortArray('desc', coursesEn);
      changeMenu(menuArea, sorted);
    }
  }

  // Choose a random dish from array and display it
  if (target.className === 'random') {
    let random;
    const lang = target.previousElementSibling.textContent;

    if (lang === 'FI') {
      random = chooseRandomDish(coursesEn);
    } else {
      random = chooseRandomDish(coursesFi);
    }

    const nav = target.parentNode;
    const menuArea = nav.nextElementSibling.nextElementSibling;
    menuArea.textContent = random;
  }
};

window.addEventListener('click', checkClass);
