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
            key: 1,
            x: 5,
            y: 6,
            simbolo: "<=",
            simbolo_id: 2,
            restriccion: 1
        },
        {
            key: 2,
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

    const handleChange = e => {
        const { name, value, title } = e.target;

        setFormData({
            ...fromData,
            [name]: value
        });
        // setMatriz([ ,
        //     {
        //     key:name,
        //     [title]:value
        // }])
        // for(let index;data.length;index++){
        //     if(data[index].key==name){
        //         // data[index].key=
        //     }
        // }

        // console.log(e);
        console.log(name, value, title);
        console.log(Matriz);
    }
    const [fromData, setFormData] = useState({});
    const [Simbolo, setSimbolo] = useState(InitialSimboloRestricciones);
    const [Matriz, setMatriz] = useState(InitialMatriz);



    const handleChangeSelectRestriccion = (data) => {
        console.log('selected', { data });
        console.log('selected key', data.key);
        console.log('selected value', data.value);

        setFormData({
            ...fromData,
            type_weight: data.key,
            name_type: data.value,

        })


    };

    const onFinish = (values) => {
        console.log('Success:', values);



       

        const n = 3; // Número de restricciones
        const A = [[6, 2], [6, 5], [6, 5]]; // Matriz de coeficientes de las restricciones
        const b = [7, 12,17]; // Vector de términos independientes de las restricciones
        const RestriccionSibolos = ["<=","<=", "<="]; // Vector de términos independientes de las restricciones
        const funcionObjetivo = (x, y) => 5*x + 4*y; // Función objetivo
        const maximizar = true; // Indica si se quiere maximizar o minimizar la función objetivo
        
      
        
        metodoGraficoR(n, funcionObjetivo, A, b, maximizar,RestriccionSibolos);

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
                    <Form
                        //  {...layout} 
                        justify="center"

                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
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
                                            <Input name={item.key} key={item.key} title={'x'} values={item & item.x} onChange={handleChange} />
                                        </Item>

                                    </Col>
                                    <Col span={4} key={item.key}>
                                        <Item label="y" key={item.key}>
                                            <Input name={item.key} key={item.key} title={'y'} values={item & item.y} onChange={handleChange} />
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
                                                onChange={handleChangeSelectRestriccion}
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
                                            <Input name={item.key} key={item.key} title={'restriccion'} values={item & item.restriccion} onChange={handleChange} />
                                        </Item>

                                    </Col>
                                </Row>
                            </>
                        ))}



                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                    <h1>Calculadoraaaa</h1>
                </div>



            </React.Fragment>
        </>


    );
};
export { Calculadora };
