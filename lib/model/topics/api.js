Object.defineProperty(exports,"__esModule",{value:true});exports.


fetchAllUsers=fetchAllUsers;exports.

















fetchAllPosts=fetchAllPosts;var _firebase=require('@model/firebase');var _actions=require('@model/auth/actions');var usersActions=_interopRequireWildcard(_actions);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function fetchAllUsers(callback){_firebase.database.ref('main').child('users').once('value').then(function(snapshot){var items=[];if(snapshot.val()!==null){snapshot.forEach(function(child){items.push({value:child.val(),key:child.key});});}var data={items:items};callback(data,null);}).catch(function(error){return callback(null,error);});}function fetchAllPosts(callback){
_firebase.database.ref('main').child('posts').once('value').
then(function(snapshot){
var items=[];
parsePosts(snapshot,items);
putUrlsPhoto(items,callback);
}).
catch(function(error){return callback(null,error);});
}

function parsePosts(snapshot,items){
if(snapshot.val()!==null){
snapshot.forEach(function(child){
items.push({
value:child.val(),
url:'',
avatarUrl:'',
author:null,
key:child.key});

});
}
}

function putUrlsPhoto(items,completion){
var counter=items.length;
if(counter>0){
items.forEach(function(item){
var photoName=item.value.id+'.jpg';
getDownloadURL(photoName,function(url){
item.url=url;
var avatarName=item.value.uid+'.jpg';
getDownloadURL(avatarName,function(url){
item.avatarUrl=url;
usersActions.getUser(item.value.uid,function(user){
item.author=user;
counter-=1;
if(counter===0){
var data={items:items};
completion(data,null);
}
});
});
});
});
}else{
var data={items:items};
completion(data,null);
}
}

function getDownloadURL(photoName,callback){
var imageRef=_firebase.storage.ref(photoName);

imageRef.getDownloadURL().then(function(url){
callback(url);
},function(error){
console.log(error);
});
}