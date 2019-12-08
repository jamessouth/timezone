import React, { useState, useEffect, useReducer } from 'react';
import Form from './components/Form';
import Loading from './components/Loading';
import Results from './components/Results';
import Status from './components/Status';
import { initialState, reducer } from './reducers/appState';
import { h1, button, err, show, hide } from './styles/index.css';

export default function App() {
  const server = 'http://localhost:3101';

  const [
    {
      places,
      offset,
      error,
      offsetList,
      status,
      readyToSeedDB,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // const [offsetList, updateOffsetList] = useState(null);

  useEffect(() => {
    console.log('ddd ', Date.now());

    const evtSource = new EventSource(server + '/connect');

    ['status', 'error'].forEach((action) => {
      evtSource.addEventListener(action, function (e) {
        console.log(action, Date.now());
        dispatch({ type: action, payload: { [action]: e.data } });
      }, false);
    });

  }, []);



  function sendMsg() {
    // .map(x => String.fromCharcode(x)

    // console.log(new Date());
    fetch(server + '/seed')
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
              const data = { error: bod };
              return dispatch({ type: 'data', payload: data });
            }
          }
          bod += new TextDecoder('utf-8').decode(value);
          return readr.read().then(processData);
        }
        return await processData(data);
      })
      .then(offsetList => {
        dispatch({ type: 'status', payload: { 'status': '' } });
        dispatch({ type: 'offsetList', payload: { offsetList } });
        if (error) dispatch({ type: 'data', payload: {} });
      });


  }

  async function postQuery(body) {
    try {
      let data = await fetch(server, {
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
            className={ readyToSeedDB ? [button, show].join(' ') : [button, hide].join(' ') }
            type="button"
            onClick={ sendMsg }
            { ...(!readyToSeedDB ? { 'disabled': true } : {}) }
            // style={{ opacity: readyToSeedDB ? 1 : 0 }}
          >
            Seed the database with the latest time zone data from Wikipedia!
          </button>
      }
      {
        status && <p className={ err }>{ status }</p>
      }
      {
        status == 'Connecting to database' && !readyToSeedDB && <Loading/>
      }
      {
        offsetList && <Form offsetList={ offsetList } postQuery={ postQuery }/>
      }
      {
        (offset || places) && <Results offset={ offset } places={ places }></Results>
      }
      {
        error && <p className={ err }>{ error }</p>
      }

    </main>
  );
}





// !offsetList &&
// {
//   places && places.length == 0 && <p>Please enter a valid time zone</p>
// }
