document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  // Reset message
  message.innerText = "";
  message.style.color = "red";

  // Validation checks
  if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    message.innerText = "Phone number must be exactly 10 digits.";
    return;
  }

  if (password !== confirmPassword) {
    message.innerText = "Passwords do not match.";
    return;
  }

  if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password) || password.length < 8) {
    message.innerText = "Password must be at least 8 characters and include an uppercase letter, a number, and a special character.";
    return;
  }

  // If all validations pass
  message.style.color = "green";
  message.innerText = "Registration successful!";

  // Optionally, you can clear the form
  document.getElementById("registerForm").reset();
});

function signInWithGoogle() {
  alert("Google Sign-In clicked (Integrate Firebase or OAuth here)");
}
