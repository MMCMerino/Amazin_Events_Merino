

const queryString = document.location.search;

const id = new URLSearchParams(queryString).get("id");



const tarjetaFinal = data.events.find( (tarjeta) => (tarjeta._id == id));
console.log(tarjetaFinal);

const tarjetaDeDatos = document.getElementById("tarjeta_horizontal");

tarjetaDeDatos.innerHTML =`<div class="tarjeta">
<div class="card" style="max-width: 700px;">
  <div class="row g-0">
    <div class="col-md-6">
      <img src= "${tarjetaFinal.image}" class="img-fluid rounded-start "  alt="${tarjetaFinal.category}">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">${tarjetaFinal.name} </h5>
        <p class="card-text">Date: ${tarjetaFinal.date}</p>
        <p class="card-text">Description: ${tarjetaFinal.description}</p>
        <p class="card-text">Category: ${tarjetaFinal.category}</p>
        <p class="card-text">Place:${tarjetaFinal.place}</p>
        <p class="card-text">Capacity: ${tarjetaFinal.capacity}</p>
        <p class="card-text">Assistance: ${tarjetaFinal.assistance}</p>
        <p class="card-text">Price: ${tarjetaFinal.price}</p>
        <a href="./index.html" class="btn btn-danger"> Home</a>
      </div>
    </div>
  </div>
</div>
</div> `;