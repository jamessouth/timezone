const { Writable } = require('stream');
const assert = require('assert');

export default function seedDB(database, cl) {
  return new Writable({
    decodeStrings: false,
    defaultEncoding: 'utf8',
    write(ch, enc, cb) {
      // console.log(ch);
      database.collection('timezones').insertOne({data:ch}, (err, r) => {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);
        cb();
      });
    },
    final(cb) {
      cl.close();
      cb();
    }
  });
}
