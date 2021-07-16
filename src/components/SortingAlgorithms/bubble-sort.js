export const getBubbleSortAnimations = (array) => {
  const animations = [];
  bubbleSort(array, animations);
  return animations;
};

const bubbleSort = (arr, animations) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push([j, j + 1, "compare1"]);
      if (arr[j] > arr[j + 1]) {
        const barOne = { index: j, newHeight: arr[j + 1] };
        const barTwo = { index: j + 1, newHeight: arr[j] };
        animations.push([barOne, barTwo]);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      animations.push([j, j + 1, "compare2"]);
    }
  }
};
