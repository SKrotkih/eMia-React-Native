import {ADD_POST} from './actionTypes';

let initialState = {newPost: null};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const post = action.payload;
      return Object.assign({}, state, {newPost: post});
    default:
      return state;
  }
};

export default postReducer;
