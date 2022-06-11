import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, getUserPsychologistOne } from "../../redux/actions";
import img from '../../assets/logo-01.png'
import './PsychologistDetail.css'
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
    <SimpleGrid   backgroundImage="url('https://images.pexels.com/photos/289586/pexels-photo-289586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
    backgroundPosition="center"
    backgroundSize={'cover'}
    backgroundRepeat="no-repeat"  columns={1} spacingX="40px" spacingY="20px">
      <SimpleGrid row={1} columns={3} spacingX="40px" spacingY="20px">
        <Box className="BoxDetail" bg="white" height="120px" width='120px' zIndex='2'>
        <img src={detail.profileImage} alt="" width='150rem' height='4rem'/>
        </Box>
        <Box className="BoxDetail"><Heading mb={4}>Conoce un poco más sobre tu próximo psicólogo</Heading></Box>
        <Box className="BoxDetail">    <img className="imageDetailLogo" src={img} alt="" width={'60rem'} /> </Box>
      </SimpleGrid>
      <SimpleGrid  columns={5} spacingX="40px" spacingY="20px">
        <Box className="BoxDetail" bg="yellow" borderRadius={'10px'}  height="80px" zIndex='2'> 
          <Heading as='h4' size='md'>
            {`Hola 😊 soy: ${detail.firstName} ${detail.lastName}`}
          </Heading> 
        </Box>
      <Box className="BoxDetail" bg="yellow"  borderRadius={'10px'} height="80px">
      <Heading as='h4' size='md'>
        {`Nací el ${detail.birthDate}`}
      </Heading> 
      </Box>

      <Box className="BoxDetail" bg="yellow" borderRadius={'10px'} height="80px">
      <Heading as='h4' size='md'> 
        {`Puedes contactarme a mi email: ${detail.email}`}
      </Heading> 
        </Box>
      <Box className="BoxDetail" bg="yellow" borderRadius={'10px'} height="80px">
      <Heading as='h4' size='md'> 
        {`Nací en ${detail.country}`}
      </Heading> 
        </Box>
      <Box className="BoxDetail" bg="yellow" borderRadius={'10px'} height="80px">
      <Heading as='h4' size='md'> 
        {`Graduado de ${detail.education} con licencia: ${detail.License}`}
      </Heading> 
        </Box>
        </SimpleGrid>
      
      
      <Box className="BoxDetail" bg="yellow" borderRadius={'10px'} height="200px">
      <Heading as='h5' size='md'> 
        {`Te cuento un poco sobre mí ${detail.about}`}
      </Heading> 
        </Box>
      <Box className="BoxDetail" bg="yellow" borderRadius={'10px'} height="80px">
      <Heading as='h4' size='md'> 
        {`Puedo ayudarte con estos temas: ${detail.Specialties && detail.Specialties.join(' ').replace(/ /g, ' | ')}`}
      </Heading> 
        </Box>
      <Box className="BoxDetail" bg="yellow" borderRadius={'10px'} height="80px">
      <Heading as='h4' size='md'> 
        {`He ayudado a muchas personas y así es como, en promedio, han calificado su experiencia con mis sesiones 😊: ${detail.rating} de 5.0` }
      </Heading> 
        </Box>
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