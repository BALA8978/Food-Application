<?php
// Include the shared database connection file.
// Make sure 'db_connect.php' is in the same folder.
include 'db_connect.php';

// Set the header to tell the browser we are sending back JSON.
header('Content-Type: application/json');

// This array will hold our response to send back to the JavaScript.
$response = ['status' => 'error', 'message' => 'An unknown error occurred.'];

// Only run the code if the form was submitted using POST.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data from the form submission.
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $phone_number = trim($_POST['phone_number']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // --- Server-Side Validation ---
    if (empty($full_name) || empty($email) || empty($phone_number) || empty($password)) {
        $response['message'] = 'Please fill in all required fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'The email address is not in a valid format.';
    } elseif ($password !== $confirm_password) {
        $response['message'] = 'The passwords do not match.';
    } else {
        // --- Check if email already exists to prevent duplicates ---
        $stmt_check = $conn->prepare("SELECT id FROM customers WHERE email = ?");
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            $response['message'] = 'An account with this email already exists.';
        } else {
            // --- Securely hash the password before saving ---
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            // --- Prepare the SQL to prevent SQL injection attacks ---
            $stmt = $conn->prepare("INSERT INTO customers (full_name, email, phone_number, password_hash) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $full_name, $email, $phone_number, $password_hash);

            // --- Execute the query and set the response ---
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

// Close the database connection.
$conn->close();

// --- Send the response back to the JavaScript ---
echo json_encode($response);
?>
