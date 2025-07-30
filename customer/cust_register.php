<?php
include 'db_connect.php';

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => 'An unknown error occurred.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $phone_number = trim($_POST['phone_number']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Server-Side Validation
    if (empty($full_name) || empty($email) || empty($phone_number) || empty($password)) {
        $response['message'] = 'Please fill in all required fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'The email address is not in a valid format.';
    } elseif (strlen($password) < 8) {
        $response['message'] = 'Password must be at least 8 characters long.';
    } elseif ($password !== $confirm_password) {
        $response['message'] = 'The passwords do not match.';
    } else {
        // Check if email already exists
        $stmt_check = $conn->prepare("SELECT id FROM customers WHERE email = ?");
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            $response['message'] = 'An account with this email already exists.';
        } else {
            // Securely hash the password
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            // Prepare the SQL to prevent SQL injection
            $stmt = $conn->prepare("INSERT INTO customers (full_name, email, phone_number, password_hash) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $full_name, $email, $phone_number, $password_hash);

            if ($stmt->execute()) {
                $response['status'] = 'success';
                $response['message'] = 'Account created successfully! You can now sign in.';
            } else {
                $response['message'] = 'Database error: Could not register the account.';
            }
            $stmt->close();
        }
        $stmt_check->close();
    }
} else {
    $response['message'] = 'Invalid request method.';
}

$conn->close();
echo json_encode($response);
?>
