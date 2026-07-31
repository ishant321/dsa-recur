  export const validateEmail = (email: string) => {
    let isValid = true;
    let emailError = "";

    emailError = "";

    if (!email.trim()) {
      emailError = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      emailError = "Please enter a valid email";
      isValid = false;
    }

    return {isValid, error: emailError};
  };

export const validatePassword = (password: string) => {
    let isValid = true;
    let passwordError = "";

    passwordError = "";

    if (!password.trim()) {
      passwordError = "Password is required";
      isValid = false;
    }

    return {isValid, error: passwordError};
  };