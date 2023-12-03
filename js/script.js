
//inicializo un array vacío donde cargar los productos del JSON
let listaProductos = [];


function saludoInicial(){
  Swal.fire({
    title: 'Bienvenidxs!',
    text: "Si tu compra supera los $5000 tenés descuento del 10% y si supera los $10000 el descuento es de un 20%!",
    icon: 'success',
    confirmButtonText: 'A comprar!',
  })

};


//Spinner para visualizar durante la carga de los datos
function verSpinner(){
  const spinner = document.createElement("div");
  spinner.classList.add("spin");
  spinner.id ="spinner-carga";
  const mainTag = document.getElementById("mainTag");
  spinner.innerHTML= spinner.innerHTML = '<div class="spinner-border text-warning" role="status">' +
  '<span class="visually-hidden">Loading...</span>' +
  '</div>';
  mainTag.append(spinner);
}

//Mostrar Spinner
verSpinner();


//Levanto información de JSON con Fetch
fetch("./menu.json")
  .then((resp) => resp.json())
  .then((data) => {
    const spinner = document.getElementById("spinner-carga");
    //Apago Spinner cuando se carga la información
    spinner.style.display="none";
    data.forEach((element) => {
      listaProductos.push(element);
    });


//Chequeo de Checkbox para alimentos vegetarianos    
const switcherVegan = document.getElementById("SwitchCheckVegan");

function swither() {
  const elementosNoVeganos = document.getElementsByClassName("noVegano");
  if (switcherVegan.checked) {
    localStorage.setItem("switcherVegan", 1);

    for (let i = 0; i < elementosNoVeganos.length; i++) {
      elementosNoVeganos[i].style.display = "none";
    }
  } else {
    localStorage.setItem("switcherVegan", 0);
    for (let i = 0; i < elementosNoVeganos.length; i++) {
      elementosNoVeganos[i].style.display = "grid"; 
    }
  }
}
switcherVegan.addEventListener("click",swither);


// Función de orden superior para calcular descuentos por porcentaje
function calcularDescuento(porcentaje) {
  return function(importe) {
    return (importe - (importe * porcentaje / 100)).toFixed(2);
  };
};

// Función para calcular descuento del 20%
const descuento20 = calcularDescuento(20);

// Función para calcular descuento del 10%
const descuento10 = calcularDescuento(10);

// Calcula el valor del IVA aplicado a un producto
function masIVA (importe){
  return ((importe + (importe*0.21)).toFixed(2))
}


// Funcion para desplegar dinámicamente los productos
function verProductos(lista){
  let listaDeProductos = document.createElement("div");
  let contenedorProductos = document.getElementById("menu-comida");
  listaDeProductos.classList.add("productos");
  lista.forEach(element => {
    let nuevoElemento = document.createElement("p");
    nuevoElemento.innerHTML = "<p>"+element.comida + ": $" + element.precio + "</p>"+ '<button type="button" class="btn btn-success" id="agregar'+element.id+'">+</button><button type="button" class="btn btn-danger" id="quitar'+element.id+'">-</button> <input type="number" class="cantidades" id="cant'+element.id+'"  value="0" readonly>';
    element.vegano? nuevoElemento.classList.add("vegano") : nuevoElemento.classList.add("noVegano");
    listaDeProductos.append(nuevoElemento);
  });
  contenedorProductos.append(listaDeProductos);
}


// Función para actualizar localStorage del carrito
function actualizarCarritoStorage() {
  localStorage.setItem("checkOut", JSON.stringify(carrito));
}

//Funcion para notificación de descuento
function mensajeDescuento(descuento){
  const mensaje = "Se aplicó un descuento del "+descuento+"%";
    Toastify({
      text: mensaje,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "yellow",
        color: "black",
      }
    }).showToast();
}

//Funcion para notificación de agregar un producto
function notificacionAgregar(comida){
  Toastify({
    text: "Agregaste "+comida+" al carrito",
    duration: 2500,
    close: true,
    gravity: "top",
    position: "right", 
    stopOnFocus: true, 
  }).showToast();
}

//Funcion para notificación de quitar un producto
function notificacionQuitar(comida){
  Toastify({
      text: "Quitaste "+comida+" del carrito",
      duration: 2500,
      close: true,
      gravity: "top",
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "red",
      },
    }).showToast();
}

