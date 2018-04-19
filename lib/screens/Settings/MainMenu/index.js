Object.defineProperty(exports,"__esModule",{value:true});exports.MainMenu=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');var _reactNative2=_interopRequireDefault(_reactNative);

var _reactNativeRouterFlux=require('react-native-router-flux');

var _Loader=require('@components/Loader');var _Loader2=_interopRequireDefault(_Loader);

var _actions=require('@model/auth/actions');

var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);
var _styles3=require('@theme/styles');
var _index=require('../index');

var _nativeBase=require('native-base');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

















Dimensions=_reactNative2.default.Dimensions,
AppRegistry=_reactNative2.default.AppRegistry,
Image=_reactNative2.default.Image,
StyleSheet=_reactNative2.default.StyleSheet,
View=_reactNative2.default.View,
Alert=_reactNative2.default.Alert,
TouchableOpacity=_reactNative2.default.TouchableOpacity;var


Component=_react2.default.Component;


var menuItems=[
{
id:"profile",
text:"Profile"},

{
id:"logout",
text:"Log Out"}];var



MainMenu=exports.MainMenu=function(_Component){_inherits(MainMenu,_Component);
function MainMenu(props){_classCallCheck(this,MainMenu);var _this2=_possibleConstructorReturn(this,(MainMenu.__proto__||Object.getPrototypeOf(MainMenu)).call(this,
props));
_this2.state={
loaded:false,
user:null};return _this2;

}_createClass(MainMenu,[{key:'setTitle',value:function setTitle(

titleText){var
setParams=this.props.navigation.setParams;
setParams({title:titleText});
}},{key:'componentWillMount',value:function componentWillMount()

{
this.setTitle("Settings");
}},{key:'componentDidMount',value:function componentDidMount()

{
this.fetchCurrentUserData();
}},{key:'fetchCurrentUserData',value:function fetchCurrentUserData()

{var _this3=this;
(0,_actions.getCurrentUser)(function(user){
_this3.setState({
user:user,
loaded:true});

});
}},{key:'render',value:function render()

{
if(!this.state.loaded){
return renderLoadingView();
}
var _this=this;
return(
_react2.default.createElement(_nativeBase.Container,{style:{margin:15,marginBottom:15,backgroundColor:'#00000000'}},
_react2.default.createElement(_nativeBase.Content,{style:{backgroundColor:'#00000000'}},
_react2.default.createElement(_nativeBase.List,{
dataArray:menuItems,
renderRow:function renderRow(menuItem){return(
renderMenuItem(menuItem,_this));}}))));





}}]);return MainMenu;}(Component);


function renderLoadingView(){
return(
_react2.default.createElement(View,{style:_styles2.default.loading},
_react2.default.createElement(_Loader2.default,{loading:true})));


}

function renderMenuItem(menuItem,_this){
if(menuItem.id==='logout'){
return(
renderLogOutMenuItem(_this));

}else if(menuItem.id==='profile'){
return(
renderProfileMenuItem(_this));

}else{
return null;
}
}



function renderProfileMenuItem(_this){
var user=_this.state.user;
if(user===null){
return(
null);

}else{
var avatarUrl=user.avatarUrl;
return(
_react2.default.createElement(_nativeBase.ListItem,{height:63},
_react2.default.createElement(TouchableOpacity,{style:{flexDirection:'row'},activeOpacity:0.5,onPress:function onPress(){
editProfile(user);
}},
_react2.default.createElement(_nativeBase.Body,{style:{flexDirection:'row'}},
_react2.default.createElement(_nativeBase.Thumbnail,{circular:true,size:55,source:{uri:avatarUrl}}),
_react2.default.createElement(_nativeBase.Text,{style:{alignSelf:'center',marginLeft:16,fontWeight:'bold'}},
user.username)))));





}
}

function editProfile(user){
_reactNativeRouterFlux.Actions.EditProfile({user:user});
}



function renderLogOutMenuItem(_this){
var user=_this.state.user;
if(user===null){
return(
null);

}else{
return(
_react2.default.createElement(_nativeBase.ListItem,{height:63},
_react2.default.createElement(TouchableOpacity,{style:{flexDirection:'row'},activeOpacity:0.5,onPress:function onPress(){
onSignOut();
}},
_react2.default.createElement(_nativeBase.Body,{style:{flexDirection:'row'}},
_react2.default.createElement(_nativeBase.Text,{style:{alignSelf:'center',fontWeight:'bold'}},'Log Out')))));






}
}

function onSignOut(){
(0,_actions.signOut)(function(){
_reactNativeRouterFlux.Actions.reset('Auth');
},function(){
Alert.alert('Oops!',error.message);
});
}exports.default=



MainMenu;