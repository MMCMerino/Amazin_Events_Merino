
    const tdMayorAsistencia = document.getElementById("mayorAsistencia"); 
    //console.log(tdMayorAsistencia);
    const tdMenorAsistencia = document.getElementById("menorAsistencia");
    //console.log(tdMenorAsistencia);
    const tdMayorCapacidad = document.getElementById("mayorCapacidad");
    //console.log(tdMayorCapacidad);
    const tbodyTablaDeEventosFuturos = document.getElementById("tablaEventosFuturos");
    //console.log(tbodyTablaDeEventosFuturos);
    const tbodyTablaDeEventosPasados = document.getElementById("tablaEventosPasados");
    //console.log(tbodyTablaDeEventosPasados);
    const tdEventosPasados = document.getElementById("eventosPasados");
    const tdGananciasPasadas = document.getElementById("gananciasPasadas");

async function traerDatos(){
   try{
     const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    // console.log(response);
     const datos = await response.json();
     console.log(datos.events);
     let eventosQuePasaron = eventosPasados(datos.events, datos.currentDate);
     //console.log("eventos que pasaron",eventosQuePasaron);
     let porcentajeDeAsistenciaMayor = mayorPorcentajeDeAsistencia(eventosQuePasaron);
    // console.log(" arreglo de mayor porcentaje de asistencia",porcentajeDeAsistenciaMayor);
     let porcentajeDeAsistenciaMenor = menorPorcentajeDeAsistencia(eventosQuePasaron);
     //console.log("arreglo de menor porcentaje de asistencia",porcentajeDeAsistenciaMenor);
     let mayorCapacidadEvento = eventoConMayorCapacidad(datos.events);
     // console.log("evento de mayor capacidad",mayorCapacidadEvento);
     let eventosDelFuturo = eventosFuturos(datos.events,datos.currentDate);
     // console.log("eventos futuros",eventosDelFuturo);
     let categoriasDeEventosFuturos = filtroDeCategorias(eventosDelFuturo,tbodyTablaDeEventosFuturos);
     //console.log ("categorias de eventos futuros",categoriasDeEventosFuturos);
     let categoriasDeEventosPasados = filtroDeCategorias(eventosQuePasaron,tbodyTablaDeEventosPasados);
     //console.log ("categorias de eventos pasados",categoriasDeEventosPasados);
     let gananciasEventosPasados = gananciasPorCategoria(eventosQuePasaron,categoriasDeEventosPasados,tbodyTablaDeEventosPasados);
     console.log("ganancias",gananciasEventosPasados);
     let gananciasEventosFuturos =gananciasPorCategoriasFuturo(eventosDelFuturo,categoriasDeEventosFuturos,tbodyTablaDeEventosFuturos);
     let asistenciaPasada =porcentajeDeAsistencia(eventosQuePasaron);
     console.log("Asistencia",asistenciaPasada);

     let datosTablaPasados=[categoriasDeEventosPasados,gananciasEventosPasados];
     //console.log("datosTablaPasados",datosTablaPasados);
     let datosTablaFuturo=[categoriasDeEventosFuturos,gananciasEventosFuturos];
     console.log("datosTablaFuturos",datosTablaFuturo);

     pintarDatos(datosTablaPasados,tbodyTablaDeEventosPasados);
     pintarDatos(datosTablaFuturo,tbodyTablaDeEventosFuturos);
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
    
function eventoConMayorCapacidad(array){
    let capacidad = 0;
    let id = 0;
    for(let i=0; i<array.length; i++){
        if(capacidad < array[i].capacity){
        capacidad = array[i].capacity;
        id = i+1;
        
    }
    }
    let arregloConMayorCapacidad=[];
    for(let i=0; i<array.length; i++){
        if(id==array[i]._id){
            arregloConMayorCapacidad.push(array[i]);

        }
    }
    tdMayorCapacidad.innerHTML=`<td>${arregloConMayorCapacidad[0].name}  ${capacidad}</td >`;
    return arregloConMayorCapacidad;

}

function eventosFuturos(array1 ,array2){
    const upcomingEvents = array1.filter( evento => evento.date > array2);
     return upcomingEvents;
                   }

function filtroDeCategorias(array,tbody){

    const categorias = array.map( evento => evento.category);
    console.log(categorias);
    let setCategorias= new Set(categorias)
    console.log(setCategorias) 
    let arrayCategorias = Array.from(setCategorias)
     console.log(arrayCategorias) 
    
     
    return arrayCategorias;
}
function gananciasPorCategoriasFuturo(array, arrayCategoria,tbody){
    let gananciaPorCateg = [];
    for (let i=0;i<arrayCategoria.length;i++){
        let ganancia = 0;
        for (let j=0;j<array.length;j++){
            if(array[j].category=== arrayCategoria[i]){
            ganancia += array[j].price * array[j].estimate;
            }
          
        }
        gananciaPorCateg.push(ganancia);

    }
    return gananciaPorCateg;
}

function gananciasPorCategoria(array, arrayCategoria,tbody){
    let gananciaPorCateg = [];
    for (let i=0;i<arrayCategoria.length;i++){
        let ganancia = 0;
        for (let j=0;j<array.length;j++){
            if(array[j].category=== arrayCategoria[i]){
            ganancia += array[j].price * array[j].assistance;
            }
          
        }
        gananciaPorCateg.push(ganancia);
    }

    return gananciaPorCateg;
}

function porcentajeDeAsistencia(array){
    const asistenciaEnPorciento = array.map( elemento => {
        let porcentaje = (elemento.assistance/elemento.capacity)*100 ;
        return porcentaje; 
    });

    return asistenciaEnPorciento;
}




function pintarDatos(arraydoble,tbody){
    let ganancYCategoria = '';
    let categor = '';
    for(let i=0 ; i<arraydoble[0].length ; i++){
         ganancYCategoria +=  `<tr >
         <td>${arraydoble[0][i]}</td>
         <td>$${arraydoble[1][i]}</td>
         
       </tr>`
    }
    
    
    tbody.innerHTML= ganancYCategoria; 
    }


