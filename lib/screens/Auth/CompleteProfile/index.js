Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');

var _index=require('@screens/Auth/index');
var _AuthForm=require('@components/AuthForm');var _AuthForm2=_interopRequireDefault(_AuthForm);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

createUser=_index.actions.createUser;

var fields=[
{
key:'username',
label:'Username',
placeholder:'Username',
autoFocus:false,
secureTextEntry:false,
value:'',
type:'text'}];



var error={
general:'',
username:''};var


CompleteProfile=function(_React$Component){_inherits(CompleteProfile,_React$Component);
function CompleteProfile(){_classCallCheck(this,CompleteProfile);var _this=_possibleConstructorReturn(this,(CompleteProfile.__proto__||Object.getPrototypeOf(CompleteProfile)).call(this));

_this.state={
error:error};


_this.onSubmit=_this.onSubmit.bind(_this);
_this.onSuccess=_this.onSuccess.bind(_this);
_this.onError=_this.onError.bind(_this);return _this;
}_createClass(CompleteProfile,[{key:'onSubmit',value:function onSubmit(

data){
this.setState({error:error});var


user=this.props.user;
data['uid']=user.uid;

this.props.createUser(data,this.onSuccess,this.onError);
}},{key:'onSuccess',value:function onSuccess()

{
_reactNativeRouterFlux.Actions.Main();
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
buttonTitle:'CONTINUE',
error:this.state.error}));

}}]);return CompleteProfile;}(_react2.default.Component);exports.default=


(0,_reactRedux.connect)(null,{createUser:createUser})(CompleteProfile);