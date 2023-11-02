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
let listaString = []
lista.forEach(element => {
  listaString= listaString + (element.id +" - "+ element.comida + ": $" +element.precio +"\n")
});
return (listaString);
}

// Función para filtrar los alimentos catalogados como veganos
function veganos(lista){
  const veganosFiltrados = lista.filter((el) => el.vegano == true);
  console.log(veganosFiltrados);
  return verProductos(veganosFiltrados);
}

class Menu{
  constructor(id, comida, precio, vegano){
    this.id = id;
    this.comida = comida;
    this.precio = precio;
    this.vegano = vegano;
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
  new Menu (9,"Risotto de Pollo y Verdeo",2400,false)
]



let option = "";
let optionSub1 = 1;
while (option !== "0"){
  option = prompt("1- Ver Menú \n 2-Ver comida Vegana \n 0-SALIR")
  if (option == "0") {
    break;
  }
  else{
    switch(option){
      case "0": 
        break;
      case "1":

        while (optionSub1 !== 0){
          optionSub1 = prompt(verProductos(listaProductos)+"\n 0 para Volver");
          if (optionSub1 == 0){
            break;
          }
          else if (optionSub1 < 10){
            if (listaProductos[optionSub1-1].vegano){
              alert("A los prodctos veganos les corresponde un desuento del 20%, el precio final del producto es $"+descuento20(listaProductos[optionSub1-1].precio));
            }
            else{
              alert("A los prodctos No veganos les corresponde un descuento del 10%, el precio final del producto es $"+descuento10(listaProductos[optionSub1-1].precio));
            }
          }
          else {alert("opcion incorrecta")}
        }

        break;
      case "2":
        alert("Lista de productos veganos: \n"+veganos(listaProductos))
        break;
      default:
        alert("opción incorrecta");
        break;
    }
  }
}
alert("Gracias Vuelvan prontos");