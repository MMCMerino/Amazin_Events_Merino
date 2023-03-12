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
                              <a href="./details.html" class="btn btn-danger">Details</a>
                           </div>

                       </div>
                      </div>`
                },"");



console.log(eventos);
divTarjetas.innerHTML = eventos;             




