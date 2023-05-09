import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import './Teoria.css';

const Teoria = () => {
  const [current, setCurrent] = useState('mail');

  return (

    <>

      <div >
        
        
        <h1 className="Titulo">
        
        Explicación del método grafico
      
        
        </h1>
        <p className="parrafo">
          <br/>
          El método grafico sirve para resolver, con una precisión aceptable, una gran parte de los problemas de optimización lineal de dos variables. 
          Tiene dos etapas importantes, la primera es la determinación de la región admisible o realizable o factible (el conjunto de puntos que cumplen todas las restricciones) y la segunda es la búsqueda 
          del punto óptimo (o de los puntos óptimos) en la región admisible. 
           <br/>
           La determinación de la región admisible es muy sencilla, pues se trata de obtener la intersección de semiplanos (desigualdades) y de
           rectas (igualdades). Como generalmente las variables son no negativas, el estudio se hace únicamente en el primer cuadrante. El conjunto admisible estar a entonces limitado por semirrectas 
           (en este caso el conjunto admisible no es acotado) o por segmentos de recta. Los valores de las coordenadas de los vértices se pueden determinar gráficamente o de manera más precisa, analíticamente, 
           calculando la solución de las dos ecuaciones (rectas) que determinan el vértice (un vértice corresponde a la noción, que se verá posteriormente, de punto extremo de un convexo). 
           Una vez hallada la región admisible se procede a buscar el óptimo. Se necesita entonces saber cómo varía la función objetivo y, sobre todo, en qué dirección mejora. Una manera sencilla consiste en dar dos valores 
           arbitrarios diferentes a z y dibujar las rectas (paralelas) correspondientes. Esto permite saber en qué sentido mejora el valor de z. Para cualquier otro valor de z, la recta correspondiente será paralela. 
           Únicamente queda por encontrar una de estas rectas paralelas, con el mejor valor posible de z y que pase al menos por un punto de la región admisible.
        </p>
      </div>
     



    </>


  );
};
export { Teoria };
