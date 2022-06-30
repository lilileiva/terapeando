import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Box, Avatar, Text, Stack, Button, Image, Badge, } from "@chakra-ui/react"
import './CardPsychologist.css';
import Starts from '../Starts/Starts';
import Schedule from "../Schedule/Schedule";
import { useDispatch } from "react-redux";

export default function CardPsychologist({ firstName, lastName, Specialties, profileImage, rating, education, about, IdUserPsychologist }) {

    const navigate = useNavigate();
    const [calendar, setCalendar] = useState(false)
    const handleCalendar = () => {
        if (!calendar) {
            setCalendar(true)
        } else {
            setCalendar(false)
        }
    }

    const tokenClient = window.localStorage.getItem('tokenClient')
    const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')


    return (
        <Box className="cardPsychologistContainer" rounded="7px" boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

            <Stack className="ProfileBox">
                <Link to={`/detailPsychologist/${IdUserPsychologist}`}>
                    <Stack direction='column' align='center' cursor='pointer'>
                        <Avatar className="avatar" src={profileImage} alt="img not found" size='2xl' />
                        <Text as='ins' color='blackAlpha.700' textAlign='center' fontWeight='bold' className="name">{`${firstName} ${lastName}`}</Text>
                    </Stack>
                </Link>
                <Text className="textOcupation" color='blackAlpha.500'> {education} </Text>
                <Box className="boxstars">
                    <Starts rating={rating} />
                </Box>
            </Stack>

            <Stack className="containerCenter">
                <Box className="Especialidades">
                    <Badge variant='subtle' className='Badge'>{Specialties[0]}</Badge>
                    <Badge variant='subtle' colorScheme='green' className='Badge'>{Specialties[1]}</Badge>
                    <Badge variant='subtle' colorScheme='red' className='Badge'>{Specialties[2]}</Badge>
                    <Badge variant='subtle' colorScheme='blue' className='Badge'>{Specialties[3]}</Badge>
                    <Badge variant='subtle' colorScheme='purple' className='Badge'>{Specialties[4]}</Badge>
                    <Badge variant='subtle' className='Badge'>{Specialties[5]}</Badge>
                </Box>
                <Box minHeight='10em' className="About">
                    {
                        about
                            ? (
                                <Text mb='1em' className="about" color='blackAlpha.700' fontSize="md" fontStyle="italic" fontWeight="500" textAlign='justify' width='90%'>
                                    {about.slice(0, 500)}...
                                    <br />
                                    {
                                        tokenClient || tokenPsychologist
                                            ? (
                                                <Link to={`/detailPsychologist/${IdUserPsychologist}`}>
                                                    <button className="vermas">Ver más</button>
                                                </Link>
                                            ) : (
                                                <Link to={'/signin'}>
                                                    <button className="vermas">Ver más</button>
                                                </Link>
                                            )
                                    }
                                </Text>
                            ) : <Text mb='1em' className="about" fontSize="md" fontStyle="italic" fontWeight=" 500" textAlign='justify' width='90%'>
                                Sin descripción.
                            </Text>
                    }
                </Box>

                <Box className="profile"  >
                    {
                        tokenClient || tokenPsychologist
                            ? (
                                <Link to={`/detailPsychologist/${IdUserPsychologist}`}>
                                    <Button className="buttonProfile" color='blackAlpha.600' _hover={{
                                        bg: 'blackAlpha.300',
                                        color: 'blackAlpha.700'
                                    }} variant='outline' size='sm' marginRight='15px'>
                                        Ver Perfil
                                    </Button>
                                    <Button className="buttonProfile" color='blackAlpha.600' _hover={{
                                        bg: 'blackAlpha.300',
                                        color: 'blackAlpha.700'
                                    }} variant='outline' size='sm'> Hacer Una Consulta </Button>
                                </Link>
                            ) : (
                                <Link to={'/signin'}>
                                    <Button className="buttonProfile" color='blackAlpha.600' _hover={{
                                        bg: 'blackAlpha.300',
                                        color: 'blackAlpha.700'
                                    }} variant='outline' size='sm' marginRight='15px' > Ver Perfil </Button>
                                    <Button className="buttonProfile" color='blackAlpha.600' _hover={{
                                        bg: 'blackAlpha.300',
                                        color: 'blackAlpha.700'
                                    }} variant='outline' size='sm'> Hacer Una Consulta </Button>
                                </Link>
                            )
                    }
                </Box>
            </Stack>

            <Box className="containerBottom" borderLeftWidth='0.1em' borderColor='#b7b7b7' pl='1em'>
                <Image className="iconCard" src='https://img.icons8.com/ios/2x/calendar.png' alt='img not found' />
                <Text color='teal.700' marginTop='1em' className="textcalendar">
                    Este Profesional tiene disponibilidad en su agenda
                </Text>
                {
                    tokenClient || tokenPsychologist
                        ? (
                            /*                             <Link to={`/schedule/${IdUserPsychologist}`}> */
                            <Button className="appointmentButton" mt='1em' bg={'#63caa7'} color='white' variant='solid' _hover={[{ color: '#63caa7' }, { bg: 'white' }]} size='lg' onClick={handleCalendar}>
                                Pedir cita
                            </Button>
                            /*  </Link> */
                        ) : (
                            <Button className="appointmentButton" mt='1em' bg={'#63caa7'} color='white' variant='solid' _hover={[{ color: '#63caa7' }, { bg: 'white' }]} size='lg' onClick={() => navigate('/signin')}>
                                Pedir cita
                            </Button>
                        )
                }
            </Box>
            {
                calendar
                    ? <div className="calendar">
                        <Schedule
                            firstName={firstName}
                            lastName={lastName}
                            profileImage={profileImage}
                            rating={rating}
                            IdUserPsychologist={IdUserPsychologist}
                            setCalendar={setCalendar}
                        />
                    </div>
                    : null
            }
        </Box>
    )
};