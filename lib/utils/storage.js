Object.defineProperty(exports,"__esModule",{value:true});exports.

getItem=getItem;exports.



setItem=setItem;exports.



removeItem=removeItem;var _reactNative=require('react-native');function getItem(key){return _reactNative.AsyncStorage.getItem(key);}function setItem(key,value){return _reactNative.AsyncStorage.setItem(key,value);}function removeItem(key){
return _reactNative.AsyncStorage.removeItem(key);
}