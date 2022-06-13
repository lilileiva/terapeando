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
import Loader from '../Loader/Loader.jsx';

export default function PsychologistDetail() {
  const dispatch = useDispatch();
  const { idPsychologist } = useParams();
  
  const detail = useSelector((state) => state.userPsichologistDetail);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserPsychologistOne(idPsychologist));
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


    // <div className="psychologistDetailContainer">
    //   <NavbarHome />

    //   <SimpleGrid columns={1} spacingX="60px" spacingY="20px">
    //     <SimpleGrid backgroundImage="url('https://images.pexels.com/photos/289586/pexels-photo-289586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
    //       backgroundPosition='top'
    //       backgroundSize={'cover'}
    //       backgroundRepeat="no-repeat" columns={3} spacingX="40px" spacingY="20px">
    //       <Box className="BoxDetail" marginBottom={'15px'} bg="white" height="120px" width='120px' zIndex='2'>
    //         <img src={detail.profileImage} alt="" width='120rem' height='4rem' />
    //       </Box>
    //       <Box className="BoxDetail"><Heading mb={3}>Conoce un poco más sobre tu próximo psicólogo</Heading></Box>
    //       <Box className="BoxDetail">    <img className="imageDetailLogo" src={img} alt="" width={'60rem'} /> </Box>
    //     </SimpleGrid>
    //     <SimpleGrid columns={1} marginTop={'20'} textAlign={'left'} paddingLeft={'32'} spacingX="40px" spacingY="20px">
    //       <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px" zIndex='2'>
    //         <Heading as='h3' size='lg'>
    //           {`${detail.firstName} ${detail.lastName}`}
    //         </Heading>
    //       </Box>
    //       <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
    //         <Heading as='h4' size='md'>
    //           {` 🎂 ${detail.birthDate}`}
    //         </Heading>
    //         <Heading as='h4' size='md' >
    //           {`📍${detail.country}`}
    //         </Heading>
    //       </Box>

    //       <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
    //         <Heading as='h4' size='md'>
    //           {`📩${detail.email}`}
    //         </Heading>
    //       </Box>

    //       <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
    //         <Heading as='h4' size='md'>
    //           {`🎓${detail.education}, Licencia: ${detail.License}`}
    //         </Heading>
    //       </Box>
    //       <Box className="BoxDetail" bg="" borderRadius={'10px'} height="200px">
    //         <Heading as='h4' size='md'>

    //           Especialidades: {detail.Specialties && detail.Specialties.map((e) => <ul> <Badge variant='subtle' colorScheme='purple'>{`${e}`}</Badge></ul>)
    //           }
    //         </Heading>
    //       </Box>
    //     </SimpleGrid>
    //     <Box className="BoxDetail" bg="" borderRadius={'10px'} height="fit-content">
    //       <Heading as='h5' size='md'>
    //         <h3>Sobre mí</h3>
    //         {`${detail.about}`}
    //       </Heading>
    //     </Box>
    //     <Box className="BoxDetail" bg="" borderRadius={'10px'} height="80px">
    //       <Heading as='h4' size='md'>
    //         Mi calificación promedio 😊: <Starts
    //           rating={detail.rating} />
    //       </Heading>
    //     </Box>
    //   </SimpleGrid>

    //   <Footer />
    // </div>
  );
}
