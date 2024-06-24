Funcionalidad de la aplicacion
Paso 1
Configurar la Base de Datos
1.	Crear una nueva base de datos en MariaDB: sql
Copiar código
CREATE DATABASE crud_personas;
Paso 2
 Configurar la Conexión a la Base de Datos
•	Abre los archivos PHP (create.php, read.php, update.php, delete.php) y configura la conexión a la base de datos ajustando los parámetros de conexión .
Paso 3
Ejecutar la Aplicación
http://localhost/CRUD%20de%20personas/index.html
1.	Utiliza el formulario para agregar nuevas personas. Los registros se mostrarán en la tabla y podrás gestionarlos utilizando los botones de editar y eliminar.
Uso
Añadir Nueva Persona
1.	Completa el formulario de entrada con los datos de la persona.
2.	Haz clic en "Añadir Persona". La persona se añadirá a la base de datos y se mostrará en la tabla.
Editar Persona
1.	En la lista de personas, cada registro tiene un botón "Editar".
2.	Haz clic en "Editar" junto a la persona que deseas modificar.
3.	Aparecerán los datos de esa persona en el formulario. Cambia la información y haz clic en "Guardar Cambios"
Eliminar Persona
1.	Haz clic en el botón "Eliminar" junto a la persona que deseas eliminar.
2.	Confirma la eliminación para remover la persona de la base de datos.
Descripción de Archivos
create.php: Este archivo se encarga de añadir una nueva persona a la base de datos. Recibe la información desde el formulario y la guarda.
read.php: Este archivo lee la lista de personas desde la base de datos y envía los datos a la página para que se muestren.
update.php: Este archivo actualiza la información de una persona que ya está en la base de datos. Recibe la nueva información y la guarda.
delete.php: Este archivo borra una persona de la base de datos. Recibe el identificador de la persona que debe ser eliminada.
index.html: Esta es la página principal de la aplicación. Contiene el formulario para añadir personas y la tabla que muestra la lista.
script.js: Este archivo maneja la interacción con el servidor. Envía y recibe datos sin recargar la página.
database/database.sql: Este archivo configura la base de datos. Contiene la estructura y datos iniciales necesarios para que la aplicación funcione.
