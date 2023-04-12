import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
const items = [
  {
    label: 'Explicación del método grafico',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Como Utilizar la calculadora de método grafico',
    key: 'app',
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
  {
    label: 'Calculadora del Método gráfico de programacion lineal',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: 'Reflexion final de metodo grafico',
    key: 'alipay',
    icon: <AppstoreOutlined />,
    // label: (
    //   <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
    //     Navigation Four - Link
    //   </a>
    // ),
    key: 'alipay',
  },
];
const Public = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export  {Public};
