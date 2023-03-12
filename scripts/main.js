//Carga de tarjetas del Home

const divTarjetas = document.getElementById("tarjetas");


const eventos = data.events.reduce((acumulador, valorActual) => {
  return acumulador + `<div class="container2 ">
                       <div class="card " style="width: 18rem;">
                        <img src= ${valorActual.image} class="card-img-top " alt="Imagen Evento: ${valorActual.name}">
                           <div class="card-body">
                            <h5 class="card-title">${valorActual.name}</h5>
                             <p class="card-text">${valorActual.description}</p>
                            <p class="card-text">Fecha: ${valorActual.date}</p>
                              <p class="card-text ">Price: ${valorActual.price}</p>
                              <a href="./details.html" class="btn btn-danger">Details</a>
                           </div>

                       </div>
                      </div>`
                },"");

/*console.log(eventos);*/
divTarjetas.innerHTML = eventos;              

//checksbox de manera dinamica

const divCheckbox = document.getElementById("checkbox");

const chequeador = data.events.reduce((acumulador, valorActual, index) => {      //Armado de checkbox
   if (valorActual._id % 2==0){ // Se repiten de a dos, lo filtro para que no aparezcan dos veces
  return acumulador + `<div class="container1">
                          <div class="form-check form-check-inline ms-4  " >
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox${index}" value="option${index}">
                          <label class="form-check-label" for="inlineCheckbox${index}">${valorActual.category}</label>
                          </div>
                       </div>`
   }else{
    return acumulador;}

  
},"");

console.log(chequeador);
divCheckbox.innerHTML = chequeador;

//Intento task3 entrada de busqueda
/*
const formulario = document.forms[0];
console.log(formulario);
const boton = document.getElementById('boton');
console.log(boton);*/