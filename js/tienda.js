// ========================================================
// 1. Catálogo de Productos y Clase (Definiciones Globales)
// ========================================================


class Cuadro {
    constructor(nombre, precio, stock, imagen, imagenHover) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.imagenHover = imagenHover;
    }
}

/* if (catalogoGuardado) {
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
} */

/* // Carga del carrito
const carritoGuardado = localStorage.getItem('carrito');
let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []; */

// ========================================================
// 2. Definición de Funciones (Definiciones Globales)
// ========================================================
let catalogoCubismo = [];
const carritoGuardado = localStorage.getItem('carrito');
let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

const cargarCatalogo = async () => {
    try {
        const response = await fetch('../json/cubismo.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        catalogoCubismo = data.map(c => new Cuadro(c.nombre, c.precio, c.stock, c.imagen, c.imagenHover));
        mostrarCuadrosEnDOM();
        mostrarCalculosFinales();

    } catch (error) {
        console.error("Error al cargar el catálogo:", error);
        const contenedor = document.querySelector('.galeria-tienda-grid');
        if (contenedor) {
            contenedor.innerHTML = "<p>Error al cargar productos. Intente más tarde.</p>";
        }
    }
};

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

    /* BOTON AGREGAR CARRITO */
        const botonAgregar = document.getElementById(`btn-agregar-${cuadro.nombre}`);
        botonAgregar.addEventListener('click', () => {
        agregarAlCarrito(cuadro);
        });
    });
};
/* FUNCIONES DEL CARRITO */
const agregarAlCarrito = (cuadro) => {
    const itemExistente = carrito.find(item => item.nombre === cuadro.nombre);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        const nuevoItem = { ...cuadro, cantidad: 1 };
        carrito.push(nuevoItem);
    }
    Toastify({
        text: `"${cuadro.nombre}" agregado al carrito.`,
        duration: 2000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarTotalCarrito();
};

const mostrarTotalCarrito = () => {
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const elTotalCarrito = document.querySelector('#total-carrito-valor');

    if (elTotalCarrito) {
    elTotalCarrito.innerText = `Total de tu selección: ${total.toFixed(2)} €`;
    }
    return total;
};

const limpiarCarrito = (mostrarNotificacion = true) => {
    carrito = []; 
    localStorage.removeItem('carrito'); 
    mostrarTotalCarrito(); 
    
    if (mostrarNotificacion) {
        Toastify({
            text: "Carrito limpiado.",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
            background: "#c0392b",
            }
        }).showToast();
    }
};

// ========================================================
// 3. Ejecución del Script y Manipulación del DOM
// ========================================================


document.addEventListener('DOMContentLoaded', () => {
    async function main() {
        await cargarCatalogo();
        mostrarTotalCarrito();
        configurarEventListeners();
    }
    main();
});


const configurarEventListeners = () => {

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

/* boton comprar */
    const botonComprar = document.querySelector('#btn-comprar');

// Eventos y Funcionalidades

  /* TARJETA PARA INGRESO DE USUARIO */
    const mostrarTarjetaOverlay = () => {
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
            localStorage.setItem('nombreUsuario', nombreIngresado);
            ocultarTarjetaOverlay(); 
        } else {
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

        const cuadroEncontrado = catalogoCubismo.find(cuadro => cuadro.nombre.toLowerCase() === terminoBusqueda);

        if (cuadroEncontrado) {
            if (parrafoResultado) parrafoResultado.innerText = `Encontrado: ${cuadroEncontrado.nombre} - ${cuadroEncontrado.precio.toFixed(2)} €`;
        } else {
            if (parrafoResultado) parrafoResultado.innerText = "Cuadro no encontrado.";
        }
        if (inputBusqueda) inputBusqueda.value = ""; 
    });

  /* BOTÓN LIMPIAR CARRITO */
    if (botonLimpiar) {
        botonLimpiar.addEventListener('click', limpiarCarrito);
    }   

/* NUEVO: BOTÓN COMPRAR */
    if (botonComprar) {
        botonComprar.addEventListener("click", () => {
            const total = mostrarTotalCarrito();
            
            if (total === 0) {
                Swal.fire({
                    title: '¡Carrito vacío!',
                    text: 'Agrega productos antes de comprar.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            const nombreUsuario = localStorage.getItem('nombreUsuario') || '';

            Swal.fire({
                title: 'Finalizar Compra',
                html: `
                    <p>Total a pagar: <strong>${total.toFixed(2)} €</strong></p>
                    <form id="checkout-form" style="text-align: left; margin-top: 20px;">
                        
                        <label for="swal-nombre" style="display: block; margin-bottom: 5px;">Nombre:</label>
                        <input id="swal-nombre" class="swal2-input" value="${nombreUsuario}" placeholder="Tu nombre">
                        
                        <label for="swal-apellido" style="display: block; margin-bottom: 5px; margin-top: 10px;">Apellido:</label>
                        <input id="swal-apellido" class="swal2-input" placeholder="Tu apellido">
                        
                        <label for="swal-email" style="display: block; margin-bottom: 5px; margin-top: 10px;">Correo Electrónico:</label>
                        <input id="swal-email" type="email" class="swal2-input" placeholder="tu@correo.com">
                    </form>
                `,
                icon: 'info',
                showCancelButton: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar y Pagar',
                cancelButtonText: 'Cancelar',
                focusConfirm: false,
                preConfirm: () => {
                    const nombre = document.getElementById('swal-nombre').value;
                    const apellido = document.getElementById('swal-apellido').value;
                    const email = document.getElementById('swal-email').value;

                    if (!nombre || !apellido || !email) {
                        Swal.showValidationMessage(`Por favor, completa todos los campos.`);
                        return false;
                    }
                    if (!email.includes('@')) {
                        Swal.showValidationMessage(`Ingresa un correo válido.`);
                        return false;
                    }
                    return { nombre: nombre, email: email };
                }
            }).then((result) => { 
                if (result.isConfirmed) {
                    const datosCliente = result.value;
                    limpiarCarrito(false);
                    Swal.fire(
                        '¡Gracias por tu compra, ${datosCliente.nombre}!',
                        'Tu pedido ha sido procesado. Recibirás la confirmación en ${datosCliente.email}.',
                        'success'
                    );
                }
            });
        });
    }

  /* CAMBIO DE ESTILO DE TITULO TIENDA */
    if (tituloTienda) {
        tituloTienda.style.textShadow = '0px 0px 3px black';
    }
};