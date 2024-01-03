import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Calendar = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);

  return <div className="Calendar quarter">Calendar</div>;
};

export default Calendar;
