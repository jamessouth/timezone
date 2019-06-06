import React, { useState } from 'react';
import Form from './components/Form';




function sendMsg() {
  // .map(x => String.fromCharcode(x)
  // const evtSource = new EventSource('http://localhost:3101');
  // evtSource.addEventListener('ping', function(e) {
  //   console.log('p ', e);
  // }, false);
  // evtSource.addEventListener('error', function(e) {
  //   console.log('err ', e);
  // });


  console.log(new Date());
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


async function postQuery(body) {
  try {
    let data = await fetch('http://localhost:3101', {
      method: 'POST',
      body
    });
    if (data.ok) {
      data = await data.json();
      console.log(data);
    } else {
      throw new Error('Network problem - response not ok');
    }
  } catch (err) {
    console.log(err);
  }
}


export default function App() {

    return (
      <>
        <div className="intro">Hello World</div>
        <button type="button" onClick={sendMsg}>data</button>
        <Form postQuery={postQuery}/>
      </>
    );
}
