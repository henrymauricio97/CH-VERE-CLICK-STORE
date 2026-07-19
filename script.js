// =====================================
// CHÉVERE CLICK STORE V3
// MÓDULO 1 - PARTE 1
// =====================================
//==============================
// ELEMENTOS HTML
//==============================
const catalogo = document.getElementById("catalogo");
const buscar = document.getElementById("buscar");
const contador = document.getElementById("contador");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const btnCarrito = document.getElementById("btnCarrito");
const carritoFlotante = document.getElementById("carritoFlotante");
const panelCarrito = document.getElementById("panelCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const fondoOscuro = document.getElementById("fondoOscuro");
const cerrarPanel = document.getElementById("cerrarPanel");
const toast = document.getElementById("toast");
const botonesCategorias = document.querySelectorAll(".categoria");
const continuarCompra = document.getElementById("continuarCompra");
const nombreCliente = document.getElementById("nombreCliente");
const pantallaConfirmacion = document.getElementById("pantallaConfirmacion");
const numeroPedidoTicket = document.getElementById("numeroPedidoTicket");
const clienteTicket = document.getElementById("clienteTicket");
const detalleTicket = document.getElementById("detalleTicket");
const totalTicket = document.getElementById("totalTicket");
const nuevoPedido = document.getElementById("nuevoPedido");
//==============================
// BASE DE PRODUCTOS
//==============================
const productos = [
{
id:1,
nombre:"Opción 1",
precio:1.50,
categoria:"Snacks",
imagen:"opcion1.jpg"
},
{
id:2,
nombre:"Opción 2",
precio:2.00,
categoria:"Snacks",
imagen:"opcion2.jpg"
},
{
id:3,
nombre:"Opción 3",
precio:1.25,
categoria:"Bebidas",
imagen:"opcion3.jpg"
},
{
id:4,
nombre:"Opción 4",
precio:3.00,
categoria:"Accesorios",
imagen:"opcion4.jpg"
},
{
id:5,
nombre:"Opción 5",
precio:2.75,
categoria:"Accesorios",
imagen:"opcion5.jpg"
},
{
id:6,
nombre:"Opción 6",
precio:1.75,
categoria:"Snacks",
imagen:"opcion6.jpg"
}
];
//==============================
// VARIABLES
//==============================
let carrito = [];
let categoriaActual = "Todos";
let numeroPedido = 1;
const URL_SCRIPT="https://script.google.com/macros/s/AKfycbwcZbejf0qGltw5us190hTeTTuolu7Q4YsKFL3U916k83IQJMgbLiM6vZFJnnlTG6Zr/exec";
//==============================
// MOSTRAR PRODUCTOS
//==============================
function mostrarProductos(lista){
catalogo.innerHTML="";
lista.forEach(producto=>{
catalogo.innerHTML += `
<div class="card">
<img src="${producto.imagen}" alt="${producto.nombre}">
<div class="cardInfo">
<h3>${producto.nombre}</h3>
<div class="precio">
B/. ${producto.precio.toFixed(2)}
</div>
<button onclick="agregarProducto(${producto.id})">
🛒 Agregar
</button>
</div>
</div>
`;
});
}
//==============================
// AGREGAR AL CARRITO
//==============================
function agregarProducto(id){
const producto = productos.find(
p=>p.id===id
);
carrito.push(producto);
actualizarContadores();
mostrarCarrito();
mostrarToast();
}
//==============================
// CONTADORES
//==============================
function actualizarContadores(){
contador.innerText = carrito.length;
cantidadCarrito.innerText = carrito.length;
}
//==============================
// TOAST
//==============================
function mostrarToast(){
toast.classList.add("visible");
setTimeout(()=>{
toast.classList.remove("visible");
},1500);
}
//==============================
// BUSCADOR
//==============================
buscar.addEventListener("keyup",filtrarProductos);
//==============================
// CATEGORÍAS
//==============================
botonesCategorias.forEach(boton=>{
boton.addEventListener("click",()=>{
botonesCategorias.forEach(b=>{
b.classList.remove("activa");
});
boton.classList.add("activa");
categoriaActual = boton.dataset.categoria;
filtrarProductos();
});
});
//==============================
// FILTRAR
//==============================
function filtrarProductos(){
const texto = buscar.value.toLowerCase();
const lista = productos.filter(producto=>{
const coincideNombre =
producto.nombre
.toLowerCase()
.includes(texto);
const coincideCategoria =
categoriaActual==="Todos"
||
producto.categoria===categoriaActual;
return coincideNombre && coincideCategoria;
});
mostrarProductos(lista);
}
//==============================
// ABRIR CARRITO
//==============================
btnCarrito.addEventListener(
"click",
abrirCarrito
);
carritoFlotante.addEventListener(
"click",
abrirCarrito
);
function abrirCarrito(){
panelCarrito.classList.add("abierto");
fondoOscuro.classList.add("visible");
}
//==============================
// CERRAR CARRITO
//==============================
cerrarPanel.addEventListener(
"click",
cerrarCarrito
);
fondoOscuro.addEventListener(
"click",
cerrarCarrito
);
function cerrarCarrito(){
panelCarrito.classList.remove("abierto");
fondoOscuro.classList.remove("visible");
}
//==============================
// INICIO
//==============================
mostrarProductos(productos);
actualizarContadores();
//==============================
// MOSTRAR CARRITO
//==============================
function mostrarCarrito(){
listaCarrito.innerHTML="";
if(carrito.length===0){
listaCarrito.innerHTML=`
<p style="text-align:center;margin-top:40px;">
Tu carrito está vacío.
</p>
`;
totalCarrito.innerHTML="Total: B/.0.00";
return;
}
// Agrupar productos iguales
let carritoAgrupado=[];
carrito.forEach(producto=>{
const existe=carritoAgrupado.find(
p=>p.id===producto.id
);
if(existe){
existe.cantidad++;
}else{
carritoAgrupado.push({
...producto,
cantidad:1
});
}
});
let total=0;
carritoAgrupado.forEach(producto=>{
const subtotal=
producto.precio*producto.cantidad;
total+=subtotal;
listaCarrito.innerHTML+=`
<div class="itemCarrito">
<div style="flex:1;">
<strong>
${producto.nombre}
</strong>
<br>
B/. ${producto.precio.toFixed(2)}
<br><br>
<button onclick="restarProducto(${producto.id})">
➖
</button>
<span style="padding:0 10px;">
${producto.cantidad}
</span>
<button onclick="sumarProducto(${producto.id})">
➕
</button>
</div>
<div style="text-align:right;">
<strong>
B/. ${subtotal.toFixed(2)}
</strong>
<br><br>
<button
onclick="eliminarProductoCompleto(${producto.id})">
🗑️
</button>
</div>
</div>
`;
});
totalCarrito.innerHTML=
`Total: B/. ${total.toFixed(2)}`;
}
//==============================
// SUMAR
//==============================
function sumarProducto(id){
const producto=
productos.find(
p=>p.id===id
);
carrito.push(producto);
actualizarContadores();
mostrarCarrito();
}
//==============================
// RESTAR
//==============================
function restarProducto(id){
const indice=
carrito.findIndex(
p=>p.id===id
);
if(indice!=-1){
carrito.splice(indice,1);
}
actualizarContadores();
mostrarCarrito();
}
//==============================
// ELIMINAR COMPLETO
//==============================
function eliminarProductoCompleto(id){
carrito=
carrito.filter(
p=>p.id!==id
);
actualizarContadores();
mostrarCarrito();
}
//==============================
// CONTINUAR A CAJA
//==============================
continuarCompra.addEventListener("click",finalizarPedido);
function finalizarPedido(){
if(carrito.length===0){
alert("Tu carrito está vacío.");
return;
}
const nombre=nombreCliente.value.trim();
if(nombre===""){
alert("Escribe tu nombre.");
nombreCliente.focus();
return;
}
let carritoAgrupado=[];
carrito.forEach(producto=>{
const existe=carritoAgrupado.find(p=>p.id===producto.id);
if(existe){
existe.cantidad++;
}else{
carritoAgrupado.push({...producto,cantidad:1});
}
});
let total=0;
let html="";
carritoAgrupado.forEach(producto=>{
const subtotal=producto.precio*producto.cantidad;
total+=subtotal;
html+=`
<div class="lineaTicket">
<span>${producto.nombre} x${producto.cantidad}</span>
<strong>B/. ${subtotal.toFixed(2)}</strong>
</div>
`;
});
numeroPedidoTicket.innerHTML="<strong>Pedido #"+String(numeroPedido).padStart(3,"0")+"</strong>";
clienteTicket.innerHTML="<strong>Cliente:</strong> "+nombre;
detalleTicket.innerHTML=html;
totalTicket.innerHTML="TOTAL: B/. "+total.toFixed(2);
pantallaConfirmacion.classList.add("visible");
cerrarCarrito();
}
//==============================
// NUEVO PEDIDO
//==============================
nuevoPedido.addEventListener("click",nuevoPedidoSistema);
function nuevoPedidoSistema(){
pantallaConfirmacion.classList.remove("visible");
carrito=[];
actualizarContadores();
mostrarCarrito();
nombreCliente.value="";
numeroPedido++;
}
//==============================
// ENVIAR PEDIDO A GOOGLE SHEETS
//==============================
async function enviarPedidoGoogle(nombre){
let carritoAgrupado=[];
carrito.forEach(producto=>{
const existe=carritoAgrupado.find(
p=>p.id===producto.id
);
if(existe){
existe.cantidad++;
}else{
carritoAgrupado.push({
id:producto.id,
nombre:producto.nombre,
precio:producto.precio,
cantidad:1
});
}
});
carritoAgrupado.forEach(producto=>{
producto.total=
producto.precio*
producto.cantidad;
});
const datos={
pedido:String(numeroPedido).padStart(3,"0"),
nombre:nombre,
productos:carritoAgrupado
};
try{
const respuesta=await fetch(URL_SCRIPT,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(datos)
});
const resultado=await respuesta.json();
console.log(resultado);
}catch(error){
console.error(error);
}
}