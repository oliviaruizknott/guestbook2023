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

  const guestKey = data.readerId === 2 ? "GUEST_2" : "GUEST_1";
  const guestValue = data.value ? idMap[data.value] : "";

  wsServer.sendToAll(
    JSON.stringify({
      key: guestKey,
      value: guestValue,
      type: "string",
      store: "true",
    })
  );
};

nfcReader.setOnCardCallback(processNfcData);
