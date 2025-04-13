// Temporary in-memory store for users (demo only)
let users = [];

document.addEventListener('DOMContentLoaded', () => {
  // Main container elements
  const buttonContainer = document.getElementById('buttonContainer');
  const signUpBtn = document.getElementById('signUpBtn');
  const loginBtn = document.getElementById('loginBtn');

  // Sign Up form elements
  const signUpFormContainer = document.getElementById('signUpFormContainer');
  const closeSignUp = document.getElementById('closeSignUp');
  const signUpForm = document.getElementById('signUpForm');
  const signupName = document.getElementById('signupName');
  const signupEmail = document.getElementById('signupEmail');
  const signupPassword = document.getElementById('signupPassword');
  const signupError = document.getElementById('signupError');
  const signupSuccess = document.getElementById('signupSuccess');

  // Login form elements
  const loginFormContainer = document.getElementById('loginFormContainer');
  const closeLogin = document.getElementById('closeLogin');
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');

  // Forgot Password elements
  const forgotPasswordFormContainer = document.getElementById('forgotPasswordFormContainer');
  const closeForgotPassword = document.getElementById('closeForgotPassword');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const forgotEmail = document.getElementById('forgotEmail');
  const forgotError = document.getElementById('forgotError');
  const forgotSuccess = document.getElementById('forgotSuccess');

  // Show Sign Up form
  signUpBtn.addEventListener('click', () => {
    buttonContainer.style.display = 'none';
    signUpFormContainer.classList.add('active');
    signupError.textContent = '';
    signupSuccess.textContent = '';
  });

  // Close Sign Up form
  closeSignUp.addEventListener('click', () => {
    signUpFormContainer.classList.remove('active');
    buttonContainer.style.display = 'block';
    signUpForm.reset();
  });

  // Show Login form
  loginBtn.addEventListener('click', () => {
    buttonContainer.style.display = 'none';
    loginFormContainer.classList.add('active');
    loginError.textContent = '';
  });

  // Close Login form
  closeLogin.addEventListener('click', () => {
    loginFormContainer.classList.remove('active');
    buttonContainer.style.display = 'block';
    loginForm.reset();
  });

  // Sign Up form submission
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signupError.textContent = '';
    signupSuccess.textContent = '';

    const nameValue = signupName.value.trim();
    const emailValue = signupEmail.value.trim();
    const passwordValue = signupPassword.value.trim();

    // Validate ASU email and password
    if (!emailValue.endsWith('@asu.edu')) {
      signupError.textContent = 'Invalid email. Must end with @asu.edu.';
      return;
    }
    if (passwordValue.length < 6) {
      signupError.textContent = 'Password must be at least 6 characters.';
      return;
    }
    // Check if user already exists
    const userExists = users.some(user => user.email === emailValue);
    if (userExists) {
      signupError.textContent = 'User already exists. Please log in.';
      return;
    }

    // Register user
    users.push({ name: nameValue, email: emailValue, password: passwordValue });
    signupSuccess.textContent = 'Sign up successful! Redirecting to dashboard...';

    // For demo, redirect to dashboard
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  });

  // Login form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();

    // Validate email and password
    if (!emailValue.endsWith('@asu.edu')) {
      loginError.textContent = 'Invalid email. Must end with @asu.edu.';
      return;
    }
    if (passwordValue.length < 6) {
      loginError.textContent = 'Password must be at least 6 characters.';
      return;
    }

    // Check user credentials
    const foundUser = users.find(user => user.email === emailValue && user.password === passwordValue);
    if (!foundUser) {
      loginError.textContent = 'Incorrect email or password.';
      return;
    }

    alert('Login successful! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
  });

  // Forgot Password Link: Show forgot password form
  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.classList.remove('active');
    forgotPasswordFormContainer.classList.add('active');
    forgotError.textContent = '';
    forgotSuccess.textContent = '';
  });

  // Close Forgot Password form
  closeForgotPassword.addEventListener('click', () => {
    forgotPasswordFormContainer.classList.remove('active');
    buttonContainer.style.display = 'block';
    forgotPasswordForm.reset();
  });

  // Forgot Password form submission
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    forgotError.textContent = '';
    forgotSuccess.textContent = '';

    const emailValue = forgotEmail.value.trim();

    if (!emailValue.endsWith('@asu.edu')) {
      forgotError.textContent = 'Invalid email. Must end with @asu.edu.';
      return;
    }

    // Check if user exists
    const foundUser = users.find(user => user.email === emailValue);
    if (!foundUser) {
      forgotError.textContent = 'No account found with this ASU email.';
      return;
    }

    // Simulate sending a reset link
    forgotSuccess.textContent = 'A password reset link has been sent to your email.';

    // In a real app, you'd integrate with your backend or Firebase to send an actual email
    // For now, we'll just reset the form
    setTimeout(() => {
      forgotPasswordForm.reset();
      forgotPasswordFormContainer.classList.remove('active');
      buttonContainer.style.display = 'block';
    }, 2000);
  });
});
