

function metodoGraficoR(n, funcionObjetivo, A, b, maximizar, RestriccionList) {
  // Definimos una función para evaluar las restricciones
  console.log("RestriccionList", RestriccionList)

  const evaluarRestricciones = (x, y) => {
    for (let i = 0; i < n; i++) {
      

      switch (RestriccionList[i]) {
        case "<":
          return A[i][0] * x + A[i][1] * y < b[i];
        case "<=":
          return A[i][0] * x + A[i][1] * y <= b[i];
        case "=":
          return A[i][0] * x + A[i][1] * y == b[i];
        case ">=":
          return A[i][0] * x + A[i][1] * y >= b[i];
        //  return restriccion;             
        case ">":
          return A[i][0] * x + A[i][1] * y < b[i];

      }

    }
    return true;
  };

  // Buscamos el punto óptimo dentro de la región factible
  let extremo = maximizar ? -Infinity : Infinity;
  let puntoOptimo = {};
  let listEnteros = [];

  for (let x = 0; x <= 10; x += 0.01) {
    for (let y = 0; y <= 10; y += 0.01) {
      if (evaluarRestricciones(x, y)) {
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
}




export {  metodoGraficoR }
