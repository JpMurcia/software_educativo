

import Geogebra from 'react-geogebra';

import React, { useRef, useEffect, useState } from 'react';

import { Form, Row,  Col } from "antd";

function Grafica(Puntos, funcionObjetivo) {

  const a = 1;
  const b = 2;
  const c = -0.5;
  const [geogebraReady, setGeogebraReady] = useState(false);

  const geogebraReadyHandler = () => {
    setGeogebraReady(true);
  };

 
  const [points, setPoints] = useState([
    { x: 1, y: 2 },
    { x: 4, y: 1 },
    { x: 3, y: -2 },
    { x: -1, y: -1 }
  ]);


  useEffect(() => {
    if (geogebraReady === true) {
      const app = window.ggbApplet;

      // app.evalCommand('B=(2,0)');
      // app.evalCommand(`C=(0,8/3)`);     
      // app.evalCommand('D=(0,0)');   
      
      // app.evalCommand(`A=(10/7,12/7)`);
   
      
      // app.evalCommand(`f(x) = (${a}/(${c})) * x - (${b}/(${c}));`);
      // app.evalCommand(`f(x) = 5x1 + 4x1;`);
      // app.evalCommand('Z = 5*x1 + 4*x2');
      // app.evalCommand('f(x)=A');


      // const P1= app.evalCommand(`P1=(${points[0].x},${points[0].y})`);
      // const P2 =app.evalCommand(`P2=(${points[1].x},${points[1].y})`);
      // app.evalCommand(`P3=(${points[2].x},${points[2].y})`);
      // app.evalCommand(`P4=(${points[3].x},${points[3].y})`);

      // const L3 = app.evalCommand(`L3=Line(((${points[0].x},${points[0].y})),(${points[1].x},${points[1].y}))`);
      // app.setColor(L3, 255, 0, 0);

    
      // app.evalCommand(`Pol=Polygon(I1,I2,I3,I4)`);
      // app.evalCommand(`Pol=Polygon((0,0),(1, 1), (3, 0), (3, 2), (0, 4))`);
    

      // const R2 = gb.evalCommandCAS("R2=Plane((12,0,0),(-2,-1,-3))");
      // gb.setColor(R2, 0, 255, 0);
      // gb.setOpacity(R2, 0.5);
      // // Restricción 3
      // const R3 = gb.evalCommandCAS("R3=Plane((0,8,0),(-1,-2,-1))");
      // gb.setColor(R3, 0, 0, 255);
      // gb.setOpacity(R3, 0.5);

    }


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



  return (
    <>
     
     <Row 

    //  hidden={true} 
     justify="center"
     >

     <Geogebra
          width={600}
          height={600}
          showMenuBar={false}
          showToolBar={false}
          // showAlgebraInput={false}
          showAlgebraInput={false}
          
          onReady={geogebraReadyHandler}
          LoadComponent={() => <h1>Loading</h1>}
        />
     </Row>
       
      
    
    </>

  );
}

export  {Grafica};
