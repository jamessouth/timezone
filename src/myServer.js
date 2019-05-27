/* eslint-disable no-console */
import processTimezoneData from './utils/processTimezoneData';

const http = require('http');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const { Transform, Writable } = require('stream');
const assert = require('assert');

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


    https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', resl => resl.pipe(dec).pipe(res));



    (async function() {
      try {
        console.log(new Date());
        await client.connect();
        console.log(new Date());
        console.log("Connected correctly to mongo server!");
        const db = client.db('tzs');

        // Insert a single document
        let r = await db.collection('inserts').insertOne({a:1});
        assert.equal(1, r.insertedCount);

        // Insert multiple documents
        var rr = await db.collection('inserts').insertMany([{a:2}, {a:3}]);
        assert.equal(2, rr.insertedCount);

        // Close connection
        client.close();
      } catch(err) {
        console.log(err);
      }
    })();

    // res.write('done!!!', 'utf8');
    // res.end();
  }
};
