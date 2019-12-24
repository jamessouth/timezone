const { Transform } = require('stream');
const parse5 = require('parse5');
const treeAdapters = require('parse5/lib/tree-adapters/default.js');

import './polyfills/flatMap';
// import getNames from '../utils/getNames';
// export default function filterPlaceNames(arr) {
//   const parsedHTML = parse5.parseFragment(arr[1]);
//   return [arr[0], treeAdapters.getChildNodes(parsedHTML).filter(x => ['a', 'p'].includes(x.nodeName))];
// }





const help1 = new Transform({
  encoding: 'utf8',
  readableObjectMode: true,
  transform(ch, enc, cb) {

    const parsedHTML = parse5.parseFragment(ch.toString());
    const ancAndPara = treeAdapters.getChildNodes(parsedHTML);
    // console.log(ancAndPara.length);
    const chil = ancAndPara
      // .filter(x => {
      //   x.nodeName == 'tbody';
      //   // console.log(x);
      // })
      .flatMap((v,i) => v)
      // .filter(u => ['a', 'p'].includes(u.nodeName))
      // .map(getNames)
      // .filter(w => )

      // .filter((b,i) => i != 1)
      // .map(e => e.childNodes)
      ;


    // console.log();
    // console.log(ch.toString());
    // console.log();
    // if(!ch.includes('\\n<tr>')) {
    //   this.push('');
    // } else {
    this.push(JSON.stringify(chil));
    // }
    cb();
  }
});

export default help1;
