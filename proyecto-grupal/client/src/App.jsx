import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from './components/ClientDetails/ClientDetails';
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar.jsx";
<<<<<<< HEAD:proyecto-grupal/client/src/App.js
import CardPsychologist from './components/CardPsychologist/CardPsychologist.jsx';
=======
import CardPsychologist from './components/CardPsychologist/CardPsychologist';
>>>>>>> 553e90c9a4197b267e604385f3842c83709b64d2:proyecto-grupal/client/src/App.jsx
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
<<<<<<< HEAD:proyecto-grupal/client/src/App.js
=======
        <Route exact path='/home/:idUserClient' element={<ClientDetails />} />
        <Route path="/cardPsicologist" element={<CardPsychologist />} />
        <Route exact path="/editprofile/:idUserClient" element={<FormEditClient />} />
        <Route exact path='/post' element={<Post />} />
        <Route path="/*" element={<NotFound/>} />
>>>>>>> 553e90c9a4197b267e604385f3842c83709b64d2:proyecto-grupal/client/src/App.jsx
        <Route exact path='/blog' element={<Blog />} />
      </Routes>
    </div>
  );
}