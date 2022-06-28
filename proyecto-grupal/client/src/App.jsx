import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDetails from "./components/UserDetails/UserDetails";
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
import Psychologists from "./components/Psychologists/Psychologists.jsx";
import Footer from "./components/Footer/Footer";
import Faqs from "./components/faqs/Faqs";
import Payments from "./components/Payments/Payments";
import PostsDetail from "./components/Post/PostsDetail/PostsDetail.jsx";
import CheckoutPayment from "./components/Payments/CheckoutPayment";
import Success from "./components/Payments/CheckoutComponent/Success";
import Cancel from "./components/Payments/CheckoutComponent/Cancel";
import AddPost from "./components/AddPost/AddPost";
import Reviews from "./components/Reviews/Reviews";
import AdminPanelLogin from "./components/AdminPanel/AdminPanelLogin/AdminPanelLogin.jsx";
import AdminPanelHome from './components/AdminPanel/AdminPanelHome/AdminPanelHome.jsx';
import AdminPanelClients from './components/AdminPanel/AdminPanelClients/AdminPanelClients.jsx';
import AdminClientDetails from './components/AdminPanel/AdminPanelClients/AdminClientDetails/AdminClientDetails.jsx';
import AdminClientEdit from './components/AdminPanel/AdminPanelClients/AdminClientEdit/AdminClientEdit.jsx';
import AdminPanelPsychologists from './components/AdminPanel/AdminPanelPsychologists/AdminPanelPsychologists.jsx';
import AdminPsichologistDetails from './components/AdminPanel/AdminPanelPsychologists/AdminPsichologistDetails/AdminPsichologistDetails.jsx';
import AdminPsichologistEdit from './components/AdminPanel/AdminPanelPsychologists/AdminPsichologistEdit/AdminPsichologistEdit.jsx';
import AdminPanelPosts from './components/AdminPanel/AdminPanelPosts/AdminPanelPosts.jsx';
import AdminPostDetail from "./components/AdminPanel/AdminPanelPosts/AdminPostDetails/AdminPostDetail";
import AdminPanelPayments from './components/AdminPanel/AdminPanelPayments/AdminPanelPayments.jsx';
import AdminPanelStatistics from './components/AdminPanel/AdminPanelStatistics/AdminPanelStatistics.jsx';
import PaymentsAdmin from './components/AdminPanel/AdminPanelPayments/Components/PaymentsAdmin.jsx';
import Estadisticas from './components/AdminPanel/AdminPanelPayments/Components/Estadisticas.jsx';
import FiltersPsichologist from './components/FilterPsichologist/FilterPsichologist.jsx';
import EditSchedule from "./components/Schedule/EditSchedule/EditSchedule.jsx";
import Appointments from './components/Appointments/Appointments.jsx';


// import AdminPostEdit from "./components/AdminPanel/AdminPanelPosts/AdminPostEdit/AdminPostEdit";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Footer />} />
        <Route path="/" element={<NavBar />} />
        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/preguntasfrecuentes" element={<Faqs />} />
        <Route path="/home" element={<Home />} />
        <Route path="/psicologos" element={<Psychologists />} />
        <Route path="/detailPsychologist/:IdUserPsychologist" element={<PsychologistDetail />} />
        {/* <Route path="/editschedule/:IdUserPsychologist" element={<EditSchedule />} /> */}
        <Route path="/editschedule/" element={<EditSchedule />} />
        {/* <Route path='/schedule/:IdUserPsychologist' element={<Schedule />}/> */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/post" element={<Post />} />
        <Route path="/createPost" element={<AddPost />} />
        <Route path="/home/:idUserClient" element={<ClientDetails />} />
        <Route path="/editprofile/:idUserClient" element={<FormEditClient />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/postdetail/:id" element={<PostsDetail />} />
        <Route path='/mypayments' element={<Payments />} />
        <Route path='/checkout/:idPsychologist' element={<CheckoutPayment />} />
        <Route path='success' element={<Success />} />
        <Route path='canceled' element={<Cancel />} />
        <Route path='/appointments' element={<Appointments />} />
        {/*-----------------------admin panel---------------------*/}
        <Route path='/adminpanel/login' element={<AdminPanelLogin />} />
        <Route path='/adminpanel/inicio' element={<AdminPanelHome />} />
        <Route path='/adminpanel/clients' element={<AdminPanelClients />} />
        <Route path='/adminpanel/clients/:idUserClient' element={<AdminClientDetails />} />
        <Route path='/adminpanel/clients/edit/:idUserClient' element={<AdminClientEdit />} />
        <Route path='/adminpanel/psychologists' element={<AdminPanelPsychologists />} />
        <Route path='/adminpanel/psychologists/:IdUserPsychologist' element={<AdminPsichologistDetails/>} />
        <Route path='/adminpanel/psychologists/edit/:IdUserPsychologist' element={<AdminPsichologistEdit />} />
        <Route path='/adminpanel/posts' element={<AdminPanelPosts />} />
        <Route path="/adminpanel/posts/:idPost" element={<AdminPostDetail/>}/>
        <Route path='/adminpanel/payments' element={<AdminPanelPayments />} />
        <Route path='/adminpanel/statistics' element={<AdminPanelStatistics />} />
        <Route path='/filterpsicologos' element={<FiltersPsichologist />} />
        <Route path='adminpanel/payments/allpayments' element={<PaymentsAdmin />} />
        <Route path='adminpanel/payments/estadisticas' element={<Estadisticas />} />
      </Routes>
    </div>
  );
}