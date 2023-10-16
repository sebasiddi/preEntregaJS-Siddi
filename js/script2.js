// Calcula el interés compuesto de un importe dado según el interés anual y la cantidad de meses
function interesCompuesto (sumaInicial, cantMeses, porcentaje){
  for (let i = 0; i < cantMeses; i++) {
    sumaInicial = sumaInicial + (((porcentaje/12)* sumaInicial )/100);
  }
  return sumaInicial;
}


// calcula el valor de un producto sin el IVA aplicado del 21%
function sinIVA21 (importe){
  return (importe - ((importe*21)/100));
}

// calcula el valor de un producto sin el IVA aplicado del 10.5%
function sinIVA10 (importe){
  return (importe - ((importe*10.5)/100));
}

// Calcula el valor del IVA aplicado a un producto
function devIVA (importe){
  return (importe - sinIVA21(importe))
}


let option = "";
while (option !== "0"){
  option = prompt("1- Interés compuesto. 2- Restar IVA 21%. 3- Restar IVA 10.5%. 4-Calcular devolución de IVA. 0-SALIR")
  if (option == "0") {
    break;
  }
  else{
    switch(option){
      case "0": 
        break;
      case "1":
        const origen = parseInt(prompt("Ingrese suma para calcular interés"));
        const tiempo = parseInt(prompt("Ingrese la cantidad de meses"));
        const interes = parseInt(prompt("Ingrese el interés anual"));
        alert("El interés aplicado durante "+tiempo+" meses es de $"+interesCompuesto(origen, tiempo, interes));
        break;
      case "2":
        const x = parseInt (prompt("ingrese importe para calularlo sin IVA del 21%"));
        alert("$"+x+" menos el 21% de IVA es: $"+(sinIVA21(x)));
        break;
      case "3":
        const y = parseInt (prompt("ingrese importe para calularlo sin IVA del 10.5%"));
        console.log(sinIVA10(y));
        alert("$"+x+" menos el 10.5% de IVA es: $"+(sinIVA10(y)));
        break;
      case "4":
        const z = parseInt (prompt("ingrese importe para calular la devolucion del IVA"));
        alert("Si gastaste $"+z+" te van a devolver $"+(devIVA(z))+" del  IVA, el gasto real será de $"+(sinIVA21(z)));
        break;
      default:
        alert("opción incorrecta");
        break;
    }
  }
}
alert("Gracias Vuelvan prontos");

