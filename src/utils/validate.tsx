export function isEmpty(str) {
  return (!str || str.length === 0);
}

export function validateEmail(email) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return (filter.test(email));
}

export function validatePassword(password) {
  return !(password.length < 6);
}

export function confirmPassword(cPassword, password) {
  return (cPassword === password);
}
