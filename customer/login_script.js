document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const formData = new FormData(loginForm);
      message.textContent = "";

      fetch('cust_login.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        message.textContent = data.message;
        if (data.status === 'success') {
          message.style.color = 'green';
          
          // This is the line that was commented out. It will now run.
          setTimeout(() => {
            window.location.href = 'customer_dashboard.html'; // Redirect to the dashboard
          }, 1500); // Wait 1.5 seconds before redirecting

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
