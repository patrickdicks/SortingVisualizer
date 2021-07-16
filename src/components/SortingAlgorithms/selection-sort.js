export const getSelectionSortAnimations = (array) => {
  const animations = [];
  selectionSort(array, animations);
  return animations;
};

const selectionSort = (arr, animations) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push([minIndex, j, "compare1"]);
      animations.push([minIndex, j, "compare2"]);
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    const barOne = { index: minIndex, newHeight: arr[i] };
    const barTwo = { index: i, newHeight: arr[minIndex] };
    animations.push([barOne, barTwo]);
    animations.push([minIndex, i, "compare2"]);
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
};
