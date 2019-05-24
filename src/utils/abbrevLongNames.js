export default function abbrevLongNames(arr) {
  return [arr[0], ...arr.slice(1).map(x => x
    .replace(/South Georgia and the South Sandwich Islands/, 'S Georgia/S Sandwich Islands')
    .replace(/British Indian Ocean Territory/, 'BIOT')
    .replace(/,/, '')
    .replace(/Democratic Republic of the Congo/, 'DR Congo')
    .replace(/[&#\d;]/g, ''))];
}
