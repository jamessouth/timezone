import React from 'react';
import Form from './components/Form';
import Loading from './components/Loading';
import Results from './components/Results';
// import Status from './components/Status';
// import { initialState, reducer } from './reducers/appState';
import { h1, msg } from './styles/index.css';
import useAppState from './hooks/useAppState';

export default function App() {

  const {
    flag,
    name,
    offset,
    offsetList,
    offsets,
    placeList,
    places,
    postQuery,
    status,
  } = useAppState();

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
        (offset || places || offsets || name) &&
          <Results
            offset={ offset }
            places={ places }
            offsets={ offsets }
            name={ name }
            flag={ flag }
          ></Results>
      }

    </main>
  );
}

// {
//   offsetList && 
// }
