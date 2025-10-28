// ========================================================
// 1. Catálogo de Productos y Clase (Definiciones Globales)
// ========================================================

const catalogoGuardado = localStorage.getItem('catalogoCubismo');
let catalogoCubismo;

class Cuadro {
    constructor(nombre, precio, stock, imagen, imagenHover) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.imagenHover = imagenHover;
    }
}

if (catalogoGuardado) {
    catalogoCubismo = JSON.parse(catalogoGuardado);
} else {
    catalogoCubismo = [
        new Cuadro("La Amistad", 25.00, true, "../imagenes/Cubismo/imagen1_1.png", "../imagenes/Cubismo/imagen1_2.png"),
        new Cuadro("El Sueño", 30.00, true, "../imagenes/Cubismo/imagen2_1.png", "../imagenes/Cubismo/imagen2_2.png"),
        new Cuadro("Las Señoritas de Avignon", 28.00, true, "../imagenes/Cubismo/imagen3_1.png", "../imagenes/Cubismo/imagen3_2.png"),
        new Cuadro("Mujer con Peras", 35.00, false, "../imagenes/Cubismo/imagen4_1.png", "../imagenes/Cubismo/imagen4_2.png"),
        new Cuadro("La Lección", 40.00, true, "../imagenes/Cubismo/imagen6_1.png", "../imagenes/Cubismo/imagen6_2.png")
    ];
    localStorage.setItem('catalogoCubismo', JSON.stringify(catalogoCubismo));
}

// Carga del carrito
const carritoGuardado = localStorage.getItem('carrito');
let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// ========================================================
// 2. Definición de Funciones (Definiciones Globales)
// ========================================================

const obtenerNombreDeCuadros = () => {
    return catalogoCubismo.map(cuadro => cuadro.nombre);
}

const obtenerCuadrosEnStock = () => {
    return catalogoCubismo.filter(cuadro => 
    cuadro.stock === true && 
    cuadro.imagen && 
    cuadro.imagenHover
    );
}

const mostrarCalculosFinales = () => {
    const valorTotalStock = catalogoCubismo.reduce((acumulador, cuadro) => {
    if (cuadro.stock) {
        return acumulador + cuadro.precio;
    } else {
        return acumulador;
    }
    }, 0);
    const elTotalStock = document.querySelector('#total-stock-valor');
    if (elTotalStock) {
    elTotalStock.innerText = `Valor total de productos en stock: ${valorTotalStock.toFixed(2)} €`;
    }
};

const mostrarCuadrosEnDOM = () => {
    const cuadrosEnVenta = obtenerCuadrosEnStock(); 
    const contenedor = document.querySelector('.galeria-tienda-grid');
    if (!contenedor) {
    console.error("No se encontró el contenedor .galeria-tienda-grid");
    return; 
    }
    contenedor.innerHTML = ""; 

    cuadrosEnVenta.forEach(cuadro => {
    const divCuadro = document.createElement('article');
    divCuadro.className = 'producto-card'; 
    
    // HTML para la tarjeta del producto
    divCuadro.innerHTML = `
    <div class="card-imagen-container">
        <img src="${cuadro.imagen}" alt="${cuadro.nombre}" class="producto-imagen">
        <img src="${cuadro.imagenHover}" alt="${cuadro.nombre} en un living" class="producto-imagen hover-imagen">
    </div>
    <div class="card-info">
        <h3 class="producto-nombre">${cuadro.nombre}</h3>
        <p class="producto-precio">${cuadro.precio.toFixed(2)} €</p>
        <button class="btn-agregar" id="btn-agregar-${cuadro.nombre}">Agregar al Carrito</button>
    </div>
    `;
    
    contenedor.appendChild(divCuadro);

    // botón Agregar al Carrito
    const botonAgregar = document.getElementById(`btn-agregar-${cuadro.nombre}`);
    botonAgregar.addEventListener('click', () => {
    agregarAlCarrito(cuadro);
    });
  });
};

const agregarAlCarrito = (cuadro) => {
    carrito.push(cuadro);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log("Cuadro agregado:", cuadro.nombre);
    mostrarTotalCarrito(); 
};

const mostrarTotalCarrito = () => {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const elTotalCarrito = document.querySelector('#total-carrito-valor');

    if (elTotalCarrito) {
    elTotalCarrito.innerText = `Total de tu selección: ${total.toFixed(2)} €`;
    }
};

const limpiarCarrito = () => {
    carrito = []; 
    localStorage.removeItem('carrito'); 
    mostrarTotalCarrito(); 
    console.log("Carrito limpiado.");
};


// ========================================================
// 3. Ejecución del Script y Manipulación del DOM
// ========================================================

// Envolvemos todo el código de ejecución en 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', () => {

  // Seleccion de elementos del DOM


  // Tarjeta de Ingreso
