<?php
$host = "localhost";
$usuario = "tu_usuario";
$clave = "tu_clave";
$baseDatos = "ajax_demo";


$conexion = new mysqli($host, $usuario, $clave, $baseDatos);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
