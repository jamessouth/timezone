import { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../reducers/appState';

export default function useAppState() {
    const server = 'http://localhost:3101';

    const [
      {
        places,
        offset,
        flag,
        name,
        offsets,
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

    async function postQuery(source, type) {
        const body = JSON.stringify({
          source,
          type,
        });
        try {
          let data = await fetch(server, {
            method: 'POST',
            body
          });
          if (data.ok) {
            data = await data.json(); // eslint-disable-next-line no-console
            const payload = Object.assign({
              places: null,
              offset: null,
              flag: null,
              name: null,
              offsets: null,
            }, data)
    
    
            console.log(payload);
    
            dispatch({ type: 'data', payload });
    
          } else {
            throw new Error('Network problem - response not ok');
          }
        } catch (err) { // eslint-disable-next-line no-console
          console.log(err);
        }
    }

    return {
        flag,
        name,
        offset,
        offsetList,
        offsets,
        placeList,
        places,
        postQuery,
        status,
    };
}