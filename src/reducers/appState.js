const initialState = {
  places: null,
  offset: null,
  msg: null
};

function reducer(state, { data: { places, offset, msg } }) {
  return {
    ...state,
    places,
    offset,
    msg
  };
}

export { initialState, reducer };
