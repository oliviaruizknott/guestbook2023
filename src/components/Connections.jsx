import { useCallback } from "react";
import { useGetValue, setValue } from "../hooks/useHaxademicStore";

const Connections = () => {
  const CONNECTIONS_DATA = useGetValue("CONNECTIONS_DATA", null);
  const GUEST_1 = useGetValue("GUEST_1", null);

  return <div className="Connections quarter">Connections</div>;
};

export default Connections;
