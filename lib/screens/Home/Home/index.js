Object.defineProperty(exports,"__esModule",{value:true});exports.Home=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

















var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');var _reactNative2=_interopRequireDefault(_reactNative);
var _reactNativeGridComponent=require('react-native-grid-component');var _reactNativeGridComponent2=_interopRequireDefault(_reactNativeGridComponent);
var _nativeBase=require('native-base');var _nativeBase2=_interopRequireDefault(_nativeBase);

var _reactNativeRouterFlux=require('react-native-router-flux');
var _reactRedux=require('react-redux');

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

var _styles=require('@theme/styles');

var _styles2=require('./styles');
var _Loader=require('@components/Loader');var _Loader2=_interopRequireDefault(_Loader);

var _index=require('../index');

var _index2=require('../../Auth/index');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var
























AppRegistry=_reactNative2.default.AppRegistry,
Image=_reactNative2.default.Image,
StyleSheet=_reactNative2.default.StyleSheet,
View=_reactNative2.default.View,
Alert=_reactNative2.default.Alert,
TouchableHighlight=_reactNative2.default.TouchableHighlight,
TouchableOpacity=_reactNative2.default.TouchableOpacity,
ActivityIndicator=_reactNative2.default.ActivityIndicator;var


Component=_react2.default.Component;var


fetchUsers=_index.actions.fetchUsers,
fetchPosts=_index.actions.fetchPosts;var


login=_index2.actions.login;var


