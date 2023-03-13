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
                              <a href="./details.html?id=${valorActual._id}" class="btn btn-danger">Details</a>
                           </div>

                       </div>
                      </div>`
                },"");

/*console.log(eventos);*/
divTarjetas.innerHTML=eventos;              

//checksbox de manera dinamica

const divCheckbox = document.getElementById("checkbox");

const chequeador = data.events.reduce((acumulador, valorActual, index) => {      //Armado de checkbox
   if (valorActual._id % 2==0){ // Se repiten de a dos, lo filtro para que no aparezcan dos veces
  return acumulador + `<div class="container1">
                          <div   class="form-check form-check-inline ms-4  " >
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox${index}" value="${valorActual.category}">
                          <label class="form-check-label" for="inlineCheckbox${index}">${valorActual.category}</label>
                          </div>
                       </div>`
   }else{
    return acumulador;}

  
},"");

//console.log(chequeador);
divCheckbox.innerHTML = chequeador;

//Intento task3 entrada de busqueda

const formulario = document.forms[0];
const boton = document.getElementById('boton');
const entrada = document.getElementById('entrada');

let valorIngresado= "";
let tarjetasBuscadas="";

formulario.addEventListener('submit', (evento)=>{
  evento.preventDefault();
  let tarjetasBuscadas="";
  valorIngresado = (entrada.value);
  
 // console.log(valorIngresado.toLowerCase());
  
  for(let i=0; i<data.events.length; i++){
    if((data.events[i].category.toLowerCase()== valorIngresado.toLowerCase()) ||( data.events[i].name.toLowerCase() == valorIngresado.toLowerCase())){
      tarjetasBuscadas += `<div class="container2 ">
      <div class="card " style="width: 18rem;">
       <img src= ${data.events[i].image} class="card-img-top " alt="Imagen Evento: ${data.events[i].name}">
          <div class="card-body">
           <h5 class="card-title">${data.events[i].name}</h5>
            <p class="card-text">${data.events[i].description}</p>
           <p class="card-text">Fecha: ${data.events[i].date}</p>
             <p class="card-text ">Price: ${data.events[i].price}</p>
             <a href="./details.html?id=${data.events[i]._id}" class="btn btn-danger">Details</a>
          </div>

      </div>
     </div>`
    }

  }
  //console.log(tarjetasBuscadas);
  divTarjetas.innerHTML = tarjetasBuscadas;
  
});

//Filtros por checkbox

//console.log([divCheckbox]);

//const chequeo = document.getElementsByClassName("form-check");

//console.log(chequeo);

divCheckbox.addEventListener('change', (evento)=>{

  tarjetasCheckeadas = "";

  let checks = Array.from(document.querySelectorAll("input[type='checkbox']"))
  //console.log(checks);
  let checkCheckeado = checks.filter(check => check.checked)[0];
  console.log(checkCheckeado.value);
  console.log(checkCheckeado);
 
  for(let i=0; i<data.events.length; i++){
  if(checkCheckeado.value == data.events[i].category){
    tarjetasCheckeadas += `<div class="container2 ">
    <div class="card " style="width: 18rem;">
     <img src= ${data.events[i].image} class="card-img-top " alt="Imagen Evento: ${data.events[i].name}">
        <div class="card-body">
         <h5 class="card-title">${data.events[i].name}</h5>
          <p class="card-text">${data.events[i].description}</p>
         <p class="card-text">Fecha: ${data.events[i].date}</p>
           <p class="card-text ">Price: ${data.events[i].price}</p>
           <a href="./details.html?id=${data.events[i]._id}" class="btn btn-danger">Details</a>
        </div>

    </div>
   </div>`
    }
  }
        
  divTarjetas.innerHTML = tarjetasCheckeadas; 
});
  





