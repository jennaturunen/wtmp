import fazerMenu from './assets/fazer.json';

// TASK A

const menuArray = [
  { name: 'Lingonberry jam', price: 4.0 },
  { name: 'Mushroom and bean casserole', price: 5.5 },
  { name: 'Chili-flavoured wheat', price: 3.0 },
  { name: 'Vegetarian soup', price: 4.8 },
  { name: 'Pureed root vegetable soup with smoked cheese', price: 8.0 }
];

// First letter must be uppercase letter
// Can contain letters, numbers, commas, hyphens, white spaces, slashes and parentheses
const validateMeal = meal => {
  const pattern = /^[A-ZÖÄÅ]{1}[a-zöäå0-9,-\s\/()]{3,64}$/;
  return pattern.test(meal);
};

// Validate every dish of the menuArray
for (const meal of menuArray) {
  console.log('is it valid', validateMeal(meal.name));
}

// Sort menu in descending order
const sortedMenuDescending = menuArray.sort((a, b) => {
  return b.price - a.price;
});

console.log(sortedMenuDescending);

// Sort menu in ascending order
const sortedMenuAscending = array => {
  return [...array].reverse();
};

console.log(sortedMenuAscending(menuArray));

// Show only dishes that cost less than 5€
const cheapDishes = array => array.filter(array => array.price < 5);
console.log('show cheap dishes', cheapDishes(menuArray));

// Hard coded way to filter
const cheapMeals = menuArray.filter(menuArray => menuArray.price < 5);
console.log('hard coded cheap meals', cheapMeals);

// Raise all prices 15% (and round by two decimals)
const addToPrices = array =>
  array.map(array => (array.price * 1.15).toFixed(2));
console.log('Add to prices', addToPrices(menuArray));

// Raise all prices, hard coded array
const raisePrices = menuArray.map(menuArray => menuArray.price * 1.15);
console.log('hard coded raise', raisePrices);

// Sum all the prices using reduce
const sumPrices = array => array.reduce((sum, dish) => sum + dish.price, 0);
console.log('sum', sumPrices(menuArray));


// TASK B

// Get every vegan meal of the week

console.log(fazerMenu);
console.log(fazerMenu.LunchMenus[0].SetMenus[0].Meals[0].Name);

const days = fazerMenu.LunchMenus;
let veganDishes = [];

// Loop diets of the dishes and push vegan dishes to array
const loopTheDiets = dishes => {
  for (const diet of dishes) {
    //console.log('loop diets', diet.Diets);
    if (diet.Diets.includes('Veg')) {
      veganDishes.push(diet.Name);
    }
  }
};

// Loop dishes of the day
const loopTheDishes = menu => {
  for (const dish of menu) {
    //console.log('loop dishes', dish.Meals);
    loopTheDiets(dish.Meals);
  }
};

// Loop all the days
const loopTheDays = menu => {
  for (const day of menu) {
    const dayOfTheWeek = day.DayOfWeek;
    loopTheDishes(day.SetMenus);

    // Display vegan dishes of the day to the console
    console.log(`${dayOfTheWeek} vegaaniset ruoat: ${veganDishes}`);
    veganDishes = [];
  }
};

loopTheDays(days);


// Get only mondays vegan meals
/*
console.log(fazerMenu.LunchMenus[0].SetMenus);
const monday = fazerMenu.LunchMenus[0].SetMenus;
console.log(monday);

for (const meal of monday) {
  console.log(meal.Meals[0].Name);
  const meals = meal.Meals;

  for (const dishes of meals) {
    console.log('dishes', dishes);

    if (dishes.Diets.includes('Veg')) {
      veganDishes.push(dishes.Name);
    }
  }
};

console.log('vegan meals', veganDishes);
*/


