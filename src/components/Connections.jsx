import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Connections = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);
  const GUEST_2 = useGetValue("GUEST_2", null);

  const handleGuestClick = useCallback((e) => {
    const guestId = e.target.dataset.guestid;
    setValue("GUEST_2", guestId);
  }, []);

  const renderConnections = useCallback(() => {
    if (!GUESTS_DATA || !GUEST_1) return;
    const guestConnections = GUESTS_DATA[GUEST_1].connections;

    return (
      <div>
        {Object.entries(guestConnections)
          .sort((a, b) => b[1].count - a[1].count)
          .map(([key, value]) => {
            return (
              <div key={key} data-guestid={key} onClick={handleGuestClick}>
                {value.count} {value.name}
              </div>
            );
          })}
      </div>
    );
  }, [GUESTS_DATA, GUEST_1]);

  const renderConnectedGuest = useCallback(() => {
    if (!GUESTS_DATA || !GUEST_1 || !GUEST_2) return;

    return (
      <div>
        <div>{GUESTS_DATA[GUEST_2].name}</div>
        <div onClick={() => setValue("GUEST_2", null)}>X</div>
      </div>
    );
  }, [GUESTS_DATA, GUEST_1, GUEST_2]);

  return (
    <div className="Connections quarter">
      <div>CONNECTIONS</div>
      {GUEST_1 && !GUEST_2 && renderConnections()}
      {GUEST_1 && GUEST_2 && renderConnectedGuest()}
    </div>
  );
};

export default Connections;
