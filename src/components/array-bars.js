import React from "react";
import { BAR_COLOR } from "./SortingVisualizer/sorting-visualizer.js";

const ArrayBars = (props) => {
  const bars = props.bars;
  const arrayBars = bars.map((bar, idx) => (
    <div
      className="array-bar"
      key={idx}
      style={{
        backgroundColor: BAR_COLOR,
        height: `${bar}px`,
      }}
    />
  ));
  return <div>{arrayBars}</div>;
};

export default ArrayBars;
