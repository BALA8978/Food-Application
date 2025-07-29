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
          // Optional: Redirect to a dashboard after a short delay
          setTimeout(() => {
            // window.location.href = 'customer_dashboard.html'; // Example redirect
          }, 1500);
        } else {
          message.style.color = 'red';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        message.textContent = 'A network error occurred.';
        message.style.color = 'red';
      });
    });
  }
});
