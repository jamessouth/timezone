/* eslint-disable no-console */
import processTimezoneData from './utils/processTimezoneData';

import removeFirstChunk from './streams/removeFirstChunk';
import removeParens from './streams/removeParens';
import seedDB from './streams/seedDB';
import removeStates from './streams/removeStates';
import splitByRows from './streams/splitByRows';
import getPNames from './streams/getPNames';
import deDupe from './streams/deDupe';
import sortNames from './streams/sortNames';
import replaceUnicodeChars from './streams/replaceUnicodeChars';
import stripOutImgTags from './streams/stripOutImgTags';

const http = require('http');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');




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
        // console.log(new Date());
        await client.connect();
        // console.log(new Date());
        console.log("Connected correctly to mongo server!");
        const db = client.db('tzs');

        chunks
          .pipe(removeFirstChunk)
          .pipe(splitByRows)
          .pipe(stripOutImgTags)
          .pipe(removeParens)
          .pipe(getPNames)
          .pipe(removeStates)
          .pipe(deDupe)
          .pipe(sortNames)
          .pipe(replaceUnicodeChars)
          .pipe(seedDB(db, client));


      } catch(err) {
        console.log(err);
      }
    });



    // resp.write('done!!!', 'utf8');
    // resp.end();
  }
};
