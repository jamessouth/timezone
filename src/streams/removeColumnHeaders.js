const { Transform } = require('stream');

const removeColumnHeaders = new Transform({
  encoding: 'utf8',
  transform(ch, enc, cb) {
    if(!ch.includes('\\n<tr>')) {
      this.push('');
    } else {
      this.push(ch);
    }
    cb();
  }
});

export default removeColumnHeaders;
