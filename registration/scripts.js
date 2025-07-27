document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  // Basic validations
  if (!name || !email || !phone || !password || !confirmPassword) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  // Phone number validation (10 digits)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    message.textContent = "Phone number must be exactly 10 digits.";
    message.style.color = "red";
    return;
  }

  // Password match check
  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.style.color = "red";
    return;
  }

  // Password complexity check (optional, but useful)
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(password)) {
    message.textContent = "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
    message.style.color = "red";
    return;
  }

  // If all validations pass
  message.textContent = "Registration successful!";
  message.style.color = "green";

  // Optional: Clear form fields
  document.getElementById("registerForm").reset();
});
