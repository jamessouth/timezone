const treeAdapters = require('parse5/lib/tree-adapters/default.js');

export default function getNames(node) {
  if (node.nodeName === 'a') {
    return treeAdapters.getTextNodeContent(node.childNodes[0]);
  }
  const anchor = node.childNodes.filter(n => n.nodeName === 'a')[0];
  return getNames(anchor);
}
