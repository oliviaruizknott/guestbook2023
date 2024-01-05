import WebSocket, { WebSocketServer } from "ws";

const GREEN = "42m";
const RED = "41m";

export default class WsServer {
  constructor(port = null) {
    this.wssPort = port || 8082;
    this.wss = null;
    this.clients = {};
    this.onConnectionCallback = null;
    this.onMessageCallback = null;
    this.initialize();
    this.sendToAll = this.sendToAll.bind(this);
  }

  eventLog(msg, color = GREEN) {
    console.log("===================================");
    console.log(`\x1b[${color}%s\x1b[0m`, ` ${msg} `);
    console.log("===================================");
  }

  sendToAll(data, isBinary = false) {
    this.eventLog(`[JSON OUT]: ${data}`);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  }

  initialize() {
    this.wss = new WebSocketServer({ port: this.wssPort });
    this.eventLog(`WebSocket server is listening on port ${this.wssPort}`);

    this.wss.on("connection", (ws, req) => {
      const clientIp = req.connection.remoteAddress;
      const id = Math.random().toString(36).substr(2, 7);
      this.clients[clientIp] = id;

      this.eventLog(`👋 New client connected! ${clientIp}`);
      console.log("Number of clients: ", this.wss.clients.size);
      console.log(this.clients);

      ws.send(JSON.stringify(`👋 Welcome to the server!`));
      if (this.onConnectionCallback) {
        this.onConnectionCallback();
      }

      ws.on("message", (data, isBinary) => {
        // log the message to the server console
        console.log(`[JSON IN]: ${data}`);

        // relay message to all clients
        this.sendToAll(data, isBinary);
        if (this.onMessageCallback) {
          this.onMessageCallback(data);
        }
      });

      ws.on("close", () => {
        this.eventLog(" 💔 Client has disconnected.", RED);

        delete this.clients[clientIp];
        console.log("Number of clients: ", this.wss.clients.size);

        this.sendToAll(JSON.stringify(`💔 Someone left.`));
      });
    });
  }

  setOnConnectionCallback(callback) {
    this.onConnectionCallback = callback;
  }

  setOnMessageCallback(callback) {
    this.onMessageCallback = callback;
  }
}
