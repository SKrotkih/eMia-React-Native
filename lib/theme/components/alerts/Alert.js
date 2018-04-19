Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');





var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);

var _reactNativeRootSiblings=require('react-native-root-siblings');var _reactNativeRootSiblings2=_interopRequireDefault(_reactNativeRootSiblings);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var BAR_HEIGHT=18;
var BACKGROUND_COLOR='#3DD84C';
var TOUCHABLE_BACKGROUND_COLOR='#3DD84C';
var SLIDE_DURATION=300;
var ACTIVE_OPACITY=0.6;
var SATURATION=0.9;

var durations={
LONG:3500,
SHORT:2000};


var types={
ERROR:'error',
SUCCESS:'success',
INFO:'info'};


var styles={
view:{
height:BAR_HEIGHT*2,
bottom:0,
right:0,
left:0,
position:'absolute'},

touchableOpacity:{
flex:1,
justifyContent:'flex-end'},

text:{
height:BAR_HEIGHT,
marginBottom:BAR_HEIGHT/2,
marginTop:BAR_HEIGHT/2,
fontSize:13,
fontWeight:'400',
lineHeight:15,
textAlign:'center',
color:'white'}};



function saturate(color,percent){
var R=parseInt(color.substring(1,3),16);
var G=parseInt(color.substring(3,5),16);
var B=parseInt(color.substring(5,7),16);
R=parseInt(R*percent);
G=parseInt(G*percent);
B=parseInt(B*percent);
R=R<255?R:255;
G=G<255?G:255;
B=B<255?B:255;
var r=R.toString(16).length===1?'0'+R.toString(16):R.toString(16);
var g=G.toString(16).length===1?'0'+G.toString(16):G.toString(16);
var b=B.toString(16).length===1?'0'+B.toString(16):B.toString(16);
return'#'+(r+g+b);
}var


