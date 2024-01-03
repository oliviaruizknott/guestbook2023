import { useCallback, useEffect, useState } from "react";
import "./AppStoreDebug.css";

const AppStoreDebug = () => {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key == "/") setShowing((prevShowing) => !prevShowing);
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  const handleDebugClick = useCallback((e) => {
    _store && !showing && console.log(_store.state);
    setShowing((prevShowing) => !prevShowing);
  });

  const renderTable = () => {
    if (!_store) return <div>There is no _store.</div>;

    const rows = [];
    for (let storeKey in _store.state) {
      let val = _store.state[storeKey];

      if (val && typeof val == "object") {
        val = JSON.stringify(val);
      }

      if (val && typeof val == "string" && val.length && val.length > 100) {
        val = `${val.substring(0, 100)}...`; // special display for long strings
      }

      rows.push(
        <tr key={storeKey}>
          <td>{storeKey}</td>
          <td>{val}</td>
        </tr>
      );
    }

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <>
      <div id="socket-indicator" onClick={handleDebugClick}></div>
      {showing && <div id="debug-panel">{renderTable()}</div>}
    </>
  );
};

export default AppStoreDebug;
