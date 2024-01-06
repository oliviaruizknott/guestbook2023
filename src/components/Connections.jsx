import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Connections = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);
  const GUEST_2 = useGetValue("GUEST_2", null);

  const handleGuestClick = useCallback((e) => {
    const guestId = e.currentTarget.dataset.guestid;
    setValue("GUEST_2", guestId);
  }, []);

  const renderConnections = useCallback(() => {
    if (!GUESTS_DATA || !GUEST_1) return;
    const guestConnections = GUESTS_DATA[GUEST_1].connections;
    const guestConnectionsCount = Object.keys(guestConnections).length;
    const guestConnectionsText =
      guestConnectionsCount === 1 ? "Connection" : "Connections";

    return (
      <>
        <div className="section-header">
          {guestConnectionsCount} {guestConnectionsText}
        </div>
        <div
          style={{
            columnCount: "3",
            columnGap: "10px",
            columnFill: "auto",
            height: "750px",
          }}
        >
          {Object.entries(guestConnections)
            .sort((a, b) => {
              // first by count
              if (b[1].count !== a[1].count) {
                return b[1].count - a[1].count;
              }
              return a[1].name.localeCompare(b[1].name); // then by name
            })
            .map(([key, value]) => {
              return (
                <div
                  key={key}
                  data-guestid={key}
                  onClick={handleGuestClick}
                  className="list-item"
                >
                  <div className="count">{value.count}</div>
                  <div className="name">{value.name}</div>
                </div>
              );
            })}
        </div>
      </>
    );
  }, [GUESTS_DATA, GUEST_1]);

  const renderConnectedGuest = useCallback(() => {
    if (!GUESTS_DATA || !GUEST_1 || !GUEST_2) return;

    return (
      <>
        <div className="section-header">was with</div>
        <div>
          <div className="guest-big">{GUESTS_DATA[GUEST_2].name}</div>
        </div>
      </>
    );
  }, [GUESTS_DATA, GUEST_1, GUEST_2]);

  return (
    <div className="Connections section" style={{ gridColumn: "span 3" }}>
      {GUEST_1 && !GUEST_2 && renderConnections()}
      {GUEST_1 && GUEST_2 && renderConnectedGuest()}
    </div>
  );
};

export default Connections;
