// THIS IS THE SERVER FILE!
import fs from "fs";
import WsServer from "../server/wsServer.js";
import NfcReader from "../server/nfcReader.js";

// get the data from ./guests_data.json and store it in a variable
const guestsData = JSON.parse(
  fs.readFileSync("./data/guests_data.json", { encoding: "utf8" })
);

const idData = JSON.parse(
  fs.readFileSync("./data/nfc_guest_ids.json", { encoding: "utf8" })
);

class NFCConfigurator {
  constructor() {
    this.wsServer = null;
    this.nfcReader = null;

    this.selectedGuestId = null;
    this.scannedNfcUid = null;

    this.guestsData = guestsData;
    this.idData = idData;

    this.processWsMessage = this.processWsMessage.bind(this);
    this.onCardRead = this.onCardRead.bind(this);
    this.processNfcData = this.processNfcData.bind(this);
    this.writeIdDataToFile = this.writeIdDataToFile.bind(this);
    this.writeNfcIdToGuestData = this.writeNfcIdToGuestData.bind(this);
    this.sendGuestsData = this.sendGuestsData.bind(this);

    this.initialize();
    console.log("[NFC CONFIGURATOR]: we’re initialized!");
  }

  initialize() {
    this.wsServer = new WsServer();
    this.nfcReader = new NfcReader();
    this.wsServer.onConnectionCallback = this.sendGuestsData;
    this.wsServer.onMessageCallback = this.processWsMessage;
    this.nfcReader.onCardCallback = this.onCardRead;
  }

  processWsMessage(data) {
    data = JSON.parse(data);
    if (data.key === "CONFIGURE_GUEST_ID") {
      this.selectedGuestId = data.value;
      console.log(
        `[NFC CONFIGURATOR]: selectedGuestId set to ${this.selectedGuestId}`
      );
    }
  }

  processNfcData(data) {
    console.log(`[NFC CONFIGURATOR]: received data from nfc reader: ${data}`);
    data = JSON.parse(data);
    if (data.key === "NFC_UID" && data.value) {
      this.scannedNfcUid = data.value;
      console.log(
        `[NFC CONFIGURATOR]: scannedNfcUid set to ${this.scannedNfcUid}`
      );

      if (this.selectedGuestId) {
        this.idData[this.scannedNfcUid] = this.selectedGuestId;
        this.writeIdDataToFile(this.idData);
        this.writeNfcIdToGuestData(this.selectedGuestId, this.scannedNfcUid);
        console.log(
          `[NFC CONFIGURATOR]: scannedNfcUid (${this.scannedNfcUid}) set to selectedGuestId(${this.selectedGuestId})`
        );
      }
    }
  }

  onCardRead(data) {
    // when the nfc reader reads a card, send the data to all websocket clients
    // then process the data
    this.wsServer.sendToAll(data);
    this.processNfcData(data);
  }

  // write the guest data to a json file in this folder called nfc_guest_ids.json
  // the file will be created if it doesn't exist
  // if it does exist, it will be overwritten
  writeIdDataToFile(idData) {
    console.log(
      `[NFC CONFIGURATOR]: writing idData to nfc_guest_ids.json: ${idData}`
    );

    fs.writeFile(
      "./data/nfc_guest_ids.json",
      JSON.stringify(idData),
      "utf8",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`[NFC CONFIGURATOR]: wrote idData to nfc_guest_ids.json`);
        }
      }
    );
  }

  // write the nfcId to the guest data
  writeNfcIdToGuestData(guestId, nfcId) {
    this.guestsData[guestId].nfcId = nfcId;
    this.sendGuestsData();

    // also save this back to the guests_data.json file
    fs.writeFile(
      "./data/guests_data.json",
      JSON.stringify(this.guestsData),
      "utf8",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `[NFC CONFIGURATOR]: wrote nfcId ${nfcId} to guests_data.json`
          );
        }
      }
    );
  }

  sendGuestsData() {
    console.log("Sending guests data to client");
    this.wsServer.sendToAll(
      JSON.stringify({
        key: "GUESTS_DATA",
        value: this.guestsData,
        type: "object",
        store: "true",
      })
    );
  }
}

new NFCConfigurator();
