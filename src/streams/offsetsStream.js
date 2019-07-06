const { Readable } = require('stream');

export default function offsetsStream(arr) {
  return new Readable({
    objectMode: true,
    read(size) {
      // const offsetObj = arr.shift();
      this.push(JSON.stringify(arr));
      // if (arr.length == 0)
      this.push(null);
    }
  });
}
