import React, { useEffect, useRef, useState } from 'react';
// import p5 from 'p5';

 function GraphicalMethod() {
  const canvasRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [solution, setSolution] = useState(null);

  // const restricciones = [
  //   (x, y) => x + y <= 5,
  //   (x, y) => x - y >= 1,
  //   (x, y) => y >= 0,
  //   (x, y) => x >= 0,
  //   (x, y) => x <= 3,
  //   (x, y) => y <= 4,
  // ];
// Definir la función objetivo
function objetivo(x, y) {
  return 2 * x + 4 * y;
}

// Definir las restricciones
// const restricciones = [
//   (x, y) => 5 * x + y <= 9,
//   (x, y) => 2 * x + 3 * y <= 6,
// ];

// Definir el rango y el paso
const rango = [-2, 2];
const paso = 0.1;
  const restricciones = [
    (x, y) => 5*x + y <= 9,
    (x, y) => 2*x + 3*y <= 6,
 
  ];


  function graficar(restricciones, x, y, rango, paso) {
    // Inicializar la tabla de puntos
    const puntos = [];
  
    // Recorrer todos los posibles valores de las variables
    for (let i = rango[0]; i <= rango[1]; i += paso) {
      for (let j = rango[0]; j <= rango[1]; j += paso) {
        // Verificar si el punto cumple con todas las restricciones
        let cumpleRestricciones = true;
        for (const restriccion of restricciones) {
          if (!restriccion(i, j)) {
            cumpleRestricciones = false;
            break;
          }
        }
  
        // Si el punto cumple con todas las restricciones, agregarlo a la tabla
        if (cumpleRestricciones) {
          const obj = objetivo(i, j);
          puntos.push({ x: i, y: j, obj });
        }
      }
    }
  
    // Encontrar el punto óptimo
    let maxX = 0;
    let maxY = 0;
    let maxObj = Number.NEGATIVE_INFINITY;
    for (const punto of puntos) {
      if (punto.obj > maxObj) {
        maxX = punto.x;
        maxY = punto.y;
        maxObj = punto.obj;
      }
    }
  
    // Mostrar la tabla de puntos y el punto óptimo
    console.table(puntos);
    console.log(`Punto óptimo: (${maxX}, ${maxY}), valor del objetivo: ${maxObj}`);
  
    // Dibujar los puntos en un plano cartesiano (puedes usar cualquier librería para dibujar)
    // ...
  }

  function graficar2(restricciones, x, y, rango, paso) {
    // Inicializar la tabla de puntos
    const puntos = [];
  
    // Recorrer todos los posibles valores de las variables
    for (let i = rango[0]; i <= rango[1]; i += paso) {
      for (let j = rango[0]; j <= rango[1]; j += paso) {
        // Verificar si el punto cumple con todas las restricciones
        let cumpleRestricciones = true;
        for (const restriccion of restricciones) {
          if (!restriccion(i, j)) {
            cumpleRestricciones = false;
            break;
          }
        }
  
        // Si el punto cumple con todas las restricciones, agregarlo a la tabla
        if (cumpleRestricciones) {
          const obj = objetivo(i, j);
          puntos.push({ x: i, y: j, obj });
        }
      }
    }
  
    // Encontrar el punto óptimo
    let maxX = 0;
    let maxY = 0;
    let maxObj = Number.NEGATIVE_INFINITY;
    for (const punto of puntos) {
      if (punto.obj > maxObj) {
        maxX = punto.x;
        maxY = punto.y;
        maxObj = punto.obj;
      }
    }
  
    // Ordenar los puntos por coordenada x
    puntos.sort((a, b) => a.x - b.x);
  
    // Crear la tabla
    const table = [['x', 'y', 'obj']];
    for (const punto of puntos) {
      table.push([punto.x.toFixed(2), punto.y.toFixed(2), punto.obj.toFixed(2)]);
    }
  
    // Mostrar la tabla de puntos y el punto óptimo
    console.table(table);
    console.log(`Punto óptimo: (${maxX.toFixed(2)}, ${maxY.toFixed(2)}), valor del objetivo: ${maxObj.toFixed(2)}`);
  
    // Dibujar los puntos en un plano cartesiano (puedes usar cualquier librería para dibujar)
    // ...
  }

  function encontrarOptimo(objetivo, restricciones, rango, paso) {
    const puntos = generarPuntos(restricciones, rango, paso);
    let puntoOptimo = null;
    let valorOptimo = -Infinity;
  
    for (const punto of puntos) {
      const valor = objetivo(punto.x, punto.y);
      if (valor > valorOptimo) {
        valorOptimo = valor;
        puntoOptimo = punto;
      }
    }
  
    return { puntoOptimo, valorOptimo };
  }
  
  function generarPuntos(restricciones, rango, paso) {
    const puntos = [];
  
    for (let x = rango[0]; x <= rango[1]; x += paso) {
      for (let y = rango[0]; y <= rango[1]; y += paso) {
        if (restricciones.every((restriccion) => restriccion(x, y))) {
          puntos.push({ x, y });
        }
      }
    }
  
    return puntos;
  }

   function graficar4() {
     graficar3(restricciones, 'x', 'y', rango, paso);
     const puntos = generarPuntos(restricciones, rango, paso);
     const { puntoOptimo, maximo } = encontrarOptimo(puntos);

     // Mostrar la tabla de puntos y el valor óptimo
     console.log('Puntos:');
    //  console.log(tablaPuntos(puntos));
     console.log(`\nValor óptimo: ${maximo.toFixed(2)}`);
     console.log(`Punto óptimo: (${puntoOptimo.x.toFixed(2)}, ${puntoOptimo.y.toFixed(2)})`);
   }
   function graficar3(restricciones, x, y, rango, paso) {
    // Inicializar la tabla de puntos
    const puntos = [];
  
    // Recorrer todos los posibles valores de las variables
    for (let i = rango[0]; i <= rango[1]; i += paso) {
      for (let j = rango[0]; j <= rango[1]; j += paso) {
        // Verificar si el punto cumple con todas las restricciones
        let cumpleRestricciones = true;
        for (const restriccion of restricciones) {
          if (!restriccion(i, j)) {
            cumpleRestricciones = false;
            break;
          }
        }
  
        // Si el punto cumple con todas las restricciones, agregarlo a la tabla
        if (cumpleRestricciones) {
          const obj = objetivo(i, j);
          puntos.push({ x: i, y: j, obj });
        }
      }
    }
  
    // Encontrar el punto óptimo
    let maxX = 0;
    let maxY = 0;
    let maxObj = Number.NEGATIVE_INFINITY;
    for (const punto of puntos) {
      if (punto.obj > maxObj) {
        maxX = punto.x;
        maxY = punto.y;
        maxObj = punto.obj;
      }
    }
  
    // Ordenar los puntos por coordenada x
    puntos.sort((a, b) => a.x - b.x);
  
    // Crear la tabla
    const table = [['x', 'y', 'obj']];
    for (const punto of puntos) {
      table.push([punto.x.toFixed(2), punto.y.toFixed(2), punto.obj.toFixed(2)]);
    }
  
    // Mostrar la tabla de puntos y el punto óptimo
    console.table(table);
    console.log(`Valor óptimo: ${maxObj.toFixed(2)}`);
  }

  // useEffect(() => {
  //   const sketch = (p) => {
  //     p.setup = () => {
  //       const canvas = p.createCanvas(400, 400);
  //       canvas.parent(canvasRef.current);
  //     };

  //     p.draw = () => {
  //       p.background(255);

  //       // Dibujar la restricción 1: x + y <= 10
  //       p.stroke(255, 0, 0);
  //       p.fill(255, 0, 0, 50);
  //       p.beginShape();
  //       p.vertex(0, 10 * 40);
  //       p.vertex(10 * 40, 0);
  //       p.vertex(10 * 40, (10 - x) * 40);
  //       p.vertex((10 - y) * 40, 10 * 40);
  //       p.endShape(p.CLOSE);

  //       // Dibujar la restricción 2: 2x + y <= 15
  //       p.stroke(0, 0, 255);
  //       p.fill(0, 0, 255, 50);
  //       p.beginShape();
  //       p.vertex(0, 15 * 40);
  //       p.vertex((15 - y) * 40 / 2, 0);
  //       p.vertex((15 - y) * 40 / 2, (15 - 2 * x) * 40 / 2);
  //       p.vertex((15 - 2 * y) * 40 / 2, 15 * 40);
  //       p.endShape(p.CLOSE);

  //       // Dibujar la línea de objetivo
  //       p.stroke(0);
  //       p.strokeWeight(2);
  //       p.line(0, objetivo(0, 0) * 40, objetivo(10, 0) * 40, objetivo(0, 10) * 40);

  //       // Dibujar el punto óptimo
  //       if (solution) {
  //         p.fill(0, 255, 0);
  //         p.noStroke();
  //         p.circle(x * 40, y * 40, 10);
  //       }
  //     };
  //   };

  //   const p5canvas = new p5(sketch);

  //   return () => {
  //     p5canvas.remove();
  //   };
  // }, [x, y, solution]);
  function generarPuntos(restricciones, rango, paso) {
    const puntos = [];
  
    for (let x = rango[0]; x <= rango[1]; x += paso) {
      for (let y = rango[0]; y <= rango[1]; y += paso) {
        if (restricciones.every((restriccion) => restriccion(x, y))) {
          puntos.push({ x, y });
        }
      }
    }
  
    return puntos;
  }

  function encontrarOptimo(puntos) {
    let maximo = -Infinity;
    let puntoOptimo = null;
  
    for (let punto of puntos) {
      let valor = objetivo(punto.x, punto.y);
      if (valor > maximo) {
        maximo = valor;
        puntoOptimo = punto;
      }
    }
  
    return { puntoOptimo, maximo };
  }

  function objetivo(x, y) {
    return 2 * x + 3 * y;
  }

  function restriccion1(x, y) {
    return x + y <= 10;
  }

  function restriccion2(x, y) {
    return 2 * x + y <= 15;
  }

  function solve() {
    let maxX = 0;
    let maxY = 0;
    let maxObj = Number.NEGATIVE_INFINITY;

    for (let i = 0; i <= 100; i++) {
      const x = i / 10;
      for (let j = 0; j <= 100; j++) {
        const y = j / 10;

        if (restriccion1(x, y) && restriccion2(x, y)) {
          const obj = objetivo(x, y);
          if (obj > maxObj) {
            maxX = x;
            maxY = y;
            maxObj = obj;
          }
        }
      }
    }

    setX(maxX);
    setY(maxY);
    setSolution(maxObj);
  }

  return (
    <div>
      <div ref={canvasRef}></div>
      {/* <p>Coordenadas: ({x.toFixed(2)}, {y.toFixed(2)})</p> */}
      {/* <p>Objetivo: {solution !== null ? solution.toFixed(2) : 'N/A'}</p> */}
      {/* <button onClick={solve}>Resolver</button> */}
      <button onClick={graficar4}>Resolver2</button>
    </div>
  );
}

export {GraphicalMethod}