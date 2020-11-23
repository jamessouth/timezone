const AWS = require('aws-sdk');
const fs = require("fs");

AWS.config.update({
  endpoint: "http://localhost:8000"
});


const docClient = new AWS.DynamoDB.DocumentClient();

const timezones = JSON.parse(fs.readFileSync("./tzs.json", 'utf-8'));
let count = 0;
let arr = [];


timezones.forEach(doc => {
  arr.push(doc.offset);
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
console.log('arr: ', arr);