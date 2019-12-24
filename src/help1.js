const { Transform } = require('stream');


const help1 = new Transform({
  encoding: 'base64',
  readableObjectMode: true,
  transform(ch, enc, cb) {

    this.push(ch);
    cb();
  }
});

export default help1;
