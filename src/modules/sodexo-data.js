'use strict';

import { fetchMenuData } from './network-data';

const daysURL = 'https://www.sodexo.fi/ruokalistat/output/daily_json/152/';
const weeklyURL = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/152';

/**
 * Push days menu to array
 * @param {*} menu - JSON-file that contains days every meal in both languages
 * @param {*} language - Wanted language of the menu
 * @returns list of the days menu in wanted language
 */
const getDaysMenuArray = (menu, language) => {
  let daysList = [];

  for (const lunches in menu.courses) {
    if (language === 'FI') {
      daysList.push(menu.courses[lunches].title_fi + ` (${menu.courses[lunches].properties})`);
    } else {
      daysList.push(menu.courses[lunches].title_en + ` (${menu.courses[lunches].properties})`);
    }
  }

  return daysList;
};

/**
 *  Return weeks menus in an array
 * @param {*} menu - JSON-data of the weeks menus
 * @param {*} language - Wanted language of the menu
 * @returns list of the restaurants weekly menu in wanted language
 */
const getWeeklyMenuArray = (menu, language) => {
  let weeklyList = [];

  for (const day in menu.mealdates) {
    // Create own arrays for every day and push the days name and meals to it
    let daysList = [];

    const meals = Object.values(menu.mealdates[day].courses);

    for (const meal of meals) {
      if (language === 'EN') {
        daysList.push(meal.title_en + ` (${meal.properties})`);
      } else {
        daysList.push(meal.title_fi + ` (${meal.properties})`);
      }
    }

    // Push days array to weeklyList
    weeklyList.push(daysList);
  }

  return weeklyList;
};

/**
 *
 * @param {*} wantedMenu - Day or weekly menu
 * @param {*} language - Wanted language of the menu
 * @returns - Array of the wanted menu in correct language
 */
const getData = async (wantedMenu, language) => {
  // Get todays date in YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10);

  try {
    let response;
    // Get the JSON from network-data.js and convert it to array in correct language
    if (wantedMenu === 'day') {
      const menuJSON = await fetchMenuData(`${daysURL}${today}`); // get todays data (empty on the weekends)
      response = getDaysMenuArray(menuJSON, language);
    } else {
      const weeklyMenuJSON = await fetchMenuData(weeklyURL);
      response = getWeeklyMenuArray(weeklyMenuJSON, language);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const SodexoData = { getData };

export default SodexoData;
