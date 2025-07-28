Nikhila04
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
main
    message.style.color = "red";
    return;
  }

Nikhila04
  // Phone number validation (10 digits)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    message.textContent = "Phone number must be exactly 10 digits.";
  if (!phoneRegex.test(phone)) {
    message.textContent = "Phone number must be 10 digits.";
 main
    message.style.color = "red";
    return;
  }

 Nikhila04
  // Password match check
  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
  if (!passwordRegex.test(password)) {
    message.textContent = "Password must be 8+ chars with 1 capital, 1 digit, 1 special char.";
 main
    message.style.color = "red";
    return;
  }

 Nikhila04
  // Password complexity check (optional, but useful)
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(password)) {
    message.textContent = "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
 main
    message.style.color = "red";
    return;
  }

 Nikhila04
  // If all validations pass
  message.textContent = "Registration successful!";
  message.style.color = "green";

  // Optional: Clear form fields
  document.getElementById("registerForm").reset();
  message.textContent = "Registration Successful!";
  message.style.color = "green";

  // Optionally reset form after success
  // this.reset();
main
});
