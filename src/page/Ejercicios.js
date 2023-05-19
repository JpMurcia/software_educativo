import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
// import { useState } from 'react';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { metodoGraficov3 } from './metodoGraficov3';
import Geogebra from 'react-geogebra';

import { Table, Button, Modal, Input, Form, Row, Select, message, Divider, Col, Tag, Image } from "antd";

const { Option } = Select;
const { Item } = Form;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const InitialSimboloRestricciones = [
  {
    "id": 2,
    "nameSimbolo": "<=",
    "o_state": 1
  }
  ,
  {
    "id": 3,
    "nameSimbolo": "=",
    "o_state": 1
  }
  ,
  {
    "id": 4,
    "nameSimbolo": ">=",
    "o_state": 1
  }

];


const InitialObjetivoEjecio1 = [
  {
    "id": "Max z = 300x + 300y",
    "name": "Max z = 300x + 300y",

  }
  ,
  {
    "id":"Max z = 300x + 700y",
    "name": "Max z = 300x + 700y",
  }
  ,
  {
    "id": "Max z = 700x + 700y",
    "name": "Max z = 700x + 700y",
  }

];



const InitialRestriccion1Ejecio1 = [
  {
    "id": "8x  +  10y  <=80",
    "name": "8x  +  10y  <=80",

  }
  ,
  {
    "id":"8x  -  10y  <= 80",
    "name": "8x  -  10y  <= 80",
  }
  ,
  {
    "id": "5x  +  10y  <= 80",
    "name": "5x  +  10y  <= 80",
  }

];


const InitialRestriccion2Ejecio1 = [
  {
    "id": "8x  +  10y  <=80",
    "name": "8x  +  10y  <=80",

  }
  ,
  {
    "id":"-2x  +  5y  <= 25",
    "name": "-2x  +  5y  <= 25",
  }
  ,
  {
    "id": "2x  +  5y  <= 25",
    "name": "2x  +  5y  <= 25",
  }

];

