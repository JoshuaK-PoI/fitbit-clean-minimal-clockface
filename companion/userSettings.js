import { settingsStorage } from "settings";

export function initialize(callback) {
  setDefaults();
  settingsStorage.addEventListener("change", callback);
}

export function get(key) {
  switch (key) {
    case "dateFormat":
      return value === "0" ? "shortDate" : "longDate";

    default:
      return settingsStorage.getItem(key);
  }
}

function setDefaults() {
  setDefault("dateFormat", 1); // (0 = short date, ) 1 = long date
}

/**
 *
 * @param {string} key
 * @param {number | boolean} value
 */
function setDefault(key, value) {
  if (settingsStorage.getItem(key) === null) {
    settingsStorage.setItem(key, value);
  }
}
