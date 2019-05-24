export default function filterOutParens(arr) {
  return [arr[0], arr[1].replace(/ *\(([^)]*)\)/g, '')];
}
