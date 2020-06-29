import {combineReducers} from 'redux';

import {reducer as authReducer} from '../screens/Auth';
import {reducer as homeReducer} from '../screens/Home';

// Combine all the reducers
const rootReducer = combineReducers({authReducer});

export default rootReducer;
