import { useCallback } from "react";
import { useGetValue } from "../hooks/useHaxademicStore";
import Day from "./Day";

const Calendar = () => {
  const CALENDAR_DATA = useGetValue("CALENDAR_DATA", null);
  const MOMENTS_DATA = useGetValue("MOMENTS_DATA", null);

  const renderWeeks = useCallback(() => {
    if (!CALENDAR_DATA || !MOMENTS_DATA) return;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="week labels">
          <div className="day-container">S</div>
          <div className="day-container">M</div>
          <div className="day-container">T</div>
          <div className="day-container">W</div>
          <div className="day-container">T</div>
          <div className="day-container">F</div>
          <div className="day-container">S</div>
        </div>
        {CALENDAR_DATA.map((week, i) => {
          return (
            <div key={i} className="week">
              {week.map((day, j) => {
                return <Day key={j} day={day} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }, [CALENDAR_DATA, MOMENTS_DATA]);

  return <div className="Calendar">{renderWeeks()}</div>;
};

export default Calendar;
