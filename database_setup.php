<?php

// --- Step 1: Database Connection Variables ---
$servername = "localhost";      // Your server IP/domain, usually "localhost"
$username = "root";             // Your MySQL username
$password = "";                 // Your MySQL password
$dbname = "gourmet_delight";    // Your specified database name

// --- Step 2: Create a connection to the MySQL server ---
$conn = new mysqli($servername, $username, $password);

// Check the connection for errors
if ($conn->connect_error) {
    // If there's an error, stop the script and display the error message.
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected to MySQL server successfully.<br>";

// --- Step 3: Create the Database if it doesn't exist ---
$sql_create_db = "CREATE DATABASE IF NOT EXISTS `$dbname`";
if ($conn->query($sql_create_db) === TRUE) {
    echo "Database '$dbname' created successfully or already exists.<br>";
} else {
    // If there's an error creating the database, stop the script.
    die("Error creating database: " . $conn->error);
}

// --- Step 4: Select the new database for use ---
$conn->select_db($dbname);

// --- Step 5: Define the SQL query to create the 'staff' table ---
// This table is based on your requirements: full name, email, phone, role, and password.
$sql_create_table1 = "
CREATE TABLE IF NOT EXISTS `staff` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone_number` VARCHAR(20) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL, -- For storing the secure, hashed password
    `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
// --- Step 6: Execute the query to create the table ---
if ($conn->query($sql_create_table1) === TRUE) {
    echo "Table 'staff' created successfully or already exists.<br>";
} else {
    // If there's an error creating the table, show the error.
    echo "Error creating table: " . $conn->error . "<br>";
}

$sql_create_table2 = "
CREATE TABLE IF NOT EXISTS `customer` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone_number` VARCHAR(20) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL, -- For storing the secure, hashed password
    `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";



// --- Step 6: Execute the query to create the table ---
if ($conn->query($sql_create_table2) === TRUE) {
    echo "Table 'staff' created successfully or already exists.<br>";
} else {
    // If there's an error creating the table, show the error.
    echo "Error creating table: " . $conn->error . "<br>";
}

// --- Step 7: Close the database connection ---
$conn->close();

echo "<hr><strong>Database setup is complete!</strong>";

?>
