Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _reactNative=require('react-native');

var _actionTypes=require('./actionTypes');var t=_interopRequireWildcard(_actionTypes);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}

var initialState={isLoggedIn:false,user:null};

var authReducer=function authReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
switch(action.type){
case t.LOGGED_IN:
var user=action.data;


_reactNative.AsyncStorage.multiSet([
['user',JSON.stringify(user)]]);


state=_extends({},state,{isLoggedIn:true,user:user});

return state;

case t.LOGGED_OUT:
var keys=['user'];
_reactNative.AsyncStorage.multiRemove(keys);

state=_extends({},state,{isLoggedIn:false,user:null});

return state;

default:
return state;}

};exports.default=

authReducer;