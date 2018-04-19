Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');

var _index=require('@screens/Auth/index');
var _AuthForm=require('@components/AuthForm');var _AuthForm2=_interopRequireDefault(_AuthForm);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

register=_index.actions.register;

var fields=[
{
key:'email',
label:'Email Address',
placeholder:'Email Address',
autoFocus:false,
secureTextEntry:false,
value:'',
type:'email'},

{
key:'password',
label:'Password',
placeholder:'Password',
autoFocus:false,
secureTextEntry:true,
value:'',
type:'password'},

{
key:'confirm_password',
label:'Confirm Password',
placeholder:'Confirm Password',
autoFocus:false,
secureTextEntry:true,
value:'',
type:'confirm_password'}];



var error={
general:'',
email:'',
password:'',
confirm_password:''};var


Register=function(_React$Component){_inherits(Register,_React$Component);
function Register(){_classCallCheck(this,Register);var _this=_possibleConstructorReturn(this,(Register.__proto__||Object.getPrototypeOf(Register)).call(this));

_this.state={
error:error};


_this.onSubmit=_this.onSubmit.bind(_this);
_this.onSuccess=_this.onSuccess.bind(_this);
_this.onError=_this.onError.bind(_this);return _this;
}_createClass(Register,[{key:'onSubmit',value:function onSubmit(

data){
this.setState({error:error});

this.props.register(data,this.onSuccess,this.onError);
}},{key:'onSuccess',value:function onSuccess(

user){
_reactNativeRouterFlux.Actions.CompleteProfile({user:user});
}},{key:'onError',value:function onError(

error){
var errObj=this.state.error;

if(error.hasOwnProperty('message')){
errObj['general']=error.message;
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
buttonTitle:'SIGN UP',
error:this.state.error}));

}}]);return Register;}(_react2.default.Component);exports.default=


(0,_reactRedux.connect)(null,{register:register})(Register);