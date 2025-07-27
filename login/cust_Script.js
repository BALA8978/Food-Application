document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("loginMessage");

  const validEmail = "user@example.com"; // Replace with real check if needed
  const validPassword = "Test@1234";

  // Check for empty fields
  if (!email || !password) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  // Check credentials
  if (email === validEmail && password === validPassword) {
    message.textContent = "Login successful!";
    message.style.color = "green";
    // Optionally redirect to another page:
    // window.location.href = "dashboard.html";
  } else {
    message.textContent = "Incorrect email or password.";
    message.style.color = "red";
  }
});
