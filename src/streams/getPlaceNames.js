const { Transform } = require('stream');
const parse5 = require('parse5');
const treeAdapters = require('parse5/lib/tree-adapters/default.js');

import '../polyfills/flatMap';
import getNames from '../utils/getNames';

const getPlaceNames = new Transform({
  encoding: 'utf8',
  readableObjectMode: true,
  transform(ch, enc, cb) {
    const parsedHTML = parse5.parseFragment(ch.toString());
    const ancAndPara = treeAdapters.getChildNodes(parsedHTML);
    const chil = ancAndPara
      .filter(x => x.nodeName == 'td')
      .flatMap((v,i) => i != 1 ? v.childNodes : [])
      .filter(u => ['a', 'p'].includes(u.nodeName))
      .map(getNames);
    this.push(JSON.stringify(chil));
    cb();
  }
});

export default getPlaceNames;
