import { graphql } from 'graphql';
import schema from './graphql/schema';
import prog from './utils/ProgressEmitter';
import routePipe from './utils/routePipe';
import routeMap from './utils/routeMap';

const AWS = require('aws-sdk');
const http = require('http');
const path = require('path');

AWS.config.update({
  endpoint: process.env.ENV == 'dev' ? 'http://localhost:8000' : process.env.MONGODB_URI
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

http.createServer(serverCB).listen(port, () => {// eslint-disable-next-line no-console
  console.log(`server running on port ${port}!`);// , '\x07' default beep
});

let db, client, docClient;
async function serverCB(req, res) {
  let payload, data;
  if (req.method == 'POST') {
    let query = '';

    req.on('data', chk => {
      query += chk;
    });

    req.on('end', async () => {
      const {source, type} = JSON.parse(query);
      try {
        data = await graphql({ schema, source, contextValue: docClient });
        console.log('dataaaa: ', data);
        if (data.errors) {
          throw data.errors[0];
        }
        payload = Object.assign({}, data.data[type]);
      } catch (err) {
        payload = { status: `${err.name}: ${err.message}. Number of documents retrieved not equal to 1.` };
      } finally {
        process.env.ENV == 'dev' && res.writeHead('200', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });
        res.end(JSON.stringify(payload));
      }
    });
  }

  if (req.method == 'GET') {
    if (req.url == '/connect') {
      prog.once('connected', () => {
        res.write('event: status\ndata: Connected...getting data\n\n\n');
      });

      prog.once('datafetched', (arr) => {
        res.write(`event: dataLists\ndata: ${JSON.stringify(arr)}\n\n\n`);
        res.write('event: status\ndata: \n\n\n');
      });

      docClient = new AWS.DynamoDB.DocumentClient();



      res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:3100',
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
      });

      const eventInterval = setInterval(() => res.write(':keepalive\n\n\n'), 54165);// heroku dyno times out after 55 seconds
      res.write('event: status\ndata: Connecting to database\n\n\n');

   
        
      // db = process.env.ENV == 'dev' ? client.db('tzs') : client.db(process.env.DB_NAME);
      // console.log('Connected correctly to mongo server!', !!db);// eslint-disable-line no-console
      prog.emit('connected');
      const params = key => ({
        TableName: 'demo',
        Key: {
          "offset": key,
          "place": "null"
        }
      });
      const offsetsProm = docClient.get(params("offsets")).promise();
      const placesProm = docClient.get(params("places")).promise();

      // const splitData = records.reduce((acc, x) => {
      //   acc[0].push(...x.places.map(p => p.name));
      //   acc[1].push(x.offset);
      //   return acc;
      // }, [[], []]);

      // const pList = [...new Set(splitData[0].sort((a, b) => a.localeCompare(b)))];
      // const oList = splitData[1];

      Promise.all([offsetsProm, placesProm])
        .then(([oL, pL]) => {
          return [oL.Item.offsets, pL.Item.places];
        })
        .then(([offsetsList, placesList]) => prog.emit('datafetched', [offsetsList, placesList]))
        .catch(err => {// eslint-disable-next-line no-console
          console.log('dynomodb error: ', err.message, err);
          res.write(`event: status\ndata: ${err.message}. Please try again.\n\n\n`);
        });

      // if (records.length == 0) {
      //   throw new Error('Database error: Data not available');
      // } else {
      //   prog.emit('datafetched', [oList, pList]);
      // }

     

      req.on('close', async () => {
        try {
          clearInterval(eventInterval);
          // await client.close();
          // client = null;
          // db = null;
        } catch (err) {// eslint-disable-next-line no-console
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