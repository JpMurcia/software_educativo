

function metodoGraficoR(n, funcionObjetivo, A, b, maximizar, RestriccionList) {
  // Definimos una función para evaluar las restricciones
   console.log("RestriccionList2", RestriccionList)

  // const evaluarRestricciones = (x, y) => {
  //   let listaCumple=[];
  //   for (let i = 0; i < n; i++) {
      

  //     switch (RestriccionList[i]) {
  //       case "<":
  //         return A[i][0] * x + A[i][1] * y < b[i];
  //       case "<=":         
  //          return A[i][0] * x + A[i][1] * y <= b[i];
  //         // listaCumple.push( A[i][0] * x + A[i][1] * y <= b[i]);
  //       case "=":
  //         return A[i][0] * x + A[i][1] * y == b[i];
  //       case ">=":
  //         return A[i][0] * x + A[i][1] * y >= b[i];
                   
  //       case ">":
  //         return A[i][0] * x + A[i][1] * y > b[i];

  //     }

  //   }
    
  //   console.log('listaCumple',listaCumple)
  // //  return true;
  // };

  const evaluarRestriccionesv2 = (x, y) => {
    let listaCumple=[];
    for (let i = 0; i < n; i++) {
      

      switch (RestriccionList[i]) {
        case "<":
          listaCumple.push(A[i][0] * x + A[i][1] * y < b[i]);
          break;
        case "<=":         
        listaCumple.push(A[i][0] * x + A[i][1] * y <= b[i]);
        break;

          // listaCumple.push( A[i][0] * x + A[i][1] * y <= b[i]);
        case "=":
          listaCumple.push(A[i][0] * x + A[i][1] * y == b[i]);
          break;

        case ">=":
          listaCumple.push(A[i][0] * x + A[i][1] * y >= b[i]);
          break;

                   
        case ">":
          listaCumple.push( A[i][0] * x + A[i][1] * y > b[i]);
          break;

      }

    }
    const boolArray = [true, true, false, true];
    let resul=false;
    if (!listaCumple.some(Boolean)) {
      // console.log("La matriz no contiene ningún registro 'false'");
      resul=true;
    } else {
     // console.log("La matriz contiene al menos un registro 'false'");
      resul=false;

    }
    
    // console.log('listaCumple',listaCumple)
    return resul;
  };

  const evaluarRestriccionesv3 = (x, y) => {
    for (let i = 0; i < n; i++) {
      switch (RestriccionList[i]) {
        case "<":
          if (A[i][0] * x + A[i][1] * y >= b[i]) {
            return false;
          }
          break;
        case "<=":
          if (A[i][0] * x + A[i][1] * y > b[i]) {
            return false;
          }
          break;
        case "=":
          if (A[i][0] * x + A[i][1] * y !== b[i]) {
            return false;
          }
          break;
        case ">=":
          if (A[i][0] * x + A[i][1] * y < b[i]) {
            return false;
          }
          break;
        case ">":
          if (A[i][0] * x + A[i][1] * y <= b[i]) {
            return false;
          }
          break;
      }
    }
    return true;
  };


  // Buscamos el punto óptimo dentro de la región factible
  let extremo = maximizar ? -Infinity : Infinity;
  let puntoOptimo = {};
  let listEnteros = [];

  for (let x = 0; x <= 20; x += 0.1) {   
    for (let y = 0; y <= 20; y += 0.1) {
      // if (evaluarRestricciones(x, y)) { 
        if (evaluarRestriccionesv3(x, y)) { 
        const valor = funcionObjetivo(x, y);
        if (maximizar && valor > extremo || !maximizar && valor < extremo) {
          extremo = valor;
          puntoOptimo = { x, y };
          if(Number.isInteger(x) && Number.isInteger(y)  ){
            listEnteros.push({x1:x,x2:y})
          }
        }
      }
    }
  }

  // Imprimimos el punto óptimo y el valor extremo de la función objetivo
  const tipo = maximizar ? "maximización" : "minimización";
  console.log(`El punto óptimo es (${puntoOptimo.x}, ${puntoOptimo.y}) con un valor ${tipo} de ${extremo}`);
  console.log(`Tabla`);
  console.log(listEnteros);


  const coefs = A.map((r, i) => [...r, b[i]]);
  const vertices = encontrarVertices(coefs.map((r) => [r[0], r[1], -r[2]]), coefs.map((r) => -r[3]));
  let extremo2 = maximizar ? -Infinity : Infinity;
  
  let puntoOptimo2 = {};
  for (const [x, y] of vertices) {
    const valor = funcionObjetivo(x, y);
    if (maximizar && valor > extremo2 || !maximizar && valor < extremo2) {
      extremo2 = valor;
      puntoOptimo2 = { x, y };
    }
  }
  const tipo2= maximizar ? "maximización" : "minimización";
  console.log(`El punto óptimo es (${puntoOptimo2.x}, ${puntoOptimo2.y}`)

  const { vertices2, A2, b2 } = encontrarRegionFactible(n, RestriccionList, b, A);
  console.log('vertices2, A, b',vertices2, A2, b2)

}

function encontrarVertices(coefs, b) {
  const n = coefs.length;
  const vertices = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const interseccion = encontrarInterseccion(coefs[i], coefs[j]);
      if (interseccion && interseccion.every((x) => x >= 0)) {
        vertices.push(interseccion);
      }
    }
  }
  vertices.push(...coefs.map((r, i) => {
    const x = b[i] / r[0];
    const y = b[i] / r[1];
    return [x, 0] || [0, y];
  }));
  return vertices;
}

function encontrarInterseccion(r1, r2) {
  const a1 = r1[0];
  const b1 = r1[1];
  const c1 = r1[2];
  const a2 = r2[0];
  const b2 = r2[1];
  const c2 = r2[2];
  const det = a1 * b2 - a2 * b1;
  if (det === 0) {
    return null; // Las restricciones son paralelas, no hay intersección
  } else {
    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;
    return [x, y];
  }
}

function encontrarRegionFactible(n, A, b) {
  const EPSILON = 1e-6;

  // Encontrar la intersección de cada par de restricciones
  const intersecciones = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const det = A[i][0] * A[j][1] - A[i][1] * A[j][0];
      if (Math.abs(det) > EPSILON) {
        const x = (A[j][1] * b[i] - A[i][1] * b[j]) / det;
        const y = (-A[j][0] * b[i] + A[i][0] * b[j]) / det;
        intersecciones.push([x, y]);
      }
    }
  }

  // Encontrar la intersección de todas las restricciones
  let regionFactible = [];
  for (let i = 0; i < intersecciones.length; i++) {
    let esFactible = true;
    for (let j = 0; j < n; j++) {
      const valor = A[j][0] * intersecciones[i][0] + A[j][1] * intersecciones[i][1];
      if (valor > b[j] + EPSILON || valor < b[j] - EPSILON) {
        esFactible = false;
        break;
      }
    }
    if (esFactible) {
      regionFactible.push(intersecciones[i]);
    }
  }

  // Ordenar los puntos de la región factible en sentido antihorario
  regionFactible.sort((a, b) => Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]));

  return regionFactible;
}



export {  metodoGraficoR }
