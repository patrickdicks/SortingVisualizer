export const getMergeSortAnimations = (array) => {
  const animations = [];
  mergeSort(array, array.slice(), 0, array.length - 1, animations);
  return animations;
};

const mergeSort = (arr, auxArray, left, right, animations) => {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  mergeSort(auxArray, arr, left, mid, animations);
  mergeSort(auxArray, arr, mid + 1, right, animations);
  merge(arr, auxArray, left, mid, right, animations);
};

const merge = (arr, auxArr, left, mid, right, animations) => {
  let i = left;
  let j = mid + 1;
  let k = left;
  while (i <= mid && j <= right) {
    animations.push([i, j, "compare1"]);
    animations.push([i, j, "compare2"]);
    if (auxArr[i] <= auxArr[j]) {
      const barOne = { index: k, newHeight: auxArr[i] };
      const barTwo = { index: k, newHeight: auxArr[i] };
      animations.push([barOne, barTwo]);
      animations.push([i, k, "compare2"]);
      arr[k++] = auxArr[i++];
    } else {
      const barOne = { index: k, newHeight: auxArr[j] };
      const barTwo = { index: k, newHeight: auxArr[j] };
      animations.push([barOne, barTwo]);
      animations.push([j, k, "compare2"]);
      arr[k++] = auxArr[j++];
    }
  }
  while (i <= mid) {
    const barOne = { index: k, newHeight: auxArr[i] };
    const barTwo = { index: k, newHeight: auxArr[i] };
    animations.push([barOne, barTwo]);
    animations.push([i, k, "compare2"]);
    arr[k++] = auxArr[i++];
  }
  while (j <= right) {
    const barOne = { index: k, newHeight: auxArr[j] };
    const barTwo = { index: k, newHeight: auxArr[j] };
    animations.push([barOne, barTwo]);
    animations.push([j, k, "compare2"]);
    arr[k++] = auxArr[j++];
  }
};