const iconoUsuario = document.querySelector('#icono-usuario');
const tarjetaIngreso = document.querySelector('#tarjeta-ingreso');
const overlay = document.querySelector('#overlay');
const botonCerrarInput = document.querySelector('#botonCerrarTarjetaInput');
const inputNombre = document.querySelector('#nombreInputTarjeta');
const botonEnviar = document.querySelector('#botonEnviarNombre');
const parrafoMensajeTarjeta = document.querySelector('#tarjeta-mensaje'); 

// Buscador
const inputBusqueda = document.querySelector('#inputBusquedaNombre');
const botonBuscar = document.querySelector('#botonBuscarNombre');
const parrafoResultado = document.querySelector('#resultado-busqueda');

// cambio de titulo tienda y boton limpiar carrito
const tituloTienda = document.querySelector(".titulo-tienda");
const botonLimpiar = document.querySelector('#btn-limpiar-carrito');

// Eventos y Funcionalidades

  /* TARJETA PARA INGRESO DE USUARIO */
const mostrarTarjetaOverlay = () => {
    console.log("Mostrando tarjeta y fondo difuminado");
    inputNombre.value = ""; 
    inputNombre.style.border = '';
    if (parrafoMensajeTarjeta) {
    parrafoMensajeTarjeta.innerText = "Ingresa tu nombre para una experiencia personalizada."; 
    parrafoMensajeTarjeta.style.color = 'black'; 
    }
    if(tarjetaIngreso) tarjetaIngreso.style.display = 'block';
    if(overlay) overlay.style.display = 'block';
};

const ocultarTarjetaOverlay = () => {
    console.log("Ocultando tarjeta y fondo difuminado");
    if(tarjetaIngreso) tarjetaIngreso.style.display = 'none';
    if(overlay) overlay.style.display = 'none';
};

if (iconoUsuario) iconoUsuario.addEventListener("click", mostrarTarjetaOverlay);
if (botonCerrarInput) botonCerrarInput.addEventListener("click", ocultarTarjetaOverlay);

if (botonEnviar) botonEnviar.addEventListener("click", () => {
    const nombreIngresado = inputNombre.value.trim();
    inputNombre.style.border = ''; 
    if(parrafoMensajeTarjeta) parrafoMensajeTarjeta.style.color = '';

    if (nombreIngresado !== "") { 
        console.log(`Nombre ingresado: ${nombreIngresado}`);
        localStorage.setItem('nombreUsuario', nombreIngresado);
        console.log(`Nombre "${nombreIngresado}" guardado en localStorage.`);
        ocultarTarjetaOverlay(); 
    } else {
        console.warn("Intento de envío con nombre vacío.");
        if (parrafoMensajeTarjeta) {
            parrafoMensajeTarjeta.innerText = "Por favor, ingresa un nombre válido.";
            parrafoMensajeTarjeta.style.color = 'red'; 
        }
    inputNombre.style.border = '2px solid red'; 
    }
});

/* BUSCADOR DE NOMBRES DE CUADROS */
if (botonBuscar) botonBuscar.addEventListener('click', () => {
    const terminoBusqueda = inputBusqueda.value.trim().toLowerCase(); 
    if (parrafoResultado) parrafoResultado.innerText = "";

    if (terminoBusqueda === "") {
        if (parrafoResultado) parrafoResultado.innerText = "Por favor, ingresa un nombre para buscar.";
        if (inputBusqueda) inputBusqueda.style.border = '1px solid red'; 
        return; 
    } else {
        if (inputBusqueda) inputBusqueda.style.border = ''; 
    }

    console.log(`Buscando cuadro: "${terminoBusqueda}"`);
    const cuadroEncontrado = catalogoCubismo.find(cuadro => cuadro.nombre.toLowerCase() === terminoBusqueda);

    if (cuadroEncontrado) {
        if (parrafoResultado) parrafoResultado.innerText = `Encontrado: ${cuadroEncontrado.nombre} - ${cuadroEncontrado.precio.toFixed(2)} €`;
        console.log("Cuadro encontrado:", cuadroEncontrado);
    } else {
        if (parrafoResultado) parrafoResultado.innerText = "Cuadro no encontrado.";
        console.log("Cuadro no encontrado.");
    }
    if (inputBusqueda) inputBusqueda.value = ""; 
    });

  /* BOTÓN LIMPIAR CARRITO */
if (botonLimpiar) {
    botonLimpiar.addEventListener('click', limpiarCarrito);
}

  /* CAMBIO DE ESTILO DE TITULO TIENDA */
if (tituloTienda) {
    tituloTienda.style.textShadow = '0px 0px 3px black';
}

// Mostrar cuadros y cálculos al cargar la página
mostrarCuadrosEnDOM();
mostrarCalculosFinales();
mostrarTotalCarrito();
});