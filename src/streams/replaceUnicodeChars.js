const { Transform } = require('stream');

const replaceUnicodeChars = new Transform({
  encoding: 'utf8',
  readableObjectMode: true,
  writableObjectMode: true,
  transform(ch, enc, cb) {

    const arr = JSON.parse(ch);
    const noUnis = [arr[0] && arr[0].replace(/\\u2212/, '-').replace(/\\u00b1/, '+/-'), ...arr.slice(1)];


    this.push(JSON.stringify(noUnis));

    cb();
  }
});

export default replaceUnicodeChars;
