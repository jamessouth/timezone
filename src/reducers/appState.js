const initialState = {
  places: null,
  flags: null,
  offset: null,
  offsetList: null,
  status: null,
};

function reducer(state, { type, payload: { offsetList, places, flags, offset, status } }) {


  switch (type) {

  case 'offsetList':
    return {
      ...state,
      offsetList: JSON.parse(offsetList)
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
