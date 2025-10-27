// ========================================================
// 1. Catálogo de Productos (Datos)
// ========================================================

const catalogoGuardado = localStorage.getItem('catalogoCubismo');
let catalogoCubismo;
class Cuadro {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

if (catalogoGuardado) {
    catalogoCubismo = JSON.parse(catalogoGuardado);
} else {
    catalogoCubismo = [
    new Cuadro("La Amistad", 25.00, true),
    new Cuadro("El Sueño", 30.00, true),
    new Cuadro("Las Señoritas de Avignon", 28.00, true),
    new Cuadro("Mujer con Peras", 35.00, false),
    new Cuadro("La Lección", 40.00, true)
    ];
    localStorage.setItem('catalogoCubismo', JSON.stringify(catalogoCubismo));
}
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

        cuadroEncontrado ? alert(`El precio de '${cuadroEncontrado.nombre}' es ${cuadroEncontrado.precio} €.`) : alert("No tenemos información sobre ese cuadro."); 
        
        seguirConsultando = confirm("¿Deseas consultar otro cuadro?");
    }
}

const mostrarCalculosFinales = () => {
    let valorTotalStock = 0;
    catalogoCubismo.forEach( (cuadro) => {
        if (cuadro.stock) {
            valorTotalStock += cuadro.precio;
        }
    });
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