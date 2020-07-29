import {combineReducers} from 'redux';

import {authReducer} from '../screens/Auth';
import {postReducer} from '../screens/Home';

// Combine all the reducers
const rootReducer = combineReducers({auth: authReducer, home: postReducer});

export default rootReducer;
