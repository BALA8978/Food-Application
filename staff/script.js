document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  // Make sure the form exists before adding an event listener
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission

      // --- CLIENT-SIDE VALIDATION ---
      const phone = document.getElementById("phone_number").value.trim();
      const password = document.getElementById("password").value;
      const confirm = document.getElementById("confirm").value;

      message.innerText = "";
      message.style.color = "red";

      if (!/^\d{10}$/.test(phone)) {
        message.innerText = "Phone number must be exactly 10 digits.";
        return;
      }
      if (password.length < 8) {
        message.innerText = "Password must be at least 8 characters.";
        return;
      }
      if (password !== confirm) {
        message.innerText = "Passwords do not match.";
        return;
      }

      // --- SEND DATA TO SERVER (PHP) ---
      const formData = new FormData(form);

      // Fetch data to the correct PHP file
      fetch('cust_register.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Display the message from the server
        message.innerText = data.message;

        if (data.status === 'success') {
           message.innerText = 'Registered Successfully.';
          message.style.color = 'green';
          form.reset(); // Clear the form on success
        } else {
          message.style.color = 'red';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        message.innerText = 'A network or server error occurred. Please try again.';
        message.style.color = 'red';
      });
    });
  }
});
