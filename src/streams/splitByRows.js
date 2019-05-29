const { Transform } = require('stream');

const splitByRows = new Transform({
  encoding: 'utf8',
  transform(ch, enc, cb) {

    const rows = ((this.partialRow || '') + ch.toString()).split(/<\/tr>/);
    // console.log('rows ', rows);
    this.partialRow = rows.pop();
    // console.log('pR ', this.partialRow);
    for (let row of rows) {
      // console.log('a row ', row);
      this.push(row);
    }
    cb();
  }
  // ,
  // flush(cb) {
  //   console.log('flush ', this.partialRow);
  //   this.push(this.partialRow || '');
  //   cb();
  // }
});

export default splitByRows;
