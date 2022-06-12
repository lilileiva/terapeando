import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import NavbarHome from '../NavbarHome/NavbarHome';
import { getUserPsychologistOne } from '../../redux/actions'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Text, Stack, Avatar, Button } from '@chakra-ui/react';

function Schedule() {
    const dispatch = useDispatch();

    const { idPsychologist } = useParams()    

    useEffect(() => {
        dispatch(getUserPsychologistOne(idPsychologist));
    }, [dispatch]);

    const psichologistDetail = useSelector(state => state.userPsichologistDetail);
        
    return (
        <div>
            <NavbarHome />

            <Container marginTop='5em' padding='2em' zIndex='1' centerContent>

                <Stack direction='row' padding='5em' rounded="10px" boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} display="flex" alignItems="center" justifyContent="space-between">

                    <Stack direction='column' marginRight='5em'>
                        <Avatar className="avatar" src='' alt="img not found" size='2xl'></Avatar>
                        <Stack display="flex" direction='column' alignItems="center" justifyContent="space-between">
                            <Text fontSize='xl' fontWeight='bold'>{psichologistDetail.firstName} {psichologistDetail.lastName}</Text>

                            {
                                psichologistDetail.Specialties.map((speciality) => (
                                    <Text fontSize='md'>{speciality}</Text>
                                ))
                            }

                            <Link to={`/detailPsychologist/${idPsychologist}`}>
                                <Button colorScheme='blackAlpha' variant='outline' size='sm' marginTop='1em'>
                                    Ver Perfil
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>

                    <Stack direction='column'>
                        <Text fontSize='2xl' color='green.300' marginBottom='1em'>
                            Calendario
                        </Text>
                        <Text fontSize='md' marginBottom='1em'>
                            Seleccione fecha y hora
                        </Text>

                        <Calendar className="react-calendar" />

                    </Stack>

                </Stack>

            </Container>

        </div>
    )
}

export default Schedule;