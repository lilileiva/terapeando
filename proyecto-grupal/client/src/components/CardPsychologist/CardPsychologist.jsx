import React from "react";
import { Box, Avatar, Text, Stack, Button, Image, Badge, } from "@chakra-ui/react"
import './CardPsychologist.css';


export default function CardPsychologist({ firstName, lastName, Specialties, profileImage, rating }) {

    return (
        <Box className="container" rounded="10px" boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.75)`}>

            <Stack className="ProfileBox">
                <Avatar className="avatar" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img not found" size='2xl'></Avatar>
                <Text as='ins' textAlign='center' fontWeight='bold'>Doctor Juan Carlos Prieto</Text>
                <Text> Profesión </Text>
                <Text> Calificación </Text>
            </Stack>

            <Stack className="containerCenter">
                
                <Box className="Especialidades"   >
                    <Badge variant='subtle' className='Badge'>Ansiedad</Badge>
                    <Badge variant='subtle' colorScheme='green' className='Badge'>Depresión</Badge>
                    <Badge variant='subtle' colorScheme='red' className='Badge'>Autoestima</Badge>
                    <Badge variant='subtle' colorScheme='blue' className='Badge'>Adicciones</Badge>
                    <Badge variant='subtle' colorScheme='purple' className='Badge'>Transtornos</Badge>
                </Box>

                <Text className="about" fontSize="15" fontStyle="italic" fontWeight=" 600">
                    ¡Hola! Soy Juan, bienvenid@ Te ofrezco un espacio para conectar y Ser quien has venido a SER, un lugar para conocerte y transformarte; un sitio para parar, sentir, comprender. Estoy especializado en acompañar los procesos emocionales que traen consigo las crisis, cambios y transiciones de la v...
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
                <Button className="appointmentButton" backgroundColor='green.400' size='lg'>
                    Pedir cita
                </Button>
            </Box>

        </Box>
    )
};