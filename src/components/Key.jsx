import { colorKey } from "../constants";

const Key = () => {
  const renderColors = () => {
    return Object.entries(colorKey).map(([key, value]) => {
      const plus = key >= 3 ? "+" : "";
      return (
        <div key={value} className="color">
          <div className="color-box" style={{ backgroundColor: value }} />
          <div className="color-text">
            {key}
            {plus}
          </div>
        </div>
      );
    });
  };

  return <div className="Key">{renderColors()}</div>;
};

export default Key;
