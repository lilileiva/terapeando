import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from './components/ClientDetails/ClientDetails';
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Post from "./components/Post/Posts";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/posts" element={< Post />}/>
        <Route path="/"  element={< LandingPage />}/>
        <Route path="/home" element={< Home />} />
        <Route exact path='/signup' element={<RegisterForm />} />
        <Route exact path='/:idUserClient' element={<ClientDetails />} />
      </Routes>
    </div>
  );
}

export default App;
