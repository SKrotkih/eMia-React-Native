/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import ACTIONS from '../types';
import {TypeBackend} from "../../model/network/backend.dispatch.hook";

/*
    The Redux reducer used for flow control
 */
const reducer = (state = null, action) => {
  switch (action.type) {
    case ACTIONS.Types.CHANGE_BACKEND:
      const backendType: TypeBackend = action.payload;
      return Object.assign({}, state, {backendType: backendType});
    default:
      return state;
  }
};

export default reducer;
