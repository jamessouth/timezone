export default function pipe(...fns) {
  return function inner(start) {
    return fns.reduce((val, fn) => fn(val), start);
  };
}
