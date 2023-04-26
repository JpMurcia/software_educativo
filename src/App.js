import logo from './logo.svg';
// import './App.css';
import MyComponent from './MyComponent';
import Geogebra from 'react-geogebra';

import React, { useRef, useEffect, useState ,Fragment} from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { TodoProvider } from './page/TodoContext';

import { Calculadora } from './page/Calculadora';
import { Home } from './page/Home';
import  App3  from './App3';

import { Manual } from './page/Manual';
import { Public } from './page/public';

import { Teoria } from './page/Teoria';
import { NotFoundPage } from './page/NotFoundPage';




function App() {


  return (


    <div className="App">



      <Router>

      <Fragment>
      <Public />
      
       
      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/Home" element={
          <Home />
        } />

            <Route path="/Calculadora" element={
              <TodoProvider>
                <Calculadora />
              </TodoProvider>
            } />

        <Route path="/Teoria" element={
          <Teoria />
        } />

        <Route path="/Manual" element={
          <Manual />
        } />

        <Route path="/Reflexion" element={
          <Home />
        } />

        <Route path="/App3" element={
          <App3 />
        } />

        {/* <Route path="/Home" element={
          <Home />
        } /> */}



        <Route path="*" element={<NotFoundPage />} />

        {/* <Route path="/Login" element={<Login />} /> */}
        </Routes>
        </Fragment>
      </Router>
      {/* <header className="App-header">

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
      </header> */}
    </div>
  );
}

export default App;
