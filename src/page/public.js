import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    // label: 'Explicación del método grafico',
    key: 'mail',
    icon: <MailOutlined />,
    label: (    
      <Link to={'http://localhost:3000/Teoria'}>       
        <span>{'Explicación del método grafico'}</span>
      </Link>
    ),
  },
  {
    // label: 'Como Utilizar la calculadora de método grafico',
    key: 'app',
    icon: <AppstoreOutlined />,
    label: (    
      <Link to={'http://localhost:3000/Manual'}>       
        <span>{'Como Utilizar la calculadora de método grafico'}</span>
      </Link>
    ),
    // disabled: true,
  },
  {
    // label: 'Calculadora del Método gráfico de programacion lineal',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    label: (    
      <Link to={'http://localhost:3000/Calculadora'}>       
        <span>{'Calculadora del Método gráfico de programacion lineal'}</span>
      </Link>
    ),

    // children: [
    //   {
    //     type: 'group',
    //     label: 'Item 1',
    //     children: [
    //       {
    //         label: 'Option 1',
    //         key: 'setting:1',
    //       },
    //       {
    //         label: 'Option 2',
    //         key: 'setting:2',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'group',
    //     label: 'Item 2',
    //     children: [
    //       {
    //         label: 'Option 3',
    //         key: 'setting:3',
    //       },
    //       {
    //         label: 'Option 4',
    //         key: 'setting:4',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    // label: 'Reflexion final de metodo grafico',

    icon: <AppstoreOutlined />,
    label: (    
      <Link to={'http://localhost:3000/Ejercicios'}>       
        <span>{'Ejercicios de programación gráfica lineal'}</span>
      </Link>
    ),
    key: 'alipay',
    
  },
];
const Public = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />);
};
export  {Public};
