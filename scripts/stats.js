
    const tdMayorAsistencia = document.getElementById("mayorAsistencia"); 
    console.log(tdMayorAsistencia);
    const tdMenorAsistencia = document.getElementById("menorAsistencia");
    console.log(tdMenorAsistencia);

async function traerDatos(){
   try{
     const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    // console.log(response);
     const datos = await response.json();
     //console.log(datos);
     let eventosQuePasaron = eventosPasados(datos.events, datos.currentDate);
     //console.log("eventos que pasaron",eventosQuePasaron);
     let porcentajeDeAsistenciaMayor = mayorPorcentajeDeAsistencia(eventosQuePasaron);
    // console.log(" arreglo de mayor porcentaje de asistencia",porcentajeDeAsistenciaMayor);
     let porcentajeDeAsistenciaMenor = menorPorcentajeDeAsistencia(eventosQuePasaron);
     //console.log("arreglo de menor porcentaje de asistencia",porcentajeDeAsistenciaMenor);
     
     }

   catch(error){
    console.log(error);
   }

}

traerDatos();

function eventosPasados(array1 ,array2){
    const pastEvents = array1.filter( evento => evento.date < array2);
     return pastEvents;
                   }


function mayorPorcentajeDeAsistencia(array){
    const asistenciaEnPorcentaje = array.map( elemento => {
        let porcentaje = (elemento.assistance/elemento.capacity)*100 ;
        return porcentaje ;
    });
    
    //console.log(asistenciaEnPorcentaje);
    let mayorPorcentaje = 0;
    let id =0;
    for(let i=0; i<asistenciaEnPorcentaje.length; i++) {
        if(mayorPorcentaje < asistenciaEnPorcentaje[i]){
            mayorPorcentaje = asistenciaEnPorcentaje[i];
            id = i+1;
        }
    }
    let arregloMayorPorcentaje = [];
    for(let i=0; i<array.length; i++){
        if(id==array[i]._id){
            arregloMayorPorcentaje.push(array[i]);
        }

    }

    tdMayorAsistencia.innerHTML= `<td>${arregloMayorPorcentaje[0].name}  ${mayorPorcentaje}%</td >`;
    return arregloMayorPorcentaje;
}

function menorPorcentajeDeAsistencia(array){
    const asistenciaEnPorcentaje = array.map( elemento => {
        let porcentaje = (elemento.assistance/elemento.capacity)*100 ;
        return porcentaje ;
    });
    
    //console.log(asistenciaEnPorcentaje);
    let menorPorcentaje = 100;
    let id =0;
    for(let i=0; i<asistenciaEnPorcentaje.length; i++) {
        if(menorPorcentaje > asistenciaEnPorcentaje[i]){
            menorPorcentaje = asistenciaEnPorcentaje[i];
            id = i+1;
        }
    }
    let arregloMenorPorcentaje = [];
    for(let i=0; i<array.length; i++){
        if(id==array[i]._id){
            arregloMenorPorcentaje.push(array[i]);
        }

    }

    tdMenorAsistencia.innerHTML= `<td>${arregloMenorPorcentaje[0].name}  ${menorPorcentaje}%</td >`;
    return arregloMenorPorcentaje;
}
    
