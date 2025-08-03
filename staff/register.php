<?php
// Include the database connection file
include 'db_connect.php';

// Set the header to return JSON
header('Content-Type: application/json');

// Create an array to hold the response
$response = array('status' => 'error', 'message' => 'An unknown error occurred.');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from the form
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $role = $_POST['role'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm'];

    // Regex for password: at least 8 chars, 1 uppercase, 1 digit, 1 special char (@, _, .)
    $password_pattern = '/^(?=.*[A-Z])(?=.*\d)(?=.*[@_.]).{8,}$/';

    // --- Server-Side Validation ---
    if (empty($full_name) || empty($email) || empty($phone_number) || empty($role) || empty($password)) {
        $response['message'] = 'Please fill in all required fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email format.';
    } elseif (!preg_match($password_pattern, $password)) {
        $response['message'] = 'Password must be at least 8 characters, with 1 uppercase, 1 digit, and 1 special character (@, _, .).';
    } elseif ($password !== $confirm_password) {
        $response['message'] = 'Passwords do not match.';
    } else {
        // --- Check if email already exists ---
        $stmt_check_email = $conn->prepare("SELECT id FROM staff WHERE email = ?");
        $stmt_check_email->bind_param("s", $email);
        $stmt_check_email->execute();
        $stmt_check_email->store_result();

        // --- Check if phone number already exists ---
        $stmt_check_phone = $conn->prepare("SELECT id FROM staff WHERE phone_number = ?");
        $stmt_check_phone->bind_param("s", $phone_number);
        $stmt_check_phone->execute();
        $stmt_check_phone->store_result();

        if ($stmt_check_email->num_rows > 0) {
            $response['message'] = 'An account with this email already exists.';
        } elseif ($stmt_check_phone->num_rows > 0) {
            $response['message'] = 'This phone number is already registered.';
        } else {
            // --- Hash the password for security ---
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            // --- Prepare and bind the SQL statement to prevent SQL injection ---
            $stmt = $conn->prepare("INSERT INTO staff (full_name, email, phone_number, role, password_hash) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $full_name, $email, $phone_number, $role, $password_hash);

            // --- Execute the statement and check for success ---
            if ($stmt->execute()) {
                $response['status'] = 'success';
                $response['message'] = 'Registration successful! You can now log in.';
            } else {
                $response['message'] = 'Error during registration: ' . $stmt->error;
            }

            // Close the statement
            $stmt->close();
        }
        
        // Close the checking statements
        $stmt_check_email->close();
        $stmt_check_phone->close();
    }
} else {
    $response['message'] = 'Invalid request method.';
}

// Close the database connection
$conn->close();

// --- Echo the JSON response ---
echo json_encode($response);
?>