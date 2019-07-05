/* eslint-disable no-console */
import { graphql } from 'graphql';
import schema from './graphql/schema';

import seedMongoDB from './streams/seedMongoDB';
import seedPouchDB from './streams/seedPouchDB';


import makePipeline from './streams/makePipeline';
import offsetsStream from './streams/offsetsStream';

const { Readable } = require('stream');
const http = require('http');
const fs = require('fs');
const https = require('https');
const assert = require('assert');
// const { parse } = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const PouchDB = require('pouchdb-node');
PouchDB.plugin(require('pouchdb-find'));

let db, client, offsets;
let rrr = `
{
  timezone(offset: "UTC+08:45") {
    places
  }
}
`;


// (async function hhh() {
//   db = new PouchDB('tzs');
//
//   offsets = await db.find({ selector: { offset: { $exists: true } },
//   fields: ['no', 'offset'] });
//
//             db.close();
// // console.log(offsets);
// // console.log();
// // console.log();
//   const myReadable = new Readable({
//     // objectMode: true,
//     read(size) {
//       // const offsetObj = offsets.docs.shift();
//       // if (offsetObj) offsetObj.dt = new Date().getMilliseconds();
//       this.push(JSON.stringify(offsets.docs));
//       // if (size > 17000) this.push(null);
//     }
//   });
//
//
//   myReadable.pipe(process.stdout);
// })();





const server = http.createServer(serverCB).listen(3101, () => {
  console.log('server running on port 3101!', '\x07');// default beep
});

async function serverCB(reqt, resp) {
  let source = '';
  let payload, data;

  if (reqt.method === 'POST') {
    try {
      const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
      await client.connect();
      db = client.db('tzs');
    } catch (err) {
      if(err.name === 'MongoNetworkError') {
        db = new PouchDB('tzs');
      } else {
        console.log('t33333333', err);
      }
    } finally {
      reqt.on('data', chk => {
        // console.log('ch ', chk);
        source += chk;
      });
      reqt.on('end', async () => {
        // console.log('src ', source);
        try {
          data = await graphql({ schema, source, contextValue: db });
          // if (data.data) {
          // console.log('mys', data);
            if (data.errors) {
              throw data.errors[0];

            }

            // if (data.data.timezone) {

              payload = Object.assign({}, data.data.timezone);
            // }



          // } else {
          //   console.log('bad query');

          // }
          console.log('fhfhfhfhfhfhf');
        } catch (err) {
          console.log('llllllllllllll', err);
          payload = { msg: err.message };
        } finally {
          console.log('pl ', payload);
          console.log();
          client && client.close();
          resp.writeHead('200', {'Access-Control-Allow-Origin': 'http://localhost:3100'});
          resp.end(JSON.stringify(payload));
        }
      });
    }
  }


  if (reqt.method === 'GET' && reqt.url === '/') {
    resp.writeHead(200, '7777777', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });

    // resp.write('event: ping\ndata: grabbing data...');
    // , 'Connection': 'keep-alive', 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache'


    try {
      client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
      await client.connect();
      db = client.db('tzs');
      console.log("Connected correctly to mongo server!");
    } catch (err) {
      if(err.name === 'MongoNetworkError') {
        console.log('\x1b[1m\x1b[31mNo running MongoDB instance found\x1b[0m - \x1b[1m\x1b[32mfalling back to PouchDB\x1b[0m');
        db = new PouchDB('tzs');
        // db.destroy();
      } else {
        console.log('tfctfctfctfc', err);
      }
    } finally {
      // https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', async chunks => {
      //   if (db.prefix) {
      //     await makePipeline(chunks, seedPouchDB(db));
      //     offsets = await db.find({ selector: { offset: { $exists: true } },
      //     fields: ['no', 'offset'] });
      //     db.close();
      //     console.log('ccccccccccccccccccccc');
      //     offsetsStream(offsets.docs).pipe(resp);
      //     // console.log(offsets);
      //     // resp.end(JSON.stringify(offsets));
      //   } else {
      //     await makePipeline(chunks, seedMongoDB(db, client)).catch(err => console.log(err));
      //     console.log('cc343453453434535ccc');
      //   }
      // });

      (async function getData() {
        // const file = fs.createReadStream('./tabledata');
        if (db.prefix) {
          await db.createIndex({
            index: {
              fields: ['no']
            }
          });
          // await makePipeline(file, seedPouchDB(db));
          offsets = await db.find({ selector: { no: { $exists: true } },
          fields: ['offset'],
          sort: [{no: 'asc'}] });
          db.close();
          console.log('ccccccccccccccccccccc');
          offsetsStream(offsets.docs).pipe(resp);
          // console.log(offsets);
          // resp.end(JSON.stringify(offsets));
        } else {
          await makePipeline(chunks, seedMongoDB(db, client)).catch(err => console.log(err));
          console.log('cc343453453434535ccc');
        }
      })();
    }


    // resp.write('done!!!', 'utf8');

  }
};
