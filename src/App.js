import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';


function sendMsg() {
  // .map(x => String.fromCharcode(x)
  // const evtSource = new EventSource('http://localhost:3101');
  // evtSource.addEventListener('ping', function(e) {
  //   console.log('p ', e);
  // }, false);
  // evtSource.addEventListener('error', function(e) {
  //   console.log('err ', e);
  // });


  // console.log(new Date());
  fetch('http://localhost:3101')
  // .then(x => x.json())
  .then(async res => {
    const readr = res.body.getReader();
    const data = await readr.read();
    async function processData({done, value}) {
      if (done) return;
      console.log(new TextDecoder('utf-8').decode(value));

      return readr.read().then(processData);
    }
    return await processData(data);
  });

}


export default function App() {
  let [places, updatePlaces] = useState([]);

  async function postQuery(body) {
    try {
      let data = await fetch('http://localhost:3101', {
        method: 'POST',
        body
      });
      if (data.ok) {
        data = await data.json();
        // console.log(data);
        updatePlaces(data.places);
        // console.log(places);
      } else {
        throw new Error('Network problem - response not ok');
      }
    } catch (err) {
      console.log(err);
    }
  }

// form validation

  return (
    <>
      <div className="intro">Hello World</div>
      <button type="button" onClick={sendMsg}>data</button>
      <Form postQuery={postQuery}/>
      {
        places && places.length > 0 && <List places={places}></List>
      }
      {
        !places && <p>not places</p>
      }
    </>
  );
}
