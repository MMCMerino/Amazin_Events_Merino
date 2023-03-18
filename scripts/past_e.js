//Carga de tarjetas del Home

const divTarjetas = document.getElementById("tarjetas");


const pastEvents = data.events.filter( evento => evento.date < data.currentDate);
console.log (pastEvents);

const eventos = pastEvents.reduce((acumulador, valorActual) => {
  return acumulador + `<div class="container2 ">
                       <div class="card " style="width: 18rem;">
                        <img src= ${valorActual.image} class="card-img-top " alt="Imagen Evento: ${valorActual.name}">
                           <div class="card-body">
                            <h5 class="card-title">${valorActual.name}</h5>
                             <p class="card-text">${valorActual.description}</p>
                            <p class="card-text">Fecha: ${valorActual.date}</p>
                              <p class="card-text ">Price: ${valorActual.price}</p>
                              <a href="./details.html?id=${valorActual._id}" class="btn btn-danger">Details</a>
                           </div>

                       </div>
                      </div>`
                },"");



console.log(eventos);
divTarjetas.innerHTML = eventos;             

//checksbox de manera dinamica

const divCheckbox = document.getElementById("checkbox");

const chequeador = data.events.reduce((acumulador, valorActual, index) => {      //Armado de checkbox
   if (index % 2==0){ // Se repiten de a dos, lo filtro para que no aparezcan dos veces
  return acumulador + `<div class="container1">
                          <div class="form-check form-check-inline ms-4  " >
                          <input class="form-check-input" type="checkbox" id="${valorActual.category}" value="${valorActual.category}">
                          <label class="form-check-label" for="${valorActual.category}">${valorActual.category}</label>
                          </div>
                       </div>`
   }else{
    return acumulador;}

  
},"");

console.log(chequeador);
divCheckbox.innerHTML = chequeador;


//Filtrado del search

const formulario = document.forms[0];
const boton = document.getElementById('boton');
const entrada = document.getElementById('entrada');




entrada.addEventListener('input',superFiltro);

//Filtrado por checkeo

divCheckbox.addEventListener('change',superFiltro);







//Funciones
function filtrarPorTexto(array,texto){
   let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()));
    console.log("array filtrado por texto",arrayFiltrado);
   return arrayFiltrado;
};


function filtrarPorCategoria(array){
   let checkboxes = document.querySelectorAll("input[type='checkbox']")
   console.log("checkboxes",checkboxes);
   let arrayChecks = Array.from(checkboxes);
   console.log("arrayChecks",arrayChecks);
   let arrayChecksChecked = arrayChecks.filter(check => check.checked);
   console.log("chequeados",arrayChecksChecked);
   let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value);
   console.log("toma valor",arrayChecksCheckedValues);
   let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.category));
   console.log(arrayFiltrado);
   if(arrayChecksChecked.length > 0){
       return arrayFiltrado;
   }
   return array;
};

function pintarTarjetas(array){
   if(array.length == 0){
       divTarjetas.innerHTML = `<h2 class="display-1 fw-bolder">No hay coincidencias</h2>`
       return;
   }
   let tarjetas = '';
   array.forEach(tarjeta => {
       tarjetas += `<div class="container2 ">
       <div class="card " style="width: 18rem;">
        <img src= ${tarjeta.image} class="card-img-top " alt="Imagen Evento: ${tarjeta.name}">
           <div class="card-body">
            <h5 class="card-title">${tarjeta.name}</h5>
             <p class="card-text">${tarjeta.description}</p>
            <p class="card-text">Fecha: ${tarjeta.date}</p>
              <p class="card-text ">Price: ${tarjeta.price}</p>
              <a href="./details.html?id=${tarjeta._id}" class="btn btn-danger">Details</a>
           </div>

       </div>
      </div>`
   });
   divTarjetas.innerHTML = tarjetas;
};

function superFiltro(){
   let primerFiltro = filtrarPorTexto(pastEvents,entrada.value);
   let segundoFiltro = filtrarPorCategoria(primerFiltro);
   pintarTarjetas(segundoFiltro);
}
