const { Transform } = require('stream');

const removeFirstChunk = new Transform({
  encoding: 'utf8',
  transform(ch, enc, cb) {

    if(ch.includes('"parse"', 1)) {
      this.push('');
    } else {
      this.push(ch);
    }
    cb();
  }
});

export default removeFirstChunk;
