import React, { useEffect, useState } from 'react';
import './Appointments.css';
import NavbarHome from '../NavbarHome/NavbarHome';
import Footer from '../Footer/Footer.jsx';
import NotFound from '../404notFound/notFound.jsx';
import { Stack, Text, Box, Avatar, Button, Select } from '@chakra-ui/react';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import {
  getAppointmentAsClient,
  getAppointmentAsPsychologist,
  deleteAppointmentAsClient,
  deleteAppointmentAsPsychologist,
  putAppointmentAsClient,
  putAppointmentAsPsychologist
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';


function Appointments() {
  const dispatch = useDispatch();

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  useEffect(() => {
    if (tokenClient) dispatch(getAppointmentAsClient());
    if (tokenPsychologist) dispatch(getAppointmentAsPsychologist());
  }, [dispatch])

  const appointments = useSelector((state) => state.appointments)
  let appointmentDate;
  let appointmentHour;

  const [IdAppointment, setIdAppointment] = useState("")

  const handleDeleteAppointment = (appointment) => {
    Swal.fire({
      title: '¿Estás seguro que quieres cancelar esta cita?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Sí`,
    }).then((result) => {
      if (result.isDenied) {
        setIdAppointment(appointment)
        if (tokenClient) {
          dispatch(deleteAppointmentAsClient(appointment))
          dispatch(getAppointmentAsClient())
        }
        if (tokenPsychologist) {
          dispatch(deleteAppointmentAsPsychologist(appointment))
          dispatch(getAppointmentAsPsychologist())
        }
      }
    })
  }

  const [changeTypeAlert, setChangeTypeAlert] = useState(false)
  const handleChangeType = (appointment) => {
    if (changeTypeAlert) setChangeTypeAlert(false)
    else {
      setChangeTypeAlert(true)
      setIdAppointment(appointment)
    }
  }

  const [type, setType] = useState({ type: "" });

  const changeType = () => {
    Swal.fire({
      title: '¿Estás seguro que quieres modificar la modalidad?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Sí`,
    }).then((result) => {
      if (result.isDenied) {
        if (!type) {
          Swal.fire('No has seleccionado ninguna modalidad', '', 'error')
        } else {
          if (tokenClient) {
            dispatch(putAppointmentAsClient(IdAppointment, type))
            dispatch(getAppointmentAsClient())
            setChangeTypeAlert(false)
          }
          if (tokenPsychologist) {
            dispatch(putAppointmentAsPsychologist(IdAppointment, type))
            dispatch(getAppointmentAsPsychologist())
            setChangeTypeAlert(false)
          }
        }
      }
    })
  }


  return (
    <>
      {
        tokenClient || tokenPsychologist
          ? (
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
                          <Stack direction='row' align='center' justify='space-around' mb='1em' p='1em' width='100%' height='20em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                            {
                              tokenClient
                                ? (<Stack align='center' width='50%' borderRightWidth='0.1em' borderColor='#b7b7b7'>
                                  <Avatar src={appo.IdUserPsychologist.profileImage} size='xl' />
                                  <Text fontSize='3xl' fontWeight='500'>{appo.IdUserPsychologist.firstName} {appo.IdUserPsychologist.lastName}</Text>
                                  <Text fontSize='2xl'>{appo.IdUserPsychologist.email}</Text>
                                  <Text fontSize='2xl'>{appo.IdUserPsychologist.location}</Text>
                                </Stack>
                                ) : (<Stack align='center' width='50%' borderRightWidth='0.1em' borderColor='#b7b7b7'>
                                  <Avatar src={appo.IdUserClient.profileImage} size='xl' />
                                  <Text fontSize='3xl' fontWeight='500'>{appo.IdUserClient.firstName} {appo.IdUserPsychologist.lastName}</Text>
                                  <Text fontSize='2xl'>{appo.IdUserClient.email}</Text>
                                  <Text fontSize='2xl'>{appo.IdUserClient.country}</Text>
                                </Stack>)
                            }
                            <Stack width='50%' p='1em' align='center'>
                              <Stack direction='row' align='center' justify='center'>
                                <CalendarIcon mr='0.5em' />
                                <Text fontSize='3xl'>{appointmentDate.toLocaleDateString()}</Text>
                              </Stack>
                              <Stack direction='row' align='center' justify='center'>
                                <TimeIcon mr='0.5em' />
                                <Text fontSize='3xl'>{appointmentHour.getUTCHours()}:{appointmentHour.getUTCMinutes()} hs</Text>
                              </Stack>
                              <Stack direction='row' align='center' justify='center' pb='1em'>
                                <Text fontSize='3xl'>Modalidad: {appo.type}</Text>
                              </Stack>
                              <Stack direction='row'>
                                <Button bg='green.100' colorScheme='teal' variant='outline' onClick={() => handleChangeType(appo._id)}>
                                  Cambiar modalidad
                                </Button>
                                <Button colorScheme='teal' variant='outline' onClick={() => handleDeleteAppointment(appo._id)}>
                                  Cancelar cita
                                </Button>
                              </Stack>
                            </Stack>

                            {
                              changeTypeAlert
                                ? <Stack className='changeType'>
                                  <Stack direction='column' bg='white' p='2em' align='center' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                                    <Select name='type' placeholder='Seleccione una modalidad' mb='1em' onChange={(e) => setType({ type: e.target.value })}>
                                      <option value='Virtual'>
                                        Virtual
                                      </option>
                                      <option value='Presencial'>
                                        Presencial
                                      </option>
                                    </Select>
                                    <Stack direction='row'>
                                      <Button colorScheme='teal' variant='solid' onClick={() => changeType()}>
                                        Aceptar
                                      </Button>
                                      <Button colorScheme='teal' variant='outline' onClick={() => setChangeTypeAlert(false)}>
                                        Cancelar
                                      </Button>
                                    </Stack>
                                  </Stack>
                                </Stack>
                                : null
                            }

                          </Stack>
                        )
                      }) : null
                  }
                </Stack>
              </Stack>

              <Footer />
            </div>
          ) : <NotFound />
      }
    </>
  )
}

export default Appointments;