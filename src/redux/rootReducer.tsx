import {combineReducers} from 'redux';

import {authReducer} from '../screens/Auth';
import {homeReducer} from '../screens/Home';

// Combine all the reducers
const rootReducer = combineReducers({auth: authReducer, home: homeReducer});

export default rootReducer;
