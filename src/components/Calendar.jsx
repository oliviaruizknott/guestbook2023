import { useCallback, useMemo } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Calendar = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);
  const GUEST_2 = useGetValue("GUEST_2", null);
  const MOMENTS_DATA = useGetValue("MOMENTS_DATA", null);
  const MOMENT_IDS = useGetValue("MOMENT_IDS", null);

  const renderHeader = useCallback(() => {
    if (!MOMENTS_DATA) return <>&nbsp;</>;

    if (!GUEST_1) return <>{Object.keys(MOMENTS_DATA).length} Moments</>;

    if (GUEST_1 && !GUEST_2 && MOMENT_IDS)
      return <>{Object.keys(MOMENT_IDS).length} Moments</>;

    if (GUEST_1 && GUEST_2 && MOMENT_IDS)
      return (
        <>
          at {Object.keys(MOMENT_IDS).length} of{" "}
          {GUESTS_DATA[GUEST_1].moments_count} Moments
        </>
      );
  }, [MOMENTS_DATA, MOMENT_IDS, GUEST_1, GUEST_2, GUESTS_DATA]);

  return (
    <div className="Calendar quarter">
      <div className="column-header">{renderHeader()}</div>
    </div>
  );
};

export default Calendar;
