import React from 'react';

const initialState = {
  places: null,
  flags: null,
  offset: null,
  offsetList: null,
  placeList: null,
  status: null,
};

function reducer(state, { type, payload: { offsetList, placeList, places, flags, offset, status } }) {


  switch (type) {

  case 'offsetList':
    return {
      ...state,
      offsetList: JSON
                    .parse(offsetList)
                    .map(o => o.offset)
                    .map((val, i) => <option key={ i } value={ val }>{ val }</option>)
    };

  case 'placeList':
    return {
      ...state,
      placeList: [...new Set(JSON.parse(placeList)
                   .flatMap(x => x.places)
                   .map(p => p.pl)
                   .sort((a, b) => a.localeCompare(b)))]
                   .map((val, i) => <option key={ i } value={ val }>{ val }</option>)
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
