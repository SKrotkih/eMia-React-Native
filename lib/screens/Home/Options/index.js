Object.defineProperty(exports,"__esModule",{value:true});exports.Options=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');var _reactNative2=_interopRequireDefault(_reactNative);
var _nativeBase=require('native-base');var _nativeBase2=_interopRequireDefault(_nativeBase);

var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');

var _index=require('../index');
var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);
var _styles3=require('@theme/styles');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




Dimensions=_reactNative2.default.Dimensions,
AppRegistry=_reactNative2.default.AppRegistry,
Image=_reactNative2.default.Image,
StyleSheet=_reactNative2.default.StyleSheet,
View=_reactNative2.default.View,
Alert=_reactNative2.default.Alert,
TouchableOpacity=_reactNative2.default.TouchableOpacity;var


Component=_react2.default.Component;var


Options=exports.Options=function(_Component){_inherits(Options,_Component);
function Options(props){_classCallCheck(this,Options);var _this=_possibleConstructorReturn(this,(Options.__proto__||Object.getPrototypeOf(Options)).call(this,
props));
_this.state={};return _this;

}_createClass(Options,[{key:'setTitle',value:function setTitle(

titleText){var
setParams=this.props.navigation.setParams;
setParams({title:titleText});
}},{key:'componentWillMount',value:function componentWillMount()

{
this.setTitle("Options");
}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:{margin:15,marginBottom:15,backgroundColor:'#ffffff'}},
_react2.default.createElement(_nativeBase.Header,null,
_react2.default.createElement(_nativeBase.Text,{style:_styles2.default.postTitle})),


_react2.default.createElement(_nativeBase.Content,{contentContainerStyle:{height:_styles3.windowHeight}},
_react2.default.createElement(_nativeBase.Text,null))));




}}]);return Options;}(Component);exports.default=


(0,_reactRedux.connect)(null,null)(Options);