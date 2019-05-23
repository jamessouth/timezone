export default function removeUnneededColumns(arr) {
  if (!arr[2].trim()) {
    return [arr[0], arr[3]];
  }
  if (!arr[3].trim()) {
    return [arr[0], arr[2]];
  }
  return [arr[0], `${arr[2]},${arr[3]}`];
}
