import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route exact path="/signup" element={<RegisterForm />} />
        <Route path="/" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