AlertContainer=function(_Component){_inherits(AlertContainer,_Component);














function AlertContainer(props){_classCallCheck(this,AlertContainer);var _this=_possibleConstructorReturn(this,(AlertContainer.__proto__||Object.getPrototypeOf(AlertContainer)).call(this,
props));_this.
















componentWillReceiveProps=function(nextProps){
if(nextProps.visible!==_this.props.visible){
if(nextProps.visible){
clearTimeout(_this._showTimeout);
clearTimeout(_this._hideTimeout);
_this._showTimeout=setTimeout(function(){return _this._show();},_this.props.delay);
}else{
_this._hide();
}

_this.setState({
visible:nextProps.visible});

}
};_this.





shouldComponentUpdate=function(nextProps,nextState){return _this.state.visible!==nextState.visible;};_this.

_animating=false;_this.
_root=null;_this.
_hideTimeout=null;_this.
_showTimeout=null;_this.

_show=function(){
clearTimeout(_this._showTimeout);
if(!_this._animating){
clearTimeout(_this._hideTimeout);
_this._animating=true;
_this._root.setNativeProps({
pointerEvents:'auto'});



requestAnimationFrame(function(){
_reactNative.Animated.parallel([
_reactNative.Animated.timing(
_this.state.height,
{
toValue:BAR_HEIGHT*2,
duration:SLIDE_DURATION}),


_reactNative.Animated.timing(
_this.state.opacity,
{
toValue:1,
duration:SLIDE_DURATION})]).


start(function(_ref){var finished=_ref.finished;
if(finished){
_this._animating=!finished;
if(_this.props.duration>0){
_this._hideTimeout=setTimeout(function(){return _this._hide();},_this.props.duration);
}
}
});
});
}
};_this.

_hide=function(){
clearTimeout(_this._showTimeout);
clearTimeout(_this._hideTimeout);
if(!_this._animating){
_this._root.setNativeProps({
pointerEvents:'none'});




requestAnimationFrame(function(){
_reactNative.Animated.parallel([
_reactNative.Animated.timing(
_this.state.height,
{
toValue:0,
duration:SLIDE_DURATION}),


_reactNative.Animated.timing(
_this.state.opacity,
{
toValue:0,
duration:SLIDE_DURATION})]).


start(function(_ref2){var finished=_ref2.finished;
if(finished){
_this._animating=false;
}
});
});
}
};_this.state={visible:_this.props.visible,height:new _reactNative.Animated.Value(0),opacity:new _reactNative.Animated.Value(0)};_this.timer=null;return _this;}_createClass(AlertContainer,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;if(this.state.visible){this._showTimeout=setTimeout(function(){return _this2._show();},this.props.delay);}}},{key:'componentWillUnmount',value:function componentWillUnmount(){this._hide();}},{key:'render',value:function render()

{var _this3=this;var
props=this.props;
var alertType=props.type;

if(alertType==='error'){
BACKGROUND_COLOR='#C02827';
TOUCHABLE_BACKGROUND_COLOR='#FB6567';
}else if(alertType==='success'){
BACKGROUND_COLOR='#3CC29E';
TOUCHABLE_BACKGROUND_COLOR='#59DC9A';
}else if(alertType==='info'){
BACKGROUND_COLOR='#3b6976';
TOUCHABLE_BACKGROUND_COLOR='#8EDBE5';
}

return this.state.visible||this._animating?_react2.default.createElement(_reactNative.Animated.View,{
style:[styles.view,{
height:this.state.height,
opacity:this.state.opacity,
backgroundColor:saturate(BACKGROUND_COLOR,SATURATION)}],

pointerEvents:'none',
ref:function ref(ele){_this3._root=ele;}},

_react2.default.createElement(_reactNative.TouchableOpacity,{
style:[styles.touchableOpacity,{
backgroundColor:saturate(TOUCHABLE_BACKGROUND_COLOR,SATURATION)}],

onPress:this.props.onPress,
activeOpacity:ACTIVE_OPACITY},

_react2.default.createElement(_reactNative.Animated.Text,{
style:[styles.text,{
color:styles.text.color,
opacity:1}],

allowFontScaling:false},

this.props.children))):


null;
}}]);return AlertContainer;}(_react.Component);AlertContainer.propTypes=_extends({},_reactNative.ViewPropTypes,{duration:_propTypes2.default.number,delay:_propTypes2.default.number,visible:_propTypes2.default.bool,type:_propTypes2.default.string});AlertContainer.defaultProps={visible:false,duration:durations.LONG,type:types.SUCCESS};var


Alert=function(_Component2){_inherits(Alert,_Component2);function Alert(){var _ref3;var _temp,_this4,_ret;_classCallCheck(this,Alert);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this4=_possibleConstructorReturn(this,(_ref3=Alert.__proto__||Object.getPrototypeOf(Alert)).call.apply(_ref3,[this].concat(args))),_this4),_this4.




























componentWillReceiveProps=function(nextProps){
_this4._toast.update(_react2.default.createElement(AlertContainer,_extends({},
nextProps,{
duration:0})));

},_this4.





_alert=null,_temp),_possibleConstructorReturn(_this4,_ret);}_createClass(Alert,[{key:'componentWillMount',value:function componentWillMount(){this._alert=new _reactNativeRootSiblings2.default(_react2.default.createElement(AlertContainer,_extends({},this.props,{duration:0})));}},{key:'componentWillUnmount',value:function componentWillUnmount(){this._alert.destroy();}},{key:'render',value:function render()

{
return null;
}}]);return Alert;}(_react.Component);Alert.displayName='Alert';Alert.propTypes=AlertContainer.propTypes;Alert.types=types;Alert.durations=durations;Alert.show=function(message){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{type:types.SUCCESS,duration:durations.LONG};return new _reactNativeRootSiblings2.default(_react2.default.createElement(AlertContainer,_extends({},options,{visible:true}),message));};Alert.hide=function(alert){if(alert instanceof _reactNativeRootSiblings2.default){alert.destroy();}else{console.warn('Alert.hide expected a `RootSiblings` instance as argument.');}};exports.default=


Alert;