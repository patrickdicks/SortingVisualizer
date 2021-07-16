export const getQuickSortAnimations = (array) => {
  const animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
};

const quickSort = (arr, left, right, animations) => {
  if (left < right) {
    const pi = partition(arr, left, right, animations);
    quickSort(arr, left, pi - 1, animations);
    quickSort(arr, pi + 1, right, animations);
  }
};

const partition = (arr, left, right, animations) => {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j <= right - 1; j++) {
    animations.push([j, right, "compare1"]);
    animations.push([j, right, "compare2"]);
    if (arr[j] < pivot) {
      i++;
      const barOne = { index: i, newHeight: arr[j] };
      const barTwo = { index: j, newHeight: arr[i] };
      animations.push([barOne, barTwo]);
      animations.push([i, j, "compare2"]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  const barOne = { index: i + 1, newHeight: arr[right] };
  const barTwo = { index: right, newHeight: arr[i + 1] };
  animations.push([barOne, barTwo]);
  animations.push([i + 1, right, "compare2"]);
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
};
