import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from './components/ClientDetails/ClientDetails';
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from './components/RegisterForm/RegisterForm';
import Post from './components/Post/Posts.jsx'
import CardPsychologist from './components/CardPsychologist/CardPsychologist';
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  return (
    <div className="App">
      <Footer />
      <Routes>
        <Route path="/" element={< LandingPage />} />
        <Route path="/home" element={< Home />} />
        <Route path="/" element={< NavBar />} />
        <Route exact path='/signup' element={<RegisterForm />} />
        <Route exact path='/:idUserClient' element={<ClientDetails />} />
        <Route path="/cardPsicologist" element={<CardPsychologist />} />
        <Route path="/" element={< NavBar />} />
        <Route exact path='/post' element={<Post />} />
      </Routes>
    </div>
  );
}

