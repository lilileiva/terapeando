import React, { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, getUserPsychologistOne } from "../../redux/actions";


export default function PsychologistDetail() {
  const dispatch = useDispatch();
  const { IdUserPsychologist} = useParams();
  const detail = useSelector((state) => state.userPsichologistDetail);

  useEffect(() => {
    dispatch(getUserPsychologistOne(IdUserPsychologist));
    return () => {
      dispatch(clear()); //Clear detail
    };
  }, [dispatch, IdUserPsychologist]);


  return (
    <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
      <Box bg="tomato" height="80px">
        <img src={detail.profileImage} alt="" width='150px' height='150px'/>
      </Box>
      <Box bg="tomato" height="80px">{detail.firstName}</Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
      <Box bg="tomato" height="80px"></Box>
    </SimpleGrid>
  );
}



// {
//   "_id": "62a2794dcffa2eaacf84fb12",
//   "firstName": "Juan Carlos",
//   "lastName": "Prieto",
//   "email": "58987654",
//   "password": "62fd716958d43f239",
//   "birthDate": "19/05/84",
//   "country": "Colombia",
//   "License": "as54as64",
//   "about": "¡Hola! Soy Juan, bienvenid@ Te ofrezco un espacio para conectar y Ser quien has venido a SER, un lugar para conocerte y transformarte; un sitio para parar, sentir, comprender. Estoy especializado en acompañar los procesos emocionales que traen consigo las crisis, cambios y transiciones de la v...",
//   "education": "Psicologo",
//   "DNI": "5845asdas",
//   "Specialties": [
//     "Depresión , Ansiedad , Transtornos , Autoestima , Adicciones"
//   ],
//   "profileImage": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "rating": 0,
//   "appointments": [],
//   "__v": 0
// }