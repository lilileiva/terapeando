import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPsychologist } from '../../redux/actions';
import NavbarHome from '../NavbarHome/NavbarHome';
import CardPsychologist from '../CardPsychologist/CardPsychologist';
import './Home.css'
import Loader from '../Loader/Loader';
import smoothscroll from '../../animations';
import Paged from '../Paged/Paged';
import Psychologists from '../Psychologists/Psychologists';

export default function Home() {
  const AllPsychologist = useSelector(state => state.allUsersPsichologists);
  console.log(AllPsychologist)
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getAllPsychologist()) 
    smoothscroll();}, [dispatch]);

  /* Paginado */
    const [page, setPage] = useState(1);
  const [postPage, setPostPage] = useState(5);
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
        <Psychologists></Psychologists>
      </div>
      <Paged postPage={postPage} allPosts={AllPsychologist.length} paged={paged} page={page} setPage={setPage}/>
    </>
  )
}

