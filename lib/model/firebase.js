Object.defineProperty(exports,"__esModule",{value:true});exports.provider=exports.storage=exports.auth=exports.database=undefined;var _firebase=require('firebase');var firebase=_interopRequireWildcard(_firebase);
var _constants=require('@config/constants');var constants=_interopRequireWildcard(_constants);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}


var config={
apiKey:constants.FIREBASE_API_KEY,
authDomain:constants.FIREBASE_AUTH_DOMAIN,
databaseURL:constants.FIREBASE_DATABASE_URL,
projectId:constants.FIREBASE_PROJECT_ID,
storageBucket:constants.FIREBASE_STORAGE_BUCKET,
messagingSenderId:constants.FIREBASE_MESSAGING_SENDER_ID};


firebase.initializeApp(config);

var database=exports.database=firebase.database();
var auth=exports.auth=firebase.auth();
var storage=exports.storage=firebase.storage();
var provider=exports.provider=new firebase.auth.FacebookAuthProvider();