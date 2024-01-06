import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Moments = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);
  const GUEST_2 = useGetValue("GUEST_2", null);
  const MOMENTS_DATA = useGetValue("MOMENTS_DATA", null);
  const MOMENT_IDS = useGetValue("MOMENT_IDS", null);

  const renderHeader = useCallback(() => {
    if (!MOMENTS_DATA) return <>&nbsp;</>;

    if (!GUEST_1) return <>{Object.keys(MOMENTS_DATA).length} Moments</>;

    if (GUEST_1 && !GUEST_2 && MOMENT_IDS) {
      const momentText = MOMENT_IDS.length === 1 ? "Moment" : "Moments";
      return (
        <>
          {MOMENT_IDS.length} {momentText}
        </>
      );
    }

    if (GUEST_1 && GUEST_2 && MOMENT_IDS)
      return (
        <>
          at {Object.keys(MOMENT_IDS).length} of{" "}
          {GUESTS_DATA[GUEST_1].moments_count} Moments
        </>
      );
  }, [MOMENTS_DATA, MOMENT_IDS, GUEST_1, GUEST_2, GUESTS_DATA]);

  const renderMoments = useCallback(() => {
    return (
      <>
        <div className="section-header">{renderHeader()}</div>
        <div
          style={{
            columnCount: "3",
            columnGap: "10px",
            columnFill: "auto",
            height: "750px",
          }}
        >
          {MOMENT_IDS.map((momentId) => {
            const momentData = MOMENTS_DATA[momentId];
            return (
              <div key={momentId} className="list-item">
                <div className="count">{momentData.guest_count}</div>
                <div className="name">{momentData.title}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }, [MOMENTS_DATA, MOMENT_IDS]);

  return (
    <div className="Moments section" style={{ gridColumn: "span 3" }}>
      {MOMENTS_DATA && MOMENT_IDS && renderMoments()}
    </div>
  );
};

export default Moments;
