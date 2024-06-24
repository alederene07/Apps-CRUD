<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crud_personas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM personas";
$result = $conn->query($sql);

$personas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $personas[] = $row;
    }
}

echo json_encode($personas);

$conn->close();
?>
