<?php
// This file contains the database connection details.
// We will 'include' this file in our other PHP scripts.

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gourmet_delight";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // We use die() to stop the script and show an error if connection fails.
    // This helps in debugging.
    die("Connection failed: " . $conn->connect_error);
}
?>
