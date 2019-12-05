const initialState = {
  places: null,
  offset: null,
  error: null,
  offsetList: null,
  status: null,
  readyToSeedDB: false,
};
// { data: { places, offset, error } }, offsetList
function reducer(state, { type, payload: { offsetList, places, offset, error, status } }) {
  // console.log('ppppppp', type, offsetList, places, offset, error);

  switch (type) {

    case 'offsetList':
      return {
        ...state,
        offsetList
      };

    case 'data':
      return {
        ...state,
        places,
        offset,
        error
      };

    case 'status':
      const done = status.startsWith('Connected');
      return {
        ...state,
        readyToSeedDB: done,
        status
      };

    case 'error':
      return {
        ...state,
        error
      };

    default:
      throw new Error('Reducer action type not recognized');
  }


}

export { initialState, reducer };
