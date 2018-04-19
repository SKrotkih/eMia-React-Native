Object.defineProperty(exports,"__esModule",{value:true});exports.





fetchUsers=fetchUsers;exports.











fetchPosts=fetchPosts;var _api=require('./api');var api=_interopRequireWildcard(_api);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}var fetchAllUsers=api.fetchAllUsers,fetchAllPosts=api.fetchAllPosts;function fetchUsers(completion,failed){return function(dispatch){fetchAllUsers(function(data,error){if(data.items===null){failed(error);}else{completion(data.items);}});};}function fetchPosts(completion,failed){
return function(dispatch){
fetchAllPosts(function(data,error){
if(data.items===null){
failed(error);
}else{
completion(data.items);
}
});
};
}