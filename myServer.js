const http = require('http');
// const fs = require('fs');
// const path = require('path');
const mongoose = require('mongoose');

const server = http.createServer((req, res) => {

  console.log(req.url);

  if(req.url === '/') {
    res.writeHead(200, '7777777', { "Access-Control-Allow-Origin": "http://localhost:3100" });


    mongoose.connect('mongodb://localhost/tzs', {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
      console.log('connected!');
      const timezoneSchema = new mongoose.Schema({
        offset: String,
        locations: String
      });


      const Timezone = mongoose.model('Timezone', timezoneSchema);
      const utc = new Timezone({ offset: '0', locations: 'UK' });
      console.log(utc);
      utc.save((err, utc) => {
        if(err) return console.error(err);
        console.log(`${utc} added!`);
      });

    });
    res.write('done!!!', 'utf8');


    res.end('5');


  }

});





server.listen(3101, () => {
  console.log('server running on port 3101!');
});
