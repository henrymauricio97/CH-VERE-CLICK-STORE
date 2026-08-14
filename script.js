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
nombre:"Espejos",
precio:1.00,
categoria:"Accesorios",
imagen:"espejos.jpg"
},
{
id:2,
nombre:"Vinchas",
precio:1.75,
categoria:"Accesorios",
imagen:"vinchas.jpg"
},
{
id:3,
nombre:"Perfumes de bolsillo",
precio:2.00,
categoria:"Accesorios",
imagen:"perfumes.jpg"
},
{
id:4,
nombre:"Lip gloss",
precio:1.25,
categoria:"Accesorios",
imagen:"lipgloss.jpg"
},
{
id:5,
nombre:"Parches para acné",
precio:1.25,
categoria:"Accesorios",
imagen:"parches.jpg"
},
{
id:6,
nombre:"Labiales de fresa",
precio:1.00,
categoria:"Accesorios",
imagen:"labiales.jpg"
},
{
id:7,
nombre:"Vasos de balón de fútbol",
precio:2.00,
categoria:"Accesorios",
imagen:"vasos_futbol.jpg"
},
{
id:8,
nombre:"Nachos con queso",
precio:1.50,
categoria:"Snacks",
imagen:"nachos.jpg"
},
{
id:9,
nombre:"Combo hot dog con soda",
precio:1.50,
categoria:"Snacks",
imagen:"combo_hotdog.jpg"
},
{
id:10,
nombre:"Pastel en porciones",
precio:1.00,
categoria:"Snacks",
imagen:"pastel.jpg"
},
{
id:11,
nombre:"Mini chocolates",
precio:1.00,
categoria:"Snacks",
imagen:"chocolates.jpg"
},
{
id:12,
nombre:"Malva donut",
precio:0.50,
categoria:"Snacks",
imagen:"malva_donut.jpg"
},
{
id:13,
nombre:"Gomitas minhocas",
precio:1.50,
categoria:"Snacks",
imagen:"gomitas_minhocas.jpg"
}
];
//==============================
// VARIABLES
//==============================
let carrito = [];
let categoriaActual = "Todos";
let numeroPedido = 1;
const firebaseConfig={
apiKey:"AIzaSyBRDFT7gGp-_TYEhZMLww9ui9GOT6OJ9os",
authDomain:"chevere-click-store.firebaseapp.com",
projectId:"chevere-click-store",
storageBucket:"chevere-click-store.firebasestorage.app",
messagingSenderId:"344186483050",
appId:"1:344186483050:web:b2aa1a48d4bd224c44f513"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
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
async function finalizarPedido(){
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
await enviarPedidoGoogle(nombre);
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
let total=0;
carritoAgrupado.forEach(p=>{
total+=p.total;
});
try{
await db.collection("pedidos").add({
pedido:String(numeroPedido).padStart(3,"0"),
cliente:nombre,
productos:carritoAgrupado,
total:total,
estado:"PENDIENTE",
fecha:new Date()
});
console.log("Pedido guardado en Firebase");
}catch(error){
console.error(error);
}
}
