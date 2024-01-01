console.log("Server-side code running");

import WebSocket, { WebSocketServer } from "ws";
import { NFC } from "nfc-pcsc";

//////////////////////////////////////////
// WEBSOCKET SERVER
//////////////////////////////////////////
const GREEN = "42m";
const RED = "41m";

const eventLog = (msg, color = GREEN) => {
  console.log("===================================");
  console.log(`\x1b[${color}%s\x1b[0m`, ` ${msg} `);
  console.log("===================================");
};

const wssPort = 8082;
const wss = new WebSocketServer({ port: wssPort });
eventLog(`WebSocket server is listening on port ${wssPort}`);

const clients = {};

const sendToAll = (data, isBinary = false) => {
  eventLog(`[JSON OUT]: ${data}`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, { binary: isBinary });
    }
  });
};

wss.on("connection", (ws, req) => {
  const clientIp = req.connection.remoteAddress;
  const id = Math.random().toString(36).substr(2, 7);
  clients[clientIp] = id;

  eventLog(`👋 New client connected! ${clientIp}`);
  console.log("Number of clients: ", wss.clients.size);
  console.log(clients);

  ws.send(JSON.stringify(`👋 Welcome to the server!`));

  ws.on("message", (data, isBinary) => {
    // log the message to the server console
    console.log(`[JSON IN]: ${data}`);

    // relay message to all clients
    sendToAll(data, isBinary);
  });

  ws.on("close", () => {
    eventLog(" 💔 Client has disconnected.", RED);

    delete clients[clientIp];
    console.log("Number of clients: ", wss.clients.size);

    sendToAll(JSON.stringify(`💔 Someone left.`));
  });
});

//////////////////////////////////////////
// NFC READER
//////////////////////////////////////////

const nfc = new NFC(); // optionally you can pass logger

nfc.on("reader", (reader) => {
  console.log(`${reader.reader.name}  device attached`);

  reader.on("card", async (card) => {
    // card is object containing following data
    // [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
    // [always] String standard: same as type
    // [only TAG_ISO_14443_3] String uid: tag uid
    // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

    console.log(`${reader.reader.name}  card detected`, card);

    try {
      // example reading 12 bytes assuming containing text in utf8
      // const data = await reader.read(4, 12); // starts reading in block 4, continues to 5 and 6 in order to read 12 bytes

      // example reading up to 100 bytes
      const data = await reader.read(0, 100);

      console.log(`data read`, data);
      const payload = data.toString(); // utf8 is default encoding
      console.log(`data converted `, payload);

      sendToAll(
        JSON.stringify({
          key: "NFC_UID",
          value: card.uid,
          type: "string",
          store: "true",
        })
      );
    } catch (err) {
      console.error(`error when reading data`, err);
    }
  });

  reader.on("card.off", (card) => {
    console.log(`${reader.reader.name}  card removed`);
  });

  reader.on("error", (err) => {
    console.log(`${reader.reader.name}  an error occurred`, err);
  });

  reader.on("end", () => {
    console.log(`${reader.reader.name}  device removed`);
  });
});

nfc.on("error", (err) => {
  console.log("an error occurred", err);
});
