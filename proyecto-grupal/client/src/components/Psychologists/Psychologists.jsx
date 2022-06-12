import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPsychologist } from '../../redux/actions';
import NavBar from "../NavBar/NavBar";
import CardPsychologist from '../CardPsychologist/CardPsychologist';
import smoothscroll from '../../animations';
import Paged from '../Paged/Paged';
import './psychologist.css'
import Loader from '../Loader/Loader';


export default function Psychologists() {
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
        <div>
            <div>
                <NavBar />
            </div>
            <div className='psyContainer'>
                {AllPsychologist.map(el => {
                    return (
                        console.log(el)
                    )
                })}
            </div>
            <div className='psy'>
                {AllPsychologist.length !== 0 ?
                    AllPsychologist.map(el => {
                        //console.log(el.about.slice(0,100))
                        return (
                            <CardPsychologist
                                firstName={el.firstName}
                                lastName={el.lastName}
                                profileImage={el.profileImage}
                                rating={el.rating}
                                education={el.education}
                                about={el.about.slice(0, 300)}
                                idUserPsychologist={el._id}
                                Specialties={el.Specialties}
                                _id={el._id}
                            />
                        )
                    }) :  <div><Loader /></div>}
            </div>
            <Paged
                postPage={postPage}
                allPosts={AllPsychologist.length}
                paged={paged}
                page={page}
                setPage={setPage} />
        </div>
    )
}

