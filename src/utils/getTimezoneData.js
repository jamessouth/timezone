export default async function getTimezoneData() {
  try{
    let response = await fetch('https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*');
    if (!response.ok) throw new Error('Network problem - response not ok');
    response = await response.json();
    return response.parse.text['*'];
  } catch(err){
    console.log('error on fetch: ', err.message);
  }
}
