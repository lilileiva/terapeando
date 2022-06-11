import React from "react";
import { Link } from 'react-router-dom';
import { Box, Avatar, Text, Stack, Button, Image, Badge, } from "@chakra-ui/react"
import './CardPsychologist.css';
import Starts from '../Starts/Starts';



export default function CardPsychologist({ firstName, lastName, Specialties, profileImage, rating, education, about, id }) {

    console.log(Specialties)

    return (
        <Box className="container" rounded="7px" boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

            <Stack className="ProfileBox">
                <Avatar className="avatar" src={profileImage} alt="img not found" size='2xl'></Avatar>
                <Text as='ins' textAlign='center' fontWeight='bold'>{`${firstName} ${lastName}`}</Text>
                <Text> {education} </Text>
                <Text> <Starts
                rating={rating}/>  </Text>
            </Stack>

            <Stack className="containerCenter">

                <Box className="Especialidades">
                    {/* {Specialties.map((el) => {
                        return <Badge variant='subtle' colorScheme='red' className='Badge'>{el}</Badge>
                    })} */}
                     <Box>
                    {Specialties.map(el => {
                        console.log(el)
                        return (
                            <Badge variant='subtle' colorScheme='red' className='Badge'>{el}</Badge>
                        )
                    })}
                    </Box>
                    <Badge variant='subtle' colorScheme='green' className='Badge'>Depresión</Badge>
                    <Badge variant='subtle' colorScheme='red' className='Badge'>Autoestima</Badge>
                    <Badge variant='subtle' colorScheme='blue' className='Badge'>Adicciones</Badge>
                    <Badge variant='subtle' colorScheme='purple' className='Badge'>Transtornos</Badge>
                </Box>
                <Box className="About">
                <Text className="about" fontSize="14" fontStyle="italic" fontWeight=" 500" textAlign='justify' width='90%'>
                    {about}
                </Text>
                </Box>

                <Box className="profile"  >
                    <Button  className="buttonProfile" colorScheme='blackAlpha' variant='outline' size='sm' marginRight='15px'> Ver Perfil </Button>
                    <Button  className="buttonProfile" colorScheme='blackAlpha' variant='outline' size='sm'> Hacer Una Consulta </Button>
                </Box>

            </Stack>

            <Box className="containerBottom">
                <Image className="iconCard" src='https://img.icons8.com/ios/2x/calendar.png' alt='img not found' />
                <Text className="textcalendar">
                    Este Profesional tiene disponibilidad en su agenda
                </Text>
                <Link to={`/schedule/${id}`}>
                    <Button className="appointmentButton" backgroundColor='green.400' size='lg'>
                        Pedir cita
                    </Button>
                </Link>
            </Box>

        </Box>
    )
};