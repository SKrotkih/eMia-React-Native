Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactNative=require('react-native');







var _nativeBase=require('native-base');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}










var webViewHeight=_reactNative.Dimensions.get('window').height-56;var

ModalComponent=function(_PureComponent){_inherits(ModalComponent,_PureComponent);
function ModalComponent(props){_classCallCheck(this,ModalComponent);var _this=_possibleConstructorReturn(this,(ModalComponent.__proto__||Object.getPrototypeOf(ModalComponent)).call(this,
props));
_this._handleClose=_this._handleClose.bind(_this);
_this._handleShare=_this._handleShare.bind(_this);return _this;
}_createClass(ModalComponent,[{key:'_handleClose',value:function _handleClose()

{
return this.props.onClose();
}},{key:'_handleShare',value:function _handleShare()

{var _props$articleData=
this.props.articleData,url=_props$articleData.url,title=_props$articleData.title,message=title+'\n\nRead more @\n'+url+'\n\nshared via RN News App';
return _reactNative.Share.share(
{title:title,message:message,url:message},
{dialogTitle:'Share '+title});

}},{key:'render',value:function render()

{var _props=
this.props,showModal=_props.showModal,articleData=_props.articleData;var
url=articleData.url;
if(url!==undefined){
return(
_react2.default.createElement(_reactNative.Modal,{onRequestClose:this._handleClose,visible:showModal,transparent:true,animationType:'slide'},
_react2.default.createElement(_nativeBase.Container,{style:{margin:16,marginBottom:0,backgroundColor:'#ffffff'}},
_react2.default.createElement(_nativeBase.Header,null,
_react2.default.createElement(_nativeBase.Left,null,
_react2.default.createElement(_nativeBase.Button,{transparent:true,onPress:this._handleClose},
_react2.default.createElement(_reactNative.Image,{resizeMode:'center',style:{width:18,height:18},source:require('@assets/images/ic_close_white_18dp.png')}))),


_react2.default.createElement(_nativeBase.Body,null,
_react2.default.createElement(_nativeBase.Title,{children:articleData.title})),

_react2.default.createElement(_nativeBase.Right,null,
_react2.default.createElement(_nativeBase.Button,{transparent:true,onPress:this._handleShare},
_react2.default.createElement(_reactNative.Image,{style:{width:18,height:18},source:require('@assets/images/ic_share_white_18dp.png')})))),



_react2.default.createElement(_nativeBase.Content,{contentContainerStyle:{height:webViewHeight}},
_react2.default.createElement(_reactNative.WebView,{onError:this._handleClose,startInLoadingState:true,scalesPageToFit:true,source:{uri:url}})))));




}else{
return null;
}
}}]);return ModalComponent;}(_react.PureComponent);exports.default=ModalComponent;