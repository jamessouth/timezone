const MongoClient = require('mongodb').MongoClient;
// const https = require('https');
// const fs = require('fs');
// const file = fs.createWriteStream('./tabledata');

const client = new MongoClient(
    'mongodb://localhost:27017',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    );
    
async function go() {
    await client.connect();
    db = client.db('tzs');
    console.log('Connected correctly to mongo server!');

    const list = await db
    .collection('timezones')
    .find({})
    .project({ no: 1, places: 1, _id: 0 })
    .sort('no', 1)
    .toArray();


    const urls = list.slice(0,3).flatMap(b => b.places.map(f => ({no: b.no, name: f.pl, flag: f.fl})));

    console.log('urls: ', urls);

    await client.close();








// https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', chunks => chunks.pipe(file));
}

go();