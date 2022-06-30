import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, SimpleGrid, Heading, Badge, Text, Flex, Avatar, Stack, Image, Button } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  getUserPsychologistDetails,
  getUserPsychologistDetailsasClient,
  getPostsByPsychologistId,
  filterReviewsBySychologistAsClient,
  filterReviewsBySychologistAsPsycho
} from "../../redux/actions";
import img from '../../assets/logo-01.png'
import './PsychologistDetail.css'
import Starts from '../Starts/Starts';
import { ArrowLeftIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Footer from '../Footer/Footer.jsx';
import NavbarHome from '../NavbarHome/NavbarHome.jsx';
import smoothscroll from "../../animations";
import Loader from "../Loader/Loader";
import Reviews from "../Reviews/Reviews";
import NotFound from '../404notFound/notFound.jsx';
import Map from '../Map/Map.jsx';
import Schedule from "../Schedule/Schedule";


export default function PsychologistDetail() {

  const { IdUserPsychologist } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')
  const tokenAdmin = window.localStorage.getItem('tokenAdmin')

  useEffect(() => {
    if (tokenClient) {
      dispatch(getUserPsychologistDetailsasClient(IdUserPsychologist))
      dispatch(filterReviewsBySychologistAsClient(IdUserPsychologist))
    }
    if (tokenPsychologist) {
      dispatch(getUserPsychologistDetails(IdUserPsychologist))
      dispatch(filterReviewsBySychologistAsPsycho(IdUserPsychologist))
    }
    dispatch(getPostsByPsychologistId(IdUserPsychologist))
    smoothscroll()

    setTimeout(() => {
      setLoader(false);
    }, 500)
    return () => {
      dispatch(clear()); //Clear detail
    };
  }, [dispatch, IdUserPsychologist]);

  const detail = useSelector((state) => state.userPsichologistDetail);
  const posts = useSelector((state) => state.posts)
  const reviews = useSelector((state) => state.reviews)

  const [calendar, setCalendar] = useState(false)
  const handleCalendar = () => {
    if (!calendar) {
      setCalendar(true)
    } else {
      setCalendar(false)
    }
  }

  const [showMap, setShowMap] = useState(false)
  const [showReviews, setShowReviews] = useState(false)

  
  return (
    <>
      {
        tokenClient || tokenPsychologist || tokenAdmin
          ? (
            <>
              <div className='psychologistDetailContainer'>
                <Stack mb='1em'>
                  <NavbarHome />
                  <Flex className="HeaderDetail" alignItems={'center'} justifyContent='space-around' height={'10em'}>
                    <ArrowLeftIcon color='white' alignItems='left' cursor='pointer' onClick={() => navigate(-1)} />
                    <Text fontSize='3xl' fontWeight='500' color='white'>
                      Conoce un poco más sobre tu próximo psicólogo
                    </Text>
                    <img className="imageDetailLogo" src={img} alt="" width={'60rem'} />
                  </Flex>
                  {
                    Object.keys(detail).length !== 0
                      ? (
                        <>
                          {
                            loader
                              ? <Loader />
                              : <Stack direction='column' width='100%' height='100%' pl='10%' pr='10%'>
                                <SimpleGrid columns={1} textAlign='center' spacingX="10" spacingY="20px">
                                  <Flex direction='row' className="BoxDetail" borderRadius={'10px'} p='1em' width='100%' height='fit-content' justify='space-around' align='center'>
                                    <Box className="BoxDetailImage" backgroundColor={'transparent'} height="15em" width='15em'>
                                      <Avatar src={detail.profileImage} size='full' />
                                    </Box>
                                    <Stack direction='column' width='65%'>
                                      <Text fontSize='4xl' pb='0.5em'>{`${detail.firstName} ${detail.lastName}`}</Text>
                                      <Stack direction='row' width='100%' justify='space-around'>
                                        <Text fontSize='2xl'>{`📍 ${detail.location}`}</Text>
                                        <Text fontSize='2xl'>{`📩 ${detail.email}`}</Text>
                                        <Text fontSize='2xl'>{`🎓 ${detail.education}`}</Text>
                                      </Stack>
                                      <Stack direction='row' width='100%' pt='2em'>
                                        <Button width='50%' bg='#63caa7' color='white' variant='solid' _hover={[{ color: 'teal' }, { bg: 'green.100' }]} size='lg' onClick={handleCalendar}>
                                          Pedir cita
                                        </Button>
                                        <Button width='50%' color='#63caa7' bg='white' borderWidth='0.1em' borderColor='#63caa7' variant='solid' _hover={[{ color: 'teal' }, { bg: 'green.100' }]} size='lg' onClick={() => setShowMap(true)}>
                                          Ver mapa
                                        </Button>
                                      </Stack>
                                    </Stack>
                                  </Flex>
                                  <Flex className="BoxDetail" p='1em' justifyContent='space-around' borderRadius={'10px'} height={'fit-content'} alignContent='center' alignItems={'center'}>
                                    <Box borderRadius={'10px'} height="fit-content">
                                      <Text fontSize='xl'>
                                        Especialidades:
                                        {
                                          detail.Specialties && detail.Specialties.map((e) => (
                                            <Badge variant='subtle' colorScheme='blue' mr='1em' ml='1em'>{`${e}`}</Badge>
                                          ))
                                        }
                                      </Text>
                                    </Box>
                                  </Flex>
                                  <Box className="BoxDetail" p='1em' borderRadius={'10px'} height="fit-content">
                                    <Text fontSize='xl'>Sobre mí</Text>
                                    {
                                      detail.about
                                        ? <Text whiteSpace='pre-wrap' fontSize='md' p='1em'>{detail.about}</Text> : 'Aún no se ha agregado información'
                                    }
                                  </Box>
                                  <Box className="BoxDetail" p='1em' borderRadius={'10px'} height="fit-content">
                                    <Text fontSize='xl'>Mis notas</Text>
                                    <Stack direction='row' p='1em' height='fit-content' justify='left' overflowX='scroll' overflowY='hidden'>
                                      {
                                        posts.length !== 0
                                          ? posts.map((post) => {
                                            let postDate = post.createdAt
                                            postDate = new Date(postDate)
                                            return (
                                              <>
                                                <Link to={`/postdetail/${post._id}`}>
                                                  <Box mr='1em' height='20em' width='20em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                                                    <Image borderRadius='1em' width='inherit' height='20em' objectFit='cover' src={post.Image} />
                                                    <Stack className="postTitle">
                                                      <Stack>
                                                        <Text className="postTitleText" fontSize='2xl' fontWeight='500'>{post.Title}</Text>
                                                        <Text color='gray' fontSize='sm' fontWeight='500'>FECHA: {postDate.getUTCFullYear()}-{postDate.getUTCMonth()}-{postDate.getUTCDate()}</Text>
                                                      </Stack>
                                                      <Text color='gray' mt='2em' className="verMasText">Ver más</Text>
                                                    </Stack>
                                                  </Box>
                                                </Link>
                                              </>
                                            )
                                          })
                                          : <Stack width='100%'>
                                            <Text textAlign='center'>No hay notas</Text>
                                          </Stack>
                                      }
                                    </Stack>
                                  </Box>
                                  <Box className="BoxDetail" p='1em' borderRadius={'10px'} height="fit-content">
                                  {
                                      detail.rating
                                        ? (
                                          <Text fontSize='xl'>
                                            Mi calificación promedio 😊: <Starts rating={detail.rating} />
                                          </Text>
                                        ) : null
                                    }
                                    <br />
                                    <Button color='teal' bg='green.100' variant='solid' onClick={() => setShowReviews(true)}>
                                      Ver reviews
                                    </Button>
                                    {/* <Reviews /> */}
                                  </Box>
                                </SimpleGrid>
                              </Stack>
                          }
                        </>
                      ) : null
                  }
                </Stack>
                {
                  calendar
                    ? <div className="calendar">
                      <Schedule
                        firstName={detail.firstName}
                        lastName={detail.lastName}
                        profileImage={detail.profileImage}
                        rating={detail.rating}
                        IdUserPsychologist={detail._id}
                        setCalendar={setCalendar}
                      />
                    </div>
                    : null
                }
                {
                  showMap ? (
                    <div className="map">
                      <Stack direction='column' bg='white' pb='2em' pr='2em' pl='2em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                        <Stack display='flex' direction='column' justifyContent='baseline' width='100%' p='1em'>
                          <CloseIcon cursor='pointer' onClick={() => setShowMap(false)} />
                        </Stack>
                        <Map lat={detail.latitude} lng={detail.longitude} />
                      </Stack>
                    </div>
                  ) : null
                }
                {
                  showReviews
                    ? <div className="reviews">
                      <Stack bg='white' pb='2em' pr='2em' pl='2em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                        <Stack display='flex' direction='column' justifyContent='baseline' width='100%' p='1em'>
                          <CloseIcon cursor='pointer' onClick={() => setShowReviews(false)} />
                          <Text fontSize='2xl' color='green.300'>Reviews de este psicólogo</Text>
                        </Stack>
                        <Stack maxHeight='15em' overflowY='scroll'>
                          {
                            reviews.length !== 0
                              ? reviews.map((review) => (
                                <Stack align='center' bg='gray.200' borderRadius='1em' mb='1em' height='fit-content'>
                                  <Text>{review.Content}</Text>
                                  <Starts rating={review.Rating} />
                                </Stack>
                              )) : <Stack align='center' bg='gray.200' borderRadius='1em' mb='1em' height='fit-content'>
                                <Text>No hay reviews</Text>
                              </Stack>
                          }
                        </Stack>
                      </Stack>
                    </div>
                    : null
                }
                <Footer />
              </div>
            </>
          ) : (
            <NotFound />
          )
      }
    </>
  );
}