const { Transform } = require('stream');

const removeParens = new Transform({
  encoding: 'utf8',
  // readableObjectMode: true,
  transform(ch, enc, cb) {
    let noParens = ch.toString().replace(/ *\(([^\)]*)\)/gmi, '');
    this.push(noParens);
    cb();
  }
});
export default removeParens;
