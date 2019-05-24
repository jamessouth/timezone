const parse5 = require('parse5');
const treeAdapters = require('parse5/lib/tree-adapters/default.js');

export default function getOffset(arr) {
  const parsedHTML = parse5.parseFragment(arr[0]).childNodes[1].childNodes[0].childNodes[0];
  return [treeAdapters.getTextNodeContent(parsedHTML), arr[1]];
}
