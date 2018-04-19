Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _uuid=require('uuid');var _uuid2=_interopRequireDefault(_uuid);

var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactNative=require('react-native');














var _nativeBase=require('native-base');



var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);


var _reactNativeProgress=require('react-native-progress');var Progress=_interopRequireWildcard(_reactNativeProgress);


var _alerts=require('./alerts/');

var _styles=require('@theme/styles');function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var AnimatedImage=_reactNative.Animated.createAnimatedComponent(_reactNative.ImageBackground);
var DefaultIndicator=Progress.Circle;

var LAYOUT_ENUM={
X:'x',
Y:'y'};


var BACKGROUND_VALUES={
MAX:100,
MIN:0};



var getPitagorasZ=function getPitagorasZ(x,y){return(
Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));};

var backgroundValueCalculation=function backgroundValueCalculation(x,y,BACKGROUND_VALUES){return(
4/3*BACKGROUND_VALUES.MAX-getPitagorasZ(x,y));};


var DOUBLE_TAP_MILISECONDS=200;

var styles=_reactNative.StyleSheet.create({
background:{
position:'absolute',
top:0,
left:0,
right:0,
width:_styles.windowWidth,
height:_styles.windowHeight,
bottom:0},

imageContainer:{
alignItems:'center',
justifyContent:'center',
borderWidth:2,
borderColor:'transparent'},


overlayImage:{
flex:1,
width:_styles.windowWidth,
maxHeight:_styles.windowHeight-60,
marginTop:50},


overlayHeader:{
flex:1,
flexDirection:'row',
position:'absolute',
zIndex:2,
top:0,
left:0,
width:_styles.windowWidth,
padding:10}});var



