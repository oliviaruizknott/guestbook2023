import { useEffect } from "react";
import { useGetValue, setValue } from "./hooks/useHaxademicStore";
import { useStoreListeners } from "./hooks/useStoreListeners";
import AppStoreDebug from "./components/debug/AppStoreDebug";
import Guests from "./components/Guests";
import Connections from "./components/Connections";
import Calendar from "./components/Calendar";
import Moments from "./components/Moments";

import guestsData from "../data/guests_data.json";
import momentsData from "../data/moments_data.json";
import calendarData from "../data/calendar_data.json";

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
  }, [appStoreConnected, guestsData, momentsData, calendarData]);

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
            height: "800px",
            overflow: "hidden",
          }}
        >
          <Guests />
          {GUEST_1 && <Connections />}
          {GUEST_1 && <Moments />}
        </div>
      </div>
    </div>
  );
};

export default App;
