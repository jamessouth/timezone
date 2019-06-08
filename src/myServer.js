/* eslint-disable no-console */
import { graphql } from 'graphql';
import schema from './graphql/schema';

import seedMongoDB from './streams/seedMongoDB';

import makePipeline from './streams/makePipeline';

const http = require('http');
const https = require('https');
const assert = require('assert');
// const { parse } = require('querystring');
const MongoClient = require('mongodb').MongoClient;


// {
//   timezone(offset: "UTC+08:45") {
//     places
//   }
// }

const server = http.createServer(serverCB).listen(3101, () => {
  console.log('server running on port 3101!');
});

async function serverCB(reqt, resp) {

  if (reqt.method === 'POST') {
    try {
      let source = '';
      let payload;
      const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
      await client.connect();
      const db = client.db('tzs');
      reqt.on('data', chk => source += chk);
      reqt.on('end', async () => {
        try {
          const data = await graphql({ schema, source, contextValue: db });
          payload = Object.assign({}, data.data.timezone);
          console.log(payload);
        } catch (err) {
          console.log(err.stack);
        } finally {
          client.close();
          resp.writeHead('200', {'Access-Control-Allow-Origin': 'http://localhost:3100'});
          resp.end(JSON.stringify(payload));
        }
      });
    } catch (err) {
      console.log(err.stack);
    }
  }


  if (reqt.method === 'GET' && reqt.url === '/') {
    // resp.writeHead(200, '7777777', { 'Access-Control-Allow-Origin': 'http://localhost:3100', 'Connection': 'keep-alive', 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
    //
    // resp.write('event: ping\ndata: grabbing data...');

    const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
    https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', async chunks => {
      try {

        await client.connect();
        const db = client.db('tzs');
        console.log("Connected correctly to mongo server!");


        makePipeline(chunks, seedMongoDB(db, client));


      } catch(err) {
        if(err.name === 'MongoNetworkError') {
          console.log('\x1b[1m\x1b[31mNo running MongoDB instance found\x1b[0m - \x1b[1m\x1b[32mfalling back to ....\x1b[0m');
        }

        // console.log('errrrrrrrrrrr', err.message);
      }
    });



    // resp.write('done!!!', 'utf8');
    // resp.end();
  }
};
