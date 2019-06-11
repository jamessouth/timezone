const { Transform } = require('stream');

const stripOutImgTags = new Transform({
  encoding: 'utf8',
  transform(ch, enc, cb) {
    let imgFree = ch.toString().replace(/<img[\w\s=\\"\/.\-,]+(>&#160;)?/gmi, '');
    this.push(imgFree);
    cb();
  }
});

export default stripOutImgTags;
