
export function isEmpty (str) {
  return (!str || str.length === 0);
}

export function validateEmail (email) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return (filter.test(email))
}

export function validatePassword (password) {
  return (password.length > 6)
}

export function confirmPassword (cPassword, password) {
  return (cPassword === password)
}

export function validate (form) {
  let error = {};
  let success = true;

  var keys = Object.keys(form);
  var length = keys.length;

  keys.slice(0, length).map(field => {
    if (field !== 'error') {
      var { type, value } = form[field];
      if (isEmpty(value)) {
        error[field] = 'Your ' + field + ' is required';
        success = false;
      } else {
        error[field] = '';
        if (type === 'email' && !validateEmail(value)) {
          error[field] = 'Enter a valid email address';
          success = false;
        } else if (type === 'password' && !validatePassword(value)) {
          error[field] = 'Password must be at least 6 characters';
          success = false;
        } else if (type === 'confirm_password' && !confirmPassword(value, form.password.value)) {
          error[field] = 'Password does not match.';
          success = false;
        }
      }
    }
  });
  return {success, error};
}
