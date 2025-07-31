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

    // --- Server-Side Validation ---
    if (empty($full_name) || empty($email) || empty($phone_number) || empty($role) || empty($password)) {
        $response['message'] = 'Please fill in all required fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email format.';
    } elseif (strlen($password) < 8) {
        $response['message'] = 'Password must be at least 8 characters long.';
    } elseif ($password !== $confirm_password) {
        $response['message'] = 'Passwords do not match.';
    } else {
        // --- Check if email already exists ---
        $stmt_check = $conn->prepare("SELECT id FROM staff WHERE email = ?");
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            $response['message'] = 'An account with this email already exists.';
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
        $stmt_check->close();
    }
} else {
    $response['message'] = 'Invalid request method.';
}

// Close the database connection
$conn->close();

// --- Echo the JSON response ---
echo json_encode($response);
?>
