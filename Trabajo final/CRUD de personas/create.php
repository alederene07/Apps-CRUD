<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crud_personas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['doce_nombre'];
    $apellido = $_POST['doce_apellido'];
    $cumple = $_POST['per_cumple'];
    $mail = $_POST['per_mail'];
    $cel = $_POST['doce_cel'];

    $stmt = $conn->prepare("INSERT INTO personas (doce_nombre, doce_apellido, per_cumple, per_mail, doce_cel) VALUES (?, ?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("sssss", $nombre, $apellido, $cumple, $mail, $cel);
        if ($stmt->execute()) {
            echo "Nuevo registro creado con éxito";
        } else {
            echo "Error en la ejecución: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Error al preparar la consulta: " . $conn->error;
    }
}

$conn->close();
?>