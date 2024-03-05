import document from "document";
import * as messaging from "messaging";

import * as clock from "./components/clock";

const timeHM = document.getElementById("timeHM");
const timeSec = document.getElementById("timeSec");
const date = document.getElementById("date");

clock.initialize(
  "seconds",
  "longDate",
  ({ timeHM: timeHMString, timeSec: timeSecString, date: dateString }) => {
    timeHM.text = timeHMString;
    timeSec.text = timeSecString;
    date.text = dateString;
  }
);

messaging.peerSocket.addEventListener("message", (event) => {
  if (!event.data) {
    return;
  }

  const value = JSON.parse(event.data.value);

  if (event.data.key === "dateFormat") {
    const v = value.selected[0] === 0 ? "shortDate" : "longDate";
    clock.initialize(
      "seconds",
      v,
      ({ timeHM: timeHMString, timeSec: timeSecString, date: dateString }) => {
        timeHM.text = timeHMString;
        timeSec.text = timeSecString;
        date.text = dateString;
      }
    );
  }
});