// Función para agregar productos
function agregarAlCarrito(id, cant) {
  const indiceExistente = carrito.findIndex(producto => producto.id === listaProductos[id].id);
  if (indiceExistente !== -1) {
    localStorage.setItem(carrito[indiceExistente].id,JSON.parse(cant))
    carrito[indiceExistente].cantidad = parseInt(cant);
    carrito[indiceExistente].subtotal = carrito[indiceExistente].precio * carrito[indiceExistente].cantidad;
  } else {
    const nuevoProducto = new Carrito(
      listaProductos[id].id,
      listaProductos[id].comida,
      listaProductos[id].precio,
      listaProductos[id].vegano,
      parseInt(cant),
      listaProductos[id].precio * parseInt(cant)
    );
    localStorage.setItem(listaProductos[id].id,JSON.parse(cant))
    carrito.push(nuevoProducto);
  }
  actualizarCarritoStorage();
 };


 // Función para quitar productos
function quitarDelCarrito(index){
  inputCantidades[index].value > 0? notificacionQuitar(listaProductos[index].comida):console.log();
  inputCantidades[index].value--;
  if (parseInt(inputCantidades[index].value) > 0) {
    const idProducto = index;
    const cantidad = inputCantidades[index].value;
    agregarAlCarrito(idProducto, cantidad);
    verCarrito(levantarCarritoStorage());
  } else {
    const idParaEliminar = parseInt(inputCantidades[index].id.replace("cant", ""), 10);
    const nuevoCarrito = carrito.filter(function(obj) {
      return obj.id !== idParaEliminar;
    });
    inputCantidades[index].value = 0;
    localStorage.removeItem(idParaEliminar);
    carrito = nuevoCarrito;
    actualizarCarritoStorage();
    verCarrito(levantarCarritoStorage());
  }
};


// Función para actualizar los inputs de cantidades con la data del Storage
function levantarCantidadesStorage(){
  for (let i=1; i < localStorage.length; i++){
    const clave = localStorage.key(i);
    if (clave !== "checkOut" & clave !== "switcherVegan"){
      const valor = localStorage.getItem(clave);
      const inputActualizar = document.getElementById("cant"+clave);
      inputActualizar.value = valor;
    }
  }
};


//Función para recuperar el Carrito del Storage en formato de objeto
function levantarCarritoStorage(){
  let carritoGuardado = localStorage.getItem("checkOut");
  if (carritoGuardado) {
    let carritoStorage = JSON.parse(carritoGuardado);
    return carritoStorage;
  } else {
    return carrito;
  }
}


//Funcion para calulcar el precio final con impuestos y descuentos
function calcularPrecioFinal(cuenta) {
  if (cuenta < 5000) {
    return masIVA(cuenta);
  } else if (cuenta < 10000) {
    mensajeDescuento(10);
    return masIVA(parseFloat(descuento10(cuenta)));
  } else {
    mensajeDescuento(20);
    return masIVA(parseFloat(descuento20(cuenta)));
  }
}

// Función para el mensaje de confirmación de compra del carrito
function mensajeCarritoLleno(cuenta){
  const datosCarrito = levantarCarritoStorage();
  let listaFinal = "";
  datosCarrito.forEach(el =>{
    listaFinal = listaFinal + "<br>"+ " " + el.cantidad + " x " +el.comida;
  })
  listaFinal = listaFinal+'<br>El precio final de tu compra incluyendo impuestos y descuentos es <strong>$'+calcularPrecioFinal(cuenta)+"</strong>",
  Swal.fire({
    title: 'Tu compra',
    html: listaFinal,
    icon: 'info',
    confirmButtonText: 'Comprar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
  });
};

// Función para el mensaje de carrito vacío
function mensajeCarritoVacio(){
  Swal.fire({
    title: 'Carrito Vacío',
    text: "Tu lista de compras está vacía, recordá que a partir de los $5000 tenés descuento del 10% y si tu compra supera los $10000 el descuento es de un 20%! sin tope!",
    icon: 'error',
    confirmButtonText: 'ok'
  })
};


