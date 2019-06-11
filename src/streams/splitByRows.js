const { Transform } = require('stream');

const splitByRows = new Transform({
  encoding: 'utf8',
  transform(ch, enc, cb) {
    const rows = ((this.partialRow || '') + ch.toString()).split(/<\/tr>\\n<tr>\\n/);
    this.partialRow = rows.pop();
    for (let row of rows) {
      this.push(row);
    }
    cb();
  },
  flush(cb) {
    this.push(this.partialRow || '');
    cb();
  }
});

export default splitByRows;
