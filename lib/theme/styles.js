Object.defineProperty(exports,"__esModule",{value:true});exports.navBarStyle=exports.normalize=exports.navTitleStyle=exports.tabIconStyle=exports.windowHeight=exports.windowWidth=exports.navbarHeight=exports.fontFamily=exports.fontSize=exports.color=exports.padding=undefined;var _reactNative=require('react-native');





var _reactNativeSizeMatters=require('react-native-size-matters');

var color={
brand:'#21AEED',
black:'#3B3031',
light_black:'#414141',
main:'rgb(99,139,250)',
white:'#ffffff',
light_grey:'#eaeaea',
grey:'#ccc',
red:'red',
underlayColor:'#ddd'};


var fontSize={
small:(0,_reactNativeSizeMatters.moderateScale)(12),
regular:(0,_reactNativeSizeMatters.moderateScale)(14),
large:(0,_reactNativeSizeMatters.moderateScale)(21)};


var customfontFamily={
extrabold:'RobotoBlack',
bold:'RobotoBold',
medium:'RobotoMedium',
regular:'RobotoRegular',
light:'RobotoLight'};


var fontFamily={
Verdana:{
weights:{
ExtraBold:'800',
Bold:'700',
SemiBold:'600',
Light:'300',
Normal:'400'},

styles:{
Italic:'italic'}}};




var padding=8;
var navbarHeight=_reactNative.Platform.OS==='ios'?64:54;
var statusBarHeight=_reactNative.Platform.OS==="ios"?0:20;
var windowWidth=_reactNative.Dimensions.get('window').width;
var windowHeight=_reactNative.Dimensions.get('window').height;

var tabColor=_reactNative.Platform.OS==='ios'?'rgba(73,75,76, .5)':'rgba(255,255,255,.8)';
var selectedTabColor=_reactNative.Platform.OS==='ios'?'rgb(73,75,76)':'#fff';

var tabIconStyle={size:21,color:tabColor,selected:selectedTabColor};
var navTitleStyle={fontSize:fontSize.large,fontFamily:fontFamily.extrabold,color:color.white};
var navBarStyle={backgroundColor:color.brand,marginTop:statusBarHeight};exports.


padding=padding;exports.
color=color;exports.
fontSize=fontSize;exports.
fontFamily=fontFamily;exports.
navbarHeight=navbarHeight;exports.
windowWidth=windowWidth;exports.
windowHeight=windowHeight;exports.
tabIconStyle=tabIconStyle;exports.
navTitleStyle=navTitleStyle;exports.
normalize=_reactNativeSizeMatters.moderateScale;exports.
navBarStyle=navBarStyle;