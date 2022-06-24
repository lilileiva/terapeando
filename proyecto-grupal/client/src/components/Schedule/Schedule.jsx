import React, { useEffect, useState } from 'react';
import './Schedule.css'
import { useSelector, useDispatch } from 'react-redux';
import { getScheduleAsPsychologist, clear, createAppointmentAsClient, createAppointmentAsPsychologist } from '../../redux/actions'
import { Text, Stack, Avatar, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';


function Schedule({ firstName, lastName, profileImage, IdUserPsychologist, setCalendar }) {
    const dispatch = useDispatch();

    const schedule = useSelector((state) => state.schedule)
    let scheduleDate;
    let scheduleHour;

    const [appointmentData, setAppointmentData] = useState({
        date: "",
        hour: "",
        type: ""
    })

    const handleDate = (date) => {
        if (showHours) {
            setShowHours(false)
            setAppointmentData({
                ...appointmentData,
                date: date
            })
            console.log(appointmentData)
        } else {
            setShowHours(true)
        }
    }

    const handleTypeAndHour = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        })
        console.log(appointmentData)
    }

    const tokenClient = window.localStorage.getItem('tokenClient')
    const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

    const dispatchAppointment = () => {
        if (tokenClient) dispatch(createAppointmentAsClient(IdUserPsychologist, appointmentData))
        if (tokenPsychologist) dispatch(createAppointmentAsPsychologist(IdUserPsychologist, appointmentData))
    }

    const [showHours, setShowHours] = useState(false)


    return (
        <Stack width='100%' pl='30%' pr='30%' zIndex='1' position='absolute' >
            <Stack pb='1em' direction='column' rounded="10px" bg='white' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} display="flex" alignItems="center" justifyContent="space-around">

                <Stack display='flex' direction='column' justifyContent='baseline' width='100%' p='1em'>
                    <CloseIcon cursor='pointer' onClick={() => setCalendar(false)} />
                </Stack>
                <Stack mb='2em' display='flex' direction='row' alignItems='center' justifyContent='center' width='80%'>
                    <Text fontSize='2xl' mb='0'>
                        Agenda tu cita con {`${firstName} ${lastName}`}
                    </Text>
                    <Avatar className="avatar" src={profileImage} alt="img not found" size='xl'></Avatar>
                </Stack>

                <Stack direction='column' pt='1em' pb='1em' borderTopWidth='0.1em' borderColor='#b7b7b7' width='80%'>
                    <Text fontSize='2xl' color='#285e61' mb='0' textAlign='left'>
                        Calendario
                    </Text>
                    <Text fontSize='md' mb='1em' textAlign='left'>
                        Seleccione una fecha
                    </Text>
                </Stack>
                <Stack pb='1em'>
                    {
                        schedule.length !== 0
                            ? <>
                                {
                                    schedule.map((sch) => {
                                        scheduleDate = new Date(sch.date)
                                        return (
                                            <>
                                                <Button color='teal' name='date' value={sch.date} onClick={() => handleDate(sch.date)}>
                                                    {scheduleDate.getUTCDate()}/{scheduleDate.getUTCMonth()}
                                                </Button>
                                                <Stack direction='row'>
                                                    {
                                                        showHours
                                                            ? sch.hours !== 0
                                                                ? (
                                                                    sch.hours.map((hour) => (
                                                                        scheduleHour = new Date(hour),
                                                                        <Button bg='green.100' name='hour' value={hour} onClick={(e) => handleTypeAndHour(e)}>
                                                                            {scheduleHour.getUTCHours()}:{scheduleHour.getUTCMinutes()} hs
                                                                        </Button>
                                                                    ))
                                                                ) : <Text>No hay horarios disponibles</Text>
                                                            : null
                                                    }
                                                </Stack>
                                            </>
                                        )
                                    })
                                }
                                <Stack direction='row' width='100%' pb='2em'>
                                    <Button colorScheme='teal' variant='outline' width='50%' name='type' value='Virtual' onClick={(e) => handleTypeAndHour(e)}>
                                        Virtual
                                    </Button>
                                    <Button colorScheme='teal' variant='outline' width='50%' name='type' value='Presencial' onClick={(e) => handleTypeAndHour(e)}>
                                        Presencial
                                    </Button>
                                </Stack>
                            </>
                            : <Text>Lo sentimos, este psicólogo no cuenta con horarios disponibles</Text>
                    }
                </Stack>

                {/* voy a poner provisoriamente esto para tomar el id del psicologo */}
                {/* <Link to={`/checkout/${IdUserPsychologist}`}> */}
                <Button bg='#63caa7' color='white' mb='2em' colorScheme='teal' onClick={dispatchAppointment}>
                    Agendar
                </Button>
                {/* </Link> */}
            </Stack>
        </Stack >
    )
}

export default Schedule;



