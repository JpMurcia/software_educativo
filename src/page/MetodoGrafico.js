function metodoGrafico(n, funcionObjetivo, A, b, maximizar) {
    // Definimos una función para evaluar las restricciones
    const evaluarRestricciones = (x, y) => {
      for (let i = 0; i < n; i++) {
        const restriccion = A[i][0] * x + A[i][1] * y <= b[i];
        if (!restriccion) {
          return false;
        }
      }
      return true;
    };
  
    // Buscamos el punto óptimo dentro de la región factible
    let extremo = maximizar ? -Infinity : Infinity;
    let puntoOptimo = {};
    for (let x = 0; x <= 10; x += 0.01) {
      for (let y = 0; y <= 10; y += 0.01) {
        if (evaluarRestricciones(x, y)) {
          const valor = funcionObjetivo(x, y);
          if (maximizar && valor > extremo || !maximizar && valor < extremo) {
            extremo = valor;
            puntoOptimo = { x, y };
          }
        }
      }
    }
  
    // Imprimimos el punto óptimo y el valor extremo de la función objetivo
    const tipo = maximizar ? "maximización" : "minimización";
    console.log(`El punto óptimo es (${puntoOptimo.x}, ${puntoOptimo.y}) con un valor ${tipo} de ${extremo}`);
  }
  

  const n = 3; // Número de restricciones
const A = [[-1, 2], [1, 1], [2, 1]]; // Matriz de coeficientes de las restricciones
const b = [4, 5, 7]; // Vector de términos independientes de las restricciones
const funcionObjetivo = (x, y) => 5*x + 4*y; // Función objetivo
const maximizar = true; // Indica si se quiere maximizar o minimizar la función objetivo

metodoGrafico(n, funcionObjetivo, A, b, maximizar);
