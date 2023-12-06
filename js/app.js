let carrito = [];

const productos = [
  { nombre: "Fresh Foam X Hierro v7 - New Balance ", valor: 110000, descripcion: " La suela Vibram® MEGAGRIP proporciona una sujeción superior", img: "img/productos/Fresh-Foam-X-Hierro-v7.jpg" },
  { nombre: "57/40 Natural indigo - New Balance ", valor: 84999, descripcion: "La zapatilla más New Balance de todos los tiempos", img: "img/productos/5740.jpg" },
  { nombre: "57/40 Natural Pink - New Balance ", valor: 84999, descripcion: "La zapatilla más New Balance de todos los tiempos", img: "img/productos/5740-b.jpg" },
  { nombre: "Fresh Foam X More v4  - New Balance ", valor: 132000, descripcion: "Lo último en la línea utiliza más Fresh Foam X", img: "img/productos/more.jpg" },
  { nombre: "Buzo Essentials Pullover WT91523  - New Balance ", valor: 33000, descripcion: "Corte relajado, esta confeccionado en un suave tejido que ofrece comodidad durante todo el día.", img: "img/productos/WT91523.jpg" },
  { nombre: "Buzo Essentials Pullover WT91523 (grey) - New Balance ", valor: 33000, descripcion: "Corte relajado, esta confeccionado en un suave tejido que ofrece comodidad durante todo el día.", img: "img/productos/grey.jpg" },
  { nombre: "Remera Athletics Amplified Tee  - New Balance ", valor: 18000, descripcion: "Eleva tu look con la remera de hombre NB Athletics Amplified.", img: "img/productos/new1.jpg" },
  { nombre: "Musculosa Q Speed Jacquard WT13276 - New Balance ", valor: 145000, descripcion: "Combina características técnicas prácticas con estilo.", img: "img/productos/new2.jpg" },
];

function agregarAlCarrito(nombre, valor) {
  carrito.push({ nombre, valor });
  actualizarListaCarrito();
  mostrarModal();
  guardarCarritoEnLocalStorage();
  actualizarTotales(); // Actualizar totales al agregar un producto al carrito
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarListaCarrito();
  guardarCarritoEnLocalStorage();
  actualizarTotales(); // Actualizar totales al eliminar un producto del carrito
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  actualizarListaCarrito();
  actualizarTotales();
}

cargarCarritoDesdeLocalStorage();

function mostrarModal() {
  const modalElement = document.getElementById('carritoModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function actualizarListaCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  listaCarrito.innerHTML = '';

  carrito.forEach(({ nombre, valor }, index) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.innerHTML = `
       <span class="d-flex justify-content-between align-items-start">${nombre} - $ ${valor} 
       <span class="badge bg-danger rounded-pill p-2"><span class="text-end mr-0 fas fa-trash-alt" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span> 
       
       
    `;
    listaCarrito.appendChild(item);
  });
}

function actualizarTotales() {
  const valorTotalCarrito = carrito.reduce((total, { valor }) => total + valor, 0);
  const cantidadProductosEnCarrito = carrito.length;

  const valorTotalCarritoElement = document.getElementById('valorTotalCarrito');
  valorTotalCarritoElement.textContent = `$${valorTotalCarrito.toFixed(2)}`;

  const cantidadProductosEnCarritoElement = document.getElementById('cantidadProductosEnCarrito');
  cantidadProductosEnCarritoElement.textContent = cantidadProductosEnCarrito;

  const totalPagar = productos.reduce((total, { nombre, valor }) => {
    const cantidadEnCarrito = carrito.filter(item => item.nombre === nombre).length;
    return total + cantidadEnCarrito * valor;
  }, 0);

  const totalPagarElement = document.getElementById('totalPagar');
  totalPagarElement.textContent = `$${totalPagar.toFixed(2)}`;
}

function mostrarProductos(productosFiltrados) {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  const elementosProductos = productosFiltrados.map(({ nombre, descripcion, img, valor }) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("col-lg-3");
    divProducto.innerHTML = `
    <div class="card-body p-2">  
    <img src="${img}" class="card-img-top" alt="Imagen de ${nombre}">
    <h5 class="card-title">${nombre}
    </h5>
    <div class="precios_producto">
    <div class="precio_nuevo">$ ${valor}</div>
    <div class="precio_descripcion">${descripcion}
  </div>
      </div>

 <div class="d-grid gap-2">
 <button class="btn btn-dark p-3" onclick="agregarAlCarrito('${nombre}', ${valor})"><i class="fa-solid fa-cart-shopping"></i> Agregar a carrito</button>
</div>
 </div> 
    `;
    return divProducto;
  });

  contenedor.append(...elementosProductos);
}

function filtrarProductos() {
  const textoBusqueda = document.getElementById("buscadorProducto").value.toLowerCase();
  const productosFiltrados = productos.filter(({ nombre }) =>
    nombre.toLowerCase().includes(textoBusqueda)
  );
  mostrarProductos(productosFiltrados);
}

document.getElementById("buscadorProducto").addEventListener("input", filtrarProductos);

mostrarProductos(productos);
actualizarTotales();

function mostrarCarrito() {
  actualizarListaCarrito();
  mostrarModal();
}
