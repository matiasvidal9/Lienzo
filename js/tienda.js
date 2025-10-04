// ========================================================
// 1. Catálogo de Productos (Datos)
// ========================================================
const catalogoCubismo = [
    { nombre: "La Amistad", precio: 25.00, stock: true },
    { nombre: "El Sueño", precio: 30.00, stock: true },
    { nombre: "Las Señoritas de Avignon", precio: 28.00, stock: true },
    { nombre: "Mujer con Peras", precio: 35.00, stock: false },
    { nombre: "La Lección", precio: 40.00, stock: true }
];

// ========================================================
// 2. Definición de Funciones
// ========================================================

const muestraMensajeDeBienvenida = () => {
    alert("Bienvenido a la tienda de Lienzo. Aquí encontrarás una selección de cuadros de arte cubista. ¡Disfruta tu visita!");
}

const calcularPrecioFinal = (precio, porcentajeDescuento) => precio - (precio * (porcentajeDescuento / 100));

const ingresoUsuario = () => {
    const nombreUsuario = prompt("Por favor, ingrese su nombre de usuario:");
    if (nombreUsuario && nombreUsuario !== "") {
        alert(`Hola ${nombreUsuario}, gracias por visitar nuestra tienda...`);
        const aceptaDescuento = confirm("¿Deseas aplicar un descuento del 10%?");
        if (aceptaDescuento) {
            const precioOfertado = calcularPrecioFinal(catalogoCubismo[0].precio, 10);
            alert(`¡Descuento aplicado! Por ejemplo, el cuadro "${catalogoCubismo[0].nombre}" te quedaría en ${precioOfertado.toFixed(2)} €.`);
        }
    } else {
        alert("Hola visitante. Gracias por visitar nuestra tienda...");
    }
}

const verificarPalabraClave = () => {
    let palabraClave;
    do {
        palabraClave = prompt("Ingresa la palabra clave 'arte' para acceder al catálogo especial:");
        if (palabraClave !== "arte" && palabraClave !== null) {
            alert("Palabra clave incorrecta.");
        }
    } while (palabraClave !== "arte" && palabraClave !== null);
    
    if (palabraClave === "arte") {
        alert("¡Palabra clave correcta!");
    }
}

const iniciarConsultorDePrecios = () => {
    let seguirConsultando = confirm("¿Deseas consultar el precio de algún cuadro?");
    while (seguirConsultando) {
        const cuadroConsultado = prompt("Escribe el nombre del cuadro que quieres consultar:");
        if (cuadroConsultado === null) break;

        const cuadroEncontrado = catalogoCubismo.find(cuadro => cuadro.nombre.toLowerCase() === cuadroConsultado.toLowerCase());

        if (cuadroEncontrado) { 
            alert(`El precio de '${cuadroEncontrado.nombre}' es ${cuadroEncontrado.precio} €.`);
        } else { 
            alert("No tenemos información sobre ese cuadro.");
        }
        seguirConsultando = confirm("¿Deseas consultar otro cuadro?");
    }
}

const mostrarCalculosFinales = () => {
    let valorTotalStock = 0;
    for (const cuadro of catalogoCubismo) {
        if (cuadro.stock) {
            valorTotalStock += cuadro.precio;
        }
    }
    console.log(`El valor total de los productos en stock es: ${valorTotalStock} €`);
}

// ========================================================
// 3. Ejecución del Script
// ========================================================

muestraMensajeDeBienvenida();
ingresoUsuario();
verificarPalabraClave();
iniciarConsultorDePrecios();
mostrarCalculosFinales();