function metodoGraficov2(coeficientes, terminosIndependientes, tiposRestricciones, funcionObjetivo, objetivoMaximizar) {
  // Determinar el tipo de objetivo (maximizar o minimizar)
  let objetivo = objetivoMaximizar ? 1 : -1;
  
  // Paso 1: Encontrar las coordenadas de los vértices de la región factible
  let vertices = encontrarVertices(coeficientes, terminosIndependientes, tiposRestricciones);
  let Todosvertices = encontrarTodoVertices(coeficientes, terminosIndependientes, tiposRestricciones);
  
  
  // Paso 2: Calcular el valor de la función objetivo en cada vértice
  let valoresObjetivo = vertices.map(vertice => calcularValorObjetivo(vertice, funcionObjetivo, objetivo));
  
  // Paso 3: Encontrar el valor óptimo de la función objetivo y su coordenada correspondiente
  let indiceOptimo = objetivoMaximizar ? valoresObjetivo.indexOf(Math.max(...valoresObjetivo)) : valoresObjetivo.indexOf(Math.min(...valoresObjetivo));
  // let valorOptimo = valoresObjetivo[indiceOptimo];
  let coordenadaOptima = vertices[indiceOptimo];
  
  // // Paso 4: Mostrar el resultado en una tabla de coordenadas
  // let tablaCoordenadas = "<table><tr><th>Coordenada</th><th>Valor de la función objetivo</th></tr>";
  // vertices.forEach((vertice, indice) => {
  //   tablaCoordenadas += `<tr><td>(${vertice[0]}, ${vertice[1]})</td><td>${valoresObjetivo[indice]}</td></tr>`;
  // });
  // tablaCoordenadas += `<tr><td>(${coordenadaOptima[0]}, ${coordenadaOptima[1]})</td><td>${valorOptimo}</td></tr></table>`;
  

  // console.log(tablaCoordenadas);

  // console.log('coordenadaOptima',coordenadaOptima);
  // console.log('valorOptimo',valorOptimo);
  // console.log('valoresObjetivo',valoresObjetivo);
  // console.log('vertices',vertices);
  // console.log('Todosvertices',Todosvertices);
  
  return {Todosvertices,vertices,valoresObjetivo,coordenadaOptima}
}

function encontrarVertices(coeficientes, terminosIndependientes, tiposRestricciones) {
  let vertices = [];
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

function encontrarTodoVertices(coeficientes, terminosIndependientes, tiposRestricciones) {
  let vertices = [];
  vertices.push([0, 0]);
  for (let i = 0; i < coeficientes.length; i++) {
    // for (let j = i + 1; j < coeficientes.length; j++) {
    //   let interseccion = encontrarInterseccion(coeficientes[i], terminosIndependientes[i], coeficientes[j], terminosIndependientes[j]);
    //   if (interseccion !== null && puntoEstaEnRegionFactible(interseccion, coeficientes, terminosIndependientes, tiposRestricciones)) {
    //     vertices.push(interseccion);
    //   }
    // }
    vertices.push([0, terminosIndependientes[i]/coeficientes[i][0]]);
    vertices.push([ terminosIndependientes[i]/coeficientes[i][1],0]);

  }
   // Agregar el punto (0, 0)
  return vertices;
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

function calcularValorObjetivo(coordenada, funcionObjetivo, objetivo) {
  let resultado = 0;
  for (let i = 0; i < funcionObjetivo.length; i++) {
    resultado += funcionObjetivo[i] * coordenada[i];
  }
  return resultado * objetivo;
}



export {metodoGraficov2}