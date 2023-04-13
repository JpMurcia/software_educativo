import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState, useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
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


    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...fromData,
            [name]: value
        });
        // console.log(fromData);
    }
    const [fromData, setFormData] = useState({});
    const [Simbolo, setSimbolo] = useState(InitialSimboloRestricciones);



    const handleChangeSelectTypeWeight = (data) => {
        console.log('selected', { data });
        console.log('selected key', data.key);
        console.log('selected value', data.value);

        setFormData({
            ...fromData,
            type_weight: data.key,
            name_type: data.value,

        })


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
            {/* <React.Fragment> */}

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
                                onChange={handleChangeSelectTypeWeight}
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

                <Row justify="center">
                    <Col span={4}>
                        <Item label="x" >
                            <Input name='x' onChange={handleChange} />
                        </Item>

                    </Col>
                    <Col span={4}>
                        <Item label="   y">
                            <Input name='y' onChange={handleChange} />
                        </Item>
                    </Col>
                    <Col span={4}>
                        <Item  >
                            <Select
                                showSearch
                                labelInValue
                                name="o_id"

                                value={fromData && fromData.name_type}
                                style={{
                                    width: '100%',
                                }}
                                onChange={handleChangeSelectTypeWeight}
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
                    <Col span={4}>
                        <Item label="">
                            <Input name='restriccion' onChange={handleChange} />
                        </Item>

                    </Col>
                </Row>


                {/* </Form> */}
                <h1>Calculadora</h1>
            </div>



            {/* </React.Fragment> */}
        </>


    );
};
export { Calculadora };
