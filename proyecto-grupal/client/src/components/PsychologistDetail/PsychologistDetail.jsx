import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Heading, Badge, Text, Flex } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, getUserPsychologistOne } from "../../redux/actions";
import img from '../../assets/logo-01.png'
import './PsychologistDetail.css'
import Starts from '../Starts/Starts';
import { ArrowLeftIcon, CheckIcon } from '@chakra-ui/icons';
import Footer from '../Footer/Footer.jsx';
import NavbarHome from '../NavbarHome/NavbarHome.jsx';
import smoothscroll from "../../animations";

export default function PsychologistDetail() {
  const dispatch = useDispatch();
  const { idPsychologist } = useParams();
  
  const detail = useSelector((state) => state.userPsichologistDetail);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserPsychologistOne(idPsychologist));
    smoothscroll()
    return () => {
      dispatch(clear()); //Clear detail
    };
  }, [dispatch, idPsychologist]);


  return (
<div>
<NavbarHome />
<SimpleGrid  columns={1} spacingX="60px" spacingY="20px">
      <Flex className="HeaderDetail" alignItems={'center'} justifyContent='space-around' height={'32'}>   
        <Link to={'/psicologos'}>
       <ArrowLeftIcon color={'black.300'} alignItems={'left'} onClick={() => navigate(-1)}/>
       </Link>
        <Box className="BoxDetail" borderRadius={'10px'} width='fit-content' height={'fit-content'}><Text className="HeadingDetail" mb={3}>Conoce un poco más sobre tu próximo psicólogo</Text></Box>
        <Flex className="BoxDetail" borderRadius={'200px'} width='fit-content'height={'fit-content'} alignContent='center' alignItems={'center'}>    <img className="imageDetailLogo" src={img} alt="" width={'60rem'} /> </Flex>
      </Flex>
      <SimpleGrid  columns={1} marginTop={'1.5'} textAlign={'left'} paddingLeft={'32'} spacingX="40px" spacingY="20px">
      <Box className="BoxDetail"  marginBottom={'50px'} bg="" height="120px" width='120px'>
        <img src={detail.profileImage} alt="" width='120rem' height='4rem'/>
        </Box>
        <Box className="BoxDetail" bg="" borderRadius={'10px'}  height="80px" zIndex='2'> 
          <Text className="HeadingDetail">
            {`${detail.firstName} ${detail.lastName}`}
          </Text> 
        </Box>
      <Box className="BoxDetail" bg=""  borderRadius={'10px'} height="80px">
      <Text className="HeadingDetail" >
        {` 🎂 ${detail.birthDate}`} 
      </Text> 
      <Text className="HeadingDetail" >
      {`📍${detail.country}`}
      </Text>
      </Box>

      <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
      <Text className="HeadingDetail" > 
        {`📩${detail.email}`}
      </Text> 
        </Box>

      <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
      <Text className="HeadingDetail" > 
        {`🎓${detail.education}, Licencia: ${detail.License}`}
      </Text> 
        </Box>
        <Box className="BoxDetail" bg=""  borderRadius={'10px'}   height="fit-content">
      <Text className="HeadingDetail" > 
        
        Especialidades: {detail.Specialties && detail.Specialties.map((e)=> <ul> <Badge variant='subtle' colorScheme='purple'>{`${e}`}</Badge></ul> )        
        }
      </Text> 
        </Box>
        </SimpleGrid>
      <Box className="BoxDetail" bg="" borderRadius={'10px'} height="fit-content">
      <Text className="HeadingDetail" > 
      <h3>Sobre mí</h3>
        {`${detail.about}`}
      </Text> 
        </Box>
      <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
      <Text className="HeadingDetail" > 
        Mi calificación promedio 😊: <Starts
                rating={detail.rating}/>
      </Text> 
      </Box>
      </SimpleGrid>
      <Footer />
</div>
  );
}
