Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);

var _reactNative=require('react-native');
var _reactNativeElements=require('react-native-elements');

var _validate=require('@utils/validate');

var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);

var _AuthTextInput=require('../AuthTextInput');var _AuthTextInput2=_interopRequireDefault(_AuthTextInput);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

AuthForm=function(_React$Component){_inherits(AuthForm,_React$Component);
function AuthForm(props){_classCallCheck(this,AuthForm);var _this=_possibleConstructorReturn(this,(AuthForm.__proto__||Object.getPrototypeOf(AuthForm)).call(this,
props));var

fields=props.fields,error=props.error;

_this.state=_this.createState(fields,error);

_this.onChange=_this.onChange.bind(_this);
_this.onSubmit=_this.onSubmit.bind(_this);return _this;
}_createClass(AuthForm,[{key:'createState',value:function createState(

fields,error){
var state={};
fields.forEach(function(field){var
key=field.key,type=field.type,value=field.value;
state[key]={type:type,value:value};
});
state.error=error;
return state;
}},{key:'onSubmit',value:function onSubmit()

{
var data=this.state;
var result=(0,_validate.validate)(data);
if(!result.success){
this.setState({error:result.error});
}else
{
this.props.onSubmit(this.extractData(data));
}
}},{key:'extractData',value:function extractData(

data){
var retData={};

Object.keys(data).forEach(function(key){
if(key!=='error'){var
value=data[key].value;
retData[key]=value;
}
});

return retData;
}},{key:'onChange',value:function onChange(

key,text){
var state=this.state;
state[key].value=text;
this.setState(state);
}},{key:'render',value:function render()

{var _this2=this;var _props=
this.props,fields=_props.fields,showLabel=_props.showLabel,buttonTitle=_props.buttonTitle,onForgotPassword=_props.onForgotPassword;

return(
_react2.default.createElement(_reactNative.View,{style:_styles2.default.container},
_react2.default.createElement(_reactNative.View,{style:_styles2.default.wrapper},

!(0,_validate.isEmpty)(this.state.error['general'])&&
_react2.default.createElement(_reactNative.Text,{style:_styles2.default.errorText},this.state.error['general']),



fields.map(function(data,idx){var
key=data.key,label=data.label,placeholder=data.placeholder,autoFocus=data.autoFocus,secureTextEntry=data.secureTextEntry,type=data.type;
return(
_react2.default.createElement(_AuthTextInput2.default,{
key:key,
label:label,
showLabel:showLabel,
placeholder:placeholder,
autoFocus:autoFocus,
type:type,
onChangeText:function onChangeText(text){return _this2.onChange(key,text);},
secureTextEntry:secureTextEntry,
value:_this2.state[key]['value'],
error:_this2.state.error[key]}));

}),


_react2.default.createElement(_reactNativeElements.Button,{
raised:true,
title:buttonTitle,
borderRadius:4,
containerViewStyle:_styles2.default.containerView,
buttonStyle:_styles2.default.button,
textStyle:_styles2.default.buttonText,
onPress:this.onSubmit}),

this.props.onForgotPassword!==null&&
_react2.default.createElement(_reactNative.Text,{style:_styles2.default.forgotText,onPress:onForgotPassword},'Forgot password?'))));






}}]);return AuthForm;}(_react2.default.Component);


AuthForm.propTypes={
showLabel:_propTypes2.default.bool,
buttonTitle:_propTypes2.default.string,
onSubmit:_propTypes2.default.func.isRequired,
error:_propTypes2.default.object};


AuthForm.defaultProps={
onForgotPassword:null};exports.default=


AuthForm;