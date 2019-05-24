export default function sortNames(arr) {
  return [arr[0], ...arr.slice(1).sort((a, b) => (a > b ? 1 : -1))];
}
