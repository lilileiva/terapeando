import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from './components/ClientDetails/ClientDetails';
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from './components/RegisterForm/RegisterForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< NavBar />} />
        <Route exact path='/signup' element={<RegisterForm />} />
        <Route exact path='/:idUserClient' element={<ClientDetails />} />
      </Routes>

    </div>
  );
}

export default App;
