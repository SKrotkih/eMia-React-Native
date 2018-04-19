Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}






var Loader=function Loader(props){var

loading=

props.loading,attributes=_objectWithoutProperties(props,['loading']);

return(
_react2.default.createElement(_reactNative.Modal,{
transparent:true,
animationType:'none',
visible:loading,
onRequestClose:function onRequestClose(){console.log('close modal');}},
_react2.default.createElement(_reactNative.View,{style:styles.modalBackground},
_react2.default.createElement(_reactNative.View,{style:styles.activityIndicatorWrapper},
_react2.default.createElement(_reactNative.ActivityIndicator,{
animating:loading})))));




};

var styles=_reactNative.StyleSheet.create({
modalBackground:{
flex:1,
alignItems:'center',
flexDirection:'column',
justifyContent:'space-around',
backgroundColor:'#00000040'},

activityIndicatorWrapper:{
backgroundColor:'#FFFFFF',
height:100,
width:100,
borderRadius:10,
display:'flex',
alignItems:'center',
justifyContent:'space-around'}});exports.default=



Loader;