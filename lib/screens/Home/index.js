Object.defineProperty(exports,"__esModule",{value:true});exports.config=exports.reducer=exports.actionTypes=exports.actions=undefined;var _actions=require('@model/topics/actions');var actions=_interopRequireWildcard(_actions);
var _actionTypes=require('@model/topics/actionTypes');var actionTypes=_interopRequireWildcard(_actionTypes);
var _reducer=require('@model/topics/reducer');var _reducer2=_interopRequireDefault(_reducer);
var _constants=require('@config/constants');var config=_interopRequireWildcard(_constants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}exports.

actions=actions;exports.actionTypes=actionTypes;exports.reducer=_reducer2.default;exports.config=config;