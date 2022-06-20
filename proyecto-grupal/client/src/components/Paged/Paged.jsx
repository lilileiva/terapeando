import React from 'react'
import style from './paged.module.css'
import Loader from '../Loader/Loader';
import smoothscroll from '../../animations'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

function Paged({postPage, allPosts, paged, page, setPage}) {

   
   const actualPage = page;
   const pages = [];

   for(let i = 1; i <= Math.ceil(allPosts/postPage); i++){
      pages.push(i);
   };

   const getPrevious = () => {
      if(actualPage > 1) setPage(actualPage - 1)
      smoothscroll();
    }
  
  
    const getNext = (pages) => {
      if(actualPage < pages.length) setPage(actualPage + 1) 
      smoothscroll();
    }



   return(
      <>
      {pages.length < 1 ? null :
         <>
         <div className={style.container} >
            <ArrowBackIcon onClick={() => getPrevious(pages)} />
            {pages?.map(p => (
               <a className={(actualPage === p ? style.pageActive : style.page)} key={p} onClick={() => paged(p)}>{p}</a>
               ))}
               <ArrowForwardIcon onClick={() => getNext(pages)} />
               </div>
               
             </>
         
      } 
      </>
   )
}

export default Paged