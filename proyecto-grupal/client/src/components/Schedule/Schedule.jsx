import React, { useEffect, useState } from 'react';
import './Schedule.css'
import { useSelector, useDispatch } from 'react-redux';
import Starts from '../Starts/Starts';
import { getUserPsychologistOne, clear } from '../../redux/actions'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Text, Stack, Avatar, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

function Schedule({ firstName, lastName, profileImage, rating, idPsychologist, setCalendar }) {
    const dispatch = useDispatch();

    // const { idPsychologist } = useParams()

    useEffect(() => {
        dispatch(getUserPsychologistOne(idPsychologist));
        return () => {
            dispatch(clear());
        };
    }, [dispatch, idPsychologist]);

    const psichologistDetail = useSelector(state => state.userPsichologistDetail);

    return (
        <Stack width='100%' paddingLeft='25%' paddingRight='25%' zIndex='1' position='absolute' >
            <Stack direction='column' padding='1em' rounded="10px" bg='white' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} display="flex" alignItems="center" justifyContent="space-around">

                <Stack display='flex' direction='column' justifyContent='baseline' marginBottom='1em' width='100%'>
                    <CloseIcon cursor='pointer' onClick={() => setCalendar(false)} />
                </Stack>

                <Stack direction='row' marginBottom='2em' paddingTop='1em'>
                    <Text fontSize='2xl' marginBottom='0'>
                        Agenda tu cita con {`${firstName} ${lastName}`}
                    </Text>

                    <Stack display="flex" direction='column' alignItems="center" justifyContent="space-between">
                        <Avatar className="avatar" src={profileImage} alt="img not found" size='md'></Avatar>
                        {/* <Starts rating={rating} /> */}
                    </Stack>
                </Stack>

                <Stack direction='column' paddingBottom='1em'>
                    <Text fontSize='2xl' color='green.300' marginBottom='0'>
                        Calendario
                    </Text>
                    <Text fontSize='md' marginBottom='1em'>
                        Seleccione fecha y hora
                    </Text>

                    <Calendar />

                </Stack>

            </Stack>
        </Stack>
    )
}

export default Schedule;