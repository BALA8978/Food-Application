document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    const message = document.getElementById("message");

    // Helper function to display messages
    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
        message.style.fontWeight = "bold";
        message.style.marginTop = "10px";
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop default form submission

        // --- Your Existing Validation Logic ---
        const phoneVal = phone.value.trim();
        const passwordVal = password.value.trim();
        const confirmVal = confirm.value.trim();

        // Regex for validation
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
        
        // If all client-side checks pass, clear the message before sending to server
        showMessage("", "black");

//--- What's Being Added Starts Here ---

        // 1. Create FormData to send all form fields to the server easily.
        const formData = new FormData(form);
        
        // 2. Use the Fetch API to send data to your 'staff.php' script.
        fetch("staff.php", {
            method: "POST",
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                // Handle server errors like 500 Internal Server Error
                throw new Error('Network response was not ok.');
            }
            return response.text(); // Get the response from PHP as plain text
        })
        .then(data => {
            // 3. Display the ACTUAL response from the server.
            // This handles server-side errors like "Email already exists".
            if (data.includes("successful")) {
                showMessage("✅ " + data, "green");
                form.reset(); // Clear the form only on successful registration
            } else {
                showMessage("❌ " + data, "red");
            }
        })
        .catch(error => {
            // 4. Handle network errors (e.g., server is down).
            console.error("Fetch Error:", error);
            showMessage("❌ A network error occurred. Please try again.", "red");
        });
    });
});