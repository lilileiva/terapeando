import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from './components/ClientDetails/ClientDetails';
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar.jsx";
import CardPsychologist from './components/CardPsychologist/CardPsychologist';
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PsychologistDetail from "./components/PsychologistDetail/PsychologistDetail";
import Post from "./components/Post/Posts";
import FormEditClient from "./components/FormEditClient/FormEditClient"
import NotFound from "./components/404notFound/notFound";
import Blog from "./components/Blog/Blog.jsx";
import Faqs from "./components/faqs/Faqs";


export default function App() {
  return (
    <div className="App">
      <Footer />
      <Routes>
        <Route path="/" element={< LandingPage />} />
        <Route path="/home" element={< Home />} />
        <Route exact path="/" element={< NavBar />} />
        <Route exact path='/signup' element={<RegisterForm />} />
        <Route exact path="/detailPsychologist" element={<PsychologistDetail />} />
        <Route path="/" element={< NavBar />} />
        <Route exact path='/home/:idUserClient' element={<ClientDetails />} />
        <Route path="/cardPsicologist" element={<CardPsychologist />} />
        <Route exact path="/editprofile/:idUserClient" element={<FormEditClient />} />
        <Route exact path='/post' element={<Post />} />
        <Route path="/*" element={<NotFound/>} />
        <Route exact path='/blog' element={<Blog />} />
      </Routes>
    </div>
  );
}