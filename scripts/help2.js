const { Writable } = require('stream');
const assert = require('assert');

export default function seedDB(database, mongo = true) {
  let count = 0;
  return new Writable({
    decodeStrings: false,
    defaultEncoding: 'utf8',
    objectMode: true,
    write(ch, enc, cb) {
      const chArray = JSON.parse(ch);
      const data = {
        no: count,
        offset: chArray[0],
        places: chArray.slice(1)
      };
      if(count > 0) {

        mongo && database.collection('timezones').insertOne(data, (err, r) => {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
          cb();
        });
      } else {
        cb();
      }
      count++;
    }
  });
}
