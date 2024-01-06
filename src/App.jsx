import { useEffect } from "react";
import { useGetValue, setValue } from "./hooks/useHaxademicStore";
import { useStoreListeners } from "./hooks/useStoreListeners";
import AppStoreDebug from "./components/debug/AppStoreDebug";
import Guests from "./components/Guests";
import Connections from "./components/Connections";
import Calendar from "./components/Calendar";
import Moments from "./components/Moments";
import Key from "./components/Key";

import guestsData from "../data/guests_data.json";
import momentsData from "../data/moments_data.json";
import calendarData from "../data/calendar_data.json";
import overnightsData from "../data/overnights_data.json";

const App = () => {
  const appStoreConnected = useGetValue("AppStoreDistributed_CONNECTED", null);
  const GUEST_1 = useGetValue("GUEST_1", null);
  useStoreListeners();

  // at app start, populate the store with our json data
  useEffect(() => {
    if (!appStoreConnected) return;
    setValue("GUESTS_DATA", guestsData);
    setValue("MOMENTS_DATA", momentsData);
    setValue("CALENDAR_DATA", calendarData);
    setValue("OVERNIGHTS_DATA", overnightsData);
  }, [appStoreConnected, guestsData, momentsData, calendarData]);

  // add key down listeners: remove guest 1 when 1 is pressed, remove guest 2 when 2 is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "1") setValue("GUEST_1", null);
      if (e.key === "2") setValue("GUEST_2", null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="App">
      <AppStoreDebug />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "20px",
          height: "calc(100vh - 2rem)",
        }}
      >
        <Calendar />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            gap: "10px",
            height: "788px",
            overflow: "hidden",
          }}
        >
          <Guests />
          {GUEST_1 && <Connections />}
          {GUEST_1 && <Moments />}
        </div>
      </div>
      <Key />
    </div>
  );
};

export default App;
