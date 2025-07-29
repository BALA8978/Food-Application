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
// If an error occurs, the script will stop and show the error message.
// This is crucial for debugging.
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>
