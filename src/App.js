import React, { useState, useEffect, useReducer } from 'react';
import Form from './components/Form';
import List from './components/List';

const initialState = {
  places: null,
  offset: null,
  msg: null
}

function reducer(state, { data: { timezone: { places, offset }, msg } }) {
  // if (places || offset) return {
  //   ...state,
  //   places: places && places,
  //   offset: offset && offset,
  //   msg
  // };
  // if (msg) return {
  //   ...state,
  //   places: null,
  //   offset: null,
  //   msg
  // };

  return {
    ...state,
    places,
    offset,
    msg
  };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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

        dispatch({ data });

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
        state.offset && <p>{`Offset: ${state.offset}`}</p>
      }
      {
        state.places && <List places={state.places}></List>
      }
      {
        state.msg && <p>{`There was an error: ${state.msg}.  Please try again.`}</p>
      }

    </>
  );
}






// {
//   places && places.length == 0 && <p>Please enter a valid time zone</p>
// }
