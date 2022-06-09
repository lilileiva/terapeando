import React from 'react'
import Post from '../Post/Posts'
import Footer from "../Footer/Footer";
import NavbarHome from '../NavbarHome/NavbarHome';

function Home() {
  return (
   <div>
    <NavbarHome />
    <Post />
    <Footer />
    </div>
  )
}

export default Home