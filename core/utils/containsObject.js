export const containsObject = (arr, objToFind) => {
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) === JSON.stringify(objToFind)) {
      return true;
    }
  }
  return false;
};
