// Calculadora Anti Inflación

// Calcula el interés compuesto de un importe dado según el interés anual y la cantidad de meses
function interesCompuesto (sumaInicial, cantMeses, porcentaje){
  for (let i = 0; i < cantMeses; i++) {
    sumaInicial = sumaInicial + (((porcentaje/12)* sumaInicial )/100);
  }
  return sumaInicial.toFixed(2);
}

// Función de orden superior para calcular el valor de un producto sin IVA
function calcularSinIVA(porcentajeIVA) {
  return function(importe) {
    return (importe - (importe * porcentajeIVA / 100)).toFixed(2);
  };
}

// Función para calcular sin IVA al 21%
const sinIVA21 = calcularSinIVA(21);

// Función para calcular sin IVA al 10.5%
const sinIVA10 = calcularSinIVA(10.5);


// Calcula el valor del IVA aplicado a un producto
function devIVA (importe){
  return ((importe - sinIVA21(importe)).toFixed(2))
}

// Calcula cuál es el tope de compra para aprovechar un descuento por porcentaje pero con tope de descuento
function calcularPagoOptimo(desc, tope){
  return(((100*tope)/desc).toFixed(2));
 }
 
 // Calcula precio por kilo de un producto
 function precioPorKilo(precio, gramos){
  return(((1000*precio)/gramos).toFixed(2));
 }



 function verProductos(lista){
  let listaString = []
  lista.forEach(element => {
    listaString= listaString + (element.id +" - "+ element.comida + ": $" +element.precio +"\n")
  });
  return (listaString);
 }


const listaProductos = [
  {id: 1, comida: "Quesadillas de Pollo y Vegetales",precio: 2000},
  {id: 2, comida: "Pastel de Calabaza, Espinaca y Pollo",precio: 2000},
  {id: 3, comida: "Pastel de Batata Boniatto con Pollo a la Mostaza",precio: 2100},
  {id: 4, comida: "Musaka Griega (Con Carne y Berenjenas Asadas)",precio: 2100},
  {id: 5, comida: "Berenjenas Napolitanas",precio: 2200},
  {id: 6, comida: "Nituke (Mil Hojas de Vegetales con Salsa Blanca y Parmesano)",precio: 2200},
  {id: 7, comida: "Ratatoulille de Vegetales con Pollo",precio: 2300},
  {id: 8, comida: "Omelette de Espinaca y Parmesano",precio: 2300},
  {id: 9, comida: "Risotto de Pollo y Verdeo",precio: 2400},
]



let option = "";
let optionSub1 = 1;
while (option !== "0"){
 // option = prompt("1- Interés compuesto. 2- Restar IVA 21%. 3- Restar IVA 10.5%. 4-Calcular devolución de IVA. 5-Compra óptima. 6-Precio por Kilo. 0-SALIR")
  option = prompt("1- Ver Menú\n0-SALIR")
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
            alert("opción elegida "+listaProductos[optionSub1-1].comida)
          }
          else {alert("opcion incorrecta")}
        }
          
        break;
      default:
        alert("opción incorrecta");
        break;
    }
  }
}
alert("Gracias Vuelvan prontos");