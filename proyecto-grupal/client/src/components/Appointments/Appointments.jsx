import React, { useEffect } from 'react';
import './Appointments.css';
import NavbarHome from '../NavbarHome/NavbarHome';
import Footer from '../Footer/Footer.jsx';
import { Stack, Text, Box } from '@chakra-ui/react';
import { getAppointmentAsClient } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


function Appointments() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointmentAsClient());
  }, [dispatch])

  const appointments = useSelector((state) => state.appointments)
  console.log(appointments)
  
  return (
    <div className='appointmentsContainer'>
      <Stack>
        <NavbarHome />

        <Stack pr='15%' pl='15%'>

          <Text fontWeight="semibold" fontSize="3xl" color="green.300" textAlign='left' mb='1em' mt='1em'>
            Mis citas
          </Text>

          <Box width='100%' height='20em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

          </Box>

        </Stack>
      </Stack>

      <Footer />
    </div>
  )
}

export default Appointments;