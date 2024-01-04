import guestsData from "../data/guests_data.json";
import AppStoreDistributed from "../haxademic/app-store-distributed";

const store = new AppStoreDistributed(
  `ws://${import.meta.env.VITE_IP_ADDRESS || "localhost"}:${
    import.meta.env.VITE_WS_PORT || 8082
  }`
);

class NFCConfigurator {
  constructor() {
    console.log("I’m in the NFC Configurator!");
    this.guestsData = guestsData;
    this.highlightedGuest = null;
    this.store = store;
  }

  // for each key in guestsData, make a new row that displays the id, name, and nfcId of the guest
  renderGuests() {
    // Get the table from the HTML file
    let table = document.getElementById("guestsTable");

    for (let key in this.guestsData) {
      let guest = this.guestsData[key];
      let row = document.createElement("tr");

      // Create cells for id, name, and nfcId
      [key, guest.nfcId, guest.name].forEach((cellText) => {
        let cell = document.createElement("td");
        cell.textContent = cellText;
        row.appendChild(cell);
      });

      // clicking the row should log the name to the console and change the background color to yellow
      row.addEventListener("click", () => {
        if (this.highlightedGuest) {
          this.highlightedGuest.style.backgroundColor = "white";
        }

        console.log(guest.name);
        this.store.set("CONFIGURE_GUEST_ID", guest.id, true);
        row.style.backgroundColor = "yellow";
        this.highlightedGuest = row;
      });

      table.appendChild(row);
    }
  }
}

new NFCConfigurator().renderGuests();
