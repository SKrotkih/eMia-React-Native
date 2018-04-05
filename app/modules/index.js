import {combineReducers} from 'redux';

import app from './app';
import navigation from './navigation';

const rootReducer = combineReducers({
  app,
  navigation
});

export default rootReducer;
