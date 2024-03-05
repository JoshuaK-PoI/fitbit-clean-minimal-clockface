import clock from "clock";
import { preferences } from "user-settings";
import { intl } from "../intl/en-US";

let dateFormat: string, clockCallback: (arg0: { timeHM: string; timeSec: string; date: string; }) => void;

function zeroPad(i: number): number | string {
  if (i < 10) {
    return "0" + i;
  }
  return i;
}

/**
 * @param {"off" | "seconds" | "minutes" | "hours"} granularity The granularity of the clock
 * @param {"shortDate" | "longDate"} dateFormatString The format of the date
 * @param {function({ timeHM: string, timeSec: string, date: string})} callback
 * @TODO: Use TypeScript to define types instead of using JSDoc
 */
export function initialize(granularity, dateFormatString, callback) {
  dateFormat = dateFormatString;
  clock.granularity = granularity;
  clockCallback = callback;
  clock.addEventListener("tick", updateClock);
}

function updateClock(event) {
  const today = event.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  } else {
    hours = zeroPad(hours);
  }

  const minutes = zeroPad(today.getMinutes());
  const seconds = zeroPad(today.getSeconds());

  let timeHMString = `${hours}:${minutes}`;
  let timeSecString = `${seconds}`;
  let dateString = "";

  const month = today.getMonth();
  const day = today.getDay();
  switch (dateFormat) {
    case "shortDate":
      dateString = `${intl.clock.date.day.short[day]} ${
        intl.clock.date.month.short[month]
      } ${today.getDate()}`;
      break;
    case "longDate":
      dateString = `${intl.clock.date.day.long[day]} ${
        intl.clock.date.month.long[month]
      } ${today.getDate()}`;
      break;
    default:
      dateString = "";
  }

  clockCallback({
    timeHM: timeHMString,
    timeSec: timeSecString,
    date: dateString,
  });
}
