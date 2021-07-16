import React, { useEffect } from "react";
import SortingVisualizer from "./SortingVisualizer/sorting-visualizer";
import "./App.css";

const BACKGROUND_COLOR = "#1e1e1e";

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = BACKGROUND_COLOR;
  }, []);

  return (
    <div className="App">
      <SortingVisualizer />
    </div>
  );
};

export default App;
