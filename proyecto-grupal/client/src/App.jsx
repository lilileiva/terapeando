import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from './components/ClientDetails/ClientDetails';
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import CardPsychologist from './components/CardPsychologist/CardPsychologist.jsx';
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import PsychologistDetail from "./components/PsychologistDetail/PsychologistDetail";
import FormEditClient from "./components/FormEditClient/FormEditClient"
import NotFound from "./components/404notFound/notFound";
import Blog from "./components/Blog/Blog.jsx";
import LoginForm from "./components/LoginForm/LoginForm";
import Psychologists from './components/Psychologists/Psychologists.jsx';
import Starts from "./components/Starts/Starts";
import Footer from "./components/Footer/Footer"
import Faqs from './components/faqs/Faqs'
import Schedule from "./components/Schedule/Schedule.jsx";



export default function App() {
  return (
    <div className="App">
      <Footer />      
      <Routes>
      <Route index element={< LandingPage />} />
      <Route path='/blog' element={<Blog />} />
      <Route path="/home" element={< Home />} />
      <Route path="/cardPsicologist" element={<CardPsychologist />} />
      <Route path='/signup' element={<RegisterForm />} />
      <Route path='/signin' element={<LoginForm />} />
      <Route path='/preguntasfrecuentes' element={<Faqs />} />
      <Route path='/:idUserClient' element={<ClientDetails />} />
      <Route path="/detailPsychologist/:IdUserPsychologist" element={<PsychologistDetail />} />
      <Route path="/editprofile/:idUserClient" element={<FormEditClient />} />
      <Route path="/*" element={<NotFound/>} />            
      <Route exact path='/schedule/:idUserPsychologist' element={<Schedule />} />
      </Routes>
    </div>
  );
}