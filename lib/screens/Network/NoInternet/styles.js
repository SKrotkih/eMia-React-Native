Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _reactNative=require('react-native');
var _BackgroundImage=require('@theme/BackgroundImage');var _BackgroundImage2=_interopRequireDefault(_BackgroundImage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var styles=_reactNative.StyleSheet.create({
container:_extends({},_BackgroundImage2.default,{
justifyContent:'space-around',
alignItems:'center'}),

logo:{
fontSize:40,
textAlign:'center',
color:'white'},

buttonStyle:{
margin:10,
width:150,
height:40,
borderRadius:2,
justifyContent:'center',
alignItems:'center',
elevation:2},

buttonText:{
color:'white',
fontWeight:'bold'}});exports.default=



styles;