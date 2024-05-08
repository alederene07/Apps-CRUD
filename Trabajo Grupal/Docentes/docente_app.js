
let docenteCounter = 0;
let docenteEditIndex = null;

// limpiar el formulario despues de agregar
function limpiarFormulario() {
document.getElementById('docenteForm').reset();
}

function cargarDocentes() {
}

function createDocenteRow(docente) {
const row = document.createElement('tr');
row.classList.add('docente-row');
row.dataset.docenteId = ++docenteCounter;
row.innerHTML = `
    <td>${docenteCounter}</td>
    <td>${docente.apellido || ''}</td>
    <td>${docente.nombre || ''}</td>
    <td>${docente.mail || ''}</td>
    <td>${docente.cumple || ''}</td>
    <td>${docente.celular || ''}</td>
    <td>
    <button class="btn btn-primary btn-sm mr-2" onclick="editarDocente(${docenteCounter - 1})">Editar</button>
    <button class="btn btn-danger btn-sm" onclick="eliminarDocente(${docenteCounter})">Eliminar</button>
    </td>
    `;
    return row;
}

function editarDocente(index) {
const docenteRows = document.querySelectorAll('.docente-row');
const row = docenteRows[index];
const cells = row.getElementsByTagName('td');
document.getElementById('apellido').value = cells[1].textContent;
document.getElementById('nombre').value = cells[2].textContent;
document.getElementById('mail').value = cells[3].textContent;
document.getElementById('cumple').value = cells[4].textContent;
document.getElementById('celular').value = cells[5].textContent;
docenteEditIndex = index;
}

function eliminarDocente(id) {
const docenteBody = document.getElementById('docenteBody');
const row = docenteBody.querySelector(`tr[data-docente-id="${id}"]`);
if (row) {
        row.remove();
        const rows = docenteBody.querySelectorAll('.docente-row');
        rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
        });
        docenteCounter--;
        console.log("Docente eliminado con ID:", id);
    } else {
        console.log("No se pudo encontrar el docente con ID:", id);
}
}

function agregarDocente(event) {
event.preventDefault();
const apellido = document.getElementById('apellido').value;
const nombre = document.getElementById('nombre').value;
const mail = document.getElementById('mail').value;
const cumple = document.getElementById('cumple').value;
const celular = document.getElementById('celular').value;

    if (docenteEditIndex !== null) {
// Editar docente existente
        const docenteBody = document.getElementById('docenteBody');
        const row = docenteBody.querySelectorAll('.docente-row')[docenteEditIndex];
        row.cells[1].textContent = apellido;
        row.cells[2].textContent = nombre;
        row.cells[3].textContent = mail;
        row.cells[4].textContent = cumple;
        row.cells[5].textContent = celular;
        docenteEditIndex = null;
    } else {
// Agregar nuevo docente
        const nuevoDocente = {
            apellido,
            nombre,
            mail,
            cumple,
            celular
        };

        const docenteBody = document.getElementById('docenteBody');
        const row = createDocenteRow(nuevoDocente);
        docenteBody.appendChild(row);
    }
    limpiarFormulario();
}

document.addEventListener('DOMContentLoaded', function () {
    cargarDocentes();

    const docenteForm = document.getElementById('docenteForm');
    docenteForm.addEventListener('submit', agregarDocente);
});
