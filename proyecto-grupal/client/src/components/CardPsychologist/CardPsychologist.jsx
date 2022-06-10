import React from "react";
import { Link } from 'react-router-dom';
import { Box, Avatar, Text, Stack, Button, Image, Badge, } from "@chakra-ui/react"
import './CardPsychologist.css';


export default function CardPsychologist({ firstName, lastName, Specialties, profileImage, rating, education, about, idUserPsychologist }) {

    return (
        <Box className="container" rounded="10px" boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

            <Stack className="ProfileBox">
                <Avatar className="avatar" src={profileImage} alt="img not found" size='2xl'></Avatar>
                <Text as='ins' textAlign='center' fontWeight='bold'>{`${firstName} ${lastName}`}</Text>
                <Text> {education} </Text>
                <Text> {rating} </Text>
            </Stack>

            <Stack className="containerCenter">

                <Box className="Especialidades">
                    {/* {Specialties.map((el) => {
                        return <Badge variant='subtle' colorScheme='red' className='Badge'>{el}</Badge>
                    })} */}
                    <Badge variant='subtle' className='Badge'>Ansiedad</Badge>
                    <Badge variant='subtle' colorScheme='green' className='Badge'>Depresión</Badge>
                    <Badge variant='subtle' colorScheme='red' className='Badge'>Autoestima</Badge>
                    <Badge variant='subtle' colorScheme='blue' className='Badge'>Adicciones</Badge>
                    <Badge variant='subtle' colorScheme='purple' className='Badge'>Transtornos</Badge>
                </Box>

                <Text className="about" fontSize="15" fontStyle="italic" fontWeight=" 600">
                    {about}
                </Text>

                <Box className="profile"  >
                    <Button colorScheme='blackAlpha' variant='outline' size='sm' marginRight='15px'> Ver Perfil </Button>
                    <Button colorScheme='blackAlpha' variant='outline' size='sm'> Hacer Una Consulta </Button>
                </Box>

            </Stack>

            <Box className="containerBottom">
                <Image className="iconCard" src='https://img.icons8.com/office/2x/calendar.png' alt='img not found' />
                <Text className="textcalendar">
                    Este Profesional tiene disponibilidad en su agenda
                </Text>
                <Link to={`/schedule/${idUserPsychologist}`}>
                    <Button className="appointmentButton" backgroundColor='green.400' size='lg'>
                        Pedir cita
                    </Button>
                </Link>
            </Box>

        </Box>
    )
};