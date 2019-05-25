/* eslint-disable no-console */
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
const server = require('http').createServer(serverCB);
const serverCB = (req, res) => {
  console.log(req.url);
  if(req.url === '/') {
    res.writeHead(200, '7777777', { 'Access-Control-Allow-Origin': 'http://localhost:3100' });

    client.connect().then(() => {
      console.log('connected successfully to mdb server!!');
      const db = client.db('tzs');
      client.close();
    }).catch(err => console.error(err));

    res.write('done!!!', 'utf8');
    res.end('5');
  }
};

server.listen(3101, () => {
  console.log('server running on port 3101!');
});
