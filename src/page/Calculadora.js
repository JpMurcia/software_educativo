import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState,useEffect, useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { metodoGraficoR } from './MetodoGrafico';

import { metodoGraficov2 } from './MetodoGraficoV2';
import { Grafica } from './Grafica';



import { CreateTodoButton } from './CreateTodoButton';
// import { Modal } from './Modal';
import { TodoForm } from './TodoForm';
// import React from 'react';
import { Table, Button, Modal, Input, Form, Row, Select, message, Divider, Col } from "antd";

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
        "id": 1,
        "nameSimbolo": "<",
        "o_state": 1
    },
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
    },
    {
        "id": 5,
        "nameSimbolo": ">",
        "o_state": 1
    }
];






const Calculadora = () => {

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
       [1,1],
       [1,1]

    ];

    const InitialFuncion =
    {

        x: 5,
        y: 6,
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
    const [MatrizVertices, setMatrizVertices] = useState(InitialMatrizVertices);

    const [FuncionObj, setFuncion] = useState(InitialFuncion);

    const abrirCerrarModal = () => {


        setModal(!modal);
    }

    const handleChange = (e, item) => {
        const { name, value, title } = e.target;
        let matrizActual = Matriz;
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

        console.log(Matriz);
    }

    const handleChangeSelectMaxiMini = (data) => {
        console.log('selected', { data });
        console.log('selected key', data.key);
        console.log('selected value', data.value);

        setFuncion({
            ...FuncionObj,
            maxi: data.value
        })



    };
    const handleChangeGeneral = (e) => {
        const { name, value, title } = e.target;

        console.log(name, value, title);

        setFuncion({
            ...FuncionObj,
            [name]: value
        })

    }


    const handleChangeSelectRestriccion = (data, item) => {
        console.log('selected', { data });
        console.log('selected key', data.key);
        console.log('selected value', data.value);
        console.log('selected item', item);
        let matrizActual = Matriz;


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

    const onFinish = (values) => {
        console.log('Success:', values);



        console.log('MATRIZ ENVIADA', Matriz)
        console.log('FuncionObj ENVIADA', FuncionObj)

        let n2 = 2; // Número de restricciones
        let A2 = []; // Matriz de coeficientes de las restricciones
        let b2 = []; // Vector de términos independientes de las restricciones
        let RestriccionSibolos2 = []; // Vector de términos independientes de las restricciones
        let funcionObjetivo2 = (x, y) => 5 * x + 3 * y; // Función objetivo
        let maximizar2 = true; // Indica si se quiere maximizar o m

        n2 = Matriz.length;

        for (let index = 0; index < Matriz.length; index++) {
            // const element = array[index];
            A2.push([Matriz[index].x, Matriz[index].y])
            b2.push(Matriz[index].restriccion)
            RestriccionSibolos2.push(Matriz[index].simbolo)

        }



        const n = 3; // Número de restricciones
        const A = [[6, 2], [6, 5], [6, 5]]; // Matriz de coeficientes de las restricciones
        const b = [7, 12, 17]; // Vector de términos independientes de las restricciones
        const RestriccionSibolos = ["<=", "<=", "<="]; // Vector de términos independientes de las restricciones
        const funcionObjetivo = (x, y) => 5 * x + 4 * y; // Función objetivo
        const maximizar = true; // Indica si se quiere maximizar o minimizar la función objetivo

        console.log('A2', A2)
        console.log('b2', b2)
        console.log('RestriccionSibolos2', RestriccionSibolos2)


        // metodoGraficoR(n, funcionObjetivo, A, b, maximizar, RestriccionSibolos);
        // metodoGraficoR(n2, funcionObjetivo2, A2, b2, maximizar, RestriccionSibolos2);




        // Ejemplo de uso:
        let coeficientes = [[1, 1], [9, 5]];
        let terminosIndependientes = [6, 45];
        let tiposRestricciones = ["<=", "<="];
        let funcionObjetivo3 = [80, 50];
        let objetivoMaximizar = true;

        let { Todosvertices, vertices, valoresObjetivo, coordenadaOptima } = metodoGraficov2(coeficientes, terminosIndependientes, tiposRestricciones, funcionObjetivo3, objetivoMaximizar);
        setMatrizVertices(Todosvertices);

        console.log('coordenadaOptima', coordenadaOptima);
        //    console.log('valorOptimo',valorOptimo);
        console.log('valoresObjetivo', valoresObjetivo);
        console.log('vertices', vertices);
        console.log('Todosvertices', Todosvertices);

        abrirCerrarModal();


    };

    const onRest = () => {
        console.log('Success:');

        let matrizActual = Matriz;

        console.log('Matriz length', Matriz.length)


       
        matrizActual.pop();

        setMatriz(matrizActual)


        console.log('matrizActual', matrizActual)
        console.log('Matriz nueva', Matriz)


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
        // console.log(Matriz.length) 
        //    console.log('MATRIZ ENVIADA',Matriz)

    };
 
    useEffect(() => {
        // Matriz
      
    
      }, [Matriz]);


    return (

        < >
            {/* <React.Fragment> */}



                <div justify="center" >

                    <br />
                    <br />
                    <br />

                    <Row justify="center">

                        <Col span={4}>

                            <Item  >
                                <Select
                                    showSearch
                                    labelInValue
                                    name="o_id"

                                    // value={item && item.simbolo}
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={(e) => handleChangeSelectMaxiMini(e)}
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


                    <br />

                    <Row justify="center">
                        <Col span={4}>
                            <Item label="FUNCION OBJETIVO" >
                                {/* <Input name='x' onChange={handleChange} /> */}
                            </Item>

                        </Col>
                        <Col span={4}>
                            <Item label="x" >
                                <Input name='x' onChange={handleChangeGeneral} />
                            </Item>

                        </Col>
                        <Col span={4}>

                            <Item label="y">
                                <Input name='y' onChange={handleChangeGeneral} />
                            </Item>
                        </Col>

                    </Row>



                    { Matriz.map(item => (

                        <>
                            <Row >
                                <Col span={12}   >
                                    Restriccion {item.key + 1}

                                </Col>

                            </Row>
                            <Row justify="center">

                                <Col span={4}>
                                    <Item label="x" key={item.key} >
                                        <Input name={item.key} key={item.key} title={'x'} values={item & item.x} onChange={(e) => handleChange(e, item)} />
                                    </Item>

                                </Col>
                                <Col span={4} key={item.key}>
                                    <Item label="y" key={item.key}>
                                        <Input name={item.key} key={item.key} title={'y'} values={item & item.y} onChange={(e) => handleChange(e, item)} />
                                    </Item>
                                </Col>

                                <Col span={4}>
                                    <Item  >
                                        <Select
                                            showSearch
                                            labelInValue
                                            name="o_id"
                                            key={item.key}
                                            // value={item && item.simbolo}
                                            style={{
                                                width: '100%',
                                            }}
                                            onChange={(e) => handleChangeSelectRestriccion(e, item)}
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
                                <Col span={4}>
                                    <Item >
                                        <Input name={item.key} key={item.key} title={'restriccion'} values={item & item.restriccion} onChange={(e) => handleChange(e, item)} />
                                    </Item>

                                </Col>
                            </Row>
                        </>
                    ))}
 


                    {/* <Button type="primary" htmlType="submit">
                            Submit
                        </Button> */}

                    <Button type="primary" onClick={onFinish}>
                        Calcular
                    </Button>
  
                    <Button type="primary"  onClick={onAdd}>
                        Adicionar
                    </Button> 
    
                    <Button type="primary"  disabled={Matriz.length>2? false:true} onClick={onRest}>
                        Quitar
                    </Button>
                    {/* </Form> */}
                    <h1>Calculadoraaaa</h1> 

                    <br/>
                    <Grafica 
                    
                    Puntos={MatrizVertices}
                    
                    />




                </div>

                {/* <Modal
                    visible={modal}
                    title=" Lugar"
                    destroyOnClose={true}
                    width={1000}
                    // height={1000}

                    onCancel={abrirCerrarModal}
                    centered
                    footer={[
                        <Button onClick={abrirCerrarModal}>Cancelar</Button>,


                    ]}
                >
                    <Form >

                       
                            <Grafica />



           






                    </Form>
                </Modal> */}
 
            {/* </React.Fragment> */}
        </>


    );
};
export { Calculadora };
