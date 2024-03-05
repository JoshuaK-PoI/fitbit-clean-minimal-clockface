import document from "document";
import * as messaging from "messaging";

import * as clock from "./components/clock";

const timeHM = document.getElementById("timeHM");
const timeSec = document.getElementById("timeSec");
const date = document.getElementById("date");

function initClock(dateFormat: "shortDate" | "longDate") {
  clock.initialize(
    "seconds",
    dateFormat,
    ({ timeHM: timeHMString, timeSec: timeSecString, date: dateString }) => {
      if (timeHM === null || timeSec === null || date === null) {
        console.error("Elements not found");
        return;
      }
  
      timeHM.text = timeHMString;
      timeSec.text = timeSecString;
      date.text = dateString;
    }
  );
}

initClock("shortDate");

messaging.peerSocket.addEventListener("message", (event) => {
  if (!event.data) {
    return;
  }

  const value = JSON.parse(event.data.value);

  if (event.data.key === "dateFormat") {
    initClock( value.selected[0] === 0 ? "shortDate" : "longDate");
    return;
  }

  console.error("Unknown event data key: " + event.data.key);
});
