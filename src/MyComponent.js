import React, { useRef, useEffect } from 'react';
import Geogebra from 'react-geogebra';

const MyComponent = () => {
  const graphRef = useRef(null);

  useEffect(() => {
    const gb = graphRef.current?.getGgbObject();
    if (gb) {
        console.log("ento")
        gb.evalCommand('Line((0,0), (1,1))');
        gb.evalCommand('Line((0,0), (1,1))');
    }
  }, []);

  const options = {
    id: 'myGraph',
    width: 1000,
    height: 500,
    borderColor: '#ddd',
    appName: 'classic',
    showToolBar: false,
    showMenuBar: false,
  };

  return <Geogebra ref={graphRef} options={options} />;
};

//   return <Geogebra options={options} />;
// };

export default MyComponent