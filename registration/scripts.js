function signInWithGoogle() {
  alert("Google sign-in is a placeholder. Integrate with Firebase or OAuth.");
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const role = document.getElementById('role').value.trim();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const message = document.getElementById('message');

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneRegex = /^\d{10}$/;

  if (!role || !name || !email || !phone || !password || !confirmPassword) {
    message.textContent = "Please fill all fields.";
    message.style.color = "red";
    return;
  }

  if (!phoneRegex.test(phone)) {
    message.textContent = "Phone number must be 10 digits.";
    message.style.color = "red";
    return;
  }

  if (!passwordRegex.test(password)) {
    message.textContent = "Password must be 8+ chars with 1 capital, 1 digit, 1 special char.";
    message.style.color = "red";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.style.color = "red";
    return;
  }

  message.textContent = "Registration Successful!";
  message.style.color = "green";

  // Optionally reset form after success
  // this.reset();
});
