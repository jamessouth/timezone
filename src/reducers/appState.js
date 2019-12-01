const initialState = {
  places: null,
  offset: null,
  errorMsg: null,
  offsetList: null,
  statuses: [],
};
// { data: { places, offset, errorMsg } }, offsetList
function reducer(state, { type, payload: { offsetList, places, offset, errorMsg, status } }) {
  // console.log('ppppppp', type, offsetList, places, offset, errorMsg);

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
        errorMsg
      };
    case 'statuses':
      if (status == 'x') {
        return {
          ...state,
          statuses: []
        }
      } else {
        return {
          ...state,
          statuses: [...state.statuses, status]
        };
      }
    default:
      throw new Error('Reducer action type not recognized');
  }


}

export { initialState, reducer };
