export default function removeMissedStateNames(arr) {
  if (arr[0] === 'UTC−04:00') {
    const ind = arr.indexOf('Mato Grosso do Sul');
    arr.splice(ind, 1);
  }
  if (arr[0] === 'UTC−03:00') {
    arr.splice(8, 5);
  }
  if (arr[0] === 'UTC+10:00') {
    const ind = arr.indexOf('Victoria');
    arr.splice(ind, 1);
  }
  return [...arr];
}
