Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.


register=register;exports.







createUser=createUser;exports.






login=login;exports.







getUser=getUser;exports.














getCurrentUser=getCurrentUser;exports.






























resetPassword=resetPassword;exports.






signOut=signOut;var _firebase=require('@model/firebase');function register(data,callback){var email=data.email,password=data.password;_firebase.auth.createUserWithEmailAndPassword(email,password).then(function(user){return callback(true,user,null);}).catch(function(error){return callback(false,null,error);});}function createUser(user,callback){_firebase.database.ref('main').child('users').child(user.id).update(_extends({},user)).then(function(){return callback(true,null,null);}).catch(function(error){return callback(false,null,{message:error});});}function login(data,callback){var email=data.email,password=data.password;_firebase.auth.signInWithEmailAndPassword(email,password).then(function(user){return getUser(user,callback);}).catch(function(error){return callback(false,null,error);});}function getUser(user,callback){_firebase.database.ref('main').child('users').child(user.uid).once('value').then(function(snapshot){var exists=snapshot.val()!==null;if(exists){user=snapshot.val();}var data={exists:exists,user:user};callback(true,data,null);}).catch(function(error){return callback(false,null,error);});}function getCurrentUser(callback){_firebase.auth.onAuthStateChanged(function(user){if(user===null){callback(null);}else{}getUser({uid:user.uid},function(success,data,error){if(success&&data.exists){var currentUser=data.user;var avatarName=currentUser.id+'.jpg';getDownloadURL(avatarName,function(url){currentUser.avatarUrl=url;callback(currentUser);});}else{callback(null);}});});}function getDownloadURL(photoName,callback){var imageRef=_firebase.storage.ref(photoName);imageRef.getDownloadURL().then(function(url){callback(url);},function(error){console.log(error);callback(null);});}function resetPassword(data,callback){var email=data.email;_firebase.auth.sendPasswordResetEmail(email).then(function(user){return callback(true,null,null);}).catch(function(error){return callback(false,null,error);});}function signOut(callback){
_firebase.auth.signOut().
then(function(){
if(callback){
callback(true,null,null);
}
}).
catch(function(error){
if(callback){
callback(false,null,error);
}
});
}