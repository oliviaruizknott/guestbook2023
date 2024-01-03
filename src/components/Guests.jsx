import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Guests = () => {
  const CONNECTIONS_DATA = useGetValue("CONNECTIONS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);

  const handleGuestClick = useCallback(
    (e) => {
      const guestId = e.target.dataset.guestid;
      setValue("GUEST_1", guestId);
    },
    [GUEST_1]
  );

  const renderGuests = useCallback(() => {
    return (
      <>
        <div>PEOPLE</div>
        <div>
          {Object.entries(CONNECTIONS_DATA)
            .sort(
              (a, b) =>
                b[1].total_connections_count - a[1].total_connections_count
            )
            .map(([key, value]) => {
              return (
                <div key={key} data-guestid={key} onClick={handleGuestClick}>
                  {value.total_connections_count} {value.name}
                </div>
              );
            })}
        </div>
      </>
    );
  }, [CONNECTIONS_DATA]);

  const renderGuest = useCallback(() => {
    return (
      <div>
        <div>PERSON</div>
        <div>{CONNECTIONS_DATA[GUEST_1].name}</div>
        <div onClick={() => setValue("GUEST_1", null)}>X</div>
      </div>
    );
  }, [CONNECTIONS_DATA, GUEST_1]);

  return (
    <div className="Guest quarter">
      {CONNECTIONS_DATA && !GUEST_1 && renderGuests()}
      {CONNECTIONS_DATA && GUEST_1 && renderGuest()}
    </div>
  );
};

export default Guests;
