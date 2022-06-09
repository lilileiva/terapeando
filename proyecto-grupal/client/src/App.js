import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from './components/ClientDetails/ClientDetails';
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar.jsx";

export default function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/"  element={< LandingPage />}/>
        <Route path="/home" element={< Home />} />
        <Route path="/" element={< NavBar />} />
        <Route exact path='/signup' element={<RegisterForm />} />
        <Route exact path='/:idUserClient' element={<ClientDetails />} />
      </Routes>

    </div>
  );
}

