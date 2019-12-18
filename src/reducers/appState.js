const initialState = {
  places: null,
  offset: null,
  offsetList: null,
  status: null,
};
// { data: { places, offset, error } }, offsetList
function reducer(state, { type, payload: { offsetList, places, offset, status } }) {
  // console.log('ppppppp', type, offsetList, places, offset, error);

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
