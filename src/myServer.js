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
const path = require('path');
const assert = require('assert');
// const { parse } = require('querystring');









  // if (/.css$/.test(req.url)) {
  //   fs.readFile(path.join(__dirname, '/dist', req.url), 'utf8', (err, css) => {
  //     res.writeHead(200, { 'Content-Type': 'text/css' });
  //     res.end(css);
  //   });
  // }
  //
  // if (req.url.includes('/images/') && /(\.png|\.svg|\.jpg|\.gif)/.test(req.url)) {
  //   let ext = req.url.includes('.jpg') ? 'jpeg' : path.extname(req.url).substring(1);
  //   ext = req.url.includes('.svg') ? 'svg+xml' : ext;
  //   fs.readFile(path.join(__dirname, '/dist', req.url), (err, img) => {
  //     res.writeHead(200, { 'Content-Type': `image/${ext}` });
  //     res.end(img);
  //   });
  // }









let db, client;

getDB().then(clnt => {
  client = clnt;
  db = client.db('tzs');
  console.log("Connected correctly to mongo server!");

  const server = http.createServer(serverCB).listen(3101, () => {
    console.log('server running on port 3101!', '\x07');// default beep
  });


}).catch(err => {

  console.log('tfctfctfctfc', err);
  // res.write('Error connecting to database. Please try again.', 'utf8');
  // res.end();
  process.exit(1);
});









async function serverCB(req, res) {
  let source = '';
  let payload, data;

  if (req.method == 'POST') {
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
      req.on('data', chk => {
        // console.log('ch ', chk);
        source += chk;
      });
      req.on('end', async () => {
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
          res.writeHead('200', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });
          res.end(JSON.stringify(payload));
        }
      });
    } catch (err) {
      payload = { msg: `Error connecting to database: ${err.message}. Please try again.` };
      res.writeHead('200', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });
      console.log('t33333333', err);
      // res.write('Error connecting to database. Please try again.', 'utf8');
      res.end(JSON.stringify(payload));
    }
  }

 // && req.url === '/'
  if (req.method == 'GET') {
    // res.writeHead(200, { 'Access-Control-Allow-Origin': 'http://localhost:3100' });

    // res.write('event: ping\ndata: grabbing data...');
    // , 'Connection': 'keep-alive', 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache'



    console.log(req.url);
    if (req.url == '/') {
      fs.readFile('dist/index.html', 'utf8', (err, html) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      });
    }
    if (/.js$/.test(req.url)) {
      fs.readFile(path.join('dist', req.url), 'utf8', (err, js) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(js);
      });
    }
    if (/favicon/.test(req.url)) {
      // res.writeHead(204);
      // res.end();


      fs.readFile(path.join('dist/icons', req.url), (err, img) => {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img);
      });



    }



    // console.log(db);





      // db.dropCollection('timezones').then(res => console.log(res));
      // https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', async chunks => {
      //
      //   await makePipeline(chunks, seedDB(db)).catch(err => console.log(err));
      //   console.log('cc343453453434535ccc');
      //
      // });
      // (async function getData() {
      // console.log('here');
      //   const file = fs.createReadStream('./tabledata');
      //   await makePipeline(file, seedDB(db));
      //   const col = db.collection('timezones');
      //   const offsets = await col.find({}).project({ offset: 1, _id: 0 }).toArray();
      //   client.close();
      //   console.log('cc343453453434535ccc');
      //   offsetsStream(offsets).pipe(res);

      // })();



  }
};
