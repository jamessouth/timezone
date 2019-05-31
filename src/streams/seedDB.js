const { Writable } = require('stream');
const assert = require('assert');

export default function seedDB(database, cl) {
  let count = 1;
  return new Writable({
    decodeStrings: false,
    defaultEncoding: 'utf8',
    objectMode: true,
    write(ch, enc, cb) {
      // console.log(ch);

      if(count > 2) {
        database.collection('timezones').insertOne({no: count, offset: ch[0], places: ch.slice(1)}, (err, r) => {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
        });
      }
      count++;
      cb();
    },
    final(cb) {
      cl.close();
      console.log(new Date());
      cb();
    }
  });
}
