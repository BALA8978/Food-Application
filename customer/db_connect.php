<?php
/*
 * This file handles the connection to the database.
 * It will be included by both the registration and login scripts.
*/

$servername = "localhost";
$username = "root";
$password = ""; // Your XAMPP password, usually empty by default.
$dbname = "gourmet_delight";

// Create the database connection object
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection for errors.
if ($conn->connect_error) {
    // This stops the script and shows the error, which is crucial for debugging.
    die("Database Connection Failed: " . $conn->connect_error);
}
?>
