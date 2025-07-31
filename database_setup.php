<?php


// --- Connection Details ---
$servername = "localhost";
$username = "root";
$password = ""; // Your XAMPP password, usually empty by default.
$dbname = "gourmet_delight";

// --- 1. Create Connection to MySQL Server ---
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection to MySQL server failed: " . $conn->connect_error);
}
echo "Successfully connected to MySQL server.<br>";

// --- 2. Create Database if it doesn't exist ---
$sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql_create_db) === TRUE) {
    echo "Database '$dbname' created or already exists.<br>";
} else {
    die("Error creating database: " . $conn->error);
}

// --- 3. Select the database for use ---
$conn->select_db($dbname);

// --- 4. SQL to create the 'staff' table ---
$sql_create_staff_table = "
CREATE TABLE IF NOT EXISTS staff (
  id INT(11) NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  role VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (email)
)";

if ($conn->query($sql_create_staff_table) === TRUE) {
    echo "Table 'staff' created or already exists.<br>";
} else {
    echo "Error creating table 'staff': " . $conn->error . "<br>";
}

// --- 5. SQL to create the 'customers' table ---
$sql_create_customers_table = "
CREATE TABLE IF NOT EXISTS customers (
  id INT(11) NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (email)
)";

if ($conn->query($sql_create_customers_table) === TRUE) {
    echo "Table 'customers' created or already exists.<br>";
} else {
    echo "Error creating table 'customers': " . $conn->error . "<br>";
}

echo "<hr><strong>Database setup is complete!</strong>";

// Close the connection
$conn->close();
?>