const Ejercicios = () => {
  const [current, setCurrent] = useState('mail');

  const InitialMatriz = [
    {
      key: 0,
      x: 5,
      y: 6,
      simbolo: "<=",
      simbolo_id: 2,
      restriccion: 1
    },
    {
      key: 1,
      x: 4,
      y: 3,
      simbolo: "<",
      simbolo_id: 1,
      restriccion: 2
    }
  ];

  const InitialMatrizVertices = [
    [0, 0],
    [1, 1],
    [1, 1]

  ];

  const InitialFuncion =
  {

    x: 1,
    y: 1,
    // simbolo: "<=",
    maxi: true,

  };
  const InitialMaxiMini = [
    {
      "id": 1,
      "nameSimbolo": "Maximizar",
      "o_state": true
    },
    {
      "id": 2,
      "nameSimbolo": "Minimizar",
      "o_state": false
    }
  ];



  const [modal, setModal] = useState(false);

  const [fromData, setFormData] = useState({});
  const [Simbolo, setSimbolo] = useState(InitialSimboloRestricciones);
  const [Matriz, setMatriz] = useState(InitialMatriz);

  const [MatrizEje1, setMatrizEje1] = useState(InitialMatriz);
  const [FuncionObjEje1, setFuncionEje1] = useState(InitialFuncion);
  const [MostarResulEje1, setMostarResulEje1] = useState(true);
  const [TablaSolucionEje1, setTablaSolucionEje1] = useState([]);
  const [FuncionObjTexEje1, setFuncionObjTexEje1] = useState();



  const [OpcionesEje1Select1, setOpcionesEje1Select1] = useState(InitialObjetivoEjecio1);
  const [OpcionesEje1Select2, setOpcionesEje1Select2] = useState(InitialRestriccion1Ejecio1);
  const [OpcionesEje1Select3, setOpcionesEje1Select3] = useState(InitialRestriccion2Ejecio1);



  const [MatrizEje2, setMatrizEje2] = useState({});
  const [FuncionObjEje2, setFuncionEje2] = useState(InitialFuncion);
  const [MostarResulEje2, setMostarResulEje2] = useState(true);
  const [TablaSolucionEje2, setTablaSolucionEje2] = useState([]);
  const [FuncionObjTexEje2, setFuncionObjTexEje2] = useState();



  const [MatrizVertices, setMatrizVertices] = useState(InitialMatrizVertices);
  const [PuntoOptimo, setPuntoOptimo] = useState({});
  const [FuncionObj, setFuncion] = useState(InitialFuncion);

  const [MatrizVerticesFactible, setMatrizVerticesFactible] = useState([]);


  const [FuncionObjTex, setFuncionObjTex] = useState();
  const [TablaSolucion, setTablaSolucion] = useState([]);
  const [RestriccionTex, setRestriccionTex] = useState([]);
  // const [FuncionObj, setFuncion] = useState(InitialFuncion);

  const [MostarResul, setMostarResul] = useState(true);


  const columns = [
    {
      title: 'Punto',
      dataIndex: 'punto',
      key: 'punto',
    }, {
      title: 'Coordenadas (x,y)',
      dataIndex: 'coordenadas',
      key: 'coordenadas',
    },
    {
      title: `Valor de ${FuncionObjTex}`,
      dataIndex: 'funcionObjeto',
      key: 'funcionObjeto',
    },

    {
      title: 'Estado',
      dataIndex: 'optimo',
      key: 'optimo',
      render: ((state) => <> {state == "Optimo" ? <Tag color='green'  >Optimo</Tag> : state == "Factible" ? <Tag color='blue'  >Factible </Tag> : <Tag color='volcano'  >No Factible</Tag>}</>)
    }


  ];

  const columnsEjec1 = [
    {
      title: 'Punto',
      dataIndex: 'punto',
      key: 'punto',
    }, {
      title: 'Coordenadas (x,y)',
      dataIndex: 'coordenadas',
      key: 'coordenadas',
    },
    {
      title: `Valor de ${FuncionObjTexEje1}`,
      dataIndex: 'funcionObjeto',
      key: 'funcionObjeto',
    },

    {
      title: 'Estado',
      dataIndex: 'optimo',
      key: 'optimo',
      render: ((state) => <> {state == "Optimo" ? <Tag color='green'  >Optimo</Tag> : state == "Factible" ? <Tag color='blue'  >Factible </Tag> : <Tag color='volcano'  >No Factible</Tag>}</>)
    }


  ];

  const columnsEjec2 = [
    {
      title: 'Punto',
      dataIndex: 'punto',
      key: 'punto',
    }, {
      title: 'Coordenadas (x,y)',
      dataIndex: 'coordenadas',
      key: 'coordenadas',
    },
    {
      title: `Valor de ${FuncionObjTexEje2}`,
      dataIndex: 'funcionObjeto',
      key: 'funcionObjeto',
    },

    {
      title: 'Estado',
      dataIndex: 'optimo',
      key: 'optimo',
      render: ((state) => <> {state == "Optimo" ? <Tag color='green'  >Optimo</Tag> : state == "Factible" ? <Tag color='blue'  >Factible </Tag> : <Tag color='volcano'  >No Factible</Tag>}</>)
    }


  ];
  const [messageApi, contextHolder] = message.useMessage();
  const success = (Mensaje) => {
    messageApi.open({
      type: 'success',
      content: Mensaje,
    });
  };

  const error = (Mensaje) => {
    messageApi.open({
      type: 'error',
      content: Mensaje,
    });
  };

  const abrirCerrarModal = () => {


    setModal(!modal);
  }

  //////////////////////////////////////////
  ////////////// EJECICIO 1 ////////////////
  //////////////////////////////////////////
  const handleChangeEje1 = (e, item) => {
    const { name, value, title } = e.target;
    let matrizActual = MatrizEje1;
    console.log('D', matrizActual[name])
    if (title == "x") {
      console.log(matrizActual[name].x)
      matrizActual[name].x = value
    }
    else {
      if (title == "restriccion") {
        console.log(matrizActual[name].restriccion)
        matrizActual[name].restriccion = value
      } else {
        console.log(matrizActual[name].y)
        matrizActual[name].y = value
      }

    }

    console.log(name, value, title, item);
    console.log('Actual', matrizActual);
    setMatrizEje1(matrizActual)

    console.log(Matriz);
  }
  const handleChangeSelectMaxiMiniEje1 = (data) => {
    console.log('selected', { data });
    console.log('selected key', data.key);
    console.log('selected value', data.value);

    setFuncionEje1({
      ...FuncionObjEje1,
      maxi: data.value == 2 ? false : true
    })
  };
  const handleChangeGeneralEje1 = (e) => {
    const { name, value, title } = e.target;

    console.log(name, value, title);

    setFuncionEje1({
      ...FuncionObjEje1,
      [name]: value
    })

  }
  const handleChangeSelectRestriccionEje1 = (data, item) => {
    console.log('selected', { data });
    console.log('selected key', data.key);
    console.log('selected value', data.value);
    console.log('selected item', item);
    let matrizActual = MatrizEje1;


    switch (data.key) {
      case "1":
        matrizActual[item.key].simbolo = "<";
        matrizActual[item.key].simbolo_id = 1;

        break;

      case "2":
        matrizActual[item.key].simbolo = "<=";
        matrizActual[item.key].simbolo_id = 2;

        break;

      case "3":
        matrizActual[item.key].simbolo = "=";
        matrizActual[item.key].simbolo_id = 3;
        break;

      case "4":
        matrizActual[item.key].simbolo = ">=";
        matrizActual[item.key].simbolo_id = 4;

        break;
      //  return restriccion;             
      case "5":
        matrizActual[item.key].simbolo = ">";
        matrizActual[item.key].simbolo_id = 5;

        break;


    }


    console.log('matrizActual', matrizActual)


  };




  const onFinishCalculoEje1 = (values) => {


    try {




      console.log('MATRIZ ENVIADA', MatrizEje1)
      console.log('FuncionObj ENVIADA', FuncionObjEje1)
      let ResulEje1 = {
        maxi: true,
        x: 0.8,
        y: 0.1
      }

      let ResulMatrizEje1 = [
        {
          key: 0,
          x: '1',
          y: '1',
          simbolo: '<=',
          restriccion: "700"
        },
        {
          key: 1,
          x: '5',
          y: '8',
          simbolo: '<=',
          restriccion: "5000"
        }
      ]
      if (FuncionObjEje1.maxi === true &&
        parseFloat(FuncionObjEje1.x) === ResulEje1.x &&
        parseFloat(FuncionObjEje1.y) === ResulEje1.y) {
        console.log("COICIDE LA FUNCION OBJETIVO")
        for (let index = 0; index < MatrizEje1.length; index++) {
          if (MatrizEje1[index].key === ResulMatrizEje1[index].key &&
            MatrizEje1[index].x === ResulMatrizEje1[index].x &&
            MatrizEje1[index].y === ResulMatrizEje1[index].y &&
            MatrizEje1[index].simbolo === ResulMatrizEje1[index].simbolo &&
            MatrizEje1[index].restriccion === ResulMatrizEje1[index].restriccion) {
            // const element = array[index];
            console.log("COICIDE LA FUNCION MATRIZ")
          } else {
            error("No Corresponde los valores con el ejercicion")
            return null;
          }

        }

      } else {

        error("No Corresponde los valores con el ejercicion")
        return null;

      }

      let n2 = 2; // Número de restricciones
      let A2 = []; // Matriz de coeficientes de las restricciones
      let b2 = []; // Vector de términos independientes de las restricciones
      let ListaResticio = []; // Matriz de coeficientes de las restricciones
      let RestriccionSibolos2 = []; // Vector de términos independientes de las restricciones



      n2 = MatrizEje1.length;

      for (let index = 0; index < MatrizEje1.length; index++) {
        // const element = array[index];
        A2.push([MatrizEje1[index].x, MatrizEje1[index].y])
        ListaResticio.push(MatrizEje1[index].x + 'x + ' + MatrizEje1[index].y + 'y ' + MatrizEje1[index].simbolo + ' ' + MatrizEje1[index].restriccion)
        b2.push(MatrizEje1[index].restriccion)
        RestriccionSibolos2.push(MatrizEje1[index].simbolo)

      }


      let objetivoMaximizar = FuncionObjEje1.maxi;
      let funcionObjetivo3 = [FuncionObjEje1.x, FuncionObjEje1.y];
      let funcionObjetivoTexto = (FuncionObjEje1.maxi ? 'Max ' : 'Min ') + "" + FuncionObjEje1.x + 'x + ' + FuncionObjEje1.y + 'y'
      console.log('A2', A2)
      console.log('b2', b2)
      console.log('RestriccionSibolos2', RestriccionSibolos2)
      console.log('ListaResticio', ListaResticio)
      console.log('funcionObjetivoTexto', funcionObjetivoTexto)
      console.log('objetivoMaximizar', objetivoMaximizar)
      let resultado2 = metodoGraficov3(A2, b2, RestriccionSibolos2, funcionObjetivo3, objetivoMaximizar);
      let resultado3 = metodoGraficov3(A2, b2, RestriccionSibolos2, funcionObjetivo3, objetivoMaximizar);
      let listaPuntoFactibleV = resultado2.Todosvertices;
      let listaPuntoFactible = []
      let listaPuntoTexto = []
      for (let index = 0; index < resultado2.Todosvertices.length; index++) {
        listaPuntoFactible.push(puntoEstaEnRegionFactible(resultado2.Todosvertices[index], A2, b2, RestriccionSibolos2))
        if (!puntoEstaEnRegionFactible(resultado2.Todosvertices[index], A2, b2, RestriccionSibolos2)) {
          listaPuntoFactibleV.splice(index, 1);
        }
      }
      console.log('resultado2.Todosvertices2', resultado3.Todosvertices);
      console.log('FuncionObjEje1', FuncionObjEje1);
      console.log('FuncionObjEje1', FuncionObjEje1.x);
      console.log(`FuncionObjEje2  ${FuncionObjEje1.x}`);
      for (let index = 0; index < resultado3.Todosvertices.length; index++) {
        let calculo = parseFloat(FuncionObjEje1.x) * parseFloat(resultado3.Todosvertices[index][0]) + parseFloat(FuncionObjEje1.y) * parseFloat(resultado3.Todosvertices[index][1]);
        let texto = puntoEstaEnRegionFactible(resultado3.Todosvertices[index], A2, b2, RestriccionSibolos2) ? 'Factible' : 'No Factible';
        listaPuntoTexto.push({
          punto: index,
          coordenadas: `(${resultado3.Todosvertices[index][0]},${resultado3.Todosvertices[index][1]})`,
          funcionObjeto: ` ${FuncionObjEje1.x}(${resultado3.Todosvertices[index][0]}) + ${FuncionObjEje1.y}(${resultado3.Todosvertices[index][1]}) = ${calculo}`
          , optimo: texto
        })
      }
      listaPuntoTexto.push({
        punto: listaPuntoTexto.length,
        coordenadas: `(${resultado2.coordenadaOptima[0]},${resultado2.coordenadaOptima[1]})`,
        funcionObjeto: ` ${FuncionObjEje1.x}(${resultado2.coordenadaOptima[0]}) + ${FuncionObjEje1.y}(${resultado2.coordenadaOptima[1]}) = ${resultado2.valoresObjetivo[0]}`
        , optimo: 'Optimo'
      })

      console.log('Vertices Factibles', listaPuntoFactible)
      console.log(' listaPuntoTexto', listaPuntoTexto)
      console.log('Vertices listaPuntoFactibleV', listaPuntoFactibleV)
      listaPuntoFactibleV.push([resultado2.coordenadaOptima[0], resultado2.coordenadaOptima[1]])

      setTablaSolucionEje1(listaPuntoTexto);
      setMatrizVertices(resultado3.Todosvertices);

      setFuncionObjTexEje1(funcionObjetivoTexto)
      setRestriccionTex(ListaResticio)
      setMatrizVerticesFactible(listaPuntoFactibleV);


      setPuntoOptimo({
        x: resultado2.coordenadaOptima[0],
        y: resultado2.coordenadaOptima[1]
      })
      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////
      const app = window.ggbApplet;
      app.reset()



      listaPuntoFactibleV.sort(compararCoordenadas);
      listaPuntoFactibleV.push(listaPuntoFactibleV[0])
      console.log('listaPuntoFactibleV ORDENADO', listaPuntoFactibleV)

      app.evalCommand(`Optimo =(${resultado2.coordenadaOptima[0]},${resultado2.coordenadaOptima[1]})`);
      let lista = ''
      for (let index = 0; index < listaPuntoFactibleV.length; index++) {

        lista = lista + `(${listaPuntoFactibleV[index][0]},${listaPuntoFactibleV[index][1]})`
      }
      for (let index = 0; index < resultado3.Todosvertices.length; index++) {

        app.evalCommand(`P${index}=(${resultado3.Todosvertices[index][0]},${resultado3.Todosvertices[index][1]})`);

      }
      const result = lista.replace(/\)\(/g, "),(");

      console.log(result); // (0,0),(6,0),(0,6),(5,0)
      console.log('lista Poligono', lista)

      app.evalCommand(`AreaFactible=Polygon(${result})`);

      let index2 = 0;
      for (let index = 1; index < resultado3.Todosvertices.length; index += 2) {
        app.evalCommand(`Resticcion${index2 + 1}=Line((${resultado3.Todosvertices[index][0]},${resultado3.Todosvertices[index][1]}),(${resultado3.Todosvertices[index + 1][0]},${resultado3.Todosvertices[index + 1][1]}))`);
        index2++;
      }
      console.log('lista MatrizVerticesFactible', MatrizVerticesFactible)

      if (resultado2.valoresObjetivo[0] === 0) {
        error('No se encontro una soluccion Optima')
        // setMostarResul(false)
        setMostarResulEje1(true)

        app.reset()

      } else {

        success('Se ha calculado Sactifactoriamente')
        setMostarResulEje1(!MostarResulEje1)
        abrirCerrarModal();
      }


    } catch (error) {
      error('Se presento un Error');
    }


  };

  //////////////////////////////////////////
  ////////////// EJECICIO 2 ////////////////
  //////////////////////////////////////////


  const handleChangeEje2 = (e, item) => {
    const { name, value, title } = e.target;
    let matrizActual2 = MatrizEje2;
    console.log('D', matrizActual2[name])
    if (title == "x") {
      console.log(matrizActual2[name].x)
      matrizActual2[name].x = value
    }
    else {
      if (title == "restriccion") {
        console.log(matrizActual2[name].restriccion)
        matrizActual2[name].restriccion = value
      } else {
        console.log(matrizActual2[name].y)
        matrizActual2[name].y = value
      }

    }

    console.log(name, value, title, item);
    console.log('Actual', matrizActual2);

    console.log(MatrizEje2);


  }
  const handleChangeSelectMaxiMiniEje2 = (data) => {
    console.log('selected', { data });
    console.log('selected key', data.key);
    console.log('selected value', data.value);

    setFuncionEje2({
      ...FuncionObjEje2,
      maxi: data.value == 2 ? false : true
    })
  };
  const handleChangeGeneralEje2 = (e) => {
    const { name, value, title } = e.target;

    console.log(name, value, title);

    setFuncionEje2({
      ...FuncionObjEje2,
      [name]: value
    })

  }
  const handleChangeSelectRestriccionEje2 = (data, item) => {
    console.log('selected', { data });
    console.log('selected key', data.key);
    console.log('selected value', data.value);
    console.log('selected item', item);
    let matrizActual2 = MatrizEje2;


    switch (data.key) {
      case "1":
        matrizActual2[item.key].simbolo = "<";
        matrizActual2[item.key].simbolo_id = 1;

        break;

      case "2":
        matrizActual2[item.key].simbolo = "<=";
        matrizActual2[item.key].simbolo_id = 2;

        break;

      case "3":
        matrizActual2[item.key].simbolo = "=";
        matrizActual2[item.key].simbolo_id = 3;
        break;

      case "4":
        matrizActual2[item.key].simbolo = ">=";
        matrizActual2[item.key].simbolo_id = 4;

        break;
      //  return restriccion;             
      case "5":
        matrizActual2[item.key].simbolo = ">";
        matrizActual2[item.key].simbolo_id = 5;

        break;


    }


    console.log('matrizActual', matrizActual2)
    setMatrizEje2(matrizActual2)
  };
  const applet1Ref = useRef(null);
  const applet2Ref = useRef(null);

  const handleChangeSelect1Eje2 = (data) => {    
    console.log('selected item', data);   
    // setFuncionEje2({
    //   ...FuncionObjEje2,
    //   maxi: data.value == 2 ? false : true
    // })
    setMatrizEje2({
      ...MatrizEje2,
      Select1Eje2:data
    })

  };
  const handleChangeSelect2Eje2 = (data) => {    
    console.log('selected item', data);   
    setMatrizEje2({
      ...MatrizEje2,
      Select2Eje2:data
    })
  };
  const handleChangeSelect3Eje2 = (data) => {    
    console.log('selected item', data);   
    setMatrizEje2({
      ...MatrizEje2,
      Select3Eje2:data
    })
  };

  const onFinishCalculoEje2 = (values) => {


    console.log('MatrizEje2',MatrizEje2)
    
    if (MatrizEje2.Select1Eje2=="Max z = 300x + 700y" && MatrizEje2.Select2Eje2=="8x  +  10y  <=80"
    &&MatrizEje2.Select3Eje2=="2x  +  5y  <= 25") {
    console.log('nice')
    success('Haz seleccionado los valores correctamente')
    } else {
    console.log('quedo mal')
    error("No Corresponde los valores con el ejercicion")
    }


  };

  //////////////////////////////////////////
  ////////////// EJECICIO 2 ////////////////
  //////////////////////////////////////////




  const handleChangeSelect1Eje3 = (data) => {    
    console.log('selected item', data);   
    // setFuncionEje2({
    //   ...FuncionObjEje2,
    //   maxi: data.value == 2 ? false : true
    // })
    setMatrizEje2({
      ...MatrizEje2,
      Select1Eje2:data
    })

  };
  const handleChangeSelect2Eje3 = (data) => {    
    console.log('selected item', data);   
    setMatrizEje2({
      ...MatrizEje2,
      Select2Eje2:data
    })
  };
  const handleChangeSelect3Eje3 = (data) => {    
    console.log('selected item', data);   
    setMatrizEje2({
      ...MatrizEje2,
      Select3Eje2:data
    })
  };

  const onFinishCalculoEje3 = (values) => {


    console.log('MatrizEje2',MatrizEje2)
    
    if (MatrizEje2.Select1Eje2=="Max z = 300x + 700y" && MatrizEje2.Select2Eje2=="8x  +  10y  <=80"
    &&MatrizEje2.Select3Eje2=="2x  +  5y  <= 25") {
    console.log('nice')
    success('Haz seleccionado los valores correctamente')
    } else {
    console.log('quedo mal')
    error("No Corresponde los valores con el ejercicion")
    }


  };


  //////////////////////////////////////////
  ///////////////////////////////////////////
  //////////////////////////////////////////



  function puntoEstaEnRegionFactible(punto, coeficientes, terminosIndependientes, tiposRestricciones) {
    for (let i = 0; i < terminosIndependientes.length; i++) {
      let resultado = punto[0] * coeficientes[i][0] + punto[1] * coeficientes[i][1];

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




  function compararCoordenadas(a, b) {
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      if (a[1] < b[1]) {
        return -1;
      } else if (a[1] > b[1]) {
        return 1;
      } else {
        return 0;
      }
    }
  }


  const onRest = () => {
    console.log('Success:');

    let matrizActual = Matriz;

    console.log('Matriz length', Matriz.length)



    matrizActual.pop();

    setMatriz(matrizActual)


    console.log('matrizActual', matrizActual)
    console.log('Matriz nueva', Matriz)

    success('Se Elimino una Restricción')

  };


  const onAdd = () => {

    console.log('Success:');

    let matrizActual = Matriz;

    console.log('Matriz length', Matriz.length)


    matrizActual.push({
      key: Matriz.length,
      x: null,
      y: null,
      simbolo: "<",
      simbolo_id: 1,
      restriccion: null
    })

    setMatriz(matrizActual)

    console.log('matrizActual', matrizActual)
    console.log('Matriz nueva', Matriz)

    success('Se agrego una Restricción')

  };

  return (

    <>

      {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}


      <div >


        <h1 className="Titulo">

          Ejercicios de programación gráfica lineal


        </h1>
        <p className="parrafoList">
          <br />



          <p className="parrafoList">


          <div>
            Ejercicio 1<br />
            <br />
            {/* Cada saco de P se vende en 300 $ y cada saco de Q en 800 $. Si en la granja hay almacenados 80 kg de A y
          25 kg de B, ¿Cuántos sacos de cada tipo de producto se deben preparar para optimizar los ingresos? */}

            Si designamos por x al número de sacos de pienso de clase P y por y el número de sacos de pienso de clase Q que se han de vender, la función : Z = 300x + 700y
            representará la cantidad de pesetas obtenidas por la venta de los sacos, y por tanto es la que debemos maximizar.
            Podemos hacer un pequeño cuadro que nos ayude a obtener las restricciones:

            <div >
              {/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/QjNzcNt/tabla-Ejericio2.png" alt="tabla-Ejericio2" border="0"></a> */}
              <br />
              <Row justify={"center"}>
                <Image width={250}
                  height={150}
                  //  style={"text-align: center;"} 

                  src="https://i.ibb.co/QjNzcNt/tabla-Ejericio2.png" />
              </Row>

            </div>
           
            <br/>
            <div justify="center">
              <Item label="Seleccione la Funcion Objetivo" >
                <Select
                  // showSearch
                  // labelInValue
                  name="o_id"
                  // key={item.key}
                  // value={item && item.simbolo}
                  style={{
                    width: '90%',
                  }}
                  onChange={ handleChangeSelect1Eje2}
                // onSearch={onSearch}
                >
                  {
                    OpcionesEje1Select1.map((item1) => (
                      // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                      <Option value={item1.name}> {item1.name}</Option>
                    ))
                  }
                </Select>
              </Item>

              <Item label="Seleccione la  primera Resticcion" >
                <Select
                  // showSearch
                  // labelInValue
                  name="o_id"
                  // key={item.key}
                  // value={item && item.simbolo}
                  style={{
                    width: '90%',
                  }}
                  onChange={ handleChangeSelect2Eje2}
                // onSearch={onSearch}
                >
                  {
                    OpcionesEje1Select2.map((item1) => (
                      // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                      <Option value={item1.name}> {item1.name}</Option>
                    ))
                  }
                </Select>
              </Item>

              <Item label="Seleccione la  segunda  Resticcion" >
                <Select
                  // showSearch
                  // labelInValue
                  name="o_id"
                  // key={item.key}
                  // value={item && item.simbolo}
                  style={{
                    width: '90%',
                  }}
                  onChange={ handleChangeSelect3Eje2}
                // onSearch={onSearch}
                >
                  {
                    OpcionesEje1Select3.map((item1) => (
                      // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                      <Option value={item1.name}> {item1.name}</Option>
                    ))
                  }
                </Select>
              </Item>
              {/* <br/> */}
              <Button type="primary" onClick={onFinishCalculoEje2}>
                Resolver
              </Button>
            </div>

         
            <br />
            </div>

            <br />Ejercicio 3<br />


            {/* &nbsp;&nbsp;Ejercicio 1<br /> */}
            <br />
            Un comenciante acude a cierto mercado a comprar narajas con 5000$. Le ofecen
            dos tipos de naranjas:  las de tipo A a 5$ el Kg y las de tipo B a 8$ el Kg. Sabemos
            que solo dispone en su furgoneta de espacion para transportar 700 kg de naranjas
            maximo y que piensa vender el kilo de naranga de tipoa A a 5.8$ y el de tipo B a 9$ ¿Cuantos Kilogramos
            de narajas de cada tipo deberia comprar para obtener el Beneficio maximo?
            <br />
            la funcion que da el Beneficio, sujeta a las restricicones anteriore es:
            <br />Z = f(x,y) = (5.8 - 5)x + (9-8) = 0.8 + 0.1<br />
            Sujeto a:<br />
            x+y &lt;= 700 <br />
            5x+8y &lt;= 5000<br />

            <div justify="center" >

              <br />
              <br />
              {contextHolder}
              <br />

              <Row justify="center">

                <Col span={4}>

                  <Item >
                    <Select
                      showSearch
                      labelInValue
                      name="o_id"

                      // value={item && item.simbolo}
                      style={{
                        width: '100%',
                      }}
                      onChange={(e) => handleChangeSelectMaxiMiniEje1(e)}
                    // onSearch={onSearch}
                    >
                      {
                        InitialMaxiMini.map((item1) => (
                          // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                          <Option key={item1.id} value={item1.key}> {item1.nameSimbolo}</Option>
                        ))
                      }
                    </Select>
                  </Item>
                </Col>


              </Row>




              <Row justify="center">
                <Col span={5}>
                  <Item label="FUNCION OBJETIVO" >
                    {/* <Input name='x' onChange={handleChange} /> */}
                  </Item>

                </Col>
                <Col span={8}>
                  <Item label="x" >
                    <Input name='x' onChange={handleChangeGeneralEje1} />
                  </Item>

                </Col>
                <Col span={9}>

                  <Item label='y'>
                    <Input name='y' onChange={handleChangeGeneralEje1} />
                  </Item>
                </Col>

              </Row>



              {MatrizEje1.map(item => (

                <>
                  <Row >
                    <Col span={12}   >
                      Restriccion {item.key + 1}

                    </Col>

                  </Row>
                  <Row justify="center">
                    <Col span={7} >
                      <Item label="x" key={item.key}  >
                        <Input name={item.key} key={item.key} title={'x'} values={item & item.x} onChange={(e) => handleChangeEje1(e, item)} />
                      </Item>
                    </Col>
                    <Col span={7} key={item.key}>
                      <Item label="+y" key={item.key}>
                        <Input name={item.key} key={item.key} title={'y'} values={item & item.y} onChange={(e) => handleChangeEje1(e, item)} />
                      </Item>
                    </Col>
                    <Col span={2}>
                      <Item  >
                        <Select
                          showSearch
                          labelInValue
                          name="o_id"
                          key={item.key}
                          // value={item && item.simbolo}
                          style={{
                            width: '90%',
                          }}
                          onChange={(e) => handleChangeSelectRestriccionEje1(e, item)}
                        // onSearch={onSearch}
                        >
                          {
                            Simbolo.map((item1) => (
                              // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                              <Option key={item1.id} title={item.key} value={item1.key}> {item1.nameSimbolo}</Option>
                            ))
                          }
                        </Select>
                      </Item>
                    </Col>
                    <Col span={3}>
                      <Item >
                        <Input name={item.key} key={item.key} title={'restriccion'} values={item & item.restriccion} onChange={(e) => handleChangeEje1(e, item)} />
                      </Item>

                    </Col>
                  </Row>
                </>
              ))}



              <Button type="primary" onClick={onFinishCalculoEje1}>
                Resolver
              </Button>

              {/* <Button type="primary" onClick={onAdd}>
              Adicionar
            </Button>

            <Button type="primary" disabled={Matriz.length > 2 ? false : true} onClick={onRest}>
              Quitar
            </Button> */}

              {/* </Form> */}
              {/* <h1>Calculadoraaaa</h1> */}



              <br />

              <div hidden={MostarResulEje1} >

                <Row

                  justify="center"
                >
                  <Geogebra
                    appletId="myApplet"
                    width={500}
                    height={500}
                    showToolBar={false}
                    borderColor="#000000"
                    showMenuBar={false}
                    // showAlgebraInput={false}
                    showAlgebraInput={false}
                    errorDialogsActive={false}
                    view="Algebra"
                    settings={{
                      grid: false,
                      axes: false,
                      toolbar: false,
                    }}
                    command="a=2;b=3;c=a+b;"
                  />
                </Row>
              </div>
              <div hidden={MostarResulEje1}>
                <Table dataSource={TablaSolucionEje1} columns={columnsEjec1} />

              </div>



            </div>

            {/* <Modal
            open={modal}
            title=" Lugar"
            destroyOnClose={true}
            width={600}
            // height={1000}

            onCancel={abrirCerrarModal}
            centered
            footer={[
              <Button onClick={abrirCerrarModal}>Cancelar</Button>,

            ]}
          >

            <Row  >
              <div hidden={MostarResulEje1}>

                <Table dataSource={TablaSolucion} columns={columns} />

              </div>
            </Row>





          </Modal> */}


            <br />
            <br />
         
            {/* <div justify="center" >


              {contextHolder}
              <br />

              <Row justify="center">

                <Col span={4}>

                  <Item >
                    <Select
                      showSearch
                      labelInValue
                      name="o_id"

                      // value={item && item.simbolo}
                      style={{
                        width: '100%',
                      }}
                      onChange={(e) => handleChangeSelectMaxiMiniEje2(e)}
                    // onSearch={onSearch}
                    >
                      {
                        InitialMaxiMini.map((item1) => (
                          // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                          <Option key={item1.id} value={item1.key}> {item1.nameSimbolo}</Option>
                        ))
                      }
                    </Select>
                  </Item>
                </Col>


              </Row>




              <Row justify="center">
                <Col span={4}>
                  <Item label="FUNCION OBJETIVO" >
                   
                  </Item>

                </Col>
                <Col span={5}>
                  <Item label="x" >
                    <Input name='x' onChange={handleChangeGeneralEje2} />
                  </Item>

                </Col>
                <Col span={5}>

                  <Item label='y'>
                    <Input name='y' onChange={handleChangeGeneralEje2} />
                  </Item>
                </Col>

              </Row>



              {MatrizEje2.map(item => (

                <>
                  <Row >
                    <Col span={12}   >
                      Restriccion {item.key + 1}

                    </Col>

                  </Row>
                  <Row justify="center">
                    <Col span={5} >
                      <Item label="x" key={item.key}  >
                        <Input name={item.key} key={item.key} title={'x'} values={item & item.x} onChange={(e) => handleChangeEje2(e, item)} />
                      </Item>
                    </Col>
                    <Col span={5} key={item.key}>
                      <Item label="+y" key={item.key}>
                        <Input name={item.key} key={item.key} title={'y'} values={item & item.y} onChange={(e) => handleChangeEje2(e, item)} />
                      </Item>
                    </Col>
                    <Col span={1}>
                      <Item  >
                        <Select
                          showSearch
                          labelInValue
                          name="o_id"
                          key={item.key}
                          // value={item && item.simbolo}
                          style={{
                            width: '90%',
                          }}
                          onChange={(e) => handleChangeSelectRestriccionEje2(e, item)}
                        // onSearch={onSearch}
                        >
                          {
                            Simbolo.map((item1) => (
                              // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                              <Option key={item1.id} title={item.key} value={item1.key}> {item1.nameSimbolo}</Option>
                            ))
                          }
                        </Select>
                      </Item>
                    </Col>
                    <Col span={2}>
                      <Item >
                        <Input name={item.key} key={item.key} title={'restriccion'} values={item & item.restriccion} onChange={(e) => handleChangeEje2(e, item)} />
                      </Item>

                    </Col>
                  </Row>
                </>
              ))}



              <Button type="primary" onClick={onFinishCalculoEje2}>
                Resolver
              </Button>




              <br />


              <div hidden={MostarResulEje2} >

                <Row

                  justify="center"
                >
                  <Geogebra
                    appletId="myApplet1"
                    width={500}
                    height={500}
                    showToolBar={false}
                    borderColor="#000000"
                    showMenuBar={false}
                    // showAlgebraInput={false}
                    showAlgebraInput={false}
                    errorDialogsActive={false}
                    view="Algebra2"
                    settings={{
                      grid: false,
                      axes: false,
                      toolbar: false,
                    }}
                  // command="a=2;b=3;c=a+b;"
                  />
                </Row>
              </div>
              <br />
              <div hidden={MostarResulEje2}>
                <br />
                <Table dataSource={TablaSolucionEje2} columns={columnsEjec2} />

              </div>

          

            </div> */}



          </p>

        </p>
      </div>


    </>


  );
};
export { Ejercicios };
