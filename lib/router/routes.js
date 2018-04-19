Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeRouterFlux=require('react-native-router-flux');


var _Welcome=require('@screens/Network/Welcome');var _Welcome2=_interopRequireDefault(_Welcome);


var _Register=require('@screens/Auth/Register');var _Register2=_interopRequireDefault(_Register);
var _CompleteProfile=require('@screens/Auth/CompleteProfile');var _CompleteProfile2=_interopRequireDefault(_CompleteProfile);
var _Login=require('@screens/Auth/Login');var _Login2=_interopRequireDefault(_Login);
var _ForgotPassword=require('@screens/Auth/ForgotPassword');var _ForgotPassword2=_interopRequireDefault(_ForgotPassword);


var _Home=require('@screens/Home/Home');var _Home2=_interopRequireDefault(_Home);
var _PostPreview=require('@screens/Home/PostPreview');var _PostPreview2=_interopRequireDefault(_PostPreview);
var _AddNewPost=require('@screens/Home/AddNewPost');var _AddNewPost2=_interopRequireDefault(_AddNewPost);
var _MainMenu=require('@screens/Settings/MainMenu');var _MainMenu2=_interopRequireDefault(_MainMenu);
var _EditProfile=require('@screens/Settings/EditProfile');var _EditProfile2=_interopRequireDefault(_EditProfile);
var _Options=require('@screens/Home/Options');var _Options2=_interopRequireDefault(_Options);


var _store=require('@redux/store');var _store2=_interopRequireDefault(_store);

var _styles=require('@theme/styles');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _class=function(_React$Component){_inherits(_class,_React$Component);


function _class(){_classCallCheck(this,_class);var _this=_possibleConstructorReturn(this,(_class.__proto__||Object.getPrototypeOf(_class)).call(this));

_this.state={};return _this;

}_createClass(_class,[{key:'render',value:function render()

{
var isLoggedIn=this.props.isLoggedIn;
return(
_react2.default.createElement(_reactNativeRouterFlux.Router,null,
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'root',
hideNavBar:true,
navigationBarStyle:_styles.navBarStyle,
titleStyle:_styles.navTitleStyle,
backButtonTintColor:_styles.color.white},
_react2.default.createElement(_reactNativeRouterFlux.Stack,{key:'Auth',initial:!isLoggedIn},
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Welcome',component:_Welcome2.default,title:'',initial:true,hideNavBar:true}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Register',component:_Register2.default,title:'Register',back:true}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'CompleteProfile',component:_CompleteProfile2.default,title:'Select Username',back:false}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Login',component:_Login2.default,title:'Login'}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'ForgotPassword',component:_ForgotPassword2.default,title:'Forgot Password'})),


_react2.default.createElement(_reactNativeRouterFlux.Stack,{key:'Main',initial:isLoggedIn},
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Home',component:_Home2.default,title:'eMia',initial:true,type:_reactNativeRouterFlux.ActionConst.REPLACE}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'PostPreview',component:_PostPreview2.default,title:'',back:true}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'AddNewPost',component:_AddNewPost2.default,title:'',back:true}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'MainMenu',component:_MainMenu2.default,title:'',back:true}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'EditProfile',component:_EditProfile2.default,title:'',back:true}),
_react2.default.createElement(_reactNativeRouterFlux.Scene,{key:'Options',component:_Options2.default,title:'',back:true})))));




}}]);return _class;}(_react2.default.Component);exports.default=_class;