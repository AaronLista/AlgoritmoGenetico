/* 
*  modificacion del algoritmo genetico para tener una funcion de mutacion 
*  elaborado por Aaron Lista 
*  C.I: 28017501
*  Evaluacion sumativa 3 Algoritmos Geneticos 
*/

// definicion de las contantes 

//el vector productos es un vector que tiene 6 elementos, 
//cada elemento representa un producto y este almacena su volumen y su beneficio

const productos = [[1,2],[2,5],[4,6],[5,10],[7,13],[8,16]]
const volumenMax = 8;

/*
 * por ejemplo el elemento 0 del vector porductos ([1,2])
 * almacena dentro de si los datos de dicho producto donde 
 * 1 es el valor del volumen que ocupa dicho elemento y 
 * 2 es el beneficio que dicho elemento representa
 */

var features = new Array();
var descendencia = new Array();
var poblacion = 20; 
var beneficio = new Array();
var inviabilidad = new Array();
var fitness = new Array();

//features es la matriz que almacenara a los individuos del algoritmo y 
//poblacion es el numero de individuos que se generaran en el algoritmo
//ciclo que se encarga de generar la poblacion inicial

for(i = 0; i < poblacion; i++){
    features[i] = new Array()
    for(j=0; j<6 ; j++){
        features[i][j] = Math.floor((Math.random() * (2)));
    }
}



//ciclo que se encarga de calcular el beneficio de cada individuo
function calcularBeneficio(){
    let beneficioArray = new Array();
    for(i=0; i<features.length; i++){
        B = 0;
        for(j=0; j<6; j++){
            if(features[i][j] == 1){
                B += productos[j][1];
            }
        }
        beneficioArray.push(B);
    }
    return beneficioArray;
}

//ciclo que se encarga de calcular si dicho individuo es inviable
function calcularInviabilidad(){
    let inviabilidadArray = new Array();
    for(i=0; i<features.length; i++){
        V = 0;
        for(j=0; j<6; j++){
            if(features[i][j] == 1){
                V += productos[j][0];
            }
        }
        inviabilidadArray.push(V-volumenMax <= 0? 0 : V-volumenMax);
    }
    return inviabilidadArray;
}



//funcion que se encarga de seleccionar a los 4 mejores individuos de toda la poblacion
function fitnessMax(){
    fitOrder = fitness.slice();
    fitOrder.sort(function(a, b){return a - b});

    let result = fitOrder.filter((item,index)=>{
        return fitOrder.indexOf(item) === index;
      })
    
    max = new Array()
    let i = 1;
    let idx;
    while(max.length < 4){
        idx = fitness.indexOf(result[result.length-i]);
        while(idx != -1){
            if(max.length < 4){
                max.push(idx);
                idx = fitness.indexOf(result[result.length-i],idx+1);
            } else {
                idx = -1;
            }
        }
        i++;
    }
    return max;
} 

//funcion que causara una mutacion en un individuo de las descendencia
function mutar(descendencia){
    let indx = 0;//indice que nos permitira seleccionar un individuo concreto
    let indx2 = 0;//indice que nos permitira cambiar un solo alelo del genotipo del individuo seleccionado
    indx = Math.floor((Math.random() * (16))); 
    indx2 = Math.floor((Math.random() * (6))); 
    console.log("mutacion en el individuo "+indx)
    console.log("individuo no mutado")
    console.log(descendencia[indx])
    if(descendencia[indx][indx2]==1){
        descendencia[indx][indx2] = 0;
    } else {
        descendencia[indx][indx2] = 1;
    }
    console.log("individuo mutado")
    console.log(descendencia[indx])
}

//funcion que se encarga de reproducir a los mejoren individuos con individuos aleatorios de la poblacion
function reproducir(maxFit){
    let descendencia = new Array;
    let hijo
    let madre
    let Pm = Math.floor((Math.random() * (100 - 1 + 1)) + 1);
    padre = maxFit[0]
    maxFit.forEach(padre => {
        madre = Math.floor((Math.random() * (20)))
        hijo = features[padre].slice();
        hijo[0] = features[madre][0]
        hijo[1] = features[madre][1]
        hijo[2] = features[madre][2]
        descendencia.push(hijo.slice())
        hijo = features[padre].slice();
        hijo[3] = features[madre][3]
        hijo[4] = features[madre][4]
        hijo[5] = features[madre][5]
        descendencia.push(hijo.slice())
        hijo = features[padre].slice();
        hijo[2] = features[madre][2]
        hijo[3] = features[madre][3]
        descendencia.push(hijo.slice())
        hijo = features[madre].slice();
        hijo[2] = features[padre][2]
        hijo[3] = features[padre][3]
        descendencia.push(hijo.slice())
   });
   //la mutacion solo sucedera con una probabilidad del 20% 
   if(Pm <= 20){
    mutar(descendencia)
   } 
   return descendencia;
}


var t = 1;


// ciclo principal en donde se ejecutan todas las funciones
do{
    let a = 4;
    console.log("generacion: "+ t);
    console.log("individuos");
    console.log(features);
    //calcular el beneficio
    beneficio = calcularBeneficio();
    console.log("beneficio");
    console.log(beneficio)
    //calcular inviabilidad 
    inviabilidad = calcularInviabilidad();
    console.log("inviabilidad");
    console.log(inviabilidad)
    //sacar el fitnes de cada individuo
  
    for(i=0; i<features.length; i++){
        fitness[i] = (beneficio[i] - a*(inviabilidad[i]))
    }
    console.log("fitness")
    console.log(fitness)
    //obtener el mejor individuo y los dos peores individuos 
    fit = fitnessMax();
    console.log("mejor individuos");
    console.log(fit)

    descendencia = reproducir(fit);
    for(i=0;i<4;i++){
        descendencia.push(features[fit[i]])
    }
     features = descendencia;
  
    t++;


}while(t<=20)






