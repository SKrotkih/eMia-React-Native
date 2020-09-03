/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import ACTIONS from '../types';
import store from '../store';
import {TypeBackend} from "../../model/network/backend.dispatch.hook";

export function changeBackendType(backendType: TypeBackend) {
  store.dispatch(ACTIONS.changeBackendType(backendType));
}
