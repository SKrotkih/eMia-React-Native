Object.defineProperty(exports,"__esModule",{value:true});exports.





register=register;exports.











createUser=createUser;exports.












login=login;exports.














resetPassword=resetPassword;exports.











signOut=signOut;exports.









getCurrentUser=getCurrentUser;exports.





getUser=getUser;exports.










checkLoginStatus=checkLoginStatus;var _actionTypes=require('./actionTypes');var t=_interopRequireWildcard(_actionTypes);var _api=require('./api');var api=_interopRequireWildcard(_api);var _firebase=require('@model/firebase');var _reactNative=require('react-native');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function register(data,successCB,errorCB){return function(dispatch){api.register(data,function(success,data,error){if(success){successCB(data);}else if(error){errorCB(error);}});};}function createUser(user,successCB,errorCB){return function(dispatch){api.createUser(user,function(success,data,error){if(success){dispatch({type:t.LOGGED_IN,data:user});successCB();}else if(error){errorCB(error);}});};}function login(data,successCB,errorCB){return function(dispatch){api.login(data,function(success,data,error){if(success){if(data.exists){dispatch({type:t.LOGGED_IN,data:data.user});}successCB(data);}else if(error){errorCB(error);}});};}function resetPassword(data,successCB,errorCB){return function(dispatch){api.resetPassword(data,function(success,data,error){if(success){successCB();}else if(error){errorCB(error);}});};}function signOut(successCB,errorCB){api.signOut(function(success,data,error){if(success){successCB();}else if(error){errorCB(error);}});}function getCurrentUser(callback){api.getCurrentUser(function(user){callback(user);});}function getUser(uid,callback){api.getUser({uid:uid},function(success,data,error){if(success&&data.exists){var user=data.user;callback(user);}else{callback(null);}});}function checkLoginStatus(callback){
return function(dispatch){
_firebase.auth.onAuthStateChanged(function(user){
var isLoggedIn=user!==null;
if(isLoggedIn){
var newLocal1=function newLocal1(err,user){
if(user===null||err!==null){
isLoggedIn=false;
}else{
dispatch({type:t.LOGGED_IN,data:JSON.parse(user)});
}
callback(isLoggedIn);
};
var newLocal=newLocal1;

_reactNative.AsyncStorage.getItem('user',newLocal);
}else{
dispatch({type:t.LOGGED_OUT});
callback(isLoggedIn);
}
});
};
}