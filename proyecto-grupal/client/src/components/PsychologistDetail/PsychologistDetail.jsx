import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Heading, Badge } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, getUserPsychologistOne } from "../../redux/actions";
import img from '../../assets/logo-01.png'
import './PsychologistDetail.css'
import Starts from '../Starts/Starts';
import Footer from '../Footer/Footer.jsx';
import NavbarHome from '../NavbarHome/NavbarHome.jsx';
import smoothscroll from "../../animations";

export default function PsychologistDetail() {
  const dispatch = useDispatch();
  const { idPsychologist } = useParams();
  
  const detail = useSelector((state) => state.userPsichologistDetail);

  useEffect(() => {
    dispatch(getUserPsychologistOne(idPsychologist));
    smoothscroll()
    return () => {
      dispatch(clear()); //Clear detail
    };
  }, [dispatch, idPsychologist]);


  return (
    <div className="psychologistDetailContainer">
      <NavbarHome />

      <SimpleGrid columns={1} spacingX="60px" spacingY="20px">
        <SimpleGrid backgroundImage="url('https://images.pexels.com/photos/289586/pexels-photo-289586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          backgroundPosition='top'
          backgroundSize={'cover'}
          backgroundRepeat="no-repeat" columns={3} spacingX="40px" spacingY="20px">
          <Box className="BoxDetail" marginBottom={'15px'} bg="white" height="120px" width='120px' zIndex='2'>
            <img src={detail.profileImage} alt="" width='120rem' height='4rem' />
          </Box>
          <Box className="BoxDetail"><Heading mb={3}>Conoce un poco más sobre tu próximo psicólogo</Heading></Box>
          <Box className="BoxDetail">    <img className="imageDetailLogo" src={img} alt="" width={'60rem'} /> </Box>
        </SimpleGrid>
        <SimpleGrid columns={1} marginTop={'20'} textAlign={'left'} paddingLeft={'32'} spacingX="40px" spacingY="20px">
          <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px" zIndex='2'>
            <Heading as='h3' size='lg'>
              {`${detail.firstName} ${detail.lastName}`}
            </Heading>
          </Box>
          <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
            <Heading as='h4' size='md'>
              {` 🎂 ${detail.birthDate}`}
            </Heading>
            <Heading as='h4' size='md' >
              {`📍${detail.country}`}
            </Heading>
          </Box>

          <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
            <Heading as='h4' size='md'>
              {`📩${detail.email}`}
            </Heading>
          </Box>

          <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
            <Heading as='h4' size='md'>
              {`🎓${detail.education}, Licencia: ${detail.License}`}
            </Heading>
          </Box>
          <Box className="BoxDetail" bg="" borderRadius={'10px'} height="200px">
            <Heading as='h4' size='md'>

              Especialidades: {detail.Specialties && detail.Specialties.map((e) => <ul> <Badge variant='subtle' colorScheme='purple'>{`${e}`}</Badge></ul>)
              }
            </Heading>
          </Box>
        </SimpleGrid>
        <Box className="BoxDetail" bg="" borderRadius={'10px'} height="fit-content">
          <Heading as='h5' size='md'>
            <h3>Sobre mí</h3>
            {`${detail.about}`}
          </Heading>
        </Box>
        <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
          <Heading as='h4' size='md'>
            Mi calificación promedio 😊: <Starts
              rating={detail.rating} />
          </Heading>
        </Box>
      </SimpleGrid>

      <Footer />
    </div>
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