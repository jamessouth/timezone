import React, { useState, useEffect, useReducer } from 'react';
import Form from './components/Form';
import Results from './components/Results';
import { initialState, reducer } from './reducers/appState';
import { h1, button } from './styles/index.css';

export default function App() {
  const [
    {
      places,
      offset,
      msg,
      offsetList,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // const [offsetList, updateOffsetList] = useState(null);

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
      })
      .then(offsetList => dispatch({ type: 'offsetList', payload: { offsetList } }));


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

        dispatch({ type: 'data', payload: data });

      } else {
        throw new Error('Network problem - response not ok');
      }
    } catch (err) {
      console.log(err);
    }
  }

// form validation

  return (
    <main>
      <h1 className={ h1 }>Time Zones</h1>
      {
        !offsetList && <button className={ button } type="button" onClick={ sendMsg }>Seed the database with the latest time zone data from Wikipedia!</button>
      }
      {
        offsetList && <Form offsetList={ offsetList } postQuery={ postQuery }/>
      }
      {
        (offset || places) && <Results offset={ offset } places={ places }></Results>
      }
      {
        msg && <p>{`There was an error: ${msg}.  Please try again.`}</p>
      }

    </main>
  );
}






// {
//   places && places.length == 0 && <p>Please enter a valid time zone</p>
// }
