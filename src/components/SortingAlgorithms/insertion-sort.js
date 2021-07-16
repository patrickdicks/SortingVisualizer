export const getInsertionSortAnimations = (array) => {
  const animations = [];
  insertionSort(array, animations);
  return animations;
};

const insertionSort = (arr, animations) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    animations.push([j, j + 1, "compare1"]);
    while (j >= 0 && arr[j] > key) {
      animations.push([j, j + 1, "compare2"]);
      const barOne = { index: j + 1, newHeight: arr[j] };
      const barTwo = { index: j + 1, newHeight: arr[j] };
      animations.push([barOne, barTwo]);
      animations.push([j + 1, j + 1, "compare2"]);
      arr[j + 1] = arr[j];
      j--;
      if (j >= 0) {
        animations.push([j, j + 1, "compare1"]);
      }
    }
    if (j >= 0) {
      animations.push([j, j + 1, "compare2"]);
    }
    const barOne = { index: j + 1, newHeight: key };
    const barTwo = { index: j + 1, newHeight: key };
    animations.push([barOne, barTwo]);
    animations.push([j + 1, j + 1, "compare2"]);
    arr[j + 1] = key;
  }
};
