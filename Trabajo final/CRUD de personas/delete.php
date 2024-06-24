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
    $id = $_POST['id'];

    $stmt = $conn->prepare("DELETE FROM personas WHERE id=?");
    if ($stmt) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo "Registro eliminado con éxito";
            
            // Actualizar IDs consecutivos
            $conn->query("SET @count = 0;");
            $conn->query("UPDATE personas SET id = @count:= @count + 1;");
            $conn->query("ALTER TABLE personas AUTO_INCREMENT = 1;");
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