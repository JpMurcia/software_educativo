function metodoGraficov3(coeficientes, terminosIndependientes, tiposRestricciones, funcionObjetivo, objetivoMaximizar) {
  // Determinar el tipo de objetivo (maximizar o minimizar)
  let objetivo = objetivoMaximizar ? 1 : -1;
  
  // Paso 1: Encontrar las coordenadas de los vértices de la región factible
  let vertices = encontrarVertices(coeficientes, terminosIndependientes, tiposRestricciones, objetivoMaximizar);
  let Todosvertices = encontrarTodoVertices(coeficientes, terminosIndependientes, tiposRestricciones, objetivoMaximizar);
  
  // Paso 2: Calcular el valor de la función objetivo en cada vértice
  let valoresObjetivo = vertices.map(vertice => calcularValorObjetivo(vertice, funcionObjetivo, objetivoMaximizar));
  
  // Paso 3: Encontrar el valor óptimo de la función objetivo y su coordenada correspondiente
  console.log('objetivoMaximizar',objetivoMaximizar)

  let indiceOptimo = objetivoMaximizar ? valoresObjetivo.indexOf(Math.max(...valoresObjetivo)) : valoresObjetivo.indexOf(Math.min(...valoresObjetivo));
  // console.log('valoresObjetivo.indexOf(Math.min(...valoresObjetivo))',valoresObjetivo.indexOf(Math.min(...valoresObjetivo)))
  // console.log('valoresObjetivo.indexOf(Math.max(...valoresObjetivo))',valoresObjetivo.indexOf(Math.max(...valoresObjetivo)))
  // console.log('vertices',vertices)
  // console.log('vertices',indiceOptimo)
  
  // let valorOptimo = valoresObjetivo[indiceOptimo];
  let coordenadaOptima = vertices[objetivoMaximizar?0:vertices.length-1];
  // let coordenadaOptima = Todosvertices[indiceOptimo];
  // console.log('coordenadaOptimaPRUEBA',coordenadaOptimaPRUEBA)
  console.log('indiceOptimo',indiceOptimo)
  console.log('coordenadaOptima',coordenadaOptima)
  // return {Todosvertices,vertices,valoresObjetivo,coordenadaOptima}
  return {Todosvertices,vertices,valoresObjetivo,coordenadaOptima}
}

function encontrarVertices(coeficientes, terminosIndependientes, tiposRestricciones, objetivoMaximizar) {
  let vertices = [];
  let objetivo = objetivoMaximizar ? 1 : -1; // Determinar el tipo de objetivo (maximizar o minimizar)
  for (let i = 0; i < coeficientes.length; i++) {
    for (let j = i + 1; j < coeficientes.length; j++) {
      let interseccion = encontrarInterseccion(coeficientes[i], terminosIndependientes[i], coeficientes[j], terminosIndependientes[j]);
      if (interseccion !== null && puntoEstaEnRegionFactible(interseccion, coeficientes, terminosIndependientes, tiposRestricciones)) {
        vertices.push(interseccion);
      }
    }
  }
  vertices.push([0, 0]); // Agregar el punto (0, 0)
  return vertices;
}

function puntoEstaEnRegionFactible(punto, coeficientes, terminosIndependientes, tiposRestricciones) {
  for (let i = 0; i < coeficientes.length; i++) {
    let resultado = coeficientes[i][0] * punto[0] + coeficientes[i][1] * punto[1];
    if (tiposRestricciones[i] === "<=" && resultado > terminosIndependientes[i]) {
      return false;
    }
    else if (tiposRestricciones[i] === ">=" && resultado < terminosIndependientes[i]) {
      return false;
    }
    else if (tiposRestricciones[i] === "=" && resultado !== terminosIndependientes[i]) {
      return false;
    }
  }
  return true;
}

function encontrarInterseccion(coeficientes1, terminoIndependiente1, coeficientes2, terminoIndependiente2) {
  let determinante = coeficientes1[0] * coeficientes2[1] - coeficientes1[1] * coeficientes2[0];
  if (determinante === 0) {
    return null; // Las rectas son paralelas o coincidentes
  }
  let x = (terminoIndependiente1 * coeficientes2[1] - terminoIndependiente2 * coeficientes1[1]) / determinante;
  let y = (coeficientes1[0] * terminoIndependiente2 - coeficientes2[0] * terminoIndependiente1) / determinante;
  return [x, y];
}


function encontrarTodoVertices(coeficientes, terminosIndependientes, tiposRestricciones) {
  let vertices = [];
  vertices.push([0, 0]);
  
  for (let i = 0; i < coeficientes.length; i++) {
    let xInterseccion = terminosIndependientes[i] / coeficientes[i][0];
    let yInterseccion = terminosIndependientes[i] / coeficientes[i][1];
    
    if (coeficientes[i][0] > 0 && coeficientes[i][1] > 0) {
      vertices.push([xInterseccion, 0]);
      vertices.push([0, yInterseccion]);
    } else if (coeficientes[i][0] < 0 && coeficientes[i][1] > 0) {
      vertices.push([xInterseccion, 0]);
      vertices.push([0, yInterseccion]);
    } else if (coeficientes[i][0] > 0 && coeficientes[i][1] < 0) {
      vertices.push([0, yInterseccion]);
      vertices.push([xInterseccion, 0]);
    } else {
      vertices.push([0, yInterseccion]);
      vertices.push([xInterseccion, 0]);
    }
  }
  
  // Eliminar duplicados y puntos negativos
  vertices = vertices.filter((punto, index, self) => {
    return self.indexOf(punto) === index && punto[0] >= 0 && punto[1] >= 0;
  });
  
  return vertices;
}

// function calcularValorObjetivo(coordenada, funcionObjetivo, objetivo) {
//   let resultado = 0;
//   for (let i = 0; i < funcionObjetivo.length; i++) {
//     resultado += funcionObjetivo[i] * coordenada[i];
//   }
//   return resultado * objetivo;
// }

function calcularValorObjetivo(coordenada, funcionObjetivo, objetivo) {
  let resultado = 0;
  for (let i = 0; i < funcionObjetivo.length; i++) {
    resultado += funcionObjetivo[i] * coordenada[i];
  }
  return resultado * objetivo;
}


export {metodoGraficov3}