import { useCallback } from "react";
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

  const renderGuests = useCallback(() => {
    const guestCount = Object.keys(GUESTS_DATA).length;
    return (
      <>
        <div className="column-header">{guestCount} People</div>
        <div>
          {Object.entries(GUESTS_DATA)
            .sort((a, b) => b[1].connections_count - a[1].connections_count)
            .map(([key, value]) => {
              return (
                <div key={key} data-guestid={key} onClick={handleGuestClick}>
                  {value.connections_count} {value.name}
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
        <div className="column-header">Person</div>
        <div>{GUESTS_DATA[GUEST_1].name}</div>
        <div onClick={() => setValue("GUEST_1", null)}>X</div>
      </div>
    );
  }, [GUESTS_DATA, GUEST_1]);

  return (
    <div className="Guest quarter">
      {GUESTS_DATA && !GUEST_1 && renderGuests()}
      {GUESTS_DATA && GUEST_1 && renderGuest()}
    </div>
  );
};

export default Guests;
