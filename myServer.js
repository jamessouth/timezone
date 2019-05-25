const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  console.log(req.url);

  if(req.url === '/') {
    res.writeHead(200, '7777777', { "Access-Control-Allow-Origin": "http://localhost:3100" });
    res.end('5');
  }

});

server.listen(3101, () => {
  console.log('server running on port 3101!');
})
