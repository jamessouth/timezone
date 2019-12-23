const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream('./flagdata');

https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', chunks => chunks.pipe(file));
