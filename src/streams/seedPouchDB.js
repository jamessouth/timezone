const { Writable } = require('stream');
const assert = require('assert');

export default function seedPouchDB(database) {
  let count = 0;
  return new Writable({
    decodeStrings: false,
    defaultEncoding: 'utf8',
    objectMode: true,
    write(ch, enc, cb) {
      const chArray = JSON.parse(ch);
      if(count > 0) {
        database.put({_id: 4, no: count, offset: chArray[0], places: chArray.slice(1)}, (err, r) => {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
        });
      }
      count++;
      cb();
    }
  });
}
