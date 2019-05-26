const https = require('https');

export default function getTimezoneData() {
  try{
    let response = https.get('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*', response => {

    });
    if (!response.ok) throw new Error('Network problem - response not ok');
    // response = await response.json();
    return response.parse.text['*'];
  } catch(err){
    console.error('error on fetch: ', err.message);
  }
}
