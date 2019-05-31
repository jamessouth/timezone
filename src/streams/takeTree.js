const { Transform } = require('stream');
// const parse5 = require('parse5');
// const treeAdapters = require('parse5/lib/tree-adapters/default.js');

// export default function filterPlaceNames(arr) {
//   const parsedHTML = parse5.parseFragment(arr[1]);
//   return [arr[0], treeAdapters.getChildNodes(parsedHTML).filter(x => ['a', 'p'].includes(x.nodeName))];
// }

// .filter(x => ['a', 'p'].includes(x.nodeName)



const takeTree = new Transform({
  encoding: 'utf8',
  readableObjectMode: true,
  writableObjectMode: true,
  transform(ch, enc, cb) {

    // const parsedHTML = parse5.parseFragment(ch.toString());
    // const ancAndPara = treeAdapters.getChildNodes(parsedHTML);

    // console.log(ancAndPara);
    // console.log(ch.toString());
    // console.log();
    console.log(ch);
    console.log();
    console.log('====================================================');
    // if(!ch.includes('\\n<tr>')) {
    //   this.push('');
    // } else {
    this.push(ch);
    // }
    cb();
  }
});

export default takeTree;
