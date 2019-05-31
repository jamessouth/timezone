const { Transform } = require('stream');

const removeStates = new Transform({
  encoding: 'utf8',
  readableObjectMode: true,
  writableObjectMode: true,
  transform(ch, enc, cb) {

    const noStates = JSON.parse(ch).filter(p => !p.match(/Rio|Paulo|Minas|Paran|Mato|Cocos|Victoria/));


    this.push(JSON.stringify(noStates));

    cb();
  }
});

export default removeStates;
