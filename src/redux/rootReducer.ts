import {combineReducers} from 'redux';

import {authReducer} from '../screens/Auth';
import {postReducer} from '../screens/Home';

function lastAction(state = null, action) {
  return action;
}

// Combine all the reducers
const rootReducer = combineReducers({auth: authReducer, home: postReducer, lastAction});

export default rootReducer;
