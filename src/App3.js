import logo from './logo.svg';
import './App.css';
import MyComponent from './MyComponent';
import Geogebra from 'react-geogebra';

import React, { useRef, useEffect, useState } from 'react';

function App() {

  const a = 1;
  const b = 2;
  const c = -0.5;
  const d = 1;
  const f = `${a}x + ${b}y = 0`;


  // const options = {
  //   id: 'myGraph',
  //   width: 500,
  //   height: 500,
  //   showToolbar: false,
  //   showMenuBar: false,
  //   borderColor: '#ddd',
  //   appName: 'classic',
  //   appletOnLoad: () => {
  //     const gb = window.GGBApplet.getComponent('myGraph');
  //     gb.evalCommand(`f(x) = (${a}/(${c})) * x - (${b}/(${c}));`);
  //     gb.evalCommand(`Line(f, ${f}, 0, 10);`);
  //   },
  // };
  const [geogebraReady, setGeogebraReady] = useState(false);

  const geogebraReadyHandler = () => {
    setGeogebraReady(true);
  };

  // if (geogebraReady === true) {
  //   const app = window.ggbApplet;
  //   app.evalCommand(`f(x)=${bisectionParams.equation}`);
  //   app.evalCommand(`Root(f, ${bisectionParams.a}, ${bisectionParams.b})`);
  //   app.evalCommand(
  //     `g(x)=If(${bisectionParams.a} <= x <= ${bisectionParams.b}, ${bisectionParams.equation})`
  //   );
  // }
  const [points, setPoints] = useState([
    { x: 1, y: 2 },
    { x: 4, y: 1 },
    { x: 3, y: -2 },
    { x: -1, y: -1 }
  ]);

  // Definimos las ecuaciones de las restricciones
const ecuacion1 = (x) => 5 - x;
const ecuacion2 = () => 3;
const ecuacion3 = () => 4;

// Definimos la función objetivo
const funcionObjetivo = (x, y) => 5*x + 4*y;

// Definimos la función para evaluar las restricciones
const evaluarRestricciones = (x, y) => {
  const restriccion1 = y <= ecuacion1(x);
  const restriccion2 = x <= ecuacion2();
  const restriccion3 = y <= ecuacion3();
  return restriccion1 && restriccion2 && restriccion3;
};

// Buscamos el punto óptimo dentro de la región factible
let maxValor = -Infinity;
let puntoOptimo = {};
for (let x = 0; x <= 3; x += 0.01) {
  for (let y = 0; y <= 4; y += 0.01) {
    if (evaluarRestricciones(x, y)) {
      const valor = funcionObjetivo(x, y);
      if (valor > maxValor) {
        maxValor = valor;
        puntoOptimo = { x, y };
      }
    }
  }
}

// Imprimimos el punto óptimo y el valor máximo de la función objetivo
console.log(`El punto óptimo es (${puntoOptimo.x}, ${puntoOptimo.y}) con un valor máximo de ${maxValor}`);

  useEffect(() => {
    if (geogebraReady === true) {
      const app = window.ggbApplet;
      // app.evalCommand(`f(x)=${bisectionParams.equation}`);
      // app.evalCommand(`Root(f, ${bisectionParams.a}, ${bisectionParams.b})`);
      // app.evalCommand(
      //   `g(x)=If(${bisectionParams.a} <= x <= ${bisectionParams.b}, ${bisectionParams.equation})`
      // );
      app.evalCommand('B=(2,0)');
      app.evalCommand(`C=(0,8/3)`);     
      app.evalCommand('D=(0,0)');   
      
      app.evalCommand(`A=(10/7,12/7)`);
      // app.evalCommand('Line(A,B,"myLine")');
      
      app.evalCommand(`f(x) = (${a}/(${c})) * x - (${b}/(${c}));`);
      app.evalCommand(`f(x) = 5x1 + 4x1;`);
      app.evalCommand('Z = 5*x1 + 4*x2');
      app.evalCommand('f(x)=A');


      const P1= app.evalCommand(`P1=(${points[0].x},${points[0].y})`);
      const P2 =app.evalCommand(`P2=(${points[1].x},${points[1].y})`);
      app.evalCommand(`P3=(${points[2].x},${points[2].y})`);
      app.evalCommand(`P4=(${points[3].x},${points[3].y})`);
      // app.evalCommand("L1=P1--P2");
      // // applet.evalCommand("L1=P1--P2");
      // app.evalCommand("L2=P2--P3");
      // app.evalCommand("L3=P3--P4");
      // app.evalCommand("L4=P4--P1");
      // app.evalCommand("I1=L1∩L4");
      // app.evalCommand("I2=L1∩L2");
      // app.evalCommand("I3=L2∩L3");
      // app.evalCommand("I4=L3∩L4");

      // const L1 = createLine(ggbApp, P1.X(), P1.Y(), P2.X(), P2.Y());
      // const cmd = `L1=Line((${x1}),(${y1}),(${x2}),(${y2}))`;
      // const L1 = app.evalCommandCAS(`L1=Line((${P1.x}),(${P1.y}),(${P2.x}),(${P2.y}))`);
      // const L2 = app.evalCommand(`L2=Line((${P1.x}),(${P1.y}),(${P2.x}),(${P2.y}))`);
      const L3 = app.evalCommand(`L3=Line(((${points[0].x},${points[0].y})),(${points[1].x},${points[1].y}))`);
      app.setColor(L3, 255, 0, 0);

      // app.evalCommandCAS(`L1=Line((${P1.X()}),(${P1.Y()}),(${P2.X()}),(${P2.Y()}))`)
      app.evalCommand(`Pol=Polygon(I1,I2,I3,I4)`);
      app.evalCommand(`Pol=Polygon((0,0),(1, 1), (3, 0), (3, 2), (0, 4))`);

      // app.evalCommand('Line(0, 0, 5X1 + 4X2)');
      // app.evalCommand(`Line(f, ${f}, 0, 10);`);

    }

    // if (graphRef.current) {
    //   const gb = graphRef.current.getGgbObject();
    //   gb.evalCommand('A=(0,0)');
    //   gb.evalCommand('B=(1,1)');
    //   gb.evalCommand('Line(A,B,"myLine")');
    // }
  }, [geogebraReady]);


  const graphRef = useRef(null);

  useEffect(() => {

    if (graphRef.current) {
      const gb = graphRef.current.getGgbObject();
      gb.evalCommand('A=(0,0)');
      gb.evalCommand('B=(1,1)');
      gb.evalCommand('Line(A,B,"myLine")');
    }
  }, [graphRef]);

  const addLine = () => {
    const gb = graphRef.current.getGgbObject();
    gb.evalCommand('Line(A,B,"myLine")');
  };



//   // Definimos las ecuaciones de las restricciones
// const ecuacion1 = (x) => 5 - x;
// const ecuacion2 = () => 3;
// const ecuacion3 = () => 4;

// // Definimos la función objetivo
// const funcionObjetivo = (x, y) => 5*x + 4*y;

// // Definimos la función para evaluar las restricciones
// const evaluarRestricciones = (x, y) => {
//   const restriccion1 = y <= ecuacion1(x);
//   const restriccion2 = x <= ecuacion2();
//   const restriccion3 = y <= ecuacion3();
//   return restriccion1 && restriccion2 && restriccion3;
// };

// // Buscamos el punto óptimo dentro de la región factible
// let maxValor = -Infinity;
// let puntoOptimo = {};
// for (let x = 0; x <= 3; x += 0.01) {
//   for (let y = 0; y <= 4; y += 0.01) {
//     if (evaluarRestricciones(x, y)) {
//       const valor = funcionObjetivo(x, y);
//       if (valor > maxValor) {
//         maxValor = valor;
//         puntoOptimo = { x, y };
//       }
//     }
//   }
// }

// // Imprimimos el punto óptimo y el valor máximo de la función objetivo
// console.log(`El punto óptimo es (${puntoOptimo.x}, ${puntoOptimo.y}) con un valor máximo de ${maxValor}`);


  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

      {/* <Geogebra options={options} /> */}

      <button onClick={geogebraReadyHandler}>Agregar línea</button>
      {/* <MyComponent/> */}
      {/* <Geogebra
        ref={graphRef}
        id="ggb-element"
        width={500}
        height={500}
        borderColor="#ddd"
        appName="classic"
        showToolBar={false}
        showMenuBar={false}
      /> */}

      <Geogebra
        width={800}
        height={500}
        showMenuBar={false}
        showToolBar={false}
        showAlgebraInput={false}
        onReady={geogebraReadyHandler}
        LoadComponent={() => <h1>Loading</h1>}
      />
      {/* </header> */}
    </div>
  );
}

export default App;
