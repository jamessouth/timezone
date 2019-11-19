/* eslint-disable no-console */
import { graphql } from 'graphql';
import schema from './graphql/schema';

import seedDB from './streams/seedDB';

import makePipeline from './streams/makePipeline';
import offsetsStream from './streams/offsetsStream';

import getDB from './MongoDBController';

// const { Readable } = require('stream');
const http = require('http');
const fs = require('fs');
const https = require('https');
const assert = require('assert');
// const { parse } = require('querystring');


let db, client;

getDB().then(clnt => {
  client = clnt;
  db = client.db('tzs');
  console.log("Connected correctly to mongo server!");
}).catch(err => {

  console.log('tfctfctfctfc', err);
  // resp.write('Error connecting to database. Please try again.', 'utf8');
  // resp.end();
  process.exit(1);
});









const server = http.createServer(serverCB).listen(3101, () => {
  console.log('server running on port 3101!', '\x07');// default beep
});

async function serverCB(reqt, resp) {
  let source = '';
  let payload, data;

  if (reqt.method === 'POST') {
    try {
      const client = new MongoClient(
        'mongodb://localhost:27017',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      await client.connect();
      const db = client.db('tzs');
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


// mongod --dbpath="c:\data\db"















          // MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 unpipe listeners added. Use emitter.setMaxListeners() to increase limit


// Image by <a href="https://pixabay.com/users/TheDigitalArtist-202249/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4181261">Pete Linforth</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4181261">Pixabay</a>



          payload = Object.assign({}, data.data.timezone);

          console.log('fhfhfhfhfhfhf');
        } catch (err) {
          console.log('llllllllllllll', err);
          payload = { msg: `Assertion error: ${err.message}. Number of documents retrieved not equal to 1.` };
        } finally {
          console.log('pl ', payload);
          console.log();
          client && client.close();
          resp.writeHead('200', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });
          resp.end(JSON.stringify(payload));
        }
      });
    } catch (err) {
      payload = { msg: `Error connecting to database: ${err.message}. Please try again.` };
      resp.writeHead('200', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });
      console.log('t33333333', err);
      // resp.write('Error connecting to database. Please try again.', 'utf8');
      resp.end(JSON.stringify(payload));
    }
  }


  if (reqt.method === 'GET' && reqt.url === '/') {
    resp.writeHead(200, { 'Access-Control-Allow-Origin': 'http://localhost:3100' });

    // resp.write('event: ping\ndata: grabbing data...');
    // , 'Connection': 'keep-alive', 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache'







    console.log(db);





      db.dropCollection('timezones').then(res => console.log(res));
      // https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', async chunks => {
      //
      //   await makePipeline(chunks, seedDB(db)).catch(err => console.log(err));
      //   console.log('cc343453453434535ccc');
      //
      // });
      // (async function getData() {
      console.log('here');
        const file = fs.createReadStream('./tabledata');
        await makePipeline(file, seedDB(db));
        const col = db.collection('timezones');
        const offsets = await col.find({}).project({ offset: 1, _id: 0 }).toArray();
        client.close();
        console.log('cc343453453434535ccc');
        offsetsStream(offsets).pipe(resp);

      // })();



  }
};
