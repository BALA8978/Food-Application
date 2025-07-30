document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Stop the form from submitting the old way

      // Get form data for validation
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm_password").value;
      const phone = document.getElementById("phone_number").value.trim();
      
      message.textContent = ""; // Clear previous messages

      // Client-side validation
      if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        message.style.color = "red";
        return;
      }
      if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "red";
        return;
      }
       if (!/^\d{10}$/.test(phone)) {
        message.textContent = "Phone number must be exactly 10 digits.";
        message.style.color = "red";
        return;
      }

      const formData = new FormData(form);

      // Send data to the PHP backend
      fetch('cust_register.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        message.textContent = data.message; // Show message from server
        if (data.status === 'success') {
          message.style.color = 'green';
          form.reset(); // Clear the form
        } else {
          message.style.color = 'red';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        message.textContent = 'A network error occurred. Please try again.';
        message.style.color = 'red';
      });
    });
  }
});
