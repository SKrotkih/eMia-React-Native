Object.defineProperty(exports,"__esModule",{value:true});exports.EditProfile=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');var _reactNative2=_interopRequireDefault(_reactNative);
var _nativeBase=require('native-base');var _nativeBase2=_interopRequireDefault(_nativeBase);

var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');

var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);
var _Time=require('@components/Time');var _Time2=_interopRequireDefault(_Time);
var _ImageViewer=require('@theme/components/ImageViewer');var _ImageViewer2=_interopRequireDefault(_ImageViewer);
var _alerts=require('@theme/components/alerts/');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var ImagePickerManager=require('react-native-image-picker');var
























Dimensions=_reactNative2.default.Dimensions,
AppRegistry=_reactNative2.default.AppRegistry,
Image=_reactNative2.default.Image,
StyleSheet=_reactNative2.default.StyleSheet,
PixelRatio=_reactNative2.default.PixelRatio,
View=_reactNative2.default.View,
TouchableOpacity=_reactNative2.default.TouchableOpacity;var



Component=_react2.default.Component;var


EditProfile=exports.EditProfile=function(_Component){_inherits(EditProfile,_Component);
function EditProfile(props){_classCallCheck(this,EditProfile);var _this=_possibleConstructorReturn(this,(EditProfile.__proto__||Object.getPrototypeOf(EditProfile)).call(this,
props));
_this.state={
photoUrl:'',
userName:''};

_this.doneButtonPressed=_this.doneButtonPressed.bind(_this);return _this;

}_createClass(EditProfile,[{key:'setUpNavigationBar',value:function setUpNavigationBar()

{var _this2=this;
var title='My Profile';var
setParams=this.props.navigation.setParams;
setParams({
title:title,
right:
_react2.default.createElement(_nativeBase.Icon,{style:{marginRight:8,color:"#fff"},name:'ios-done-all',
onPress:function onPress(){_this2.doneButtonPressed();}})});

}},{key:'componentWillMount',value:function componentWillMount()

{var
user=this.props.user;
this.setUpNavigationBar();
this.setState({photoUrl:user.avatarUrl});
this.setState({userName:user.username});
}},{key:'render',value:function render()

{var _this3=this;var
user=this.props.user;

var photoSource=this.state.photoUrl;
var name=this.state.userName;

var nameLabelText='Name:';

return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Content,{style:_styles2.default.content},
_react2.default.createElement(_nativeBase.Form,null,
_react2.default.createElement(_nativeBase.Item,{fixedLabel:true},
_react2.default.createElement(_nativeBase.Label,null,nameLabelText),
_react2.default.createElement(_nativeBase.Input,{placeholder:name}))),


_react2.default.createElement(_nativeBase.Button,{block:true,info:true,style:_styles2.default.button,
onPress:function onPress(){return _this3.takePhotoButtonPressed();}},
_react2.default.createElement(_nativeBase.Text,null,'Photo')),

_react2.default.createElement(View,{style:_styles2.default.backgroundPhoto},
_react2.default.createElement(_ImageViewer2.default,{
disabled:false,
source:{uri:photoSource},
downloadable:true,
doubleTapEnabled:true})))));





}},{key:'doneButtonPressed',value:function doneButtonPressed()

{
_alerts.Alert.show('Sorry, this function doesn\'t work jet...',{
type:'info',
duration:3000});

}},{key:'takePhotoButtonPressed',value:function takePhotoButtonPressed()

{var _this4=this;
var imagePickerOptions={
quality:1.0,
maxWidth:500,
maxHeight:500,
storageOptions:{
skipBackup:true}};



ImagePickerManager.showImagePicker(imagePickerOptions,function(response){

console.log('Response = ',response);

if(response.didCancel){
console.log('User cancelled photo picker');
}else
if(response.error){
console.log('ImagePicker Error: ',response.error);
}else if(response.customButton){
console.log('User tapped custom button: ',response.customButton);
}else
{
var source={uri:response.uri};




_this4.setState({
photoUrl:source});









}
});
}}]);return EditProfile;}(Component);exports.default=






































(0,_reactRedux.connect)(null,null)(EditProfile);