<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crud_personas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $nombre = $_POST['doce_nombre'];
    $apellido = $_POST['doce_apellido'];
    $cumple = $_POST['per_cumple'];
    $mail = $_POST['per_mail'];
    $cel = $_POST['doce_cel'];

    $stmt = $conn->prepare("UPDATE personas SET doce_nombre=?, doce_apellido=?, per_cumple=?, per_mail=?, doce_cel=? WHERE id=?");
    if ($stmt) {
        $stmt->bind_param("sssssi", $nombre, $apellido, $cumple, $mail, $cel, $id);
        if ($stmt->execute()) {
            echo "Registro actualizado con éxito";
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
