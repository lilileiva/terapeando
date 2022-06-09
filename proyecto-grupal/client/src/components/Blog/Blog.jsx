import React from 'react'
import Post from '../Post/Posts.jsx'
import NavBar from '../NavBar/NavBar.jsx'
import './blog.css'
import Filters from './Filter/Filter.jsx'

export default function Blog () {

    return(
        <div>
            <NavBar />
            <h1 className='title'>Notas sobre psicología</h1>
            <Filters/>
            <Post />
        </div>
    )
}