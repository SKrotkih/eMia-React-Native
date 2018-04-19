Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');










var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);

var _reactNativeRootSiblings=require('react-native-root-siblings');var _reactNativeRootSiblings2=_interopRequireDefault(_reactNativeRootSiblings);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var TOAST_MAX_WIDTH=0.8;
var TOAST_ANIMATION_DURATION=200;
var DIMENSION=_reactNative.Dimensions.get('window');
var WINDOW_WIDTH=DIMENSION.width;
var positions={
TOP:50,
BOTTOM:-60,
CENTER:0};


var durations={
LONG:3500,
SHORT:2000};


var styles=_reactNative.StyleSheet.create({
defaultStyle:{
position:'absolute',
width:WINDOW_WIDTH,
justifyContent:'center',
alignItems:'center'},

containerStyle:{
padding:10,
backgroundColor:'#000',
opacity:0.8,
borderRadius:5,
marginHorizontal:WINDOW_WIDTH*((1-TOAST_MAX_WIDTH)/2)},

shadowStyle:{
shadowColor:'#000',
shadowOffset:{
width:4,
height:4},

shadowOpacity:0.8,
shadowRadius:6,
elevation:10},

textStyle:{
fontSize:16,
color:'#fff',
textAlign:'center'}});var




ToastContainer=function(_Component){_inherits(ToastContainer,_Component);


























function ToastContainer(){_classCallCheck(this,ToastContainer);var _this=_possibleConstructorReturn(this,(ToastContainer.__proto__||Object.getPrototypeOf(ToastContainer)).apply(this,
arguments));_this.












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

_reactNative.Animated.timing(_this.state.opacity,{
toValue:0.8,
duration:_this.props.animation?TOAST_ANIMATION_DURATION:0,
easing:_reactNative.Easing.out(_reactNative.Easing.ease)}).
start(function(_ref){var finished=_ref.finished;
if(finished){
_this._animating=!finished;
if(_this.props.duration>0){
_this._hideTimeout=setTimeout(function(){return _this._hide();},_this.props.duration);
}
}
});
}
};_this.

_hide=function(){
clearTimeout(_this._showTimeout);
clearTimeout(_this._hideTimeout);
if(!_this._animating){
_this._root.setNativeProps({
pointerEvents:'none'});

_reactNative.Animated.timing(_this.state.opacity,{
toValue:0,
duration:_this.props.animation?TOAST_ANIMATION_DURATION:0,
easing:_reactNative.Easing.in(_reactNative.Easing.ease)}).
start(function(_ref2){var finished=_ref2.finished;
if(finished){
_this._animating=false;
}
});
}
};_this.state={visible:_this.props.visible,opacity:new _reactNative.Animated.Value(0)};return _this;}_createClass(ToastContainer,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;if(this.state.visible){this._showTimeout=setTimeout(function(){return _this2._show();},this.props.delay);}}},{key:'componentWillUnmount',value:function componentWillUnmount(){this._hide();}},{key:'render',value:function render()

{var _this3=this;var
props=this.props;
var offset=props.position;
var position=offset?_defineProperty({},
offset<0?'bottom':'top',Math.abs(offset)):
{
top:0,
bottom:0};

return this.state.visible||this._animating?_react2.default.createElement(_reactNative.View,{
style:[
styles.defaultStyle,
position],

pointerEvents:'box-none'},

_react2.default.createElement(_reactNative.TouchableWithoutFeedback,{
onPress:this.props.hideOnPress?this._hide:null},

_react2.default.createElement(_reactNative.Animated.View,{
style:[
styles.containerStyle,
props.backgroundColor&&{backgroundColor:props.backgroundColor},
{
opacity:this.state.opacity},

props.shadow&&styles.shadowStyle,
props.shadowColor&&{shadowColor:props.shadowColor}],

pointerEvents:'none',
ref:function ref(ele){_this3._root=ele;}},

_react2.default.createElement(_reactNative.Text,{style:[
styles.textStyle,
props.textColor&&{color:props.textColor}]},


this.props.children)))):



null;
}}]);return ToastContainer;}(_react.Component);ToastContainer.displayName='ToastContainer';ToastContainer.propTypes=_extends({},_reactNative.ViewPropTypes,{duration:_propTypes2.default.number,visible:_propTypes2.default.bool,position:_propTypes2.default.number,animation:_propTypes2.default.bool,shadow:_propTypes2.default.bool,backgroundColor:_propTypes2.default.string,shadowColor:_propTypes2.default.string,textColor:_propTypes2.default.string,delay:_propTypes2.default.number,hideOnPress:_propTypes2.default.bool});ToastContainer.defaultProps={visible:false,duration:durations.SHORT,animation:true,shadow:true,position:positions.BOTTOM,delay:0,hideOnPress:true};var


Toast=function(_Component2){_inherits(Toast,_Component2);function Toast(){var _ref4;var _temp,_this4,_ret;_classCallCheck(this,Toast);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this4=_possibleConstructorReturn(this,(_ref4=Toast.__proto__||Object.getPrototypeOf(Toast)).call.apply(_ref4,[this].concat(args))),_this4),_this4.




















_toast=null,_this4.








componentWillReceiveProps=function(nextProps){
_this4._toast.update(_react2.default.createElement(ToastContainer,_extends({},
nextProps,{
duration:0})));

},_temp),_possibleConstructorReturn(_this4,_ret);}_createClass(Toast,[{key:'componentWillMount',value:function componentWillMount(){this._toast=new _reactNativeRootSiblings2.default(_react2.default.createElement(ToastContainer,_extends({},this.props,{duration:0})));}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
this._toast.destroy();
}},{key:'render',value:function render()

{
return null;
}}]);return Toast;}(_react.Component);Toast.displayName='Toast';Toast.propTypes=ToastContainer.propTypes;Toast.positions=positions;Toast.durations=durations;Toast.show=function(message){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{position:positions.BOTTOM,duration:durations.SHORT};return new _reactNativeRootSiblings2.default(_react2.default.createElement(ToastContainer,_extends({},options,{visible:true}),message));};Toast.hide=function(toast){if(toast instanceof _reactNativeRootSiblings2.default){toast.destroy();}else{console.warn('Toast.hide expected a `RootSiblings` instance as argument.\nBut got `'+typeof toast+'` instead.');}};exports.default=


Toast;