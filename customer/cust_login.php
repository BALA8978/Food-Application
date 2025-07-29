<?php
// Start a session to store login state
session_start();

// Include the database connection
include 'db_connect.php';

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => 'Invalid request.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        $response['message'] = 'Please enter both email and password.';
    } else {
        // Prepare to fetch the user from the customers table
        $stmt = $conn->prepare("SELECT id, full_name, password_hash FROM customers WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $customer = $result->fetch_assoc();

            // Verify the password against the stored hash
            if (password_verify($password, $customer['password_hash'])) {
                // Password is correct, set session variables
                $_SESSION['customer_loggedin'] = true;
                $_SESSION['customer_id'] = $customer['id'];
                $_SESSION['customer_name'] = $customer['full_name'];

                $response['status'] = 'success';
                $response['message'] = 'Login successful! Redirecting...';
                // In a real app, you would redirect here using JavaScript
                // $response['redirect'] = 'customer_dashboard.html';

            } else {
                // Incorrect password
                $response['message'] = 'Incorrect email or password.';
            }
        } else {
            // No user found with that email
            $response['message'] = 'Incorrect email or password.';
        }
        $stmt->close();
    }
}

$conn->close();
echo json_encode($response);
?>
