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
import Loader from "../Loader/Loader";

export default function PsychologistDetail() {
  const dispatch = useDispatch();
  const { idPsychologist } = useParams();
  const [loader, setLoader] = useState(false);
  const detail = useSelector((state) => state.userPsichologistDetail);
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(getUserPsychologistOne(idPsychologist));
  //   smoothscroll()
  //   return () => {
  //     dispatch(clear()); //Clear detail
  //   };
  // }, [dispatch, idPsychologist]);

  useEffect(() => {
    dispatch(getUserPsychologistOne(idPsychologist));
    setLoader(true);
    smoothscroll()
    setTimeout(() => {
      setLoader(false);
    }, 2000)
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
    {loader ? <Loader></Loader> : <>
    
    <SimpleGrid  columns={1} marginTop={'1.5'} marginLeft={'-20'} marginRight='16' textAlign={'left'} paddingLeft={'32'} spacingX="10" spacingY="20px">
      <Flex className="BoxDetail"  borderRadius={'200px'} width='fit-content'height={'fit-content'} alignContent='center' alignItems={'center'}>
      <Box className="BoxDetail" borderTopLeftRadius={'10px'} marginBottom={'50px'} bg="" height="120px" width='120px'>
          <img className="ProfileImage" src={detail.profileImage} alt=""/>          
          </Box>
          <Box className="BoxDetail" bg="" borderRadius={'10px'}  height="fit-content" width={'fit-content'} zIndex='2'> 
            <Text className="HeadingDetail">
              {`${detail.firstName} ${detail.lastName}`}
            </Text> 
          </Box>
          <Box className="BoxDetail" bg="" borderRadius={'10px'}  height="fit-content" idth={'fit-content'} zIndex='2'>
          <Text className="HeadingDetail" >
        {`📍${detail.country}`}
        </Text>
          </Box>
          <Box className="BoxDetail" bg="" borderRadius={'10px'} height="fit-content" width={'fit-content'}>
        <Text className="HeadingDetail" > 
          {`📩${detail.email}`}
        </Text> 
          </Box>
          <Box className="BoxDetail" bg="" borderRadius={'10px'} borderTopRightRadius='40px' borderBottomRightRadius={'40px'} height="fit-content" width={'fit-content'}>
        <Text className="HeadingDetail" > 
          {`🎓${detail.education}`}
          <Text className="HeadingDetail" >
            {`Licencia: ${detail.License}`}
          </Text>
        </Text> 
          </Box>
      </Flex>
        <Box className="BoxDetail" bg=""  borderRadius={'10px'} height="80px">
        <Text className="HeadingDetail" >
          {` 🎂 ${detail.birthDate}`} 
        </Text> 
        </Box>
  
       
  
        <Flex className="BoxDetail" marginLeft={'56'} justifyContent='space-around' borderRadius={'10px'} width='fit-content'height={'fit-content'} alignContent='center' alignItems={'center'}>
        <Box  bg=""  borderRadius={'10px'}   height="fit-content" marginRight={'10'}>
        <Text className="HeadingDetail" > 
          
          Especialidades: {detail.Specialties && detail.Specialties.map((e)=>  <Badge variant='subtle' colorScheme='purple'>{`${e}`}</Badge> )        
          }
        </Text> 
          </Box>
        </Flex>
          </SimpleGrid>
        <Box className="BoxDetail" bg="" marginRight='20' marginLeft={'24'} borderRadius={'10px'} height="fit-content">
        <Text className="HeadingDetail" > 
        <h3>Sobre mí</h3>
          {detail.about === undefined ? 'Aún no se ha agregado información' : detail.about}
        </Text> 
          </Box>
        <Box className="BoxDetail" bg="" borderRadius={'10px'} marginRight='20' marginLeft={'24'} height="80px">
        <Text className="HeadingDetail" > 
          Mi calificación promedio 😊: <Starts
                  rating={detail.rating}/>
        </Text> 
        </Box>
    </>}          
      </SimpleGrid>
      <Footer />
</div>
  );
}
