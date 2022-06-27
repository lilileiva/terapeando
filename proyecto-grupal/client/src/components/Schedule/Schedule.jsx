import React, { useState, useEffect } from 'react';
import './Schedule.css'
import { useSelector, useDispatch } from 'react-redux';
import { createAppointmentAsClient, createAppointmentAsPsychologist, getAppointmentAsClient, updateSchedule, getScheduleAsClient, getScheduleAsPsychologist } from '../../redux/actions'
import { Text, Stack, Avatar, Button, HStack, VStack, Divider, Badge } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import CalendarApp from '../Appointments/CalendarApp';
import { format } from 'date-fns';



function Schedule({ firstName, lastName, IdUserPsychologist, setCalendar }) {
    const tokenClient = window.localStorage.getItem('tokenClient')
    const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (tokenClient) dispatch(getScheduleAsClient(IdUserPsychologist))
        if (tokenPsychologist) dispatch(getScheduleAsPsychologist(IdUserPsychologist))
    }, [dispatch])

    const schedule = useSelector((state) => state.schedule)

    const [inputDate, setInputDate] = useState(new Date())
    const [appointmentData, setAppointmentData] = useState({
        date: "",
        hour: "",
        type: ""
    })

    // trnasformo la fecha que viene desde el calendar (wen 28 jun) a iso (2022-06-28)
    let dateTime
    let hours = [];
    let newSchedule;
    if (inputDate.date) {
        dateTime = format(inputDate.date, 'yyyy-MM-dd')
    }

    let idSchedule;
    // mapeo hasta enocntrar una coincidencia y me guardo las horas de esa fecha
    schedule.map((sch) => {
        if ((sch.date).substring(0, 10) === dateTime) {
            hours = sch.hours;
            idSchedule = sch._id
        }
    })

    const handleDate = (inputDate) => {
        setInputDate({
            date: inputDate
        })
        setAppointmentData({
            ...appointmentData,
            date: inputDate,
            hour: ''
        })
    }

    const handleTypeAndHour = (e) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        })
    }
    newSchedule = {
        date: appointmentData.date,
        hours: hours.filter((h) => h !== appointmentData.hour)
    }

    const dispatchAppointment = () => {
        if (tokenClient) {
            dispatch(createAppointmentAsClient(IdUserPsychologist, appointmentData))
            dispatch(updateSchedule(idSchedule, newSchedule))
        }
        if (tokenPsychologist) dispatch(createAppointmentAsPsychologist(IdUserPsychologist, appointmentData))
        setCalendar(false)
    }

    return (
        <Stack width='100%' pl='10%' pr='10%' zIndex='1' position='absolute'>
            <Stack pb='1em' direction='column' rounded="10px" bg='white' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} display="flex" alignItems="center" justifyContent="space-around">

                <Stack display='flex' direction='column' justifyContent='baseline' width='100%' p='1em'>
                    <CloseIcon cursor='pointer' onClick={() => setCalendar(false)} />
                </Stack>
                <VStack mb='2em' alignItems='center' justifyContent='center' width='90%' spacing={'20px'}>
                    <Text fontSize='2xl' mb='0'>
                        Agenda tu cita con {`${firstName} ${lastName}`}
                    </Text>
                    <Divider />
                    <HStack alignItems={'space-between'} justifyContent={'flex-start'} w={'100%'} gap={'60px'} height={'100%'}>
                        <CalendarApp handleDate={inputDate => handleDate(inputDate)} IdUserPsychologist={IdUserPsychologist} />
                        <VStack w={'100%'} alignItems={'flex-start'} justifyContent={'space-around'}>
                            <HStack mb={'5px'}>
                                <Text fontSize='xl' color='#285e61'>
                                    Fecha seleccionada:</Text>
                                <Badge fontSize='1em' >{dateTime}</Badge>
                            </HStack>
                            <Stack d={'flex'} alignItems={'flex-start'}>
                                <Text fontSize='xl' color='#285e61'>Horarios Seleccionado:</Text><Badge fontSize='1em'>{appointmentData.hour}</Badge>
                                <HStack flexWrap={'wrap'}>
                                    {hours && hours.map((hour) =>
                                        <Button key={hour} bg='green.100' name='hour' size={'md'} value={hour} onClick={(e) => handleTypeAndHour(e)}>{hour} hs</Button>)}
                                </HStack>
                            </Stack>
                            <VStack width='100%' pb='2em' mt={'1em'} alignItems={'flex-start'}>
                                <Text fontSize='xl' color='#285e61'>Te gustaría que la sesión sea: {appointmentData.type}</Text>
                                <Button colorScheme='teal' variant='outline' width='50%' name='type' value='Virtual' onClick={(e) => handleTypeAndHour(e)}>
                                    Virtual
                                </Button>
                                <Button colorScheme='teal' variant='outline' width='50%' name='type' value='Presencial' onClick={(e) => handleTypeAndHour(e)}>
                                    Presencial
                                </Button>
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
                <Button bg='#63caa7' color='white' mb='2em' colorScheme='teal' onClick={dispatchAppointment}>
                    Agendar
                </Button>
            </Stack>
        </Stack >
    )
}

export default Schedule;
