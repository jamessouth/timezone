const https = require('https');
const fs = require('fs');
// const file = fs.createWriteStream('./flagdata');

const parse5 = require('parse5');
const treeAdapters = require('parse5/lib/tree-adapters/default.js');
const MongoClient = require('mongodb').MongoClient;

import help1 from './help1';
import td from '../tabledata';
import './polyfills/flatMap';
import './polyfills/flat';
// https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', chunks => chunks.pipe(file));

const client = new MongoClient(
  'mongodb://localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// const file = fs.createReadStream('./tabledata');
// file.pipe(help1).pipe(process.stdout);

// [0].filter(x => x.nodeName == 'td').flatMap(x => x.childNodes)

const parsedHTML = parse5.parseFragment(td);
const ancAndPara = treeAdapters.getChildNodes(parsedHTML);
let arr = ancAndPara[0].childNodes
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

// arr[0].push(arr[0][0]);
// arr = [...arr.slice(2), arr[1], arr[0]].map((x,i) => {
//   return {no: i+2, flags: x};
// });
// arr[0].flags.unshift(arr[2].flags[2]);
// arr[0].flags.splice(3, 2);
// arr[0].flags.push(arr[0].flags[4]);
// arr[2].flags.unshift(arr[2].flags.pop());
// arr[36].no = 1;
// arr[37].no = 0;
// arr.sort((a,b) => {
//   return a.no > b.no ? 1 : -1;
// });

// const flagObj = {};
const flagObj = arr.flat().reduce((x,y) => {
  // console.log(y);
  let k = y.split(/x-(Flags?_of|Bandeira_de)_/gi)[2]
    .replace(/\.svg\.png/, '').replace(/^the_/, '').replace(/_/, ' ').replace(/_%28\w+%29/, '');
  // console.log(k);
  if (!x[k]) {
    x[k] = y;
  }
  return x;
}, {});


async function loaddb(obj) {

  try {
    await client.connect();
    const db = client.db('tzs');
    // const urls = await db.collection('flags').insertMany(arr);
    const plcs = await db
      .collection('timezones')
      .find({})
      .project({ no: 1, offset: 1, places: 1, _id: 0 })
      .sort('no', 1)
      .toArray();
    // console.log(plcs);

    // const flgs = await db
    //   .collection('testTwo')
    //   .find({})
    //   .project({ places: 1, _id: 0 })
    //   // .sort('no', 1)
    //   .toArray();
    //
    //   console.log(plcs, flgs);

    plcs.forEach(async (x,i) => {
      let ppp = [];
      x.places.forEach((y) => {
        if (y in obj) {
          ppp.push({'pl': y, 'fl': obj[y]});
        } else {
          ppp.push({'pl': y, 'fl': 'blank'});
        }
      })
      await db.collection('results').insertOne({no: x.no, places: ppp, offset: x.offset});
    })


    client.close();
  } catch (e) {
    console.log(e);
  }

}


loaddb(flagObj);
// .then(list => {
//   return arr.map((x,i) => {
//     return x.flags.sort((a,b) => {
//       // console.log(a);
// return list[i].places.indexOf(a.split(/x-(Flags?_of|Bandeira_de)_/gi)[1].replace(/.svg.png/, '').replace(/the_/, '').replace(/_/, ' ')) - list[i].places.indexOf(b.split(/x-(Flags?_of|Bandeira_de)_/gi)[1].replace(/.svg.png/, '').replace(/the_/, '').replace(/_/, ' '));
//     });
//   });
//
// }).then(f => console.log(f));







// console.log(flagObj);

// https.get(arr[0][0], chunks => {
//
//   chunks.pipe(help1).pipe(process.stdout);
//
//
// });
