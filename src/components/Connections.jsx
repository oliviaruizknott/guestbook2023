import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Connections = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);

  const renderConnections = useCallback(() => {
    if (!GUESTS_DATA || !GUEST_1) return;
    const guestConnections = GUESTS_DATA[GUEST_1].connections;

    return (
      <div>
        {Object.entries(guestConnections)
          .sort((a, b) => b[1].count - a[1].count)
          .map(([key, value]) => {
            return (
              <div key={key}>
                {value.count} {value.name}
              </div>
            );
          })}
      </div>
    );
  }, [GUESTS_DATA, GUEST_1]);

  return (
    <div className="Connections quarter">
      <div>CONNECTIONS</div>
      {GUEST_1 && renderConnections()}
    </div>
  );
};

export default Connections;
