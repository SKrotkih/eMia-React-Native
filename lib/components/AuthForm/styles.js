Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require('react-native');
var _styles=require('@theme/styles');

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:_styles.color.white},


wrapper:{
justifyContent:'center',
alignItems:'center'},


errorText:{
color:_styles.color.red,
width:_styles.windowWidth-45,
marginTop:20},


containerView:{
marginVertical:_styles.padding*3,
width:_styles.windowWidth-40},


socialButton:{
height:(0,_styles.normalize)(55),
borderRadius:4,
marginTop:0,
marginBottom:0},


button:{
backgroundColor:_styles.color.brand,
height:(0,_styles.normalize)(55)},


buttonText:{
fontSize:_styles.fontSize.regular+2,
fontFamily:_styles.fontFamily.medium},


forgotText:{
textAlign:'center',
color:_styles.color.black,
marginBottom:_styles.padding,
fontSize:_styles.fontSize.regular,
fontFamily:_styles.fontFamily.medium}});exports.default=



styles;