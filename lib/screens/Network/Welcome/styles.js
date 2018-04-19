Object.defineProperty(exports,"__esModule",{value:true});var _reactNative=require('react-native');
var _styles=require('@theme/styles');

var resizeMode='contain';

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:_styles.color.white},


topContainer:{
flex:1,
paddingHorizontal:15,
paddingBottom:_styles.padding*2,
justifyContent:'center',
alignItems:'center',
backgroundColor:_styles.color.brand},


image:{
height:100,
width:100,
backgroundColor:_styles.color.grey,
marginBottom:_styles.padding,
resizeMode:resizeMode},


title:{
fontSize:_styles.fontSize.large+2,
lineHeight:_styles.fontSize.large+4,
fontFamily:_styles.fontFamily.bold,
color:_styles.color.white,
letterSpacing:1},


bottomContainer:{
backgroundColor:'white',
paddingVertical:_styles.padding*3,
shadowColor:'#000000',
shadowOpacity:0.8,
shadowRadius:2,
shadowOffset:{
height:1,
width:0}},



buttonContainer:{
justifyContent:'center',
alignItems:'center'},


containerView:{
width:_styles.windowWidth-40},


socialButton:{
height:(0,_styles.normalize)(55),
borderRadius:4,
marginTop:0,
marginBottom:0},


buttonText:{
fontSize:_styles.fontSize.regular+2,
fontFamily:_styles.fontFamily.medium},


orContainer:{
justifyContent:'center',
alignItems:'center',
height:40,
width:_styles.windowWidth},


button:{
backgroundColor:_styles.color.brand,
height:(0,_styles.normalize)(55)},


bottomText:{
fontSize:_styles.fontSize.regular,
fontFamily:_styles.fontFamily.medium,
marginRight:5,
color:'#414141'},


bottom:{
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
marginTop:_styles.padding*2},


signInText:{
fontSize:_styles.fontSize.regular,
color:_styles.color.brand,
fontFamily:_styles.fontFamily.medium},


divider:{
backgroundColor:'#D0D5DA',
position:'absolute',
top:19,
left:20,
right:20},


orText:{
backgroundColor:_styles.color.white,
fontSize:_styles.fontSize.regular,
fontFamily:_styles.fontFamily.medium,
color:'#414141',
paddingHorizontal:_styles.padding}});exports.default=



styles;