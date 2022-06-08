import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from './components/RegisterForm/RegisterForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" component={NavBar} />
        <Route exact path='/signup' element={<RegisterForm />} />
      </Routes>

    </div>
  );
}

export default App;
