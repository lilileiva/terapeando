import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from './components/RegisterForm/RegisterForm';
import Post from './components/Post/Posts.jsx'
import CardPsychologist from './components/CardPsychologist/CardPsychologist';
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
<<<<<<< HEAD:proyecto-grupal/client/src/App.jsx
import Post from "./components/Post/Posts.jsx";
import PsychologistDetail from "./components/PsychologistDetail/PsychologistDetail";
=======
>>>>>>> 695ef87db171474703f7d38e501d3ccf7049d01e:proyecto-grupal/client/src/App.js

function App() {
  return (
    <div className="App">      
      <Routes>
<<<<<<< HEAD:proyecto-grupal/client/src/App.jsx
        <Route path="/" element={<NavBar />} />
        <Route exact path="/signup" element={<RegisterForm />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/detailPsychologist" element={<PsychologistDetail />} />
=======
      <Route path="/cardPsicologist" element={<CardPsychologist/>} />
        <Route path="/" element={< NavBar />} />
        <Route exact path='/signup' element={<RegisterForm />} />
        <Route exact path='/post' element={<Post />} />
      <Footer />
>>>>>>> 695ef87db171474703f7d38e501d3ccf7049d01e:proyecto-grupal/client/src/App.js
      </Routes>
    </div>
  );
}

export default App;
