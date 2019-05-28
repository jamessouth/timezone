const { Transform } = require('stream');

const throttleStream = new Transform({
  encoding: 'utf8',
  transform(ch, enc, cb) {

    setTimeout(() => {

      this.push(ch);
      cb();
    }, 250);
  }
});

export default throttleStream;
