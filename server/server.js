console.log("Server-side code running");

import WsServer from "./wsServer.js";
import NfcReader from "./nfcReader.js";

// this file starts a websocket server and initializes the nfc reader
// the reader is given a callback function that sends the nfc data to all websocket clients
const wsServer = new WsServer();
const nfcReader = new NfcReader(wsServer.sendToAll);
