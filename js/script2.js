
let listaProductos = [];

fetch("./menu.json")
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((element) => {
      listaProductos.push(element);
    });
// Menú de comidas
//Las funciones previas quedan sin utilizar por ahora

/*

// Calcula el interés compuesto de un importe dado según el interés anual y la cantidad de meses
function interesCompuesto (sumaInicial, cantMeses, porcentaje){
  for (let i = 0; i < cantMeses; i++) {
    sumaInicial = sumaInicial + (((porcentaje/12)* sumaInicial )/100);
  }
  return sumaInicial.toFixed(2);
}

// Función de orden superior para calcular el valor de un producto sin IVA
function calcularDescuento(porcentaje) {
  return function(importe) {
    return (importe - (importe * porcentaje / 100)).toFixed(2);
  };
}

// Función para calcular descuento del 20%
const descuento20 = calcularDescuento(20);

// Función para calcular descuento del 10%
const descuento10 = calcularDescuento(10);




// Función para filtrar los alimentos catalogados como veganos
function veganos(lista){
  const veganosFiltrados = lista.filter((el) => el.vegano == true);
  console.log(veganosFiltrados);
  return verProductos(veganosFiltrados);
}
*/

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
    nuevoElemento.innerHTML = element.comida + ": $" + element.precio + '<button type="button" class="btn btn-success" id="agregar'+element.id+'">+</button><button type="button" class="btn btn-danger" id="quitar'+element.id+'">-</button> <input type="number" class="cantidades" id="cant'+element.id+'"  value="0" readonly>';
    listaDeProductos.append(nuevoElemento);
  });
  contenedorProductos.append(listaDeProductos);
}



// Función para actualizar localStorage del carrito
function actualizarCarritoStorage() {
  localStorage.setItem("checkOut", JSON.stringify(carrito));
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
    if (clave !== "checkOut"){
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

// Función para desplegar el carrito
function verCarrito(carrito){
  carritoDIV.innerHTML = "";
  let cuenta = 0;
  carritoDIV.classList.add("carrito");

  carrito.forEach(element => {
    let nuevoElemento = document.createElement("p");
    nuevoElemento.innerHTML = element.comida + " Cantidad: "+ element.cantidad + ": $" + element.subtotal ;
    carritoDIV.append(nuevoElemento);
    cuenta = cuenta + element.subtotal;
  });
  let total = document.createElement("span");
  total.classList.add("total");
  total.innerText= "TOTAL $"+masIVA(cuenta);
  carritoDIV.append(total)
}


// Función para vaciar el carrito y todo el storage
function limpiarCarrito(){
  for (let i=1; i < localStorage.length; i++){
    const clave = localStorage.key(i);
    if (clave !== "checkOut"){

      const inputActualizar = document.getElementById("cant"+clave);
      inputActualizar.value = 0;
    }
    };
    carrito=[];
  localStorage.clear();
}

class Menu{
  constructor(id, comida, precio, vegano){
    this.id = id;
    this.comida = comida;
    this.precio = precio;
    this.vegano = vegano;
  }
}


class Carrito extends Menu {
  constructor(id, comida, precio, vegano, cantidad, subtotal) {
    super(id, comida, precio, vegano);
    this.cantidad = cantidad;
    this.subtotal = subtotal;
  }
}

    let carrito = [];
    verProductos(listaProductos);
    
      
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
        carritoDIV.innerHTML ="";
        
    Toastify({
      text: "Se vación el carrito",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right", 
      stopOnFocus: true, 
    }).showToast();
    
    });
    
    
    
    
    levantarCantidadesStorage();
    
    carrito = levantarCarritoStorage();
    carrito? verCarrito(carrito): console.log("Carrito vacio");
   
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });
