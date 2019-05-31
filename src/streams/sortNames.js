const { Transform } = require('stream');

const sortNames = new Transform({
  encoding: 'utf8',
  readableObjectMode: true,
  writableObjectMode: true,
  transform(ch, enc, cb) {

    const arr = JSON.parse(ch);
    const sorted = [arr[0], ...arr.slice(1).sort((a, b) => (a > b ? 1 : -1))];


    this.push(JSON.stringify(sorted));

    cb();
  }
});

export default sortNames;
