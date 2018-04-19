Object.defineProperty(exports,"__esModule",{value:true});exports.PostPreview=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');var _reactNative2=_interopRequireDefault(_reactNative);
var _reactNativeGridComponent=require('react-native-grid-component');var _reactNativeGridComponent2=_interopRequireDefault(_reactNativeGridComponent);
var _nativeBase=require('native-base');var _nativeBase2=_interopRequireDefault(_nativeBase);

var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');

var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);
var _Time=require('@components/Time');var _Time2=_interopRequireDefault(_Time);
var _index=require('../index');

var _ImageViewer=require('@theme/components/ImageViewer');var _ImageViewer2=_interopRequireDefault(_ImageViewer);
var _styles3=require('@theme/styles');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var




Dimensions=_reactNative2.default.Dimensions,
AppRegistry=_reactNative2.default.AppRegistry,
Image=_reactNative2.default.Image,
StyleSheet=_reactNative2.default.StyleSheet,
View=_reactNative2.default.View,
Alert=_reactNative2.default.Alert,
TouchableOpacity=_reactNative2.default.TouchableOpacity;var


Component=_react2.default.Component;


var previewContentHeight=Dimensions.get('window').height;
var screenWidth=Dimensions.get('window').width;var

PostPreview=exports.PostPreview=function(_Component){_inherits(PostPreview,_Component);
function PostPreview(props){_classCallCheck(this,PostPreview);var _this=_possibleConstructorReturn(this,(PostPreview.__proto__||Object.getPrototypeOf(PostPreview)).call(this,
props));
_this.state={};return _this;

}_createClass(PostPreview,[{key:'setTitle',value:function setTitle(

titleText){var
setParams=this.props.navigation.setParams;
setParams({title:titleText});
}},{key:'componentWillMount',value:function componentWillMount()











{
var title=this.props.item.value.title;
this.setTitle(title);
}},{key:'render',value:function render()

{var

item=this.props.item;
var title=item.value.title;
var body=item.value.body;
var url=item.url;
var avatarUrl=item.avatarUrl;
var publishedAt=new Date(1000*item.value.created);
var userName=item.author===null?'':item.author.username;

return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Header,{style:{backgroundColor:'white'}},
_react2.default.createElement(_nativeBase.Text,{style:_styles2.default.title},
title)),


_react2.default.createElement(_nativeBase.Content,{style:_styles2.default.content},
_react2.default.createElement(View,{style:_styles2.default.thumbnail},
_react2.default.createElement(_nativeBase.Thumbnail,{circular:true,size:55,source:{uri:avatarUrl}}),
_react2.default.createElement(_nativeBase.Text,{style:{marginHorizontal:8,fontWeight:'bold',alignSelf:'center'}},
userName)),


_react2.default.createElement(_nativeBase.Text,{style:_styles2.default.description},
body),

_react2.default.createElement(View,{style:_styles2.default.backgroundPhoto},
_react2.default.createElement(_ImageViewer2.default,{
disabled:false,
source:{uri:url},
downloadable:true,
doubleTapEnabled:true})),


_react2.default.createElement(_nativeBase.Text,{style:{marginHorizontal:8,marginVertical:8,fontWeight:'bold'}},
_react2.default.createElement(_Time2.default,{date:publishedAt})))));




}}]);return PostPreview;}(Component);exports.default=


(0,_reactRedux.connect)(null,null)(PostPreview);