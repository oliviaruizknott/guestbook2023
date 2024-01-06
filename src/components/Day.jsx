import { useCallback } from "react";
import { useGetValue } from "../hooks/useHaxademicStore";
import { colorKey } from "../constants";

const Day = ({ day }) => {
  const MOMENTS_DATA = useGetValue("MOMENTS_DATA", null);
  const MOMENT_IDS = useGetValue("MOMENT_IDS", null);
  const GUEST_1 = useGetValue("GUEST_1", null);
  const GUEST_1_MOMENTS = useGetValue("GUEST_1_MOMENTS", null);

  const getDayStyle = useCallback(
    (day) => {
      // in all states, days are treated the same if it is a padded day or if there are no moments
      if (!day.moments) return { backgroundColor: "transparent" }; // padded day
      if (day.moments.length === 0) return { backgroundColor: colorKey[0] }; // no moments

      // when there is no guest selected use the MOMENTS_DATA to determine the color
      if (!GUEST_1) {
        return { backgroundColor: getDayColor(day.moments), height: "30px" };
      }

      if (GUEST_1 && GUEST_1_MOMENTS && MOMENT_IDS) {
        // GUEST_1_MOMENTS are used to determine the size of the day
        // MOMENT_IDS are used to determine the color of the day

        // are any of the moments ids for this day in the GUEST_1_MOMENTS array?
        const sizeRelevantMoments = day.moments.filter((id) =>
          GUEST_1_MOMENTS.includes(id)
        );
        if (sizeRelevantMoments.length === 0) return;

        // are any of the moments ids for this day in the MOMENT_IDS array?
        const colorRelevantMoments = day.moments.filter((id) =>
          MOMENT_IDS.includes(id)
        );
        if (colorRelevantMoments.length === 0) return { height: "30px" };

        return {
          backgroundColor: getDayColor(colorRelevantMoments),
          height: "30px",
        };
      }
    },
    [GUEST_1, GUEST_1_MOMENTS, MOMENT_IDS, MOMENTS_DATA]
  );

  // given an array of moments ids, look up each moment and determine the highest guest count
  // use this number to determine the color of the day
  const getDayColor = useCallback(
    (momentIds) => {
      const allGuestCounts = momentIds.map(
        (momentId) => MOMENTS_DATA[momentId].guest_count
      );
      const maxGuestCount = Math.max(...allGuestCounts);
      return getColorForCount(maxGuestCount);
    },
    [MOMENTS_DATA]
  );

  const getColorForCount = useCallback((count) => {
    let dayColor = colorKey[0];
    for (const [key, value] of Object.entries(colorKey)) {
      if (count < key) break;
      dayColor = value;
    }
    return dayColor;
  }, []);

  return (
    <div key={day.date} className="day-container">
      <div
        key={day.date}
        id={day.date}
        className="day"
        style={getDayStyle(day)}
      ></div>
    </div>
  );
};

export default Day;
