import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';


export default function App() {
  const [places, updatePlaces] = useState(null);
  const [graphQLErrorMsg, updateGraphQLErrorMsg] = useState(null);
  const [offsetList, updateOffsetList] = useState(null);

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
      let bod = '';
      const readr = res.body.getReader();
      const data = await readr.read();
      async function processData({done, value}) {
        if (done) {
          return JSON.parse(bod);
        }
        bod += new TextDecoder('utf-8').decode(value);
        return readr.read().then(processData);
      }
      return await processData(data);
    }).then(offsets => updateOffsetList(offsets));


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

        if (data.places) {
          updatePlaces(data.places);
          updateGraphQLErrorMsg(null);
          console.log(places);
        }

        if (data.msg) {
          updateGraphQLErrorMsg(data.msg);
          updatePlaces(null);
          console.log(graphQLErrorMsg);
        }

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
      <Form offsetList={offsetList} postQuery={postQuery}/>
      {
        places && <List places={places}></List>
      }
      {
        graphQLErrorMsg && <p>{`There was an error: ${graphQLErrorMsg}.  Please try again.`}</p>
      }

    </>
  );
}

// {
//   places && places.length == 0 && <p>Please enter a valid time zone</p>
// }
