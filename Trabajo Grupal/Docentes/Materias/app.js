
let materiaCounter = 0;
let materiaEditIndex = null;

function limpiarFormulario() {
    document.getElementById('materiaForm').reset();
}
function cargarSelects() {
    const docenteSelect = document.getElementById('docente');
    const carreraSelect = document.getElementById('carrera');

// cargar las opciones de docentes 
    const docentes = [
        { id: 1, nombre: 'Osvaldo Micniuk' },
        { id: 2, nombre: 'María González' },
        { id: 3, nombre: 'Carlos Martínez' }
];

    const carreras = [
        { id: 1, nombre: 'Analisis de Sistemas' },
        { id: 2, nombre: 'Arquitectura' },
        { id: 3, nombre: 'Diseño Grafico' }
];

    docentes.forEach(docente => {
        const option = document.createElement('option');
        option.value = docente.id;
        option.textContent = docente.nombre;
        docenteSelect.appendChild(option);
});

    carreras.forEach(carrera => {
        const option = document.createElement('option');
        option.value = carrera.id;
        option.textContent = carrera.nombre;
        carreraSelect.appendChild(option);
});
}

function cargarMateriasDesdeLocalStorage() {
    const materiasString = localStorage.getItem('materias');
    if (materiasString) {
    const materias = JSON.parse(materiasString);
    materias.forEach(materia => {
    const row = createMateriaRow(materia);
    materiaBody.appendChild(row);
    materiaCounter++; 
    });
    actualizarNumerosID(); 
    }
}
// guardar las materias en Local Storage
function guardarMateriaEnLocalStorage(materia) {
const materiasString = localStorage.getItem('materias');
const materias = materiasString ? JSON.parse(materiasString) : [];
materias.push(materia);
localStorage.setItem('materias', JSON.stringify(materias));
}

function eliminarMateriaDeLocalStorage(id) {
const materiasString = localStorage.getItem('materias');
    if (materiasString) {
    let materias = JSON.parse(materiasString);
    materias = materias.filter(materia => materia.id !== id);
    localStorage.setItem('materias', JSON.stringify(materias));
    }
}

function agregarMateria(event) {
event.preventDefault();
const nombre = document.getElementById('nombre').value;
const codigo = document.getElementById('codigo').value;
const año = document.getElementById('año').value;
const docente = document.getElementById('docente').value; 
const carrera = document.getElementById('carrera').value; 

if (materiaEditIndex !== null) {
    const materiaBody = document.getElementById('materiaBody');
    const row = materiaBody.querySelectorAll('.materia-row')[materiaEditIndex];
    const materiaId = parseInt(row.dataset.materiaId);
    row.cells[1].textContent = nombre;
    row.cells[2].textContent = codigo;
    row.cells[3].textContent = año;
    row.cells[4].textContent = obtenerNombreDocente(docente);
    row.cells[5].textContent = obtenerNombreCarrera(carrera);
    const materia = {
        id: materiaId,
        nombre,
        codigo,
        año,
        docente, 
        carrera 
        };
        guardarMateriaEnLocalStorage(materia);
        materiaEditIndex = null;
    } else {
// Agregar nueva materia
        const nuevaMateria = {
        id: ++materiaCounter, 
        nombre,
        codigo,
        año,
        docente, 
        carrera 
        };
        const materiaBody = document.getElementById('materiaBody');
        const row = createMateriaRow(nuevaMateria);
        materiaBody.appendChild(row);
        guardarMateriaEnLocalStorage(nuevaMateria);
    }
    limpiarFormulario();
}

function eliminarMateria(button) {
    const row = button.closest('tr');
    if (row) {
    const materiaId = parseInt(row.dataset.materiaId);
    eliminarMateriaDeLocalStorage(materiaId);
    row.remove();
    actualizarNumerosID();
    }
}
function actualizarNumerosID() {
const materiasRows = document.querySelectorAll('.materia-row');
materiasRows.forEach((row, index) => {
    row.cells[0].textContent = index + 1;
    row.dataset.materiaId = index + 1;
    });
}

function editarMateria(button) {
    const row = button.closest('tr');
    if (row) {
        const index = Array.from(row.parentElement.children).indexOf(row);
        const cells = row.getElementsByTagName('td');
        document.getElementById('nombre').value = cells[1].textContent;
        document.getElementById('codigo').value = cells[2].textContent;
        document.getElementById('año').value = cells[3].textContent;
// Selecciona el docente y la carrera 
        const docenteNombre = cells[4].textContent;
        const carreraNombre = cells[5].textContent;
        const docenteSelect = document.getElementById('docente');
        const carreraSelect = document.getElementById('carrera');
        for (let i = 0; i < docenteSelect.options.length; i++) {
            if (docenteSelect.options[i].textContent === docenteNombre) {
                docenteSelect.selectedIndex = i;
                break;
            }
        }
        for (let i = 0; i < carreraSelect.options.length; i++) {
            if (carreraSelect.options[i].textContent === carreraNombre) {
                carreraSelect.selectedIndex = i;
                break;
            }
        }
// Establece el índice de la materia 
    materiaEditIndex = index;
    } else {
    console.log("No se pudo encontrar la fila para editar");
    }
}

function obtenerNombreDocente(id) {
    const docentes = [
        { id: 1, nombre: 'Juan Pérez' },
        { id: 2, nombre: 'María González' },
        { id: 3, nombre: 'Carlos Martínez' }
    ];
    
    const docente = docentes.find(docente => docente.id === parseInt(id));
    return docente ? docente.nombre : '';
}

// obtener el nombre de la carrera según su ID
function obtenerNombreCarrera(id) {
    const carreras = [
        { id: 1, nombre: 'Analisis de sistemas' },
        { id: 2, nombre: 'Arquitectura' },
        { id: 3, nombre: 'Diseño Grafico' }
    ];
    
    const carrera = carreras.find(carrera => carrera.id === parseInt(id));
    return carrera ? carrera.nombre : '';
}
function createMateriaRow(materia) {
    const row = document.createElement('tr');
    row.classList.add('materia-row');
    row.dataset.materiaId = materia.id;
    row.innerHTML = `
    <td>${materia.id}</td>
    <td>${materia.nombre || ''}</td>
    <td>${materia.codigo || ''}</td>
    <td>${materia.año || ''}</td>
    <td>${obtenerNombreDocente(materia.docente) || ''}</td>
    <td>${obtenerNombreCarrera(materia.carrera) || ''}</td>
    <td>
    <button class="btn btn-primary btn-sm mr-2" onclick="editarMateria(this)">Editar</button>
    <button class="btn btn-danger btn-sm" onclick="eliminarMateria(this)">Eliminar</button>
    </td>
    `;
    return row;
}

// Inicializacion al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarSelects();
    cargarMateriasDesdeLocalStorage();

    const materiaForm = document.getElementById('materiaForm');
    materiaForm.addEventListener('submit', agregarMateria);
});
