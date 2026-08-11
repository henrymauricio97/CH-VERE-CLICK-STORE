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
const listaPedidos=document.getElementById("listaPedidos");
db.collection("pedidos").orderBy("fecha","desc").onSnapshot(snapshot=>{
if(snapshot.empty){
listaPedidos.innerHTML='<div class="sinPedidos">📭 No hay pedidos registrados.</div>';
return;
}
listaPedidos.innerHTML="";
snapshot.forEach(doc=>{
const pedido=doc.data();
if(pedido.estado==="ENTREGADO"){
return;
}
const tarjeta=document.createElement("div");
tarjeta.className="pedido "+(pedido.estado==="PAGADO"?"pagado":"pendiente");
let productosHTML="";
if(Array.isArray(pedido.productos)){
pedido.productos.forEach(producto=>{
productosHTML+=`

<div class="lineaProducto">
<span>${producto.nombre} x${producto.cantidad}</span>
<strong>B/. ${Number(producto.total).toFixed(2)}</strong>
</div>
`;
});
}
let fechaTexto="";
if(pedido.fecha&&pedido.fecha.toDate){
fechaTexto=pedido.fecha.toDate().toLocaleString("es-PA");
}
const estadoHTML=pedido.estado==="PAGADO"
?'<span class="estado estadoPagado">🟢 PAGADO</span>'
:'<span class="estado estadoPendiente">🟡 PENDIENTE</span>';
const botonHTML=pedido.estado==="PAGADO"
?'<button class="btnPagado" disabled>✅ PEDIDO PAGADO</button>'
:`<button class="btnPagar" onclick="marcarComoPagado('${doc.id}')">💰 MARCAR COMO PAGADO</button>`;
tarjeta.innerHTML=`
<div class="encabezadoPedido">
<div class="numeroPedido">Pedido #${pedido.pedido}</div>
${estadoHTML}
</div>
<div class="cliente">
<strong>Cliente:</strong> ${pedido.cliente}
</div>
<div class="fecha">
🕐 ${fechaTexto}
</div>
<div class="productos">
${productosHTML}
</div>
<div class="total">
<span>TOTAL</span>
<span>B/. ${Number(pedido.total).toFixed(2)}</span>
</div>
${botonHTML}
`;
listaPedidos.appendChild(tarjeta);
});
});
async function marcarComoPagado(id){
const confirmar=confirm("¿Confirmas que este pedido ya fue pagado?");
if(!confirmar){
return;
}
try{
await db.collection("pedidos").doc(id).update({
estado:"PAGADO",
fechaPago:firebase.firestore.FieldValue.serverTimestamp()
});
console.log("Pedido marcado como PAGADO:",id);
}catch(error){
console.error("Error al marcar el pedido como pagado:",error);
alert("No se pudo actualizar el pedido.");
}
}
