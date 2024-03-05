import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";

settingsStorage.addEventListener("change", (event) => {
    if (event.key === null) {
        console.error("Event key is null");
        return;
    }
    
    sendValue(event.key, event.newValue);
});

if (companion.launchReasons.settingsChanged) {
    sendValue("dateFormat", settingsStorage.getItem("dateFormat"));
}

function sendValue(key: string, value: unknown) {
    if (!value) return;

    sendSettingData({
        key,
        value
    });
}

function sendSettingData(data: { key: string; value: unknown }) {
    if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) {
        console.error("No peerSocket connection");
        throw new Error("No peerSocket connection");
    }

    messaging.peerSocket.send(data);
}