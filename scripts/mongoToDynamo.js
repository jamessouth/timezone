const AWS = require('aws-sdk');
const fs = require("fs");

AWS.config.update({
  endpoint: "http://localhost:8000"
});


const docClient = new AWS.DynamoDB.DocumentClient();

const timezones = JSON.parse(fs.readFileSync("./tzs.json", 'utf-8'));
let count = 0;
let arr = [];
let arr2 = [];


timezones.forEach(doc => {
  arr.push(doc.offset);
  arr2.push(doc.places);
  doc.places.forEach(pl => {

    const item = {
      TableName: 'demo', 
      Item: {
        "offset": doc.offset,
        "place": pl.name,
        "flag": pl.flag
      },
      ReturnConsumedCapacity: 'INDEXES'
      
    };

    docClient.put(item, (err, data) => {
      if (err) {
        console.error("didnt add", doc.no, err)
      } else {
        count += data.ConsumedCapacity.CapacityUnits;
        console.log("success", doc.no, count)
      }
    });
  });
  
  
});
const item = {
  TableName: 'demo', 
  Item: {
    "offset": "offsets",
    "place": "null",
    "offsets": arr
  },
  ReturnConsumedCapacity: 'INDEXES'
  
};
docClient.put(item, (err, data) => {
  if (err) {
    console.error("didnt add", err)
  } else {
    count += data.ConsumedCapacity.CapacityUnits;
    console.log("success", count);
  }
});
const item2 = {
  TableName: 'demo',
  Item: {
    "offset": "places",
    "place": "null",
    "places": docClient.createSet([...new Set(arr2.flat().map(o => o.name))])
  },
  ReturnConsumedCapacity: 'INDEXES'
  
};
docClient.put(item2, (err, data) => {
  if (err) {
    console.error("didnt add", err)
  } else {
    count += data.ConsumedCapacity.CapacityUnits;
    console.log("success", count)
  }
});
// console.log('arr: ', );

// note : utf8 chars are ok in json but not rendered properly in dynamo

