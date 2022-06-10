import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getAllPsychologist } from '../../redux/actions';
import NavbarHome from '../NavbarHome/NavbarHome';
import CardPsychologist from '../CardPsychologist/CardPsychologist';


export default function Home() {

  const AllPsychologist = useSelector(state => state.allUsersPsichologists);
  const dispatch = useDispatch();

  useEffect(() =>{dispatch(getAllPsychologist());}, [dispatch]);


  return (
   <div>
    <NavbarHome />
    <div>
      {AllPsychologist.map(el => {
        return(
          console.log(el)
        )
      })}
    </div>
    <div>
      {AllPsychologist.length !== 0 ?
      AllPsychologist.map(el =>{
        return(
          <CardPsychologist
          firstName={el.firstName}
          lastName={el.lastName}
          profileImage={el.profileImage} 
          rating={el.rating}
          education={el.education}
          about={el.about}
          idUserPsychologist={el._id}
          />
        )
      }): <div>Cargando...</div>}
    </div>
    </div>
  )
}

