const initialState = {
  places: null,
  offset: null,
  error: null,
  offsetList: null,
  status: [],
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
      return {
        ...state,
        status: [...state.status, status]
      };

    case 'error':
      return {
        ...state,
        error
      };

    case 'shift':
      state.status.shift();
      return {
        ...state,
        status: [...state.status]
      };

    case 'clear':
      return {
        ...state,
        status: []
      };

    default:
      throw new Error('Reducer action type not recognized');
  }


}

export { initialState, reducer };
