// utility to save time zone table data from wikipedia to a file so I don't have to hit the API so much in development
const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream('./tabledata');

https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', chunks => chunks.pipe(file));
