/* eslint-disable no-console */
import { graphql } from 'graphql';
import schema from './graphql/schema';

import prog from './utils/ProgressEmitter';


// import getDB from './MongoDBController';

const { pipeline } = require('stream');
const http = require('http');

const fs = require('fs');
const https = require('https');
const path = require('path');
const assert = require('assert');
// const { parse } = require('querystring');

const MongoClient = require('mongodb').MongoClient;




const server = http.createServer(serverCB).listen(3101, () => {
  console.log('server running on port 3101!', '\x07');// default beep
});

// , dbConnect = false
// mongod --dbpath="c:\data\db"


let db, client;
async function serverCB(req, res) {
  let payload, data;
  // console.log(req.url);


// TODO: fix client for post route



  if (req.method == 'POST') {
    let source = '';
    // try {
      // const client = new MongoClient(
      //   'mongodb://localhost:27017',
      //   {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //   }
      // );
      // await client.connect();
      // const db = client.db('tzs');
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
            console.log();
            console.log(data.errors);
            console.log();
            throw data.errors[0];

          }



          payload = Object.assign({}, data.data.timezone);

          console.log('fhfhfhfhfhfhf');
        } catch (err) {
          console.log('llllllllllllll', err);
          payload = { status: `${err.name}: ${err.message}. Number of documents retrieved not equal to 1.` };
        } finally {
          console.log('pl ', payload);
          console.log();
          // client && client.close();
          // res.writeHead('200', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });
          res.end(JSON.stringify(payload));
        }
      });
    // } catch (err) {
    //   payload = { error: `Error connecting to database: ${err.message}. Please try again.` };
      // res.writeHead('200', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });
      // console.log('t33333333', err);
      // res.write('Error connecting to database. Please try again.', 'utf8');
      // res.end(JSON.stringify(payload));
    // }
  }

  if (req.method == 'GET') {
    // res.writeHead(200, { 'Access-Control-Allow-Origin': 'http://localhost:3100' });

    if (req.url == '/connect') {
      console.log('es route ', Date.now());

      client = new MongoClient(
        'mongodb://localhost:27017',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );

      res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
      });

      const eventInt = setInterval(() => {
        res.write(':keepalive\n\n\n');
      }, 119562);//2 minute timeout in chrome

      prog.once('connected', () => {
        res.write('event: status\ndata: Connected...getting time zones\n\n\n');
      });

      prog.once('offsetsfetched', (arr) => {
        res.write(`event: offsetList\ndata: ${JSON.stringify(arr)}\n\n\n`);
        res.write('event: status\ndata: \n\n\n');
      });



        res.write('event: status\ndata: Connecting to database\n\n\n');

        try {
          await client.connect();
          db = client.db('tzs');
          console.log("Connected correctly to mongo server!", !!db);
          prog.emit('connected');
          const col = db.collection('timezones');
          const offsets = await col
            .find({})
            .project({ offset: 1, _id: 0 })
            .sort('no', 1)
            .toArray();

          if (offsets.length == 0) {
            throw new Error('Database error: Data not available');
          }

          setTimeout(() => {
            prog.emit('offsetsfetched', offsets);
          }, 2865);//gratuitous timeout to show status
        } catch (err) {

          console.log('conn err', err.message, err);
          if (err.name == 'MongoTimeoutError') {
            res.write(`event: status\ndata: Error connecting to database: ${err.message}. Please try again.\n\n\n`);

          } else {
            res.write(`event: status\ndata: ${err.message}. Please try again.\n\n\n`);
          }

        }




      req.on('close', () => {
        clearInterval(eventInt);
        client.close().then(() => {
          client = null;
          db = null;
          console.log('close', Date.now(), !!db);
          res.end();
        });
      });


    }



    if (req.url == '/') {

      res.writeHead(200, { 'Content-Type': 'text/html' });
      pipeline(
        fs.createReadStream('dist/index.html'),
        res,
        (err) => {
          if (err) {
            console.error('Pipeline failed.', err);
          } else {
            console.log('Pipeline succeeded.');
          }
        }
      );

    }


    if (/.js$/.test(req.url)) {

      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      pipeline(
        fs.createReadStream(path.join('dist', req.url)),
        res,
        (err) => {
          if (err) {
            console.error('Pipeline failed.', err);
          } else {
            console.log('Pipeline succeeded.');
          }
        }
      );

    }


    if (/favicon/.test(req.url)) {
      // res.writeHead(204);
      // res.end();


      fs.readFile(path.join('dist/icons', req.url), (err, img) => {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img);
      });



    }


    if (/.jpg$/.test(req.url)) {

      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      pipeline(
        fs.createReadStream(path.join('dist', req.url)),
        res,
        (err) => {
          if (err) {
            console.error('Pipeline failed.', err);
          } else {
            console.log('Pipeline succeeded.');
          }
        }
      );

    }

    if (/.png$/.test(req.url)) {

      res.writeHead(200, { 'Content-Type': 'image/png' });
      pipeline(
        fs.createReadStream(path.join('dist', req.url)),
        res,
        (err) => {
          if (err) {
            console.error('Pipeline failed.', err);
          } else {
            console.log('Pipeline succeeded.');
          }
        }
      );

    }




  }
};

// MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 unpipe listeners added. Use emitter.setMaxListeners() to increase limit


// Image by <a href="https://pixabay.com/users/TheDigitalArtist-202249/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4181261">Pete Linforth</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4181261">Pixabay</a>
