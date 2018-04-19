Object.defineProperty(exports,"__esModule",{value:true});exports.
isEmpty=isEmpty;exports.



validateEmail=validateEmail;exports.







validatePassword=validatePassword;exports.





confirmPassword=confirmPassword;exports.






validate=validate;function isEmpty(str){return!str||str.length===0;}function validateEmail(email){var filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;if(filter.test(email))return true;return false;}function validatePassword(password){if(password.length>6)return true;return false;}function confirmPassword(cPassword,password){if(cPassword===password){return true;}return false;}function validate(form){
var error={};
var success=true;

var keys=Object.keys(form);
var length=keys.length;

keys.slice(0,length).map(function(field){
if(field!=='error'){var _form$field=
form[field],type=_form$field.type,value=_form$field.value;
if(isEmpty(value)){
error[field]='Your '+field+' is required';
success=false;
}else{
error[field]='';
if(type==='email'&&!validateEmail(value)){
error[field]='Enter a valid email address';
success=false;
}else if(type==='password'&&!validatePassword(value)){
error[field]='Password must be at least 6 characters';
success=false;
}else if(type==='confirm_password'&&!confirmPassword(value,form.password.value)){
error[field]='Password does not match.';
success=false;
}
}
}
});
return{success:success,error:error};
}