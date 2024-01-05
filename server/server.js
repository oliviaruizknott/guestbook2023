import fs from "fs";

import WsServer from "./wsServer.js";
import NfcReader from "./nfcReader.js";

const idMap = JSON.parse(
  fs.readFileSync("./nfc_guest_ids.json", { encoding: "utf8" })
);

// this file starts a websocket server and initializes the nfc reader
const wsServer = new WsServer();
const nfcReader = new NfcReader();

const processNfcData = (data) => {
  console.log(`[SERVER]: received data from nfc reader: ${data}`);
  data = JSON.parse(data);
  if (data.key === "NFC_UID") {
    if (!data.value) {
      wsServer.sendToAll(
        JSON.stringify({
          key: "GUEST_1",
          value: "",
          type: "string",
          store: "true",
        })
      );
    }

    const guestId = idMap[data.value];
    console.log(`[SERVER]: guestId is ${guestId}`);
    wsServer.sendToAll(
      JSON.stringify({
        key: "GUEST_1",
        value: guestId,
        type: "string",
        store: "true",
      })
    );
  }
};

nfcReader.setOnCardCallback(processNfcData);
