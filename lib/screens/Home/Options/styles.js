Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require('react-native');
var _styles=require('@theme/styles');

var resizeMode='contain';

var styles=_reactNative.StyleSheet.create({
container:{
margin:15,
marginBottom:15,
backgroundColor:'#ffffff'},


content:{
height:_styles.windowHeight},

thumbnail:{
marginLeft:4,
marginTop:4,
flexDirection:'row'},

photo:{
width:_styles.windowWidth-30,
height:_styles.windowWidth-30,
alignSelf:'center',
resizeMode:'contain'},


title:{
fontSize:16,
marginBottom:4,
fontWeight:'bold',
textAlign:'center'},


description:{
fontSize:14,
textAlign:'center',
marginVertical:8}});exports.default=



styles;