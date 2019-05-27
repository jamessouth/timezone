/* eslint-disable no-console */
import processTimezoneData from './utils/processTimezoneData';

const http = require('http');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const { Transform } = require('stream');

let r = 0;
const dec = new Transform({
  transform(ch, enc, cb) {

    setTimeout(() => {
      this.push(`--${ch.length}___${new Date().getSeconds()}--`);
      cb();
    }, 250);



  }
});


const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
const server = http.createServer(serverCB).listen(3101, () => {
  console.log('server running on port 3101!');
});

function serverCB(req, res) {
  console.log(req.url);
  if(req.url === '/') {
    res.writeHead(200, '7777777', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });

    // processTimezoneData().then(s => console.log(s));
    let c = 0;
    let chunks = [];
    https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', resl => {
      resl
      .pipe(dec)

    	// res
      // .on('data', chunk => {
      //   console.log(`chunk ${c++}`);
      //   console.log(String.fromCharCode(chunk[0]));
      //   console.log();
      //   return {"a": "b", "c": 2};
      // })
      .pipe(res);
    });




    // client.connect().then(() => {
    //   console.log('connected successfully to mdb server!!');
    //   const db = client.db('tzs');
    //   client.close();
    // }).catch(err => console.error(err));

    // res.write('done!!!', 'utf8');
    // res.end();
  }
};
