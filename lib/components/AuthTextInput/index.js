Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);

var _reactNative=require('react-native');

var _reactNativeElements=require('react-native-elements');
var _validate=require('@utils/validate');
var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

AuthTextInput=function(_Component){_inherits(AuthTextInput,_Component);function AuthTextInput(){_classCallCheck(this,AuthTextInput);return _possibleConstructorReturn(this,(AuthTextInput.__proto__||Object.getPrototypeOf(AuthTextInput)).apply(this,arguments));}_createClass(AuthTextInput,[{key:'render',value:function render()
{var _props=
this.props,showLabel=_props.showLabel,placeholder=_props.placeholder,autoFocus=_props.autoFocus,onChangeText=_props.onChangeText,secureTextEntry=_props.secureTextEntry,type=_props.type;
return(
_react2.default.createElement(_reactNative.View,{style:_styles2.default.container},

showLabel&&
_react2.default.createElement(_reactNativeElements.FormLabel,null,this.props.label),

_react2.default.createElement(_reactNativeElements.FormInput,{
autoCapitalize:'none',
clearButtonMode:'while-editing',
underlineColorAndroid:'#fff',
placeholder:placeholder,
autoFocus:autoFocus,
onChangeText:onChangeText,
secureTextEntry:secureTextEntry,
inputStyle:_styles2.default.inputContainer,
keyboardType:type,
value:this.props.value}),

!(0,_validate.isEmpty)(this.props.error)&&
_react2.default.createElement(_reactNativeElements.FormValidationMessage,null,
this.props.error)));




}}]);return AuthTextInput;}(_react.Component);


AuthTextInput.propTypes={
label:_propTypes2.default.oneOfType([
_propTypes2.default.string,
_propTypes2.default.number]),

placeholder:_propTypes2.default.string,
autoFocus:_propTypes2.default.bool,
onChangeText:_propTypes2.default.func.isRequired,
secureTextEntry:_propTypes2.default.bool,
value:_propTypes2.default.string,
error:_propTypes2.default.string};


AuthTextInput.defaultProps={
autoFocus:false,
secureTextEntry:false};exports.default=


AuthTextInput;