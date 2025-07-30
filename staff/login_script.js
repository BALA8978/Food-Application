// Signpost 1: This message will appear in the console if the script file is loaded correctly.
console.log("Login script loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    if (!loginForm) {
        // This error will appear if the form with id="loginForm" is not found in the HTML.
        console.error("Error: Could not find the login form with id 'loginForm'.");
        return;
    }

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        // Signpost 2: This message will appear when you click the login button.
        console.log("Login button clicked, attempting to fetch login.php...");

        const formData = new FormData(loginForm);

        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Check if the response is valid JSON before trying to parse it
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                // If not JSON, it's likely a PHP error. Log the raw text.
                return response.text().then(text => { 
                    throw new Error("Server did not return JSON. Response: " + text);
                });
            }
        })
        .then(data => {
            console.log("Received data from server:", data); // Log the data we got back
            message.textContent = data.message;
            if (data.status === 'success') {
                message.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            message.textContent = 'A critical error occurred. Please check the console.';
            message.style.color = 'red';
        });
    });
});
