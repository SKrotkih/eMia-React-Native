Object.defineProperty(exports,"__esModule",{value:true});var _redux=require('redux');

var _Auth=require('@screens/Auth');
var _Home=require('@screens/Home');


var rootReducer=(0,_redux.combineReducers)({authReducer:_Auth.reducer,homeReducer:_Home.reducer});exports.default=

rootReducer;