import React, { useEffect, useState } from 'react';
import './Schedule.css'
import { useSelector, useDispatch } from 'react-redux';
import { getUserPsychologistOne, clear } from '../../redux/actions'
import { Text, Stack, Avatar, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function Schedule({ firstName, lastName, profileImage, idPsychologist, setCalendar }) {

    return (
        <Stack width='100%' pl='30%' pr='30%' zIndex='1' position='absolute' >
            <Stack direction='column' rounded="10px" bg='white' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} display="flex" alignItems="center" justifyContent="space-around">

                <Stack display='flex' direction='column' justifyContent='baseline' width='100%' p='1em'>
                    <CloseIcon cursor='pointer' onClick={() => setCalendar(false)} />
                </Stack>
                <Stack marginBottom='2em' display='flex' direction='row' alignItems='center' justifyContent='center' width='80%'>
                    <Text fontSize='2xl' marginBottom='0'>
                        Agenda tu cita con {`${firstName} ${lastName}`}
                    </Text>
                    <Avatar className="avatar" src={profileImage} alt="img not found" size='xl'></Avatar>
                </Stack>
                
                <Stack direction='column' pt='1em' pb='2em' borderTopWidth='0.1em' borderColor='#b7b7b7' width='80%'>
                    <Text fontSize='2xl' color='#285e61' marginBottom='0' textAlign='left'>
                        Calendario
                    </Text>
                    <Text fontSize='md' mb='1em' textAlign='left'>
                        Seleccione fecha y hora
                    </Text>
                    {/* <Calendar /> */}

                </Stack>
            {/* voy a poner provisoriamente esto para tomar el id del psicologo */}
            <Link to={`/checkout/${idPsychologist}`}>
            <Button>Agendar</Button>
            </Link>
            </Stack>
        </Stack>
    )
}

export default Schedule;