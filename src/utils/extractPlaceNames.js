import getNames from './getNames';

export default function extractPlaceNames(arr) {
  const names = arr[1].map(getNames);
  return [arr[0], ...names];
}
