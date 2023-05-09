// import React from 'react';
import Plot from 'react-plotly.js';
import React, { useState, useEffect, useContext } from 'react';

const MyGraph = ({ Puntos, funcionObjetivo,RestriccionTex,FuncionObjTex,Matriz,MatrizVerticesFactible }) => {



  const data = [
    // {
    //   x: [1, 2, 3],
    //   y: [2, 4, 1],
    //   type: 'scatter', 
    //   mode: 'lines',
    //   line: { color: 'blue' },
    //   name: 'Línea 1'
    // },
    // {
    //   x: [6, 0],
    //   y: [0, 5],
    //   type: 'scatter',
    //   mode: 'lines',
    //   line: { color: 'blue' },
    //   name: 'Línea Jp'
    // },
    // {
    //   x: [1, 2, 3],
    //   y: [1, 2, 2],
    //   type: 'scatter',
    //   mode: 'markers',
    //   marker: { color: 'red' },
    //   name: 'Puntos'
    // },
    // {
    //   x: [1],
    //   y: [2],
    //   type: 'scatter',
    //   mode: 'markers',
    //   marker: { color: 'red' },
    //   name: 'Punto'
    // },
    // {
    //   x: [2, 3, 2],
    //   y: [3, 1, 1],
    //   type: 'scatter',
    //   mode: 'lines+markers',
    //   line: { color: 'green' },
    //   name: 'Polígono'
    // }
  ];

  const [PuntoOptimo, setPuntoOptimo] = useState({});

  const [FuncionObj, setFuncion] = useState([]);
  const [DataTotal, SetDataTotal] = useState(data);


  useEffect(() => {
    console.log('D')
    console.log('D')
    console.log('funcionObjetivo', funcionObjetivo)
    console.log('PuntosTotales', Puntos)
    console.log('Puntos.length', Puntos.length)
    let dataActual = DataTotal;
    dataActual.push({

      x: [funcionObjetivo.x],
      y: [funcionObjetivo.y],
      type: 'scatter',
      mode: 'markers',
      marker: { color: 'green' },
      name: 'Punto Optimo'

    })


    for (let index = 0; index < Puntos.length; index++) {
      // const element = array[index];
      // app.evalCommand(`P${index}=(${Puntos[index][0]},${Puntos[index][1]})`);
      dataActual.push({

        x: [Puntos[index][0]],
        y: [Puntos[index][1]],
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'red' },
        name: `P${index}`

      })
      // console.log(`Line((${Puntos[index][0]},${Puntos[index][1]})),(${Puntos[index+1][0]},${Puntos[index+1][1]}))`)
    }
    for (let index = 1; index < Puntos.length; index += 2) {       
        
      dataActual.push({

        x: [Puntos[index][0],Puntos[index][1]],
        y: [Puntos[index+1][0],Puntos[index+1][1]],
        type: 'scatter',
        mode: 'lines',
        marker: { color: 'red' },
        name: `L${index}`

      })
      console.log(`Line((${Puntos[index][0]},${Puntos[index][1]})),(${Puntos[index+1][0]},${Puntos[index+1][1]}))`)


  }  



  }, [data]);


  return (
    <Plot
      data={DataTotal}
      layout={{ title: 'Mi gráfico' }}
    />


  );
};

export { MyGraph };
