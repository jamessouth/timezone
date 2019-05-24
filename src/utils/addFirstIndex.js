export default function addFirstIndex(arr) {
  return arr.slice(1).map((x, i, a) => `${arr[0]}\u00A0\u00A0${a[i]}`);
}
