Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');
var _index=require('../../index');
var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);
var _Button=require('@components/Button');var _Button2=_interopRequireDefault(_Button);

var _constants=require('@config/constants');
var _app=require('../../modules/app');


var _index2=require('../index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var colors=_constants.THEMES.gitterDefault.colors;var

NoInternetScreen=function(_Component){_inherits(NoInternetScreen,_Component);
function NoInternetScreen(props){_classCallCheck(this,NoInternetScreen);var _this=_possibleConstructorReturn(this,(NoInternetScreen.__proto__||Object.getPrototypeOf(NoInternetScreen)).call(this,
props));

_this.handleRetry=_this.handleRetry.bind(_this);return _this;
}_createClass(NoInternetScreen,[{key:'handleRetry',value:function handleRetry()

{var
dispatch=this.props.dispatch;
_index.rootNavigator.startAppWithScreen({screen:'gm.Launch'});
dispatch((0,_app.init)());
}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.Image,{style:_styles2.default.container,
source:require('../../images/gitter-background.jpg')},

_react2.default.createElement(_reactNative.Text,{style:_styles2.default.logo},'No internet connection.'),



_react2.default.createElement(_Button2.default,{
style:[_styles2.default.buttonStyle,{backgroundColor:colors.darkRed}],
onPress:function onPress(){return _this2.handleRetry();}},
_react2.default.createElement(_reactNative.Text,{pointerEvents:'none',
style:_styles2.default.buttonText},'Retry'))));





}}]);return NoInternetScreen;}(_react.Component);


NoInternetScreen.propTypes={
dispatch:_propTypes2.default.func};exports.default=


(0,_reactRedux.connect)()(NoInternetScreen);