import React from "react";
import { Link } from 'react-router-dom';
import { Box, Avatar, Text, Stack, Button, Image, Badge, } from "@chakra-ui/react"
import './CardPsychologist.css';
import Starts from '../Starts/Starts';



export default function CardPsychologist({ firstName, lastName, Specialties, profileImage, rating, education, about, idPsychologist }) {

    return (
        <Box className="container" rounded="7px" boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

            <Stack className="ProfileBox">
                <Avatar className="avatar" src={profileImage} alt="img not found" size='2xl'></Avatar>
                <Text as='ins' textAlign='center' fontWeight='bold' className="name">{`${firstName} ${lastName}`}</Text>
                <Text className="textOcupation" > {education} </Text>
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
                <Box className="About">
                    <Text marginBottom='1em' className="about" fontSize="md" fontStyle="italic" fontWeight=" 500" textAlign='justify' width='90%'>
                        {about}
                    </Text>
                </Box>

                <Box className="profile"  >
                    <Link to={`/detailPsychologist/${idPsychologist}`}>
                        <Button className="buttonProfile" colorScheme='blackAlpha' variant='outline' size='sm' marginRight='15px' > Ver Perfil </Button>
                        <Button className="buttonProfile" colorScheme='blackAlpha' variant='outline' size='sm'> Hacer Una Consulta </Button>
                    </Link>
                </Box>
            </Stack>

            <Box className="containerBottom">
                <Image className="iconCard" src='https://img.icons8.com/ios/2x/calendar.png' alt='img not found' />
                <Text color='teal.700' marginTop='1em' className="textcalendar">
                    Este Profesional tiene disponibilidad en su agenda
                </Text>
                <Link to={`/schedule/${idPsychologist}`}>
                    <Button className="appointmentButton" bg={'#63caa7'} color='white' variant='solid' _hover={[{ color: '#63caa7' }, {bg: 'white'}]} size='lg'>
                        Pedir cita
                    </Button>
                </Link>
            </Box>
            
        </Box>
    )
};