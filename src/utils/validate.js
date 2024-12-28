const validateRegistration = (data) => {
  const errors = {};
  
  if (!data.username || data.username.trim() === '') {
      errors.username = 'Username is required';
  } else if (data.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
  }
  
  if (!data.password || data.password.trim() === '') {
      errors.password = 'Password is required';
  } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
  }
  
  if (!data.email || data.email.trim() === '') {
      errors.email = 'Email is required';
  } else if (!data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      errors.email = 'Please enter a valid email address';
  }
  
  return {
      errors,
      isValid: Object.keys(errors).length === 0
  };
};
  
  const validateLogin = (data) => {
    const errors = {};
    if (!data.username || data.username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (!data.password || data.password.trim() === '') {
      errors.password = 'Password is required';
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };
  
  module.exports = {
    validateRegistration,
    validateLogin,
  };