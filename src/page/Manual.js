import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

import './Teoria.css';
import { Image } from 'antd';

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
const Manual = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (

    <>

      {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}
      <div>
        <h1 className='Titulo'>Cómo utilizar la calculadora del
          método gráfico</h1>

        {/* <p className='parrafo'>
          El uso de nuestra calculadora JpGraph es muy sencillo e intuitivo, de todas formas, explicaremos su uso paso a paso:
          Antes de iniciar, debes haber realizado el planteamiento del modelo a optimizar. Recuerda que para el método gráfico normalmente trabajamos con 2 variables de decisión.
          Debes ingresar los coeficientes de la función objetivo y las restricciones. Puedes ingresar valores enteros, fracciones y decimales. También debes seleccionar el signo de las desigualdades.
        </p> */}

        <div className='parrafoList'>
          <p >El uso de nuestra calculadora JpGraph es muy sencillo e intuitivo, de todas formas, explicaremos su uso paso a paso:</p>
          <ul>
            <br />
            <li>* Antes de iniciar, debes haber realizado el planteamiento del modelo a optimizar. Recuerda que para el m&eacute;todo gr&aacute;fico normalmente trabajamos con 2 variables de decisi&oacute;n.</li>
            <br />
            <li>* Debes ingresar los coeficientes de la funci&oacute;n objetivo y las restricciones. Puedes ingresar valores enteros, fracciones y decimales. Tambi&eacute;n debes seleccionar el signo de las desigualdades.</li>
          </ul>
          <center>
            <Image width={400}
              //  style={"text-align: center;"} 
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />

          </center>

          <br />
          <br />
          <ul>

            <li>* Dar clic en “Resolver / Graficar”.</li>  <br />
            <li>* Si estas en la versión gratis, obtendrás inmediatamente el gráfico final y los resultados. En la versión completa,  podrás ver el paso a paso de la creación de
              los gráficos hasta el resultado final. A continuación te mostramos algunas imágenes</li>  <br />
            <li>* Dar clic <a href="https://www.youtube.com/watch?v=xla02Y99Ngw">aquí</a>  para ver video explicativo</li>  <br />

          </ul>

        </div>
        <br />

        <div className='parrafoList'>

          <center>
            <Image width={400}
              //  style={"text-align: center;"} 
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />

          </center>

          <center>
            <Image width={400}
              //  style={"text-align: center;"} 
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />

          </center>

          <br />
          <br />


        </div>

        <div className='parrafoList'>

          <center>
            <Image width={400}
              //  style={"text-align: center;"} 
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />

          </center>

          <br />
          <br />


        </div>











      </div>


    </>


  );
};
export { Manual };
