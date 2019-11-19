const MongoClient = require('mongodb').MongoClient;

// let db;
const client = new MongoClient(
  'mongodb://localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = null;

export default function getDB() {
  if (db) return db;
  return new Promise((res, rej) => {
    client.connect().then(connection => {res(connection); db = connection;}).catch(err => rej(err));

  });

}
