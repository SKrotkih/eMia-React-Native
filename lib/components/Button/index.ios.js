Object.defineProperty(exports,"__esModule",{value:true});var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _styles=require('./styles');var _styles2=_interopRequireDefault(_styles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var noop=function noop(){};

var Button=function Button(_ref){var _ref$onPress=_ref.
onPress,onPress=_ref$onPress===undefined?noop:_ref$onPress,_ref$onLongPress=_ref.
onLongPress,onLongPress=_ref$onLongPress===undefined?noop:_ref$onLongPress,_ref$onLayout=_ref.
onLayout,onLayout=_ref$onLayout===undefined?noop:_ref$onLayout,
children=_ref.children,
rippleColor=_ref.rippleColor,
style=_ref.style,
background=_ref.background;return(

_react2.default.createElement(_reactNative.TouchableOpacity,{
onLongPress:onLongPress,
onLayout:onLayout,
onPress:onPress},
_react2.default.createElement(_reactNative.View,{style:style},
_react.Children.map(children,function(child){return child;}))));};




Button.defaultProps={
onPress:noop,
onLongPress:noop,
onLayout:noop,
rippleColor:'#f0eef0'};



Button.propTypes={
onPress:_propTypes2.default.func,
children:_propTypes2.default.any,
style:_propTypes2.default.any,
onLongPress:_propTypes2.default.func,
onLayout:_propTypes2.default.func,
rippleColor:_propTypes2.default.string};exports.default=


Button;