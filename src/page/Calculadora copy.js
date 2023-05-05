import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState, useContext } from 'react';

import { metodoGraficoR } from './MetodoGrafico';


// import React from 'react';
import { Table, Button, Modal, Input, Form, Select, message, Row, Divider, Col, Space } from "antd";

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


    const InitialFuncion =
    {

        x: 5,
        y: 6,
        // simbolo: "<=",
        maxi: true,

    };

    let data = [{
        key: 1,
        x: 5,
        y: 6,
        simbolo: "<=",
        simbolo_id: 2,
        restriccion: 1
    }]


    const [fromData, setFormData] = useState({});
    const [Simbolo, setSimbolo] = useState(InitialSimboloRestricciones);
    const [Matriz, setMatriz] = useState(InitialMatriz);
    const [Funcion, setFuncion] = useState(InitialFuncion);

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


    const handleChangeGeneral = (e) => {
        const { name, value, title } = e.target;

        console.log(name, value, title);

        setFuncion({
            ...Funcion,
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

        // matrizActual[item.key]=key;

        // setFormData({
        //     ...fromData,
        //     type_weight: data.key,
        //     name_type: data.value,

        // })






    };


    const handleChangeSelectMaxiMini = (data) => {
        console.log('selected', { data });
        console.log('selected key', data.key);
        console.log('selected value', data.value);

        // let matrizActual = Matriz;

        setFuncion({
            ...Funcion,
            maxi: data.value
        })



    };


    const onFinish = (values) => {
        console.log('Success:', values);



        console.log('MATRIZ ENVIADA', Matriz)
        console.log('Funcion ENVIADA', Funcion)

        // Funcion

        let n2 = 2; // Número de restricciones
        let A2 = []; // Matriz de coeficientes de las restricciones
        let b2 = []; // Vector de términos independientes de las restricciones
        let RestriccionSibolos2 = []; // Vector de términos independientes de las restricciones
        let funcionObjetivo2 = (x, y) => 10 * x + 15 * y; // Función objetivo
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
        console.log('A', A)
        console.log('b2', b2)
        console.log('RestriccionSibolos2', RestriccionSibolos2)


        metodoGraficoR(n, funcionObjetivo, A, b, maximizar, RestriccionSibolos);
        metodoGraficoR(n2, funcionObjetivo2, A2, b2, maximizar, RestriccionSibolos2);


    };

    const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

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


        console.log('matrizActual', matrizActual)
        console.log('Matriz nueva', Matriz)


    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (

        < >
            <React.Fragment>



                <div justify="center" >

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
                            <Item label="x" >
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




                 { /* {Matriz.map(item => (

                        <>
                            <Row >
                                <Col span={12}   >
                                    Restriccion {item.key + 1}

                                </Col>

                            </Row>

                            <Row justify="center" >



                                <Col xs={{ span: 12, offset: 3 }} lg={12}  >

                                    
                                        <Space key={item.key}>


                                            <Item label="X" key={item.key}  >

                                                <Input name={item.key} key={item.key} title={'x'} values={item & item.x} onChange={(e) => handleChange(e, item)} />

                                            </Item>

                                            <Item label="Y" key={item.key}>
                                                <Input name={item.key} key={item.key} title={'y'} values={item & item.y} onChange={(e) => handleChange(e, item)} />
                                            </Item>

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


                                            <Item >
                                                <Input name={item.key} key={item.key} title={'restriccion'} values={item & item.restriccion} onChange={(e) => handleChange(e, item)} />
                                            </Item>
                                        </Space>
                                      
                                    



                                </Col> 





                            </Row>
                        </>
                    ))} */}


                    {Matriz.map(item => (

                        <>
                            <Row >
                                <Col span={12}   >
                                    Restriccion {item.key + 1}

                                </Col>

                            </Row>

                            <Row justify="center" >



                                <Col xs={{ span: 2, offset: 3 }} lg={4}  >

                                    <Item label="X" key={item.key}  >

                                        <Input name={item.key} key={item.key} title={'x'} values={item & item.x} onChange={(e) => handleChange(e, item)} />

                                    </Item>





                                </Col>
                                <> </>
                                <Col xs={{ span: 2, offset: 0 }} lg={4}   >
                                    <Item label="Y" key={item.key}>
                                        <Input name={item.key} key={item.key} title={'y'} values={item & item.y} onChange={(e) => handleChange(e, item)} />
                                    </Item>
                                </Col>

                                <Col xs={{ span: 2, offset: 1 }}>
                                    <Item  >
                                        <Select
                                            showSearch
                                            labelInValue
                                            name="o_id"
                                            key={item.key}

                                            style={{
                                                width: '100%',
                                            }}
                                            onChange={(e) => handleChangeSelectRestriccion(e, item)}

                                        >
                                            {
                                                Simbolo.map((item1) => (

                                                    <Option key={item1.id} title={item.key} value={item1.key}> {item1.nameSimbolo}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Item>
                                </Col>
                                <Col xs={{ span: 1, offset: 2 }} lg={2}

                                >
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

                    <Button type="primary" htmlType="submit" onClick={onFinish}>
                        Submit
                    </Button>

                    <Button type="primary" htmlType="submit" onClick={onAdd}>
                        Adicionar
                    </Button>
                    {/* </Form> */}
                    <h1>Calculadoraaaa</h1>
                </div>



            </React.Fragment>
        </>


    );
};
export { Calculadora };
