/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const enhancer = compose(applyMiddleware(thunk));

// Create a Redux store holding the state of the app.
// Its API is { subscribe, dispatch, getState }.
export default createStore(rootReducer, enhancer);
