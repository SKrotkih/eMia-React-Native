Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');

var _index=require('@screens/Auth/index');
var _AuthForm=require('@components/AuthForm');var _AuthForm2=_interopRequireDefault(_AuthForm);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

login=_index.actions.login;

var fields=[
{
key:'email',
label:'Email Address',
placeholder:'Email Address',
autoFocus:false,
secureTextEntry:false,
value:'',
type:'email-address'},

{
key:'password',
label:'Password',
placeholder:'Password',
autoFocus:false,
secureTextEntry:true,
value:'',
type:'default'}];



var error={
general:'',
email:'',
password:''};var


Login=function(_React$Component){_inherits(Login,_React$Component);
function Login(){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this));

_this.state={
error:error};

_this.onSubmit=_this.onSubmit.bind(_this);
_this.onSuccess=_this.onSuccess.bind(_this);
_this.onError=_this.onError.bind(_this);return _this;
}_createClass(Login,[{key:'onForgotPassword',value:function onForgotPassword()

{
_reactNativeRouterFlux.Actions.ForgotPassword();
}},{key:'onSubmit',value:function onSubmit(

data){
this.setState({error:error});

this.props.login(data,this.onSuccess,this.onError);
}},{key:'onSuccess',value:function onSuccess(_ref)

{var exists=_ref.exists,user=_ref.user;
if(exists){
_reactNativeRouterFlux.Actions.Main();
}else
{
_reactNativeRouterFlux.Actions.CompleteProfile({user:user});
}
}},{key:'onError',value:function onError(

error){
var errObj=this.state.error;

if(error.hasOwnProperty('message')){
errObj.general=error.message;
}else{
var keys=Object.keys(error);
keys.map(function(key,index){
errObj[key]=error[key];
});
}
this.setState({error:errObj});
}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_AuthForm2.default,{fields:fields,
showLabel:false,
onSubmit:this.onSubmit,
buttonTitle:'LOG IN',
error:this.state.error,
onForgotPassword:this.onForgotPassword}));

}}]);return Login;}(_react2.default.Component);exports.default=


(0,_reactRedux.connect)(null,{login:login})(Login);