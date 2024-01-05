import { NFC } from "nfc-pcsc";

export default class NfcReader {
  constructor() {
    this.nfc = null;
    this.onCardCallback = null;
    this.initialize();
  }

  initialize() {
    this.nfc = new NFC(); // optionally you can pass logger
    this.nfc.on("reader", (reader) => {
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

          if (this.onCardCallback) {
            this.onCardCallback(
              JSON.stringify({
                key: "NFC_UID",
                value: card.uid,
                type: "string",
                store: "true",
              })
            );
          }
        } catch (err) {
          console.error(`error when reading data`, err);
        }
      });

      reader.on("card.off", (card) => {
        console.log(`${reader.reader.name}  card removed`);

        if (this.onCardCallback) {
          this.onCardCallback(
            JSON.stringify({
              key: "NFC_UID",
              value: "",
              type: "string",
              store: "true",
            })
          );
        }
      });

      reader.on("error", (err) => {
        console.log(`${reader.reader.name}  an error occurred`, err);
      });

      reader.on("end", () => {
        console.log(`${reader.reader.name}  device removed`);
      });
    });

    this.nfc.on("error", (err) => {
      console.log("an error occurred", err);
    });
  }

  setOnCardCallback(callback) {
    this.onCardCallback = callback;
  }
}
