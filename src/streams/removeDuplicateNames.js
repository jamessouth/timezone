const { Transform } = require('stream');

const removeDuplicateNames = new Transform({
  encoding: 'utf8',
  readableObjectMode: true,
  writableObjectMode: true,
  transform(ch, enc, cb) {
    const noDupes = [...new Set(JSON.parse(ch))];
    this.push(JSON.stringify(noDupes));
    cb();
  }
});

export default removeDuplicateNames;
