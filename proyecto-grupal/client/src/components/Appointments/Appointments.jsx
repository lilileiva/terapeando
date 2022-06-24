import React, { useEffect } from 'react';
import './Appointments.css';
import NavbarHome from '../NavbarHome/NavbarHome';
import Footer from '../Footer/Footer.jsx';
import { Stack, Text, Box, Avatar, Button } from '@chakra-ui/react';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { getAppointmentAsClient } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


function Appointments() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointmentAsClient());
  }, [dispatch])

  const appointments = useSelector((state) => state.appointments)
  console.log(appointments)
  let appointmentDate;
  let appointmentHour;

  return (
    <div className='appointmentsContainer'>
      <Stack>
        <NavbarHome />

        <Stack pr='15%' pl='15%' pt='1em' pb='2em'>

          <Text fontWeight="semibold" fontSize="3xl" color="green.300" textAlign='left' mb='1em' >
            Mis citas
          </Text>
          {
            appointments.length !== 0
              ? appointments.map((appo) => {
                appointmentDate = new Date(appo.date)
                appointmentHour = new Date(appo.hour)
                return (
                  <Stack direction='row' align='center' justify='space-around' p='1em' width='100%' height='20em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                    <Stack align='center' width='50%' borderRightWidth='0.1em' borderColor='#b7b7b7'>
                      <Avatar src={appo.IdUserPsychologist.profileImage} size='xl' />
                      <Text fontSize='3xl' fontWeight='500'>{appo.IdUserPsychologist.firstName} {appo.IdUserPsychologist.lastName}</Text>
                      <Text fontSize='2xl'>{appo.IdUserPsychologist.email}</Text>
                      <Text fontSize='2xl'>{appo.IdUserPsychologist.country}</Text>
                    </Stack>
                    <Stack width='50%' p='1em' align='center'>
                      <Stack direction='row' align='center' justify='center'>
                        <CalendarIcon mr='0.5em' />
                        <Text fontSize='2xl'>{appointmentDate.toLocaleDateString()}</Text>
                      </Stack>
                      <Stack direction='row' align='center' justify='center'  pb='1em'>
                        <TimeIcon mr='0.5em' />                        
                        <Text fontSize='2xl'>{appointmentHour.getUTCHours()}:{appointmentHour.getUTCMinutes()} hs</Text>
                      </Stack>
                      <Button bg='green.100' colorScheme='teal' variant='outline'>
                        Cancelar cita
                      </Button>
                    </Stack>
                  </Stack>
                )
              }) : null
          }
        </Stack>
      </Stack>

      <Footer />
    </div>
  )
}

export default Appointments;