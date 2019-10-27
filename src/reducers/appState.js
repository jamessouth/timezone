const initialState = {
  places: null,
  offset: null,
  msg: null,
  offsetList: null,
};
// { data: { places, offset, msg } }, offsetList
function reducer(state, { type, payload: { offsetList, places, offset, msg } }) {
  // console.log('ppppppp', type, offsetList, places, offset, msg);

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
        msg
      };
    default:
      throw new Error('action type not recognized');
  }


}

export { initialState, reducer };
