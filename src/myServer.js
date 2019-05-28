/* eslint-disable no-console */
import processTimezoneData from './utils/processTimezoneData';

const http = require('http');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const { Transform, Writable } = require('stream');
const assert = require('assert');

let cnt = 1;
const throt = new Transform({
  encoding: 'utf8',
  transform(ch, enc, cb) {
    let obj = `${cnt},p,y,${ch.length}`;
    setTimeout(() => {
      // console.log(obj);
      this.push(obj);
      cnt++;
      cb();
    }, 250);
  }
});
// let doc;
const seed = function(database) {
  return new Writable({
    decodeStrings: false,
    defaultEncoding: 'utf8',
    write(ch, enc, cb) {
      console.log(ch);
      database.collection('timezones').insertOne({no:cnt, dat:ch}, (err, r) => {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        cb();
      });

    }
  });
}

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
const server = http.createServer(serverCB).listen(3101, () => {
  console.log('server running on port 3101!');
});

function serverCB(reqt, resp) {
  console.log(reqt.url);
  if(reqt.url === '/') {
    resp.writeHead(200, '7777777', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });


    https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', async chunks => {
      try {
        console.log(new Date());
        await client.connect();
        console.log(new Date());
        console.log("Connected correctly to mongo server!");
        const db = client.db('tzs');

        chunks.pipe(throt).pipe(seed(db));



        // assert.equal(1, r.insertedCount);

        setTimeout(() => {
          client.close();
        }, 25998);



      } catch(err) {
        console.log(err);
      }
    });



    // resp.write('done!!!', 'utf8');
    // resp.end();
  }
};
