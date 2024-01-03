import { useEffect } from "react";
import { useGetValue, setValue } from "./hooks/useHaxademicStore";
import { useStoreListeners } from "./hooks/useStoreListeners";
import AppStoreDebug from "./components/debug/AppStoreDebug";
import Guests from "./components/Guests";
import Connections from "./components/Connections";
import Calendar from "./components/Calendar";
import Moments from "./components/Moments";

import guestsData from "./data/guests_data.json";
import momentsData from "./data/moments_data.json";

const App = () => {
  const appStoreConnected = useGetValue("AppStoreDistributed_CONNECTED", null);
  const NFC_UID = useGetValue("NFC_UID", null);
  useStoreListeners();

  // at app start, populate the store with our json data
  useEffect(() => {
    if (!appStoreConnected) return;
    setValue("GUESTS_DATA", guestsData);
    setValue("MOMENTS_DATA", momentsData);
  }, [appStoreConnected]);

  return (
    <div className="App">
      <AppStoreDebug />
      <h3>NFC UID: {NFC_UID || "NOT FOUND"}</h3>
      <div style={{ display: "flex", minHeight: "1000px" }}>
        <Guests />
        <Connections />
        <Calendar />
        <Moments />
      </div>
    </div>
  );
};

export default App;
