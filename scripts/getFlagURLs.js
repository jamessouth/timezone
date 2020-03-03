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


const requestAsync = function(url, file, path) {
    return new Promise((resolve, reject) => {

        https.get(url, chunks => {

            chunks.pipe(file);
            // console.log('dt: ', Date.now());
            fs.readFile(path, 'base64', (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
            
        });


    });
};

async function* gengen(arr) {

    for (let i = 0; i < arr.length; i++) {
        const path = 'C:/Users/danny/Desktop/flags/' + arr[i].name + '.png';
        const file = fs.createWriteStream(path);
        const url = 'https://' + arr[i].flag;
        const b64 = requestAsync(url, file, path);

        // console.log('dt2: ', Date.now());
        yield b64;
        fs.unlinkSync(path);
        
    }
}

async function loop(arr, db) {
    for await (const url of gengen(arr)) {
        // console.log('res: ', url, Date.now());
        db.collection('bu2')
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


    const urls = list.slice(0,1).flatMap(b => b.places.map(f => ({no: b.no, name: f.pl, flag: f.fl})));

    // console.log('urls: ', urls);

    await client.close();

    loop(urls, db);

}

go();