import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Moments = () => {
  const CONNECTIONS_DATA = useGetValue("CONNECTIONS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);

  return <div className="Moments quarter">Moments</div>;
};

export default Moments;
