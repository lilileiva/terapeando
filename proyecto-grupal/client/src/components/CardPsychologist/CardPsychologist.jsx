import React from "react";
import { Box, Avatar, Text, Stack, Button, Image, Badge, } from "@chakra-ui/react"
import './CardPsychologist.css';


export default function CardPsychologist({ firstName, lastName, Specialties, profileImage, rating }) {

    return (
        <Box
            width="90%"
            height="280px"
            marginTop={150}
            rounded="10px"
            display='inline-block'
            position="relative"
            boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.75)`}
            
        >

            <Stack
                width='270px'
                height="100%"
            >
                <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img not found" size='2xl' margin='auto' marginTop='15px' marginBottom='10px' ></Avatar>
                <Text as='ins' textAlign='center' fontWeight='bold'>Doctor Juan Carlos Prieto</Text>
                <Text> Profesión </Text>
                <Text> Calificación </Text>
            </Stack>
            <Stack

                borderRight={`2px solid`}
                borderColor='blackAlpha.400'
                width='650px'
                height="100%"
                display='inline-block'
                position='absolute'
                top={0}
                right='10'
                left='0'
                margin='auto'
            >
                <Box className="Especialidades"   >
                    <Badge variant='subtle' colorScheme='red' className='Badge'>Ansiedad</Badge>
                    <Badge variant='subtle' colorScheme='green' className='Badge'>Depresión</Badge>
                    <Badge variant='subtle' colorScheme='blue' className='Badge'>Autoestima</Badge>
                    <Badge variant='subtle' colorScheme='blue' className='Badge'>Adicciones</Badge>
                    <Badge variant='subtle' colorScheme='blue' className='Badge'>Transtornos</Badge>
                </Box>
                <Text className="about" fontSize="15" fontStyle="italic" fontWeight=" 600">
                    ¡Hola! Soy Juan, bienvenid@ Te ofrezco un espacio para conectar y Ser quien has venido a SER, un lugar para conocerte y transformarte; un sitio para parar, sentir, comprender. Estoy especializado en acompañar los procesos emocionales que traen consigo las crisis, cambios y transiciones de la v...
                </Text>

                <Box className="verPerfil"  >
                <Button  colorScheme='blackAlpha' variant='outline' size='sm' marginRight='15px'> Ver Perfil </Button>
                <Button  colorScheme='blackAlpha' variant='outline' size='sm'> Hacer Una Consulta </Button>
                </Box>
              
            </Stack>

            <Box
            
                width='310px'
                height="100%"
                display='inline-block'
                position='absolute'
                top={0} right='0' >
                <Image src='https://img.icons8.com/office/2x/calendar.png' alt='img not found'
                    position='absolute'
                    top='0'
                    bottom='140px'
                    left='0'
                    right='0'
                    margin='auto'
                    boxSize='70px'
                />
                <Text
                    position='absolute'
                    top='0'
                    left='0'
                    right='0'
                    margin='auto'
                    marginTop='120px'
                    fontSize='15px'
                    width='80%'
                >
                    Este Profesional tiene disponibilidad en su agenda
                </Text>
                <Button
                    color='white'
                    backgroundColor='green.400'
                    size='lg'
                    position='relative'
                    margin='auto'
                    top='180px'
                    width='150px'>
                    Pedir cita
                </Button>
            </Box>

        </Box>
    )
};