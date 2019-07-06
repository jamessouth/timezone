const { Readable } = require('stream');

export default function offsetsStream(arr) {
  return new Readable({
    objectMode: true,
    read(size) {
      this.push(JSON.stringify(arr));
      this.push(null);
    }
  });
}
