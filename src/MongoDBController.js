const MongoClient = require('mongodb').MongoClient;


const client = new MongoClient(
  'mongodb://localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// let db = null;

export default function getDB() {
  // if (db) return Promise.resolve(db);
  return new Promise(async (res, rej) => {
    try {
      const connection = await client.connect();
      res(connection);
      // db = connection;
    } catch (err) {
      rej(err);
    }
  });
}
