const { Writable } = require('stream');
const assert = require('assert');

export default function seedDB(database, cl) {
  let count = 0;
  return new Writable({
    decodeStrings: false,
    defaultEncoding: 'utf8',
    objectMode: true,
    write(ch, enc, cb) {
      const chArray = JSON.parse(ch);
      if(count > 0) {
        database.collection('timezones').insertOne({no: count, offset: chArray[0], places: chArray.slice(1)}, (err, r) => {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
        });
      }
      count++;
      cb();
    },
    final(cb) {
      cl.close();
      cb();
    }
  });
}
