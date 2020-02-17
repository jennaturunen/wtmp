'use strict';

import { fetchMenuData } from './network-data';

const proxyURL = 'https://cors-anywhere.herokuapp.com/';
const fiURL = 'https://www.fazerfoodco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=';
const enURL ='https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=';

/**
 * Create days Fazermenu in a list
 * @param {*} menuData - JSON-data of the days menus in wanted language
 * @returns List of the days meals in a string
 */
const getDaysMenu = async menuData => {
  // Get the index of the current day
  const dayOfWeek = new Date().getDay();

  // Get the Finnish menu
  let listOfDaysMenu = menuData.LunchMenus[dayOfWeek - 1].SetMenus.map(
    setMenu => {
      // Go through meals and pick meal names and diets
      let meals = setMenu.Meals.map(
        meal => `${meal.Name} (${meal.Diets.join(', ')})`
      );
      // Convert meals array to string separated by commas
      meals = meals.join(', ');
      return meals;
    }
  );

  return listOfDaysMenu;
};


/**
 * Create weekly Fazer-menu in an array
 * @param {*} menuData JSON-data of the weekly menus
 * @returns Array that includes every days meals
 */
const getWeeklyMenuArray = async (menuData) => {
  let weeklyMenuArray = [];

  // Get the daily menus
  for (const day of menuData.LunchMenus) {
    let dailyMenuArray = day.SetMenus.map(setMenu => {
      // Go through meals and pick meal names and diets
      let meals = setMenu.Meals.map(
        meal => `${meal.Name} (${meal.Diets.join(', ')})`
      );
      // Convert meals array to string separated by commas
      meals = meals.join(', ');
      return meals;
    });

    // Add the menu of the day to the weekly-list
    weeklyMenuArray.push(dailyMenuArray);
  }

  // Remove weekends from the list
  weeklyMenuArray = weeklyMenuArray.slice(0, 5);
  return weeklyMenuArray;
};


/**
 * Get and return the wanted FazerMenu
 * @param {*} wantedMenu - day or weekly menu
 * @param {*} language - Wanted language of the menu
 * @returns Wanted menu in a daily-string or weekly-array in correct language
 */
const getData = async (wantedMenu, language) => {
  // Get todays date in YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10);

  try {
    let response;
    let menuJSON;

    // Get menu in Finnish
    if (language === 'FI') {
      // Get the JSON from network-data.js and convert it to daily-string or weekly-array
      menuJSON = await fetchMenuData(proxyURL + fiURL + today); // get todays data (empty on the weekends)
      if (wantedMenu === 'day') {
        response = getDaysMenu(menuJSON);
      } else {
        response = getWeeklyMenuArray(menuJSON);
      }
      // Get menu in English
    } else {
      // Get the JSON from network-data.js and convert it to daily-string or weekly-array
      menuJSON = await fetchMenuData(proxyURL + enURL + today);
      if (wantedMenu === 'day') {
        response = getDaysMenu(menuJSON);
      } else {
        response = getWeeklyMenuArray(menuJSON);
      }
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const FazerData = { getData };

export default FazerData;
