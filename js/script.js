// Menú de comidas
//Laa Función del IVA queda de la entre anterior para utilizar luego si hicera falta

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


// Calcula el valor del IVA aplicado a un producto
function devIVA (importe){
  return ((importe - sinIVA21(importe)).toFixed(2))
}

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

// Funcion para agregar productos
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



/* 
// Función para filtrar los alimentos catalogados como veganos
function veganos(lista){
  const veganosFiltrados = lista.filter((el) => el.vegano == true);
  console.log(veganosFiltrados);
  return verProductos(veganosFiltrados);
}
 */

// Función para actualizar los inputs de cantidades con la data del Storage
function levantarCantidadesStorage(){
  
for (let i=1; i < localStorage.length; i++){
  const clave = localStorage.key(i);
  const valor = localStorage.getItem(clave);
  const inputActualizar = document.getElementById("cant"+clave);
  inputActualizar.value = valor;
  }
};


//Función para recuperar el Carrito del Storage en formato de objeto
function levantarCarritoStorage(){
  let carritoGuardado = localStorage.getItem("checkOut");
  if (carritoGuardado) {
    // Convertir la cadena JSON a un objeto JavaScript
    let carritoStorage = JSON.parse(carritoGuardado);
    return carritoStorage;
  } else {
    console.log("No hay datos en localStorage para 'checkOut' del carrito");
  }
}


function verCarrito(carrito){
  carritoDIV.innerHTML = "";
  carritoDIV.classList.add("carrito");
  carrito.forEach(element => {
    let nuevoElemento = document.createElement("p");
    nuevoElemento.innerHTML = element.comida + " Cantidad: "+ element.cantidad + ": $" + element.subtotal ;
    carritoDIV.append(nuevoElemento);

  });
  
}



function limpiarCarrito(){
  for (let i=1; i < localStorage.length; i++){
    const clave = localStorage.key(i);
    const inputActualizar = document.getElementById("cant"+clave);
    inputActualizar.value = 0;
    };
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





const listaProductos = [
  new Menu (1,"Quesadillas de Pollo y Vegetales",2000,false),
  new Menu (2,"Pastel de Calabaza, Espinaca y Pollo",2000, false),
  new Menu (3,"Pastel de Batata Boniatto con Pollo a la Mostaza",2100,false),
  new Menu (4,"Musaka Griega (Con Carne y Berenjenas Asadas)",2100,false),
  new Menu (5,"Berenjenas Napolitanas",2200,true),
  new Menu (6,"Nituke (Mil Hojas de Vegetales con Salsa Blanca y Parmesano)",2200,true),
  new Menu (7,"Ratatoulille de Vegetales con Pollo",2300,false),
  new Menu (8,"Omelette de Espinaca y Parmesano",2300,true),
  new Menu (9,"Risotto de Pollo y Verdeo",2400,false),
  new Menu (10,"Atún Marra",1000,false),
]

let carrito = [];
verProductos(listaProductos);

  
  const botonesAgregar = document.querySelectorAll('[id^="agregar"]');
  const botonesQuitar = document.querySelectorAll('[id^="quitar"]');
  const inputCantidades = document.querySelectorAll('[id^="cant"]');
  const btnVaciarCarrito = document.getElementById("vaciarCarrito");
  const btnVerCarrito = document.getElementById("verCarrito");
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
      if (inputCantidades[index].value > 0){
        const idProducto = index;
        inputCantidades[index].value-- ;
        const cantidad = inputCantidades[index].value;
        agregarAlCarrito(idProducto,cantidad);
        verCarrito(levantarCarritoStorage());
      }
      else{
        console.log(inputCantidades[index].id)
        //carrito = carrito.filter(objeto => objeto.id !== carrito.id);


        //actualizarCarritoStorage();
        //verCarrito(levantarCarritoStorage());

      };
    });
  });
  
  // Botón para vaciar el carrito
  btnVaciarCarrito.addEventListener("click",()=>{
    limpiarCarrito();
    carritoDIV.innerHTML ="";
});

btnVerCarrito.addEventListener("click",()=>{
  
  verCarrito(levantarCarritoStorage());
});



levantarCantidadesStorage();

levantarCarritoStorage();



