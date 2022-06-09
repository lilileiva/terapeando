import React from 'react'
import Post from '../Post/Posts.jsx'
import NavBar from '../NavBar/NavBar.jsx'
import './blog.css'

export default function Blog () {

    return(
        <div>
            <NavBar />
            <h1 className='title'>Notas sobre psicología</h1>
            <Post />

            <h2>Secciones</h2>
            <section>
                <li>
                    <a href='/blog'>Todas las notas</a>
                </li>
            </section>
        </div>
    )
}