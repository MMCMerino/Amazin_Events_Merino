
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
     let asistenciaPasada =porcentajeDeAsistenciaPasada(eventosQuePasaron);
     console.log("Asistencia",asistenciaPasada);
     let asistenciaFutura=porcentajeDeAsistenciaFutura(eventosDelFuturo);

     let datosTablaPasados=[categoriasDeEventosPasados,gananciasEventosPasados,asistenciaPasada];
     //console.log("datosTablaPasados",datosTablaPasados);
     let datosTablaFuturo=[categoriasDeEventosFuturos,gananciasEventosFuturos,asistenciaFutura];
     //console.log("datosTablaFuturos",datosTablaFuturo);

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

    tdMayorAsistencia.innerHTML= `<td>${arregloMayorPorcentaje[0].name}  ${mayorPorcentaje.toFixed(2)}%</td >`;
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

    tdMenorAsistencia.innerHTML= `<td>${arregloMenorPorcentaje[0].name}  ${menorPorcentaje.toFixed(2)}%</td >`;
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
//Funcion a trabajar 
function porcentajeDeAsistenciaPasada(array){
    let asistenciaEnPorciento= [];

        array.forEach(categorias => {
        const eventosEnCategoria = array.filter(evento => evento.category === categorias.category);
        const asistenciaEnPorcentaje = eventosEnCategoria.reduce((total,evento)=> total + evento.assistance/evento.capacity,0)/eventosEnCategoria.length*100;
        asistenciaEnPorciento.push(asistenciaEnPorcentaje);
        
        
    });
    //console.log(asistenciaEnPorciento);
    return asistenciaEnPorciento;
        
}

function porcentajeDeAsistenciaFutura(array){
    let asistenciaEnPorcientoFutura= [];

        array.forEach(categorias => {
        const eventosEnCategoria = array.filter(evento => evento.category === categorias.category);
        const asistenciaEnPorcentaje = eventosEnCategoria.reduce((total,evento)=> total + evento.estimate/evento.capacity,0)/eventosEnCategoria.length*100;
        asistenciaEnPorcientoFutura.push(asistenciaEnPorcentaje);
        
        
    });
    //console.log(asistenciaEnPorciento);
    return asistenciaEnPorcientoFutura;
        
}



//cuando tenga lista la funcion de porcentaje de asistencia se la agrego al arreglo y el arraydoble pasa a ser triple y uso arraydoble[2][i]

function pintarDatos(arraytriple,tbody){
    let ganancCategoriaAsistencia = '';
    let categor = '';
    for(let i=0 ; i<arraytriple[0].length ; i++){
         ganancCategoriaAsistencia +=  `<tr >
         <td>${arraytriple[0][i]}</td>
         <td>$${arraytriple[1][i]}</td>
         <td>${arraytriple[2][i].toFixed(2)}%</td>
         
       </tr>`
    }
    
    
    tbody.innerHTML= ganancCategoriaAsistencia; 
    }


