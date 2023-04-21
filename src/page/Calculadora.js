import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState, useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { metodoGraficoR } from './MetodoGrafico';

import { CreateTodoButton } from './CreateTodoButton';
// import { Modal } from './Modal';
import { TodoForm } from './TodoForm';
// import React from 'react';
import { Table, Button, Modal, Input, Form, Select, message, Row, Divider, Col } from "antd";

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

    const handleChange = (e,item) => {
        const { name, value, title } = e.target;      
        let matrizActual = Matriz;
        console.log('D',matrizActual[name])
        if (title == "x") {
            console.log(matrizActual[name].x)
            matrizActual[name].x=value
        }
        else {
            if (title == "restriccion") {
                console.log(matrizActual[name].restriccion)
                matrizActual[name].restriccion=value
            } else {
                console.log(matrizActual[name].y)
                matrizActual[name].y=value
            }

        }

        console.log(name, value, title,item);
        console.log('Actual',matrizActual);

        console.log(Matriz);
    }

    const handleChangeSelectRestriccion = (data,item) => {
        console.log('selected', { data });
        console.log('selected key', data.key);
        console.log('selected value', data.value);
        console.log('selected item', item);
        let matrizActual = Matriz;


        switch (data.key) {
            case "1":
               matrizActual[item.key].simbolo="<";
               matrizActual[item.key].simbolo_id=1;

               break;

            case "2":
                matrizActual[item.key].simbolo="<=";
                matrizActual[item.key].simbolo_id=2;

                break;
            
            case "3":
                matrizActual[item.key].simbolo="=";
                matrizActual[item.key].simbolo_id=3;
                break;

            case"4":
                matrizActual[item.key].simbolo=">=";
                matrizActual[item.key].simbolo_id=4;

                break;
            //  return restriccion;             
            case "5":
                matrizActual[item.key].simbolo=">";
                matrizActual[item.key].simbolo_id=5;

                break;

    
          }


          console.log('matrizActual',matrizActual)

        // matrizActual[item.key]=key;

        // setFormData({
        //     ...fromData,
        //     type_weight: data.key,
        //     name_type: data.value,

        // })






    };

    const onFinish = (values) => {
        console.log('Success:', values);



       console.log('MATRIZ ENVIADA',Matriz)

        const n = 3; // Número de restricciones
        const A = [[6, 2], [6, 5], [6, 5]]; // Matriz de coeficientes de las restricciones
        const b = [7, 12,17]; // Vector de términos independientes de las restricciones
        const RestriccionSibolos = ["<=","<=", "<="]; // Vector de términos independientes de las restricciones
        const funcionObjetivo = (x, y) => 5*x + 4*y; // Función objetivo
        const maximizar = true; // Indica si se quiere maximizar o minimizar la función objetivo
        
      
        
        metodoGraficoR(n, funcionObjetivo, A, b, maximizar,RestriccionSibolos);

    };



    const onAdd = () => {
        console.log('Success:');

        let matrizActual = Matriz;

        console.log('Matriz length',Matriz.length)

        // matrizActual.add(       
        // {
        //     key: Matriz.length,
        //     x: null,
        //     y: null,
        //     simbolo: "<",
        //     simbolo_id: 1,
        //     restriccion: null
        // })
        matrizActual.push({
            key: Matriz.length,
            x: null,
            y: null,
            simbolo: "<",
            simbolo_id: 1,
            restriccion: null
        })
        //  setMatriz(...Matriz,{
        //     key: Matriz.length,
        //     x: null,
        //     y: null,
        //     simbolo: "<",
        //     simbolo_id: 1,
        //     restriccion: null
        // })

        console.log('matrizActual',matrizActual)
        console.log('Matriz nueva',Matriz)
        // console.log(Matriz.length)
    //    console.log('MATRIZ ENVIADA',Matriz)

    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
    } = useContext(TodoContext);

    return (

        < >
            <React.Fragment>

                {/* <TodoList>
                    {error && <p>Desespérate, hubo un error...</p>}
                    {loading && <p>Estamos cargando, no desesperes...</p>}          
                    {searchedTodos.map(todo => (
                        <TodoItem
                            key={todo.text}
                            text={todo.text}
                            completed={todo.completed}
                            onComplete={() => completeTodo(todo.text)}
                            onDelete={() => deleteTodo(todo.text)}
                        />
                    ))}
                </TodoList>

                {!!openModal && (
                    <Modal>
                        <TodoForm />
                    </Modal>
                )} */}
                {/* <CreateTodoButton
                    setOpenModal={setOpenModal}
                /> */}

                <div justify="center" >
                    {/* <Form
                        //  {...layout} 
                        justify="center"

                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    > */}
                        {/* <Divider orientation="left">sub-element align center</Divider> */}
                        <br />
                        <br />
                        <br />
                        <Row justify="center">
                            <Col span={4}>col-4
                                <Item label="x" >
                                    <Input name='x' onChange={handleChange} />
                                </Item>

                            </Col>
                            <Col span={4}>col-4

                                <Item label="   y">
                                    <Input name='y' onChange={handleChange} />
                                </Item>
                            </Col>
                            <Col span={4}>col-4
                                <Item  >
                                    <Select
                                        showSearch
                                        labelInValue
                                        name="o_id"

                                        value={fromData && fromData.name_type}
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={handleChangeSelectRestriccion}
                                    // onSearch={onSearch}
                                    >
                                        {
                                            Simbolo.map(item => (
                                                // <Option key={item.origin} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                                                <Option key={item.id} value={item.nameSimbolo}> {item.nameSimbolo}</Option>
                                            ))
                                        }
                                    </Select>
                                </Item>
                            </Col>
                            <Col span={4}>col-4
                                <Item label="">
                                    <Input name='restriccion' onChange={handleChange} />
                                </Item>

                            </Col>
                        </Row>




                        {Matriz.map(item => (

                            <>
                                <Row justify="center">
                                    <Col span={4}>
                                        <Item label="x" key={item.key} >
                                            <Input name={item.key} key={item.key} title={'x'} values={item & item.x} onChange={(e) =>handleChange(e,item)} />
                                        </Item>

                                    </Col>
                                    <Col span={4} key={item.key}>
                                        <Item label="y" key={item.key}>
                                            <Input name={item.key} key={item.key} title={'y'} values={item & item.y} onChange={(e) =>handleChange(e,item)} />
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
                                                onChange={(e)=>handleChangeSelectRestriccion(e,item)}
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
                                        <Item label={item.restriccion}>
                                            <Input name={item.key} key={item.key} title={'restriccion'} values={item & item.restriccion} onChange={(e) =>handleChange(e,item)} />
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
