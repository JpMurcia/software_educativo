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
import { Table, Button, Modal, Input, Form, Select,message } from "antd";

const { Option } = Select;
const { Item } = Form;

const Calculadora = () => {

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

        <>
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
                
                <div  >

                    <h1>Calculadora</h1>
                </div>

                

            </React.Fragment>
        </>


    );
};
export { Calculadora };
