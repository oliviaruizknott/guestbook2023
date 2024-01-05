import { useEffect, useCallback } from "react";
import { useGetValue, setValue } from "./useHaxademicStore";

export const useStoreListeners = () => {
  const GUESTS_DATA = useGetValue("GUESTS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);
  const GUEST_2 = useGetValue("GUEST_2", null);

  // when either of the guests change, update MOMENT_IDS
  useEffect(() => {
    if (!GUEST_1) setToEmpty();
    if (GUEST_1) setValue("GUEST_1_MOMENTS", GUESTS_DATA[GUEST_1].moments);
    if (GUEST_1 && !GUEST_2)
      setValue("MOMENT_IDS", GUESTS_DATA[GUEST_1].moments);
    if (GUEST_1 && GUEST_2) {
      const moments = GUESTS_DATA[GUEST_1].connections[GUEST_2]?.moments || [];
      setValue("MOMENT_IDS", moments);
    }
  }, [GUEST_1, GUEST_2]);

  const setToEmpty = useCallback(() => {
    setValue("GUEST_1", null);
    setValue("GUEST_2", null);
    setValue("MOMENT_IDS", null);
    setValue("GUEST_1_MOMENTS", null);
  }, []);
};
