import React, { useState, useEffect, useReducer } from 'react';
import Form from './components/Form';
import Results from './components/Results';
import { initialState, reducer } from './reducers/appState';
import { h1, button, err } from './styles/index.css';

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

  useEffect(() => {
    console.log('ddd ', Date.now());
    const ul = document.querySelector('ul');
    console.log(ul);
    const evtSource = new EventSource('http://localhost:3101/es');
    evtSource.addEventListener('ping', function(e) {
      // console.log('eee ', Date.now());
      console.log('p ', e);
      dispatch({ type: 'data', payload: { msg: e.data } })
    }, false);
    evtSource.addEventListener('error', function(e) {
      console.log('err ', e);
    });

  }, []);



  function sendMsg() {
    // .map(x => String.fromCharcode(x)


    // console.log(new Date());
    fetch('http://localhost:3101')
    // .then(x => x.json())
      .then(async res => {
        let bod = '';
        const readr = res.body.getReader();
        const data = await readr.read();
        async function processData({done, value}) {
          if (done) {
            try {
              return JSON.parse(bod);
            } catch (err) {
              console.log(bod);
              const data = { msg: bod };
              return dispatch({ type: 'data', payload: data });
            }
          }
          bod += new TextDecoder('utf-8').decode(value);
          return readr.read().then(processData);
        }
        return await processData(data);
      })
      .then(offsetList => {
        dispatch({ type: 'offsetList', payload: { offsetList } });
        if (msg) dispatch({ type: 'data', payload: {} });
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
      <h1 className={ [h1, 'font-effect-decaying'].join(' ') }>Time Zones</h1>
      {
        !offsetList &&
          <button
            className={ button }
            type="button"
            onClick={ sendMsg }
            { ...(msg ? { 'disabled': true } : {}) }
          >
            Seed the database with the latest time zone data from Wikipedia!
          </button>
      }
      <ul></ul>
      {
        offsetList && <Form offsetList={ offsetList } postQuery={ postQuery }/>
      }
      {
        (offset || places) && <Results offset={ offset } places={ places }></Results>
      }
      {
        msg && <p className={ err }>{ msg }</p>
      }

    </main>
  );
}






// {
//   places && places.length == 0 && <p>Please enter a valid time zone</p>
// }
