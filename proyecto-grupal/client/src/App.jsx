import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Post from "./components/Post/Posts.jsx";
import PsychologistDetail from "./components/PsychologistDetail/PsychologistDetail";

function App() {
  return (
    <div className="App">
      <Footer />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route exact path="/signup" element={<RegisterForm />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/detailPsychologist" element={<PsychologistDetail />} />
      </Routes>
    </div>
  );
}

export default App;
