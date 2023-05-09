import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

const Ejercicios = () => {
  const [current, setCurrent] = useState('mail');

  return ( 

    <>

     {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}

     <h1>Ejercicios</h1>


    </>
 
  
  );
};
export  {Ejercicios};
