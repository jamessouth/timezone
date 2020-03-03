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

        https.get(url, res => {

            const { statusCode } = res;

            console.log('st: ', statusCode);

            let error;
            if (statusCode !== 200) {
              error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            }

            if (error) {
              console.error(error.message);
              // Consume response data to free up memory
              res.resume();
              return;
            }
            res.setEncoding('base64');
            let data = "";
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log('data: ', data);
            });




            // await chunks.pipe(file).then(() => console.log('rere: ', Date.now()));
            // console.log('dt: ', Date.now());
            
            // fs.readFile(path, 'base64', (err, data) => {
            //     console.log('dt222: ', Date.now());
            //     if (err) reject(err);
            //     // setTimeout(() => {

            //         resolve(data);
            //     // }, 250);
            // });
            
        }).on('error', e => {
            console.log('err: ', e);
        });


    });
};

async function* gengen(arr) {

    for (let i = 0; i < arr.length; i++) {
        const path = 'C:/Users/danny/Desktop/flags/' + arr[i].name + '.png';
        const file = fs.createWriteStream(path);
        const url = arr[i].flag.startsWith('htt') ? arr[i].flag : 'https://' + arr[i].flag;
        
        const b64 = await requestAsync(url, file, path);

        // console.log('dt2: ', Date.now());
        yield Promise.all([b64, arr[i].name, arr[i].no]);
        fs.unlinkSync(path);
        
    }
}

async function loop(arr, db) {
    for await (const url of gengen(arr)) {
        
        console.log('res: ', url[0].slice(40, 60), url[1], url[2], Date.now(), url[0].length);
        // db.collection('bu2').updateOne({"places.pl":"Kiribati (Phoenix Islands)","no":36},{$set: {"places.$.fl": kir}})
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

    console.log('urls: ', urls);

    await client.close();

    // .slice(0,1)
    // loop(urls, db);

}

go();