// Función para desplegar el carrito
function verCarrito(carrito){
  carritoDIV.innerHTML = "";
  let cuenta = 0;
  carritoDIV.classList.add("carrito");
  carrito.forEach(element => {
    let nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add("lista-carrito");
    nuevoElemento.innerHTML ='<div>Cantidad: '+ element.cantidad + '</div>'+'<div class="comida">'+ element.comida+' </div>'+'<div>$' + element.subtotal+' +IVA</div>';
    carritoDIV.append(nuevoElemento);
    cuenta = cuenta + element.subtotal;
  });
  let total = document.createElement("div");
  total.classList.add("total");
  total.id = "ID-Total";
  const codigoHTML = `
    <div>
      Total $`+calcularPrecioFinal(cuenta)+`
    </div>
    <div class="disclaimer">Incluye IVA del 21%<div>`;
  total.innerHTML= codigoHTML;
  carritoDIV.append(total);
  btnTotal = document.getElementById("ID-Total");
  //mensaje de confirmación de compra
  btnTotal.addEventListener("click",()=>{
    cuenta >0 ? mensajeCarritoLleno(cuenta): mensajeCarritoVacio()
   });
};


// Función para vaciar el carrito y todo el storage
function limpiarCarrito(){
  for (let i=1; i < localStorage.length; i++){
    const clave = localStorage.key(i);
    if (clave !== "checkOut" & clave !== "switcherVegan"){
      const inputActualizar = document.getElementById("cant"+clave);
      inputActualizar.value = 0;
    }
  };
  carrito=[];
  localStorage.clear();
};


//Clase Menú que pasó a JSON
  class Menu{
    constructor(id, comida, precio, vegano){
      this.id = id;
      this.comida = comida;
      this.precio = precio;
      this.vegano = vegano;
    }
  };

//Clase del carrito que hereda del Menú
  class Carrito extends Menu {
    constructor(id, comida, precio, vegano, cantidad, subtotal) {
      super(id, comida, precio, vegano);
      this.cantidad = cantidad;
      this.subtotal = subtotal;
    }
  };


  //inicializcón de carrito vaco y de lista de productos
  let carrito = [];
  verProductos(listaProductos);


  //captura de botones creados para cada opción de comida y de carrito
  const botonesAgregar = document.querySelectorAll('[id^="agregar"]');
  const botonesQuitar = document.querySelectorAll('[id^="quitar"]');
  const inputCantidades = document.querySelectorAll('[id^="cant"]');
  const btnVaciarCarrito = document.getElementById("vaciarCarrito");
  let carritoDIV = document.getElementById("carrito-container");
      
      
  //Botones para agregar o quitar items
  botonesAgregar.forEach((boton, index) => {
    boton.addEventListener("click", function() {
      const idProducto = index;
      inputCantidades[index].value++;
      const cantidad = inputCantidades[index].value;
      notificacionAgregar(listaProductos[index].comida);
      agregarAlCarrito(idProducto, cantidad);
      verCarrito(levantarCarritoStorage());
    });
  });
      
  botonesQuitar.forEach((boton, index) => {
    boton.addEventListener("click", function() {
      quitarDelCarrito(index);
    });
  });
    
    
  // Botón para vaciar el carrito
  btnVaciarCarrito.addEventListener("click",()=>{
    limpiarCarrito();
    verCarrito(carrito);
    Toastify({
      text: "Se vació el carrito",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right", 
      stopOnFocus: true, 
    }).showToast();
  });


  //Llamado al mensaje de bienvenida
  saludoInicial();


  //levanta el checkbox del storage 
  localStorage.getItem("switcherVegan") == 1? switcherVegan.checked = true : switcherVegan.checked = false;
  swither();

  //levanta las cantidades del storage para cargarlo en los inputs
  levantarCantidadesStorage();

  //levanta la información del carrito en el storage para desplegarla
  carrito = levantarCarritoStorage();
  //chequeo del contenido del carrito en el storage
  carrito? verCarrito(carrito): console.log("Carrito vacio");
})

//Captura de error de carga del archivo JSON
.catch((error) => {
  console.error("Error de carga de JSON:", error);
});
