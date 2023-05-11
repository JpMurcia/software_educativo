import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

const Home = () => {

  const onClick = (e) => {
    console.log('click ', e);
    // setCurrent(e.key);
  };

  return (

    < >
      {/* <a href="https://ibb.co/6Jwf3Zv"><img src="https://i.ibb.co/Z1XknJH/Bienvenida.png" alt="Bienvenida" border="0"></a> */}
      {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}

      <div className='body' >
        <h1>HOME</h1>

      </div>


    </>


  );
};
export { Home };
