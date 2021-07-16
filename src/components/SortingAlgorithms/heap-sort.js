export const getHeapSortAnimations = (array) => {
  const animations = [];
  heapSort(array, animations);
  return animations;
};

const heapSort = (arr, animations) => {
  for (let i = arr.length / 2 - 1; i >= 0; i--) {
    heapify(arr, arr.length, i, animations);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const barOne = { index: 0, newHeight: arr[i] };
    const barTwo = { index: i, newHeight: arr[0] };
    animations.push([barOne, barTwo]);
    animations.push([0, i, "compare2"]);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, animations);
  }
};

const heapify = (arr, n, i, animations) => {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    animations.push([left, largest, "compare1"]);
    animations.push([left, largest, "compare2"]);
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    animations.push([right, largest, "compare1"]);
    animations.push([right, largest, "compare2"]);
    largest = right;
  }
  if (largest !== i) {
    const barOne = { index: i, newHeight: arr[largest] };
    const barTwo = { index: largest, newHeight: arr[i] };
    animations.push([barOne, barTwo]);
    animations.push([i, largest, "compare2"]);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
};
