import React from 'react';

const initialState = {
  places: null,
  flags: null,
  offset: null,
  offsetList: null,
  placeList: null,
  status: null,
};

const makeOptions = arr => arr.map((val, i) => <option key={ i } value={ val }>{ val }</option>);

function reducer(state, { type, payload: { dataLists, places, flags, offset, status } }) {
  
  switch (type) {

  case 'dataLists':
    const [o, p] = JSON.parse(dataLists);
    return {
      ...state,
      offsetList: makeOptions(o),
      placeList: makeOptions(p)
    };

  case 'data':
    return {
      ...state,
      places,
      flags,
      offset,
      status
    };

  case 'status':
    return {
      ...state,
      status
    };

  default:
    throw new Error('Reducer action type not recognized');
  }


}

export { initialState, reducer };
