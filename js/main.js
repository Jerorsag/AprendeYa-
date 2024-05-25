// Variables
const nav = document.querySelector('#nav');
const enlaceNav = document.querySelector('ul');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar');
const carroCompras = document.querySelector('#icono-carro');

/* Comportamiento de la navbar, aparecer, desaparecer */

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

/* Al ser clickeado un enlace de la navbar; la navbar desaparece */

enlaceNav.addEventListener("click", () => {
    nav.classList.remove("visible");
})

/* Abrir cerrar carrito */

carroCompras.addEventListener("click", () => {
    carrito.classList.add("visible");
})

carroCompras.addEventListener("mouseenter", () => {
    carrito.classList.remove("visible");
})

/*===================================*/
/* Funcionamiento carro de compras */
/*===================================*/

// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const seccionCursos = document.querySelector('#seccion-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    seccionCursos.addEventListener("click", agregarCurso);

    // Elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso)

    // Muestra los cursos de local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el array 

        limpiarHTML(); // Eliminamos todo el html
    }) 
}

// Funciones 
function agregarCurso(e) {
    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito 
function eliminarCurso(e) { 
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id');

        // Elimina del array de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su html


    }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {

    // Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.descripcion-curso').textContent,
        precio: curso.querySelector('.precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if( existe ) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado 
            } else {
                return curso; // retorna todos los elementos no duplicados
            }
        })
        articulosCarrito = [...cursos];

    } else { // Agregamos el curso al carrito

        // Agrega elementos al array de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

// Muestra el carrito de compras en el HTML 
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();


    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( (curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>

            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });

        // Agregar el carrito de compras al storage
        sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody 
function limpiarHTML() {

    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

// console.log(carrito);
// console.log(enlaceNav);
// console.log(nav);
// console.log(abrir);
// console.log(cerrar);