import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from './components/RegisterForm/RegisterForm';
import Post from './components/Post/Posts.jsx'
import CardPsychologist from './components/CardPsychologist/CardPsychologist';
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">      
      <Routes>
      <Route path="/cardPsicologist" element={<CardPsychologist/>} />
        <Route path="/" element={< NavBar />} />
        <Route exact path='/signup' element={<RegisterForm />} />
        <Route exact path='/post' element={<Post />} />
      <Footer />
      </Routes>
    </div>
  );
}

export default App;
