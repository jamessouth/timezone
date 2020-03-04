const MongoClient = require('mongodb').MongoClient;
const https = require('https');
const fs = require('fs');

const client = new MongoClient(
    'mongodb://localhost:27017',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    );

const requestAsync = function(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            const { statusCode } = res;
            let error;
            if (statusCode !== 200) {
              error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
            }
            if (error) {
              console.error(error.message);
              res.resume();
              return;
            }
            res.setEncoding('base64');
            let data = "";
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', e => {
            console.log('err: ', e);
            reject(e);
        });
    });
};

async function* gengen(arr) {
    for (let i = 0; i < arr.length; i++) {
        const b64 = await requestAsync(arr[i].flag);
        yield Promise.all([b64, arr[i].name, arr[i].no]);
    }
}

async function loop(arr, db) {
    for await (const url of gengen(arr)) {
        await db.collection('timezones').updateOne({"places.pl": url[1], "no": url[2]}, {$set: {"places.$.fl": url[0]}});
    }
}
    
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

    const urls = list.flatMap(b => b.places.map(f => ({no: b.no, name: f.pl, flag: f.fl.startsWith('htt') ? f.fl : 'https://' + f.fl})));

    await loop(urls, db);
    
    await client.close();
}

go();