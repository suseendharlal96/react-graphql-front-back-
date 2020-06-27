module.exports.validateSignupInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  console.log(username, email, password, confirmPassword);
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username Must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "password Must not be empty";
  }

  if (confirmPassword.trim() === "") {
    errors.confirmPassword = "confirmPassword Must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    // const regEx =
    //   "/^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/";
    // if (!regEx.match(email)) {
    //   errors.email = "Not a valid email";
    // }
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1 ? true : false,
  };
};

module.exports.validateSigninInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username Must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "password Must not be empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1 ? true : false,
  };
};
