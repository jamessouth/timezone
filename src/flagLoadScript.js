const https = require('https');
const fs = require('fs');
// const file = fs.createWriteStream('./flagdata');

const parse5 = require('parse5');
const treeAdapters = require('parse5/lib/tree-adapters/default.js');

import help1 from './help1';
import td from '../tabledata';
import './polyfills/flatMap';
// https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', chunks => chunks.pipe(file));



// const file = fs.createReadStream('./tabledata');
// file.pipe(help1).pipe(process.stdout);

// [0].filter(x => x.nodeName == 'td').flatMap(x => x.childNodes)

const parsedHTML = parse5.parseFragment(td);
const ancAndPara = treeAdapters.getChildNodes(parsedHTML);
const arr = ancAndPara[0].childNodes
  .filter(x => x.nodeName == 'tr')
  .flatMap(x => [x.childNodes])
  .slice(1)
  .map(x => x.filter(y => y.nodeName == 'td')

    .flatMap(z => z.childNodes)
    .filter(a => a.nodeName == 'span')
    .flatMap(b => b.childNodes)
    .filter(c => c.nodeName == 'img' || c.nodeName == 'a')
    .flatMap(d => d.nodeName == 'a' ? d.childNodes : d)
    .flatMap(e => e.attrs)
    .filter(f => f.name == 'srcset')
    .map(g => 'https:' + g.value.split(', ')[1].replace(/ 2x/, ''))
  );

arr[0].push(arr[0][0])

// console.log(arr[0]);

https.get(arr[0][0], chunks => {

  chunks.pipe(help1).pipe(process.stdout);


});
