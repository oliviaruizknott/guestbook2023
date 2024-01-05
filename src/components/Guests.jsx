import { useCallback, useMemo } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Guests = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);

  const handleGuestClick = useCallback(
    (e) => {
      const guestId = e.target.dataset.guestid;
      setValue("GUEST_1", guestId);
    },
    [GUEST_1]
  );

  const columnCount = useMemo(() => {
    return GUEST_1 ? "span 3" : "span 9";
  }, [GUEST_1]);

  const renderGuests = useCallback(() => {
    const guestCount = Object.keys(GUESTS_DATA).length;
    return (
      <>
        <div className="section-header">{guestCount} People</div>
        <div
          style={{
            columnCount: "9",
            columnGap: "10px",
            columnFill: "auto",
            height: "450px",
          }}
        >
          {Object.entries(GUESTS_DATA)
            .sort((a, b) => b[1].connections_count - a[1].connections_count)
            .map(([key, value]) => {
              return (
                <div
                  key={key}
                  data-guestid={key}
                  onClick={handleGuestClick}
                  className="list-item"
                >
                  <div className="count">{value.connections_count}</div>
                  <div className="name">{value.name}</div>
                </div>
              );
            })}
        </div>
      </>
    );
  }, [GUESTS_DATA]);

  const renderGuest = useCallback(() => {
    return (
      <div>
        <div className="section-header">Person</div>
        <div className="guest-big">{GUESTS_DATA[GUEST_1].name}</div>
        <div onClick={() => setValue("GUEST_1", null)}>X</div>
      </div>
    );
  }, [GUESTS_DATA, GUEST_1]);

  return (
    <div className="Guest section" style={{ gridColumn: columnCount }}>
      {GUESTS_DATA && !GUEST_1 && renderGuests()}
      {GUESTS_DATA && GUEST_1 && renderGuest()}
    </div>
  );
};

export default Guests;
