import React from "react";
import { Box, Avatar, Text, Stack, Button, Image} from "@chakra-ui/react"
import { style } from "././CardPsychologist.module.css"

export default function CardPsychologist({ firstName, lastName, Specialties, profileImage, rating }) {

    return (
        <Box
            width="850px"
            height="280px"
            marginTop={150}
            rounded="10px"
            display='inline-block'
            borderColor='blackAlpha.400'
            position="relative"
            boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.75)`}
            >

            <Stack
                width='230px'
                height="100%"
            >
                <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img not found" size='2xl' margin='auto' marginTop='15px' marginBottom='10px' ></Avatar>
                <Text as='ins' textAlign='center' fontWeight='semibold'>Doctor Juan Carlos Prieto</Text>
                <Text> Profesión </Text>
                <Text> Calificación </Text>
            </Stack>
            <Stack
                
                borderRight={`2px solid`}
                borderColor='blackAlpha.400'
                width='410px'
                height="100%"
                display='inline-block'
                position='absolute'
                top={0}
                right='0'
                left='30'
                margin='auto'
            >
                <Text
                    border-left='2px'
                    color='teal.800'
                    fontSize='14'
                    margin='auto'
                    marginTop='15px'
                    marginLeft='5px'
                    width='90%'
                    fontStyle='italic'
                    fontWeight='600'>  
                    ¡Hola! Soy Juan, bienvenid@ Te ofrezco un espacio para conectar y Ser quien has venido a SER, un lugar para conocerte y transformarte; un sitio para parar, sentir, comprender. Estoy especializado en acompañar los procesos emocionales que traen consigo las crisis, cambios y transiciones de la v...
                </Text>

            </Stack>

            <Box
                width='200px'
                height="100%"
                display='inline-block'
                position='absolute'
                top={0} right='0' >
                     <Image src='https://img.icons8.com/office/2x/calendar.png' alt='img not found'
                     position='absolute'
                     top='0'
                     bottom='50%'
                     left='0'
                     right='0'
                     margin='auto'
                     boxSize='60px'
                      />
                <Text
                position='absolute'
                     top='0'
                     left='0'
                     right='0'
                     margin='auto'
                     marginTop='55%'
                     fontSize='12px'
                     width='90%'
                   >
                    Este Profesional tiene disponibilidad en su agenda
                </Text>
                <Button
                    color='teal.800'
                    backgroundColor='green.200'
                    size='lg'
                    position='relative'
                    margin='auto'
                    top='60%'
                    width='150px'>
                    Pedir cita
                </Button>
            </Box>

        </Box>
    )
};