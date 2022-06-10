import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllPsychologist } from '../../redux/actions';
import NavbarHome from '../NavbarHome/NavbarHome';
import CardPsychologist from '../CardPsychologist/CardPsychologist';
import './Home.css'
import Loader from '../Loader/Loader';
import smoothscroll from '../../animations';
import Paged from '../Paged/Paged';

export default function Home() {

  const AllPsychologist = useSelector(state => state.allUsersPsichologists);
  console.log(AllPsychologist)
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getAllPsychologist()) 
    smoothscroll();}, [dispatch]);

  /* Paginado */
    const [page, setPage] = useState(1);
  const [postPage, setPostPage] = useState(3);
  const quantityPostPage = page * postPage; 
  const firstPage = quantityPostPage - postPage; 
  const AllPsychologists = AllPsychologist.slice(firstPage, quantityPostPage)

  const paged = function(pageNumber){
    setPage(pageNumber);
    smoothscroll();
  }

  return (
    <>
   <NavbarHome />
    <div className='cardContainer'>
      {AllPsychologists.length !== 0 ?
      AllPsychologists.map(el =>{
        return(
          <CardPsychologist
          firstName={el.firstName}
          lastName={el.lastName}
          profileImage={el.profileImage} 
          rating={el.rating}
          education={el.education}
          about={el.about}
          />
        )
      }): <div><Loader /></div>}
    </div>
    <Paged postPage={postPage} allPosts={AllPsychologist.length} paged={paged} page={page} setPage={setPage}/>
    </>
  )
}

