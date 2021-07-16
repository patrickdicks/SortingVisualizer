import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { getMergeSortAnimations } from "../SortingAlgorithms/merge-sort.js";
import { getQuickSortAnimations } from "../SortingAlgorithms/quick-sort.js";
import { getHeapSortAnimations } from "../SortingAlgorithms/heap-sort.js";
import { getBubbleSortAnimations } from "../SortingAlgorithms/bubble-sort.js";
import { getInsertionSortAnimations } from "../SortingAlgorithms/insertion-sort.js";
import { getSelectionSortAnimations } from "../SortingAlgorithms/selection-sort.js";
import ArrayBars from "../array-bars.js";
import "./sorting-visualizer.css";

// Color of array bars
export const BAR_COLOR = "MediumPurple";
// Color of array bars when performing comparison
const COMPARE_COLOR = "White";
// Color of array bars when performing swap
const SWAP_COLOR = "Yellow";
// Speed of compare and swap animations
const ANIMATION_SPEED = 1;
// Array length
const BAR_ARRAY_LENGTH = 140;
// Max size of bars in array
const MAX_BAR_SIZE = 512;
// Min size of bars in array
const MIN_BAR_SIZE = 5;

/**
 * Creates a new array of random values and replaces the current array.
 * @param setArray,
 * @param setDisable
 */
const resetArray = (setArray, setDisable) => {
  const array = [];
  for (let i = 0; i < BAR_ARRAY_LENGTH; i++) {
    // Push value random value betwen MIN_BAR_SIZE and MAX_BAR_SIZE onto array
    array.push(Math.floor(Math.random() * MAX_BAR_SIZE) + MIN_BAR_SIZE);
  }
  // Replace existing array with new randomly generated one
  setArray(array);
  // Enable sorting buttons after reset
  setDisable(false);
};

/**
 * Sorts array according to which algorithm passed in by getAnimations
 * @param array
 * @param setDisableReset,
 * @param setDisable
 * @param setLoading,
 * @param getAnimations
 */
const sort = (
  array,
  setDisableReset,
  setDisable,
  setLoading,
  getAnimations
) => {
  // Disable buttons while animations are processing
  setDisableReset(true);
  setDisable(true);
  setLoading(true);
  const animations = getAnimations(array);
  processAnimations(animations);
  //Enable buttons when animations are done processing
  setTimeout(() => {
    setDisableReset(false);
    setLoading(false);
  }, animations.length * ANIMATION_SPEED);
};

/**
 * Processes and renders sorting animations
 * @param animations
 */
const processAnimations = (animations) => {
  for (let i = 0; i < animations.length; i++) {
    // Check if compare or swap animation
    const isComparison = animations[i][2];
    if (isComparison) {
      const [bar1Index, bar2Index] = animations[i];
      compareAnimation(bar1Index, bar2Index, isComparison, i * ANIMATION_SPEED);
    } else {
      const [bar1, bar2] = animations[i];
      swapAnimation(bar1, bar2, i * ANIMATION_SPEED);
    }
  }
};

/**
 * Process and render compare animation
 * @param bar1Index
 * @param bar2Index
 * @param comparison
 * @param ms
 */
const compareAnimation = (bar1Index, bar2Index, comparison, ms) => {
  const arrayBars = document.getElementsByClassName("array-bar");
  const bar1 = arrayBars[bar1Index];
  const bar2 = arrayBars[bar2Index];
  const color = comparison === "compare1" ? COMPARE_COLOR : BAR_COLOR;
  setTimeout(() => {
    bar1.style.backgroundColor = color;
    bar2.style.backgroundColor = color;
  }, ms);
};

/**
 * Process and render swap animation
 * @param bar1Index
 * @param bar2Index
 * @param comparison
 * @param ms
 */
const swapAnimation = (bar1, bar2, ms) => {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayBar1 = arrayBars[bar1.index];
  const arrayBar2 = arrayBars[bar2.index];
  setTimeout(() => {
    arrayBar1.style.height = `${bar1.newHeight}px`;
    arrayBar2.style.height = `${bar2.newHeight}px`;
    arrayBar1.style.backgroundColor = SWAP_COLOR;
    arrayBar2.style.backgroundColor = SWAP_COLOR;
  }, ms);
};

/**
 * Process and render swap animation
 * @param bar1Index
 * @param bar2Index
 * @param comparison
 * @param ms
 */
const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [disableReset, setDisableReset] = useState(false);
  const [disable, setDisable] = useState(false);
  const [mergeSortActive, setmergeSortActive] = useState(false);
  const [quickSortActive, setquickSortActive] = useState(false);
  const [heapSortActive, setheapSortActive] = useState(false);
  const [bubbleSortActive, setbubbleSortActive] = useState(false);
  const [insertionSortActive, setinsertionSortActive] = useState(false);
  const [selectionSortActive, setselectionSortActive] = useState(false);

  useEffect(() => resetArray(setArray, setDisable), []);

  return (
    <div className="sorting-visualizer-container">
      <ArrayBars bars={array} />
      <Button
        disabled={disableReset}
        loading={disableReset}
        color="violet"
        onClick={() => resetArray(setArray, setDisable)}
        content="Reset"
      />
      <Button
        disabled={disable}
        active={mergeSortActive}
        inverted
        onClick={() => {
          sort(
            array.slice(),
            setDisableReset,
            setDisable,
            setmergeSortActive,
            getMergeSortAnimations
          );
        }}
        content="Merge Sort"
      />
      <Button
        disabled={disable}
        active={quickSortActive}
        inverted
        onClick={() =>
          sort(
            array.slice(),
            setDisableReset,
            setDisable,
            setquickSortActive,
            getQuickSortAnimations
          )
        }
        content="Quick Sort"
      />
      <Button
        disabled={disable}
        active={heapSortActive}
        inverted
        onClick={() =>
          sort(
            array.slice(),
            setDisableReset,
            setDisable,
            setheapSortActive,
            getHeapSortAnimations
          )
        }
        content="Heap Sort"
      />
      <Button
        disabled={disable}
        active={bubbleSortActive}
        inverted
        onClick={() =>
          sort(
            array.slice(),
            setDisableReset,
            setDisable,
            setbubbleSortActive,
            getBubbleSortAnimations
          )
        }
        content="Bubble Sort"
      />
      <Button
        disabled={disable}
        active={insertionSortActive}
        inverted
        onClick={() =>
          sort(
            array.slice(),
            setDisableReset,
            setDisable,
            setinsertionSortActive,
            getInsertionSortAnimations
          )
        }
        content="Insertion Sort"
      />
      <Button
        disabled={disable}
        active={selectionSortActive}
        inverted
        onClick={() =>
          sort(
            array.slice(),
            setDisableReset,
            setDisable,
            setselectionSortActive,
            getSelectionSortAnimations
          )
        }
        content="Selection Sort"
      />
    </div>
  );
};

export default SortingVisualizer;
