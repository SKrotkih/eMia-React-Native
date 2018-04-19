Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');
var _index=require('../index');

var _reactNative=require('react-native');






var _reactNativeElements=require('react-native-elements');





var _index2=require('../../Auth/index');
var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Welcome=function(_React$Component){_inherits(Welcome,_React$Component);
function Welcome(){_classCallCheck(this,Welcome);var _this=_possibleConstructorReturn(this,(Welcome.__proto__||Object.getPrototypeOf(Welcome)).call(this));

_this.state={};return _this;


}_createClass(Welcome,[{key:'render',value:function render()
{
return(
_react2.default.createElement(_reactNative.View,{style:_styles2.default.container},
_react2.default.createElement(_reactNative.View,{style:_styles2.default.topContainer},
_react2.default.createElement(_reactNative.Image,{style:_styles2.default.image,source:require('@assets/images/logo.png')}),
_react2.default.createElement(_reactNative.Text,{style:_styles2.default.title},_index.config.APP_NAME)),


_react2.default.createElement(_reactNative.View,{style:_styles2.default.bottomContainer},
_react2.default.createElement(_reactNative.View,{style:[_styles2.default.buttonContainer]},
_react2.default.createElement(_reactNativeElements.Button,{
raised:true,
borderRadius:4,
title:'SIGN UP WITH E-MAIL',
containerViewStyle:[_styles2.default.containerView],
buttonStyle:[_styles2.default.button],
textStyle:_styles2.default.buttonText,
onPress:_reactNativeRouterFlux.Actions.Register})),

_react2.default.createElement(_reactNative.View,{style:_styles2.default.bottom},
_react2.default.createElement(_reactNative.Text,{style:_styles2.default.bottomText},'Already have an account?'),



_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:_reactNativeRouterFlux.Actions.Login},
_react2.default.createElement(_reactNative.Text,{style:_styles2.default.signInText},'Sign in'))))));








}}]);return Welcome;}(_react2.default.Component);exports.default=


(0,_reactRedux.connect)(null,{})(Welcome);