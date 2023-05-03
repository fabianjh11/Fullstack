import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registrar from './components/Registrar';
import IniciarSesion from './components/IniciarSesion';
import JuegoSnake from './components/JuegoSnake';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={ <Registrar />} />
        <Route exact path="/login" element={ <IniciarSesion />} />
        <Route exact path="/game" element={ <JuegoSnake />} />
        <Route exact path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
