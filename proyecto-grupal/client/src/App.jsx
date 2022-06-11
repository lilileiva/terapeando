import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from "./components/ClientDetails/ClientDetails";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import PsychologistDetail from "./components/PsychologistDetail/PsychologistDetail";
import Post from "./components/Post/Posts";
import FormEditClient from "./components/FormEditClient/FormEditClient";
import NotFound from "./components/404notFound/notFound";
import Blog from "./components/Blog/Blog.jsx";
import LoginForm from "./components/LoginForm/LoginForm";
import Footer from "./components/Footer/Footer";
import Faqs from "./components/faqs/Faqs";
import Schedule from "./components/Schedule/Schedule.jsx";

export default function App() {
  return (
    <div className="App">
      <Footer />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<RegisterForm />} />

        <Route path="/preguntasfrecuentes" element={<Faqs />} />
        <Route path="home/client/:idUserClient" element={<ClientDetails />} />

        <Route path="/putclient/:idUserClient" element={<FormEditClient />} />
        <Route path="/*" element={<NotFound />} />

        <Route exact path="/signin" element={<LoginForm />} />
        <Route
          exact
          path="/detailPsychologist"
          element={<PsychologistDetail />}
        />
        <Route path="/" element={<NavBar />} />

        <Route
          exact
          path="/editprofile/:idUserClient"
          element={<FormEditClient />}
        />
        <Route exact path="/post" element={<Post />} />

        <Route
          exact
          path="/schedule/:idUserPsychologist"
          element={<Schedule />}
        />
      </Routes>
    </div>
  );
}