Home=exports.Home=function(_Component){_inherits(Home,_Component);
function Home(props){_classCallCheck(this,Home);var _this=_possibleConstructorReturn(this,(Home.__proto__||Object.getPrototypeOf(Home)).call(this,
props));
_this.state={
dataSource:null,
loaded:false,
data:null,
seg:1,
active:false};

_this.onCompletion=_this.onCompletion.bind(_this);
_this.onFailed=_this.onFailed.bind(_this);return _this;
}_createClass(Home,[{key:'setUpNavigationBar',value:function setUpNavigationBar()

{
var title=_index.config.APP_NAME;var
setParams=this.props.navigation.setParams;
setParams({
title:title,
left:
_react2.default.createElement(_nativeBase.Icon,{style:{marginLeft:8,color:"#fff"},name:'ios-menu',
onPress:function onPress(){menuButtonPressed();}}),
right:
_react2.default.createElement(_nativeBase.Icon,{style:{marginRight:8,color:"#fff"},name:'ios-options',
onPress:function onPress(){optionsButtonPressed();}})});

}},{key:'componentWillMount',value:function componentWillMount()

{
this.setUpNavigationBar();
}},{key:'componentDidMount',value:function componentDidMount()

{
this.fetchData();
}},{key:'fetchData',value:function fetchData()

{
this.props.fetchPosts(this.onCompletion,this.onFailed);
}},{key:'onCompletion',value:function onCompletion(

items){
this.setState({
dataSource:items,
loaded:true});

}},{key:'onFailed',value:function onFailed(

error){
if(error!=null){
Alert.alert('Oops!',error.message);
}
this.setState({
dataSource:[],
loaded:true});

}},{key:'collapseMenuOnButton',value:function collapseMenuOnButton()

{
this.setState({
active:false});

}},{key:'render',value:function render()

{
if(!this.state.loaded){
return this.renderLoadingView();
}



return(
_react2.default.createElement(_nativeBase.Container,null,
_react2.default.createElement(_nativeBase.Tabs,{tabBarUnderlineStyle:{borderBottomWidth:2},
renderTabBar:function renderTabBar(){return _react2.default.createElement(_nativeBase.ScrollableTab,null);},
onChangeTab:this.onChangeTab()},
_react2.default.createElement(_nativeBase.Tab,{heading:'Recent',tabStyle:{backgroundColor:'white'},textStyle:{color:_styles.color.brand},activeTabStyle:{backgroundColor:'white'},activeTextStyle:{color:'black',fontWeight:'bold'}},
this.renderTab1()),

_react2.default.createElement(_nativeBase.Tab,{heading:'My Posts',tabStyle:{backgroundColor:'white'},textStyle:{color:_styles.color.brand},activeTabStyle:{backgroundColor:'white'},activeTextStyle:{color:'black',fontWeight:'bold'}},
this.renderTab2()),

_react2.default.createElement(_nativeBase.Tab,{heading:'Tab3',tabStyle:{backgroundColor:'white'},textStyle:{color:_styles.color.brand},activeTabStyle:{backgroundColor:'white'},activeTextStyle:{color:'black',fontWeight:'bold'}},
this.renderTab2()),

_react2.default.createElement(_nativeBase.Tab,{heading:'Tab4',tabStyle:{backgroundColor:'white'},textStyle:{color:_styles.color.brand},activeTabStyle:{backgroundColor:'white'},activeTextStyle:{color:'black',fontWeight:'bold'}},
this.renderTab2()),

_react2.default.createElement(_nativeBase.Tab,{heading:'Tab5',tabStyle:{backgroundColor:'white'},textStyle:{color:_styles.color.brand},activeTabStyle:{backgroundColor:'white'},activeTextStyle:{color:'black',fontWeight:'bold'}},
this.renderTab2())),


this.renderActionsButton()));


}},{key:'renderActionsButton',value:function renderActionsButton()

{var _this2=this;
var activeState=this.state.active;
return(
_react2.default.createElement(_nativeBase.Fab,{
active:activeState,
direction:'up',
containerStyle:{},
style:{backgroundColor:_styles.color.brand},
position:'bottomRight',
onPress:function onPress(){return _this2.setState({active:!activeState});}},
_react2.default.createElement(_nativeBase.IconNB,{name:'ios-menu'}),
_react2.default.createElement(_nativeBase.Button,{style:{backgroundColor:_styles.color.brand},
onPress:function onPress(){return _this2.createNewPostButtonPressed();}},
_react2.default.createElement(_nativeBase.IconNB,{name:'ios-create'}))));



}},{key:'onChangeTab',value:function onChangeTab()

{
}},{key:'renderTab1',value:function renderTab1()

{
return(
_react2.default.createElement(_reactNativeGridComponent2.default,{
style:_styles2.styles.list,
renderItem:this.renderItem,
renderSeparator:this.renderSeparator.bind(this),
renderPlaceholder:this.renderPlaceholder,
data:this.state.dataSource,
itemsPerRow:2,
itemHasChanged:function itemHasChanged(d1,d2){return d1!==d2;}}));








}},{key:'renderTab2',value:function renderTab2()

{
return(
_react2.default.createElement(_nativeBase.Text,null,'My Posts'));

}},{key:'renderLoadingView',value:function renderLoadingView()

{
return(
_react2.default.createElement(View,{style:_styles2.styles.loading},
_react2.default.createElement(_Loader2.default,{loading:true})));


}},{key:'renderPlaceholder',value:function renderPlaceholder(

sectionID,rowID){

var key=''+sectionID+'-9';
return(
_react2.default.createElement(View,{style:_styles2.gridItemStyles.container,key:key},
_react2.default.createElement(_nativeBase.Text,null)));



}},{key:'renderSeparator',value:function renderSeparator(

sectionID,rowID,adjacentRowHighlighted){

var key=''+sectionID+'-'+rowID;
return(
_react2.default.createElement(View,{style:_styles2.styles.separator,key:key}));

}},{key:'renderItem',value:function renderItem(

item,sectionID,rowID){
var title=item.value.title;
var body=item.value.body;
var key=item.key;
var url=item.url;
return(
_react2.default.createElement(View,{style:_styles2.gridItemStyles.container,key:key},
_react2.default.createElement(TouchableOpacity,{key:key,style:{flexDirection:'row'},activeOpacity:0.5,onPress:function onPress(){
selectPostItem(item);
}},
_react2.default.createElement(_nativeBase.Body,null,
_react2.default.createElement(Image,{style:_styles2.gridItemStyles.image,source:{cache:'force-cache',uri:url}}),
_react2.default.createElement(_nativeBase.Text,{style:_styles2.gridItemStyles.title,numberOfLines:1},
title),

_react2.default.createElement(_nativeBase.Text,{style:_styles2.gridItemStyles.description,numberOfLines:3},
body)))));





}},{key:'render_Segment',value:function render_Segment()


{var _this3=this;
if(!this.state.loaded){
return this.renderLoadingView();
}
return(
_react2.default.createElement(_nativeBase.Container,null,
_react2.default.createElement(_reactNative.StatusBar,{backgroundColor:_styles.color.brand,barStyle:'light-content'}),
_react2.default.createElement(_nativeBase.Header,{hasSegment:true},
_react2.default.createElement(_nativeBase.Body,null,
_react2.default.createElement(_nativeBase.Segment,null,
_react2.default.createElement(_nativeBase.Button,{
active:this.state.seg===1?true:false,
first:true,
onPress:function onPress(){return _this3.setState({seg:1});}},

_react2.default.createElement(_nativeBase.Text,null,'Recent')),

_react2.default.createElement(_nativeBase.Button,{
last:true,
active:this.state.seg===2?true:false,
onPress:function onPress(){return _this3.setState({seg:2});}},

_react2.default.createElement(_nativeBase.Text,null,'My Posts'))))),




_react2.default.createElement(_nativeBase.Content,{padder:true,contentContainerStyle:_styles2.styles.container},
this.state.seg===1&&this.renderTab1(),
this.state.seg===2&&this.renderTab2())));



}},{key:'createNewPostButtonPressed',value:function createNewPostButtonPressed()

{
this.collapseMenuOnButton();
_reactNativeRouterFlux.Actions.AddNewPost();
}}]);return Home;}(Component);




function selectPostItem(item){
_reactNativeRouterFlux.Actions.PostPreview({item:item});
}

function menuButtonPressed(){
_reactNativeRouterFlux.Actions.MainMenu();
}

function optionsButtonPressed(){
_reactNativeRouterFlux.Actions.Options();
}exports.default=

(0,_reactRedux.connect)(null,{login:login,fetchPosts:fetchPosts})(Home);