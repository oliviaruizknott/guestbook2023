import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Moments = () => {
  const MOMENTS_DATA = useGetValue("MOMENTS_DATA", null);
  const MOMENT_IDS = useGetValue("MOMENT_IDS", null);

  const renderAllMoments = useCallback(() => {
    return (
      <div>
        {Object.entries(MOMENTS_DATA)
          .sort((a, b) => b[1].date - a[1].date)
          .map(([key, value]) => {
            return (
              <div key={key}>
                {value.guest_count} {value.title}
              </div>
            );
          })}
      </div>
    );
  }, [MOMENTS_DATA]);

  const renderMoments = useCallback(() => {
    return (
      <div>
        {MOMENT_IDS.map((momentId) => {
          const momentData = MOMENTS_DATA[momentId];
          return (
            <div key={momentId}>
              {momentData.guest_count} {momentData.title}
            </div>
          );
        })}
      </div>
    );
  }, [MOMENTS_DATA, MOMENT_IDS]);

  return (
    <div className="Moments quarter">
      <div>MOMENTS</div>
      {MOMENTS_DATA && !MOMENT_IDS && renderAllMoments()}
      {MOMENTS_DATA && MOMENT_IDS && renderMoments()}
    </div>
  );
};

export default Moments;
