Nikhila04
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
=======
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
main
