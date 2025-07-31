<?php
session_start();
include 'db_connect.php';

header('Content-Type: application/json');

$response = array('status' => 'error', 'message' => 'An unknown error occurred.');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $response['message'] = 'Please enter both email and password.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email format.';
    } else {
        // Prepare statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT id, full_name, password_hash FROM staff WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($id, $full_name, $password_hash);
            $stmt->fetch();

            // Verify the password
            if (password_verify($password, $password_hash)) {
                // Password is correct, start a session
                $_SESSION['loggedin'] = true;
                $_SESSION['id'] = $id;
                $_SESSION['name'] = $full_name;

                $response['status'] = 'success';
                $response['message'] = 'Login successful! Redirecting...';
            } else {
                // Incorrect password
                $response['message'] = 'Incorrect email or password.';
            }
        } else {
            // Incorrect email
            $response['message'] = 'Incorrect email or password.';
        }
        $stmt->close();
    }
} else {
    $response['message'] = 'Invalid request method.';
}

$conn->close();
echo json_encode($response);
?>
