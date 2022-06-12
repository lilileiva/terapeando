import React, { useEffect, useState } from 'react';
import './Schedule.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import NavbarHome from '../NavbarHome/NavbarHome';
import Footer from '../Footer/Footer';
import { getUserPsychologistOne, clear } from '../../redux/actions'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Text, Stack, Avatar, Button } from '@chakra-ui/react';

function Schedule() {
    const dispatch = useDispatch();

    const { idPsychologist } = useParams()

    useEffect(() => {
        dispatch(getUserPsychologistOne(idPsychologist));
        return () => {
            dispatch(clear()); //Clear detail
          };
    }, [dispatch, idPsychologist]);

    const psichologistDetail = useSelector(state => state.userPsichologistDetail);

    return (
        <div className='scheduleContainer'>
            <NavbarHome />

            <Stack width='100%' paddingLeft='25%' paddingRight='25%' zIndex='1' centerContent >

                <Stack direction='row' padding='5em' rounded="10px" boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} display="flex" alignItems="center" justifyContent="space-around">

                    <Stack direction='column' marginRight='5em'>
                        <Avatar className="avatar" src='' alt="img not found" size='2xl'></Avatar>
                        <Stack display="flex" direction='column' alignItems="center" justifyContent="space-between">
                            <Text fontSize='xl' fontWeight='bold'>{psichologistDetail.firstName} {psichologistDetail.lastName}</Text>

                            {
                                Object.keys(psichologistDetail).length !== 0
                                    ? psichologistDetail.Specialties.map((speciality) => (
                                        <Text fontSize='md'>{speciality}</Text>
                                    ))                                    
                                    : null
                            }

                            <Link to={`/detailPsychologist/${idPsychologist}`}>
                                <Button colorScheme='blackAlpha' variant='outline' size='sm' marginTop='1em'>
                                    Ver Perfil
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>

                    <Stack direction='column'>
                        <Text fontSize='3xl' color='green.300' marginBottom='1em'>
                            Calendario
                        </Text>
                        <Text fontSize='md' marginBottom='1em'>
                            Seleccione fecha y hora
                        </Text>



                    </Stack>

                </Stack>

            </Stack>

            <Footer />
        </div>
    )
}

export default Schedule;