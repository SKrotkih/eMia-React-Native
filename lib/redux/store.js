Object.defineProperty(exports,"__esModule",{value:true});var _redux=require('redux');
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);

var _rootReducer=require('./rootReducer');var _rootReducer2=_interopRequireDefault(_rootReducer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var enhancer=(0,_redux.compose)((0,_redux.applyMiddleware)(_reduxThunk2.default));exports.default=

(0,_redux.createStore)(_rootReducer2.default,enhancer);