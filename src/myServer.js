/* eslint-disable no-console */
import { graphql } from 'graphql';
import schema from './graphql/schema';

import prog from './utils/ProgressEmitter';
// import pipeError from './utils/pipeError';

import routePipe from './utils/routePipe';
import routeMap from './utils/routeMap';


// const { pipeline } = require('stream');
const http = require('http');

const path = require('path');
// const fs = require('fs');
// const https = require('https');
// const assert = require('assert');


const MongoClient = require('mongodb').MongoClient;



// eslint-disable-next-line no-unused-vars
const server = http.createServer(serverCB).listen(3101, () => {
  console.log('server running on port 3101!', '\x07');// default beep
});

// , dbConnect = false
// mongod --dbpath="c:\data\db"


let db, client;
async function serverCB(req, res) {
  let payload, data;


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


        // const flags = await db
        //   .collection('flags')
        //   .find({})
        //   .project({ flags: 1, _id: 0 })
        //   .toArray();

        // console.log(flags);
        // , flags[0]

        // db.timezones.find({},{"places.pl":1, _id:0})
        // db.timezones.find({"places.pl":"United States"},{offset:1, _id:0})

        // db.results.updateOne({"places.pl":"Kiribati (Phoenix Islands)","no":36},{$set: {"places.$.fl": kir}})


        // upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/46px-Flag_of_the_United_States.svg.png


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




    if (req.url == '/connect') {
      console.log('es route ', Date.now());

      prog.once('connected', () => {
        res.write('event: status\ndata: Connected...getting time zones\n\n\n');
      });

      prog.once('offsetsfetched', (arr) => {
        res.write(`event: offsetList\ndata: ${JSON.stringify(arr)}\n\n\n`);
        res.write('event: status\ndata: \n\n\n');
      });

      client = new MongoClient(
        'mongodb://localhost:27017',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );

      res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:3100',
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
      });

      const eventInterval = setInterval(() => res.write(':keepalive\n\n\n'), 119562);//2 minute timeout in chrome


      res.write('event: status\ndata: Connecting to database\n\n\n');

      try {
        await client.connect();
        db = client.db('tzs');
        console.log('Connected correctly to mongo server!', !!db);
        prog.emit('connected');
        const offsets = await db
          .collection('timezones')
          .find({})
          .project({ offset: 1, _id: 0 })
          .sort('no', 1)
          .toArray();

        if (offsets.length == 0) {
          throw new Error('Database error: Data not available');
        } else {

          prog.emit('offsetsfetched', offsets);
        }







      } catch (err) {

        console.log('conn err', err.message, err);
        if (err.name == 'MongoTimeoutError') {
          res.write(`event: status\ndata: Error connecting to database: ${err.message}. Please try again.\n\n\n`);

        } else {
          res.write(`event: status\ndata: ${err.message}. Please try again.\n\n\n`);
        }

      }




      req.on('close', async () => {

        try {
          clearInterval(eventInterval);
          await client.close();
          client = null;
          db = null;
          console.log('close', Date.now(), !!db);

        } catch (err) {
          console.log(err);
        } finally {
          res.end();

        }



      });


    } else {
      if (req.url == '/') req.url = '/index.html';
      const route = routePipe(req.url, res);
      route(routeMap[path.extname(req.url)]);
    }



  }
}


// Image by <a href="https://pixabay.com/users/TheDigitalArtist-202249/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4181261">Pete Linforth</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4181261">Pixabay</a>