ImageViewer=function(_Component){_inherits(ImageViewer,_Component);






































function ImageViewer(props,context){_classCallCheck(this,ImageViewer);var _this=_possibleConstructorReturn(this,(ImageViewer.__proto__||Object.getPrototypeOf(ImageViewer)).call(this,
props,context));_this.



































































































handleLoadStart=function(){
if(!_this.state.loading&&_this.state.progress!==1){
_this.setState({
loading:true,
progress:0});

}
_this.bubbleEvent('onLoadStart');
};_this.

handleProgress=function(e){
var progress=e.nativeEvent.loaded/e.nativeEvent.total;



if(progress!==_this.state.progress&&_this.state.progress!==1){
_this.setState({
loading:progress<1,
progress:progress});

}
_this.bubbleEvent('onProgress',e);
};_this.

handleError=function(event){
_this.setState({
loading:false});

_this.bubbleEvent('onError',event);
};_this.

handleLoad=function(event){
if(_this.state.progress!==1){
_this.setState({
loading:false,
progress:1});

}
_this.bubbleEvent('onLoad',event);
};_this.

handleDownloadImage=function(){


var uri=_this.refs.originalImage.props.source.uri;

if(uri.endsWith('.gif')){
_alerts.Alert.show('Unfortunately can not download GIF right now.',{
type:'error'});

return;
}

if(_reactNative.Platform.OS==='ios'){
var promise=_reactNative.CameraRoll.saveToCameraRoll(uri,'photo');
promise.then(function(){return(
_alerts.Alert.show('Photo saved successfully!','success',{
type:'error'}));});


}else{






_alerts.Alert.show('Downloading ...',{
type:'info',
duration:0});


ret.then(function(res){
var promise=_reactNative.CameraRoll.saveToCameraRoll('file://'+res.path(),'photo');
promise.then(function(){

res.flush();
_alerts.Alert.show('Photo saved successfully!',{
type:'success'});

});
});
}
};_this.state={openModal:false,scale:new _reactNative.Animated.Value(1),layout:new _reactNative.Animated.ValueXY({x:0,y:0}),backgroundOpacity:new _reactNative.Animated.Value(BACKGROUND_VALUES.MIN),mainImageOpacity:new _reactNative.Animated.Value(1),loading:false,progress:0,thresholdReached:!props.threshold};_this.panResponder=null;_this.layoutListener=null;_this._imageSize={width:typeof props.source!=='object'?props.imageWidth:null,height:typeof props.source!=='object'?props.imageHeight:null};_this._layoutX=0;_this._layoutY=0;_this._lastMovedX=0;_this._lastMovedY=0;_this._modalClosing=0;_this._doubleTapTimeout=null;_this._isScaled=false;_this._isAnimatingToCenter=false;_this._zoomedImageSize={width:null,height:null};_this.handleMove=_this.handleMove.bind(_this);_this.handleRelease=_this.handleRelease.bind(_this);_this.toggleModal=_this.toggleModal.bind(_this);_this.handleSetPanResponder=_this.handleSetPanResponder.bind(_this);_this.handleLayoutChange=_this.handleLayoutChange.bind(_this);return _this;}_createClass(ImageViewer,[{key:'componentWillMount',value:function componentWillMount(){var _this2=this;this.state.layout.x.addListener(function(animated){return _this2.handleLayoutChange(animated,LAYOUT_ENUM.X);});this.state.layout.y.addListener(function(animated){return _this2.handleLayoutChange(animated,LAYOUT_ENUM.Y);});this.panResponder=_reactNative.PanResponder.create({onStartShouldSetPanResponder:this.handleSetPanResponder,onMoveShouldSetPanResponder:function onMoveShouldSetPanResponder(){return true;},onPanResponderMove:this.handleMove,onPanResponderRelease:this.handleRelease,onPanResponderTerminate:this.handleRelease});}},{key:'componentDidMount',value:function componentDidMount(){var _this3=this;var source=this.props.source;this.mounted=true;if(this.props.threshold){this._thresholdTimer=setTimeout(function(){_this3.setState({thresholdReached:true});_this3._thresholdTimer=null;},this.props.threshold);}if(typeof source==='object'&&typeof source.uri==='string'&&this.mounted){_reactNative.Image.prefetch(source.uri);_reactNative.Image.getSize(source.uri,function(width,height){_this3._imageSize={width:width,height:height};});}}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(props){if(!this.props.source||!props.source||this.props.source.uri!==props.source.uri){this.setState({loading:false,progress:0});}}},{key:'componentWillUnmount',value:function componentWillUnmount(){if(this._thresholdTimer){clearTimeout(this._thresholdTimer);}this.state.layout.x.removeAllListeners();this.state.layout.y.removeAllListeners();this.mounted=false;}},{key:'bubbleEvent',value:function bubbleEvent(propertyName,event){if(typeof this.props[propertyName]==='function'){this.props[propertyName](event);}}},{key:'handleMove',value:function handleMove(

e,gestureState){
if(typeof this.props.onMove==='function'){
this.props.onMove(e,gestureState);
}






var modifiedGestureState=_extends({},gestureState,{
dx:this._lastMovedX+gestureState.dx,
dy:this._lastMovedY+gestureState.dy});


_reactNative.Animated.event([null,{
dx:this.state.layout.x,
dy:this.state.layout.y}])(
e,modifiedGestureState);
}},{key:'handleLayoutChange',value:function handleLayoutChange(

animated,axis){
switch(axis){
case LAYOUT_ENUM.X:
this._layoutX=animated.value;
break;
case LAYOUT_ENUM.Y:
this._layoutY=animated.value;
break;
default:
break;}


if(this._modalClosing||this._isScaled||this._isAnimatingToCenter){
return;
}

var value=backgroundValueCalculation(this._layoutY,this._layoutX,BACKGROUND_VALUES);

_reactNative.Animated.timing(this.state.backgroundOpacity,{
toValue:value,
duration:1}).
start();
}},{key:'handleSetPanResponder',value:function handleSetPanResponder()

{var _this4=this;
var currMil=Date.now();

if(!!this._doubleTapTimeout&&
currMil-this._doubleTapTimeout<=DOUBLE_TAP_MILISECONDS&&
this.props.doubleTapEnabled)
{
var value=this._isScaled?1:2;
this._isAnimatingToCenter=this._isScaled;
this._isScaled=!this._isScaled;

_reactNative.Animated.timing(this.state.scale,{
toValue:value,
duration:100}).
start(function(){
_this4._isAnimatingToCenter=false;
if(!_this4._isScaled){
_this4._lastMovedY=0;
_this4._lastMovedX=0;
}
});
}
this._doubleTapTimeout=currMil;

return true;
}},{key:'handleRelease',value:function handleRelease()

{var _this5=this;
var value=backgroundValueCalculation(this._layoutY,this._layoutX,BACKGROUND_VALUES);
var resetAnimation=_reactNative.Animated.timing(this.state.layout,{
toValue:{x:0,y:0},
duration:150});


if(this._isScaled){
this._lastMovedY=this._layoutY;
this._lastMovedX=this._layoutX;
return;
}






var cleanBackgroundAnimation=_reactNative.Animated.sequence([
_reactNative.Animated.timing(this.state.backgroundOpacity,{
toValue:BACKGROUND_VALUES.MIN,
duration:150}),

_reactNative.Animated.timing(this.state.mainImageOpacity,{
toValue:1,
duration:50})]);



var animations=[];
animations.push(resetAnimation);

var shouldCloseModal=value<=0;

if(!this._isAnimatingToCenter&&shouldCloseModal){
this._modalClosing=true;
animations.push(cleanBackgroundAnimation);
}

animations.forEach(function(animation){return animation.start();});
if(!this._isAnimatingToCenter&&shouldCloseModal){
_reactNative.InteractionManager.runAfterInteractions(function(){return _this5.toggleModal();});
}
}},{key:'toggleModal',value:function toggleModal()

{
var shouldOpen=!this.state.openModal;

if(this.props.disabled){
return;
}
if(typeof this.props.onPress==='function'){
this.props.onPress(shouldOpen);
}
if(shouldOpen){
this._modalClosing=false;
this.state.backgroundOpacity.setValue(BACKGROUND_VALUES.MAX);
}else{
this.state.backgroundOpacity.setValue(BACKGROUND_VALUES.MIN);

if(typeof this.props.onClose==='function'){
this.props.onClose();
}
this.setState({DownloadAlert:{}});
}
this.state.mainImageOpacity.setValue(shouldOpen?0:1);
this.setState({
openModal:shouldOpen});

}},{key:'render',value:function render()

{var _this6=this;var _props=





this.props,source=_props.source,downloadable=_props.downloadable,imageStyle=_props.imageStyle,containerStyle=_props.containerStyle;var _state=








this.state,backgroundOpacity=_state.backgroundOpacity,openModal=_state.openModal,scale=_state.scale,progress=_state.progress,thresholdReached=_state.thresholdReached,loading=_state.loading;

var content=this.props.children;


var hideProgress=false;

if('width'&&'height'in containerStyle){
if(containerStyle.width<200||containerStyle.height<200){
hideProgress=true;
}
}

if(!hideProgress){
if((loading||progress<1)&&thresholdReached){
var IndicatorComponent=DefaultIndicator;
content=_react2.default.createElement(IndicatorComponent,{progress:progress,indeterminate:!loading||!progress});
}
}

if(this._imageSize.width/_styles.windowWidth>this._imageSize.height/_styles.windowHeight){
this._zoomedImageSize.width=_styles.windowWidth;
this._zoomedImageSize.height=_styles.windowWidth/this._imageSize.width*this._imageSize.height;
}else{
this._zoomedImageSize.height=_styles.windowHeight;
this._zoomedImageSize.width=_styles.windowHeight/this._imageSize.width*this._imageSize.height;
}

var interpolatedOpacity=backgroundOpacity.interpolate({
inputRange:[BACKGROUND_VALUES.MIN,BACKGROUND_VALUES.MAX],
outputRange:[0,1]});


var interpolatedColor=backgroundOpacity.interpolate({
inputRange:[BACKGROUND_VALUES.MIN,BACKGROUND_VALUES.MAX],
outputRange:['rgba(0, 0, 0, 0)','rgba(0, 0, 0, 1)']});


var width=this._imageSize.width*(_styles.windowWidth/this._imageSize.width);
var height=this._imageSize.height*(_styles.windowHeight*0.60/this._imageSize.height);

return(
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Animated.View,{style:[styles.imageContainer,containerStyle]},
_react2.default.createElement(_reactNative.TouchableWithoutFeedback,{
onPress:this.toggleModal},

_react2.default.createElement(AnimatedImage,{


ref:'originalImage',
source:source,
onLoadStart:this.handleLoadStart,
onProgress:this.handleProgress,
onError:this.handleError,
onLoad:this.handleLoad,
style:[
{
opacity:this.state.mainImageOpacity,
width:width,
height:height},

imageStyle],

resizeMode:'contain'},

content))),



_react2.default.createElement(_reactNative.Modal,{
visible:openModal,
animationType:'slide',
onRequestClose:this.props.closeOnBack?this.toggleModal:function(){return null;},
transparent:true},

_react2.default.createElement(_reactNative.Animated.View,{
style:{
flex:1,
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
backgroundColor:interpolatedColor}},


_react2.default.createElement(_reactNative.Animated.View,{style:[styles.overlayHeader,{opacity:interpolatedOpacity}]},
_react2.default.createElement(_reactNative.View,{style:{flex:1,alignItems:'flex-start'}},
_react2.default.createElement(_reactNative.TouchableOpacity,{
onPress:function onPress(){_this6.toggleModal();},
activeOpacity:0.7,
style:{top:2,left:2},
hitSlop:{
top:7,right:7,bottom:7,left:7}},


_react2.default.createElement(_nativeBase.Icon,{style:{color:"#fff",backgroundColor:'transparent'},name:'ios-arrow-back'}))),


downloadable&&
_react2.default.createElement(_reactNative.View,{style:{flex:1,alignItems:'flex-end',backgroundColor:'transparent'}},
_react2.default.createElement(_reactNative.TouchableOpacity,{
onPress:function onPress(){_this6.handleDownloadImage();},
activeOpacity:0.7,
style:{top:2,right:10},
hitSlop:{
top:7,right:7,bottom:7,left:7}},


_react2.default.createElement(_nativeBase.Icon,{style:{color:"#fff",backgroundColor:'transparent'},name:'ios-download'})))),




_react2.default.createElement(AnimatedImage,_extends({
source:source},
this.panResponder.panHandlers,{
style:[
styles.overlayImage,
this._zoomedImageSize,
{
transform:[].concat(_toConsumableArray(
this.state.layout.getTranslateTransform()),[
{scale:scale}])}]}))))));









}}]);return ImageViewer;}(_react.Component);ImageViewer.propTypes={source:_reactNative.Image.propTypes.source,disabled:_propTypes2.default.bool,imageStyle:_reactNative.Image.propTypes.style,containerStyle:_reactNative.Image.propTypes.style,doubleTapEnabled:_propTypes2.default.bool,imageWidth:_propTypes2.default.number,imageHeight:_propTypes2.default.number,onMove:_propTypes2.default.func,onPress:_propTypes2.default.func,onClose:_propTypes2.default.func,closeOnBack:_propTypes2.default.bool,threshold:_propTypes2.default.number,downloadable:_propTypes2.default.bool};ImageViewer.defaultProps={doubleTapEnabled:true,imageStyle:{},containerStyle:{},imageWidth:_styles.windowWidth,imageHeight:_styles.windowHeight/2,closeOnBack:true,threshold:40,downloadable:false};exports.default=ImageViewer;