import {ADD_POST} from './actionTypes';

let initialState = {};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return state;
    default:
      return state;
  }
};

export default homeReducer;
