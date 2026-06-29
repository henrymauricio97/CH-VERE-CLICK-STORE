// ===============================
// CHÉVERE CLICK STORE POS
// ===============================

const app = document.getElementById("app");

let carrito = [];
let numeroPedido = 1;

//==============================
// PRODUCTOS
//==============================

const productos = [

{
id:1,
nombre:"Opción 1",
precio:1.50,
imagen:"Opcion1.jpg"
},

{
id:2,
nombre:"Opción 2",
precio:2.00,
imagen:"Opcion2.jpg"
}

];

//==============================
// INICIO
//==============================

mostrarInicio();

function mostrarInicio(){

app.innerHTML = `

<div class="inicio">

<div class="logoSuperior">

<img src="Logo.png"
class="logo">

</div>

<h1>🛒 CHÉVERE CLICK STORE</h1>

<h2>"Lo que está de moda, a un click"</h2>

<p>

Kiosco Digital

</p>

<button class="botonPrincipal"
onclick="mostrarCatalogo()">

COMENZAR COMPRA

</button>

</div>

`;

}

//==============================
// CATALOGO
//==============================

function mostrarCatalogo(){

let html = `

<div class="encabezado">

<div class="tituloTienda">

<img src="Logo.png"
class="logoMini">

<div>

<h1>CHÉVERE CLICK STORE</h1>

<p>

Lo que está de moda,
a un click

</p>

</div>

</div>

<button
class="carritoBoton"
onclick="mostrarCarrito()">

🛒 Carrito (${carrito.length})

</button>

</div>

<div class="catalogo">

`;

productos.forEach(producto=>{

html += `

<div class="card">

<img src="${producto.imagen}" alt="${producto.nombre}">

<h3>${producto.nombre}</h3>

<p>B/. ${producto.precio.toFixed(2)}</p>

<button
onclick="agregarProducto(${producto.id})">

Agregar

</button>

</div>

`;

});

html += `

</div>

`;

app.innerHTML = html;

}

//==============================
// AGREGAR PRODUCTO
//==============================

function agregarProducto(id){

const producto = productos.find(
p => p.id === id
);

carrito.push(producto);

mostrarCatalogo();

}

//==============================
// CARRITO
//==============================

function mostrarCarrito(){

let total = 0;

let html = `

<div class="carrito">

<h1>🛒 Mi Pedido</h1>

`;

if(carrito.length===0){

html += `

<p>No has agregado productos</p>

<br>

<button onclick="mostrarCatalogo()">

Volver

</button>

`;

app.innerHTML = html;

return;

}

carrito.forEach((producto,index)=>{

total += producto.precio;

html += `

<div class="productoCarrito">

<div>

<strong>

${producto.nombre}

</strong>

<br>

B/. ${producto.precio.toFixed(2)}

</div>

<button
onclick="eliminarProducto(${index})">

❌

</button>

</div>

`;

});

html += `

<br>

<h2>

Total:
B/. ${total.toFixed(2)}

</h2>

<br>

<label>

Nombre del cliente

</label>

<input
id="cliente"
type="text"
placeholder="Escribe tu nombre">

<button
onclick="finalizarCompra()">

Finalizar Compra

</button>

<br>

<button
onclick="mostrarCatalogo()">

Seguir Comprando

</button>

</div>

`;

app.innerHTML = html;

}

//==============================
// ELIMINAR PRODUCTO
//==============================

function eliminarProducto(index){

carrito.splice(index,1);

mostrarCarrito();

}

//==============================
// FINALIZAR COMPRA
//==============================

function finalizarCompra(){

const nombre = document
.getElementById("cliente")
.value.trim();

if(nombre===""){

alert("Ingrese su nombre");

return;

}

let total = 0;
let lista = "";

carrito.forEach(p=>{

total += p.precio;

lista += `

<li>

${p.nombre}

- B/. ${p.precio.toFixed(2)}

</li>

`;

});

app.innerHTML = `

<div class="pedidoFinal">

<h1>

✅ Pedido Confirmado

</h1>

<h2>

Pedido #${String(numeroPedido)
.padStart(3,"0")}

</h2>

<p>

Gracias <b>${nombre}</b>

</p>

<h3>

Productos

</h3>

<ul>

${lista}

</ul>

<h2>

Total:
B/. ${total.toFixed(2)}

</h2>

<p>

Dirígete a Caja para realizar el pago.

</p>

<button
onclick="nuevoPedido()">

Nuevo Pedido

</button>

</div>

`;

numeroPedido++;

carrito = [];

}

//==============================
// NUEVO PEDIDO
//==============================

function nuevoPedido(){

mostrarInicio();

}