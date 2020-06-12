import React, { useEffect, useReducer } from 'react';
import Form from './components/Form';
import Loading from './components/Loading';
import Results from './components/Results';
// import Status from './components/Status';
import { initialState, reducer } from './reducers/appState';
import { h1, msg } from './styles/index.css';

export default function App() {
  const server = 'http://localhost:3101';

  const [
    {
      places,
      offset,
      offsetList,
      placeList,
      status,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  
  
  useEffect(() => { // eslint-disable-next-line no-console
    console.log('ddd ', Date.now());
  
    const evtSource = new EventSource(server + '/connect');
  
    ['status', 'dataLists'].forEach((action) => {
      evtSource.addEventListener(action, function (e) { // eslint-disable-next-line no-console
        console.log(action, Date.now());
        dispatch({ type: action, payload: { [action]: e.data } });
      }, false);
    });
  
    return function cleanup() {
      evtSource.close();
    };
  
  }, []);





  // function sendMsg() {
  //   // .map(x => String.fromCharcode(x)

  //   // console.log(new Date());
  //   fetch(server + '/populateOffsets')
  //   // .then(x => x.json())
  //     .then(async res => {
  //       let bod = '';
  //       const readr = res.body.getReader();
  //       const data = await readr.read();
  //       async function processData({done, value}) {
  //         if (done) {
  //           try {
  //             return JSON.parse(bod);
  //           } catch (err) { // eslint-disable-next-line no-console
  //             console.log(bod);
  //             const data = { error: bod };
  //             return dispatch({ type: 'data', payload: data });
  //           }
  //         }
  //         bod += new TextDecoder('utf-8').decode(value);
  //         return readr.read().then(processData);
  //       }
  //       return await processData(data);
  //     })
  //     .then(offsetList => {
  //       dispatch({ type: 'status', payload: { 'status': '' } });
  //       dispatch({ type: 'offsetList', payload: { offsetList } });
  //       if (error) dispatch({ type: 'data', payload: {} });
  //     });


  // }

  async function postQuery(body) {
    try {
      let data = await fetch(server, {
        method: 'POST',
        body
      });
      if (data.ok) {
        data = await data.json(); // eslint-disable-next-line no-console
        console.log(data);

        dispatch({ type: 'data', payload: data });

      } else {
        throw new Error('Network problem - response not ok');
      }
    } catch (err) { // eslint-disable-next-line no-console
      console.log(err);
    }
  }


  // form validation
  // [h1, 'font-effect-decaying'].join(' ')


  return (
    <main>
      <h1 className={ h1 }>Time Zones</h1>

      {
        status && <p className={ msg }>{ status }</p>
      }

      {
        status && status.startsWith('Conn') && <Loading/>
      }

      {
        placeList && offsetList && !status && <Form placeList={ placeList } offsetList={ offsetList } postQuery={ postQuery }/>
      }

      {
        (offset || places) && <Results offset={ offset } places={ places }></Results>
      }

    </main>
  );
}

// {
//   offsetList && 
// }
