<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Your database username
$password = "";     // Your database password
$dbname = "gourmet_delight_db";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve and sanitize form data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $role = mysqli_real_escape_string($conn, $_POST['role']);
    $pass = mysqli_real_escape_string($conn, $_POST['password']);
    $confirm_pass = mysqli_real_escape_string($conn, $_POST['confirm']);

    // --- Server-Side Validation ---

    // 1. Check for empty fields
    if (empty($name) || empty($email) || empty($phone) || empty($role) || empty($pass) || empty($confirm_pass)) {
        echo "Error: All fields are required.";
        exit;
    }

    // 2. Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Error: Invalid email format.";
        exit;
    }

    // 3. Check if passwords match
    if ($pass !== $confirm_pass) {
        echo "Error: Passwords do not match.";
        exit;
    }
    
    // 4. Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM staff WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Error: An account with this email already exists.";
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();


    // --- Process and Insert Data ---

    // Hash the password for security
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    // Prepare an SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO staff (full_name, email, phone, role, password_hash) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $role, $hashed_password);

    // Execute the statement and provide feedback
    if ($stmt->execute()) {
        echo "Registration successful! You can now log in.";
    } else {
        echo "Error: Could not register. " . $stmt->error;
    }

    // Close the statement and the connection
    $stmt->close();
    $conn->close();
} else {
    // If the form was not submitted via POST, redirect or show an error
    echo "Invalid request method.";
}
?>