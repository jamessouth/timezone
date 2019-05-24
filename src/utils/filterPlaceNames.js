const parse5 = require('parse5');
const treeAdapters = require('parse5/lib/tree-adapters/default.js');

export default function filterPlaceNames(arr) {
  const parsedHTML = parse5.parseFragment(arr[1]);
  return [arr[0], treeAdapters.getChildNodes(parsedHTML).filter(x => ['a', 'p'].includes(x.nodeName))];
}
