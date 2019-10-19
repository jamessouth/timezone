/* eslint-disable no-console */
import { graphql } from 'graphql';
import schema from './graphql/schema';

import seedDB from './streams/seedDB';

import makePipeline from './streams/makePipeline';
import offsetsStream from './streams/offsetsStream';

// const { Readable } = require('stream');
const http = require('http');
const fs = require('fs');
const https = require('https');
const assert = require('assert');
// const { parse } = require('querystring');
const MongoClient = require('mongodb').MongoClient;


let db, client, offsets;
let rrr = `
{
  timezone(offset: "UTC+08:45") {
    places
  }
}
`;

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

      console.log('t33333333', err);

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
            // console.log('hdhdhdhdhdhd');
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

      console.log('tfctfctfctfc', err);

    } finally {
      // https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', async chunks => {
      //
      //   await makePipeline(chunks, seedDB(db)).catch(err => console.log(err));
      //   console.log('cc343453453434535ccc');
      //
      // });

      (async function getData() {
        // const file = fs.createReadStream('./tabledata');


        await makePipeline(file, seedDB(db));
        const col = db.collection('timezones');
        offsets = await col.find({}).project({ offset: 1, _id: 0 }).toArray();
        client.close();



        console.log('cc343453453434535ccc');


        offsetsStream(offsets).pipe(resp);


      })();
    }


    // resp.write('done!!!', 'utf8');

  }
};
