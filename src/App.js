import logo from './logo.svg';
// import './App.css';
import MyComponent from './MyComponent';
import {Public} from './page/public';
import Geogebra from 'react-geogebra';

import React, { useRef, useEffect, useState } from 'react';

function App() {


  return (

    
    <div className="App">
    <Public/>

      <header className="App-header">
        
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
