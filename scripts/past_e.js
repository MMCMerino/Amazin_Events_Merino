//Carga de tarjetas del Home

const divTarjetas = document.getElementById("tarjetas");
const divCheckbox = document.getElementById("checkbox");
const entrada = document.getElementById('entrada');

async function traerDatos(){
   try{
     const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
     console.log(response);
     const datos = await response.json();
     console.log(datos.events);
     console.log(datos);
     let eventosQuePasaron = cargaDeTarjetasPast(datos.events, datos.currentDate);
     console.log("eventos que pasaron",eventosQuePasaron);
     cargaDeCheckboxs(datos.events);
 
     function superFiltro(){
       let primerFiltro = filtrarPorTexto(eventosQuePasaron,entrada.value);
       let segundoFiltro = filtrarPorCategoria(primerFiltro);
       pintarTarjetas(segundoFiltro);
    }
    
     entrada.addEventListener('input',superFiltro);
     divCheckbox.addEventListener('change',superFiltro);
 
   }
 
   catch(error){
     console.log(error);
   }
 }
 traerDatos();


//Carga de tarjetas


function cargaDeTarjetasPast(array1 ,array2){
const pastEvents = array1.filter( evento => evento.date < array2);
//console.log (pastEvents);

const eventos = pastEvents.reduce((acumulador, valorActual) => {
  return acumulador + `<div class="container2 ">
                       <div class="card " style="width: 18rem;">
                        <img src= "${valorActual.image}" class="card-img-top " alt="Imagen Evento: ${valorActual.name}">
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



//console.log(eventos);
divTarjetas.innerHTML = eventos;  
 return pastEvents;
               }



// funcion checksbox de manera dinamica

function cargaDeCheckboxs(array){
  
   let arrayCategorias = array.map(tarjeta => tarjeta.category)
   console.log(arrayCategorias) 
   let setCategorias= new Set(arrayCategorias)
   console.log(setCategorias) 
   let arrayChecks = Array.from(setCategorias)
   /* console.log(arrayCategorias) */
   let checkboxes = ''
   arrayChecks.forEach(category => {
       checkboxes +=  `<div  class="container1">
       <div class="form-check form-check-inline ms-4  " >
       <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
       <label class="form-check-label" for="${category}">${category}</label>
       </div>
    </div>`
      
   })
   divCheckbox.innerHTML = checkboxes;
}




//Funciones de filtrado
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
