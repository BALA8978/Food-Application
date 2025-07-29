<<<<<<< HEAD
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
=======
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
>>>>>>> 8007feeb23d2f7c335a62c5e5f43dca49723e3b1
    message.style.color = "red";
    return;
  }

<<<<<<< HEAD
  // Phone number validation (10 digits)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    message.textContent = "Phone number must be exactly 10 digits.";
=======
  if (!phoneRegex.test(phone)) {
    message.textContent = "Phone number must be 10 digits.";
    message.style.color = "red";
    return;
  }

  if (!passwordRegex.test(password)) {
    message.textContent = "Password must be 8+ chars with 1 capital, 1 digit, 1 special char.";
>>>>>>> 8007feeb23d2f7c335a62c5e5f43dca49723e3b1
    message.style.color = "red";
    return;
  }

<<<<<<< HEAD
  // Password match check
=======
>>>>>>> 8007feeb23d2f7c335a62c5e5f43dca49723e3b1
  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.style.color = "red";
    return;
  }

<<<<<<< HEAD
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
=======
  message.textContent = "Registration Successful!";
  message.style.color = "green";

  // Optionally reset form after success
  // this.reset();
>>>>>>> 8007feeb23d2f7c335a62c5e5f43dca49723e3b1
});
