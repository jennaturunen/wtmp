'use strict';

/**
 * Fetch menu and convert it to json
 */
const fetchMenuData = async (url) => {
  try {
    const loadedData = await fetch(url);
    const json = await loadedData.json();
    return json;
  }
  catch (e) {
    console.log('error', e.message);
  }
};


export {fetchMenuData};

