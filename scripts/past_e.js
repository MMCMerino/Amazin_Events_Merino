//Carga de tarjetas del Home

const divTarjetas = document.getElementById("tarjetas");

let eventos ='';


for (let i = 0; i < data.events.length; i++){

   if(data.events[i].date < data.currentDate){
        eventos += ` <div class="container2 ">
                    <div class="card " style="width: 18rem;">
                      <img src= ${data.events[i].image} class="card-img-top " alt="Imagen Evento">
                      <div class="card-body">
                      <h5 class="card-title">${data.events[i].name}</h5>
                      <p class="card-text">${data.events[i].description}</p>
                      <p class="card-text ">Price ${data.events[i].price}</p>
                      <a href="./details.html" class="btn btn-danger">Details</a>
                      </div>
  
                    </div>
                 </div>`
                }
            }

console.log(eventos);
divTarjetas.innerHTML = eventos;
