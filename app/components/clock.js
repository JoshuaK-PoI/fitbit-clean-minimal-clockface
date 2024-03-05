import clock from "clock";
import { preferences } from "user-settings";
import { intl } from "../intl/en-US";

let dateFormat, clockCallback;

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

/**
 * @param {"off" | "seconds" | "minutes" | "hours"} granularity The granularity of the clock
 * @param {"shortDate" | "longDate"} dateFormatString The format of the date
 * @param {function({ timeHM: string, timeSec: string, date: string})} callback
 */
export function initialize(granularity, dateFormatString, callback) {
  dateFormat = dateFormatString;
  clock.granularity = granularity;
  clockCallback = callback;
  clock.addEventListener("tick", updateClock);
}

function updateClock(event) {
  const today = event.date;
  const hours = today.getHours();
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

  if (preferences.showSeconds) {
    timeString += `:${seconds}`;
  }

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
