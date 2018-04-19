Object.defineProperty(exports,"__esModule",{value:true});exports.gridItemStyles=exports.styles=undefined;var _reactNative=require('react-native');
var _styles=require('@theme/styles');

var resizeMode='contain';

var deviceHeight=_reactNative.Dimensions.get("window").height;

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:'#fff',
height:_reactNative.Platform.OS==="ios"?deviceHeight:deviceHeight-20},

loading:{
flex:1,
backgroundColor:'#FFFFFF'},

separator:{
height:1,
marginBottom:4,
backgroundColor:'#eee'}});



var gridItemStyles=_reactNative.StyleSheet.create({
container:{
flex:1,
flexDirection:'column',
alignItems:'center',
height:220,
margin:1},

image:{
alignSelf:'center',
resizeMode:'cover',
height:160,
width:(_styles.windowWidth-8)/2},

title:{
fontSize:12,
marginBottom:4,
fontWeight:'bold',
textAlign:'center'},

description:{
fontSize:10,
marginBottom:2,
textAlign:'center'}});exports.



styles=styles;exports.gridItemStyles=gridItemStyles;