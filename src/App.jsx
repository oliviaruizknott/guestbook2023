import { useGetValue, setValue } from "./hooks/useHaxademicStore";
import AppStoreDebug from "./components/debug/AppStoreDebug";

const App = () => {
  const nfcUid = useGetValue("NFC_UID", null);

  return (
    <div className="App">
      <AppStoreDebug />
      <h3>NFC UID: {nfcUid || "NOT FOUND"}</h3>
    </div>
  );
};

export default App;
