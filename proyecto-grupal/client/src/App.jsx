import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import CardPsychologist from './components/CardPsychologist/CardPsychologist';
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PsychologistDetail from "./components/PsychologistDetail/PsychologistDetail";
import Post from "./components/Post/Posts";
function App() {
  return (
    <div className="App">      
      <Footer />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route exact path="/signup" element={<RegisterForm />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/detailPsychologist" element={<PsychologistDetail />} />
      <Route path="/cardPsicologist" element={<CardPsychologist/>} />
      </Routes>
    </div>
  );
}

export default App;