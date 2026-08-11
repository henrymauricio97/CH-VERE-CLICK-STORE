// =====================================
// CHÉVERE CLICK STORE
// ESTACIÓN 3 - DESPACHO
// =====================================

//==============================
// CONFIGURACIÓN FIREBASE
//==============================
const firebaseConfig = {
apiKey:"AIzaSyBRDFT7gGp-_TYEhZMLww9ui9GOT6OJ9os",
authDomain:"chevere-click-store.firebaseapp.com",
projectId:"chevere-click-store",
storageBucket:"chevere-click-store.firebasestorage.app",
messagingSenderId:"344186483050",
appId:"1:344186483050:web:b2aa1a48d4bd224c44f513"
};

//==============================
// INICIAR FIREBASE
//==============================
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

//==============================
// ELEMENTOS HTML
//==============================
const listaPedidos=document.getElementById("listaPedidos");
const cantidadPedidos=document.getElementById("cantidadPedidos");
const mensajeVacio=document.getElementById("mensajeVacio");
const mensajeExito=document.getElementById("mensajeExito");
const pedidoEntregado=document.getElementById("pedidoEntregado");
const cerrarMensaje=document.getElementById("cerrarMensaje");

//==============================
// ESCUCHAR PEDIDOS PAGADOS
//==============================
db.collection("pedidos")
.where("estado","==","PAGADO")
.onSnapshot(snapshot=>{
console.log("Pedidos pagados encontrados:",snapshot.size);
mostrarPedidos(snapshot);
},error=>{
console.error("Error al cargar pedidos:",error);
listaPedidos.innerHTML=`
<div class="cargando">
❌ No se pudieron cargar los pedidos.
</div>
`;
});

//==============================
// MOSTRAR PEDIDOS
//==============================
function mostrarPedidos(snapshot){
listaPedidos.innerHTML="";
cantidadPedidos.textContent=snapshot.size;
if(snapshot.empty){
listaPedidos.classList.add("oculto");
mensajeVacio.classList.remove("oculto");
return;
}
listaPedidos.classList.remove("oculto");
mensajeVacio.classList.add("oculto");
let pedidos=[];
snapshot.forEach(doc=>{
pedidos.push({
id:doc.id,
...doc.data()
});
});
pedidos.sort((a,b)=>{
return Number(a.pedido)-Number(b.pedido);
});
pedidos.forEach(pedido=>{
crearTarjetaPedido(pedido);
});
}

//==============================
// CREAR TARJETA DEL PEDIDO
//==============================
function crearTarjetaPedido(pedido){
const tarjeta=document.createElement("div");
tarjeta.className="pedido";
let productosHTML="";
if(Array.isArray(pedido.productos)){
pedido.productos.forEach(producto=>{
const subtotal=producto.total||(
Number(producto.precio)*Number(producto.cantidad)
);
productosHTML+=`
<div class="productoLinea">
<span>${producto.nombre} x${producto.cantidad}</span>
<strong>B/. ${Number(subtotal).toFixed(2)}</strong>
</div>
`;
});
}
tarjeta.innerHTML=`
<div class="pedidoHeader">
<div class="numeroPedido">
Pedido #${pedido.pedido}
</div>
<div class="estadoPago">
✓ PAGADO
</div>
</div>
<div class="cliente">
<strong>Cliente:</strong> ${pedido.cliente||"Sin nombre"}
</div>
<div class="productos">
${productosHTML}
</div>
<div class="total">
TOTAL: B/. ${Number(pedido.total||0).toFixed(2)}
</div>
<button class="btnEntregar">
📦 ENTREGAR PEDIDO
</button>
`;
const boton=tarjeta.querySelector(".btnEntregar");
boton.addEventListener("click",()=>{
entregarPedido(pedido.id,pedido.pedido,boton);
});
listaPedidos.appendChild(tarjeta);
}

//==============================
// ENTREGAR PEDIDO
//==============================
async function entregarPedido(id,pedidoNumero,boton){
const confirmar=confirm(
"¿Confirmas que el pedido #"+pedidoNumero+" fue entregado al cliente?"
);
if(!confirmar){
return;
}
boton.disabled=true;
boton.textContent="⏳ ENTREGANDO...";
try{
await db.collection("pedidos").doc(id).update({
estado:"ENTREGADO",
fechaEntrega:new Date()
});
console.log("Pedido #"+pedidoNumero+" marcado como ENTREGADO");
pedidoEntregado.textContent="El pedido #"+pedidoNumero+" fue entregado correctamente.";
mensajeExito.classList.remove("oculto");
}catch(error){
console.error("Error al entregar pedido:",error);
alert("No se pudo marcar el pedido como entregado.");
boton.disabled=false;
boton.textContent="📦 ENTREGAR PEDIDO";
}
}

//==============================
// CERRAR MENSAJE
//==============================
cerrarMensaje.addEventListener("click",()=>{
mensajeExito.classList.add("oculto");
});
