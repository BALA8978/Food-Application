document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");
  const message = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const confirmVal = confirm.value.trim();

    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!phoneRegex.test(phoneVal)) {
      showMessage("❌ Phone number must be exactly 10 digits.", "red");
      return;
    }

    if (!passwordRegex.test(passwordVal)) {
      showMessage("❌ Password must be at least 8 characters long and include 1 uppercase letter, 1 digit, and 1 special character.", "red");
      return;
    }

    if (passwordVal !== confirmVal) {
      showMessage("❌ Passwords do not match.", "red");
      return;
    }

    showMessage("✅ Registration Successful!", "green");
    form.reset();
  });

  function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
    message.style.fontWeight = "bold";
    message.style.marginTop = "10px";
  }
});
