import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Appointments.css';
import NavbarHome from '../NavbarHome/NavbarHome';
import Footer from '../Footer/Footer.jsx';
import NotFound from '../404notFound/notFound.jsx';
import { Stack, Text, Avatar, Button, Select, Heading } from '@chakra-ui/react';
import { CalendarIcon, TimeIcon, CheckIcon } from '@chakra-ui/icons';
import {
  getAppointmentAsClient,
  getAppointmentAsPsychologist,
  deleteAppointmentAsClient,
  deleteAppointmentAsPsychologist,
  putAppointmentAsClient,
  putAppointmentAsPsychologist,
  updateScheduleAsClient,
  updateScheduleAsPsychologist,
  getAppointmentByIdAsClient,
  getAppointmentByIdAsPsychologist,
  getScheduleByIdAsClient,
  getScheduleByIdAsPsychologist
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FaLaptop, FaUserFriends } from "react-icons/fa";
import Reviews from "../Reviews/Reviews";


function Appointments() {
  const dispatch = useDispatch();

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  useEffect(() => {
    if (tokenClient) dispatch(getAppointmentAsClient());
    if (tokenPsychologist) dispatch(getAppointmentAsPsychologist());
  }, [dispatch])

  const appointments = useSelector((state) => state.appointments)
  const scheduleDetails = useSelector((state) => state.scheduleDetails)
  const appointmentDetails = useSelector((state) => state.appointmentDetails)

  const [IdAppointment, setIdAppointment] = useState("")

  const [updateSchedule, setUpdateSchedule] = useState({
    hours: []
  })

  const [isDeleted, setIsDeleted] = useState(false)
  const handleDeleteAppointment = (idAppointment, idSchedule) => {

    dispatch(getScheduleByIdAsClient(idSchedule)) //obtengo scheduleDetails para poder ejecutar el useEffect(1)
    dispatch(getAppointmentByIdAsClient(idAppointment)) //obtengo appointmentDetails para poder ejecutar el useEffect(1)

    Swal.fire({
      title: '¿Estás seguro que quieres cancelar esta cita?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Sí`,
    }).then((result) => {
      if (result.isDenied) {
        if (tokenClient) {
          setIsDeleted(true) //acá ya se ejecutò useEffect(1), entonces si quiero eliminar este appointment, seteo isDeleted en true para ejecutar useEffect(2)
        }
        if (tokenPsychologist) {
          dispatch(deleteAppointmentAsPsychologist(idAppointment)) //si soy psicólogo directamente elimino el appointment
            .then(dispatch(getAppointmentAsPsychologist()))
        }
      }
    })
  }

  //una vez que mis objetos scheduleDetails y appointmentDetails tienen info seteo updateSchedule
  useEffect(() => { //(1)
    if (Object.keys(scheduleDetails).length !== 0 && Object.keys(appointmentDetails).length !== 0) {
      setUpdateSchedule({
        ...updateSchedule,
        hours: [...scheduleDetails.hours, appointmentDetails.hour],
      })
    }
  }, [scheduleDetails, appointmentDetails, dispatch, setUpdateSchedule])

  useEffect(() => { //(2)
    if (isDeleted) {
      dispatch(updateScheduleAsClient(scheduleDetails._id, updateSchedule)) //actualizo el appointment
      dispatch(deleteAppointmentAsClient(appointmentDetails._id)) //y lo elimino
        .then(dispatch(getAppointmentAsClient()))
    }
  }, [isDeleted, dispatch])

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
                        let appointmentDate = new Date(appo.date)
                        let appointmentHour = new Date(appo.hour)
                        let todayDate = new Date()
                        return (
                          <Stack direction='column'>
                            <Stack direction='row' align='center' justify='space-around' mb='1em' p='1em' width='100%' height='20em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                              {
                                tokenClient && appo.IdUserPsychologist
                                  ? (<Stack align='center' width='50%' borderRightWidth='0.1em' borderColor='#b7b7b7'>
                                    <Link to={`/detailPsychologist/${appo.IdUserPsychologist._id}`} cursor='pointer'>
                                      <Avatar src={appo.IdUserPsychologist.profileImage} size='xl' />
                                      <Text fontSize='3xl' fontWeight='500'>{appo.IdUserPsychologist.firstName} {appo.IdUserPsychologist.lastName}</Text>
                                    </Link>
                                    <Text fontSize='2xl' color='gray'>{appo.IdUserPsychologist.email}</Text>
                                    <Text fontSize='2xl' color='gray'>{appo.IdUserPsychologist.location}</Text>
                                  </Stack>
                                  ) : tokenPsychologist && appo.IdUserClient
                                    ? (<Stack align='center' width='50%' borderRightWidth='0.1em' borderColor='#b7b7b7'>
                                      <Avatar src={appo.IdUserClient.profileImage} size='xl' />
                                      <Text fontSize='3xl' fontWeight='500'>{appo.IdUserClient.firstName} {appo.IdUserPsychologist.lastName}</Text>
                                      <Text fontSize='2xl' color='gray'>{appo.IdUserClient.email}</Text>
                                      <Text fontSize='2xl' color='gray'>{appo.IdUserClient.country}</Text>
                                    </Stack>)
                                    : (<Stack align='center' width='50%' borderRightWidth='0.1em' borderColor='#b7b7b7'>
                                      <Text fontSize='2xl' textAlign='center' bg='red.500' p='1em' color='white' borderRadius='0.5em'>
                                        Esta cita ha sido cancelada
                                      </Text>
                                    </Stack>)
                              }
                              <Stack width='50%' p='1em' align='center'>
                                <Stack direction='row' align='center' justify='center'>
                                  <CalendarIcon mr='0.5em' />
                                  <Text fontSize='3xl'>{appointmentDate.toLocaleDateString()}</Text>
                                </Stack>
                                <Stack direction='row' align='center' justify='center'>
                                  <TimeIcon mr='0.5em' />
                                  <Text fontSize='3xl'>{appointmentHour.getHours()}:00 hs</Text>
                                </Stack>
                                <Stack direction='row' align='center' justify='center' pb='1em'>
                                  {
                                    appo.type === 'Virtual' ? <FaLaptop mr='0.5em' /> : <FaUserFriends mr='0.5em' />
                                  }
                                  <Text fontSize='3xl'>Modalidad: {appo.type}</Text>
                                </Stack>
                                {
                                  (appointmentDate - todayDate > 0)
                                    ? <Stack direction='row'>
                                      {
                                        tokenClient
                                          ? <Button bg='green.100' colorScheme='teal' variant='outline' onClick={() => handleChangeType(appo._id)}>
                                            Cambiar modalidad
                                          </Button>
                                          : null
                                      }
                                      <Button colorScheme='teal' variant='outline' onClick={() => handleDeleteAppointment(appo._id, appo.IdSchedule)}>
                                        Cancelar cita
                                      </Button>
                                    </Stack>
                                    : <>
                                      <Stack direction='row' align='center' justify='center'>
                                        <CheckIcon color='green' />
                                        <Text fontSize='xl' color='gray'>Cita concretada</Text>
                                      </Stack>
                                      {tokenClient ? <Reviews idPsychologist={appo.IdUserPsychologist._id} /> : null}
                                    </>
                                }
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
                          </Stack>
                        )
                      }) : <Stack bg='gray.200' direction='row' align='center' justify='space-around' mb='1em' p='1em' width='100%' height='20em' borderRadius='1em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                        <Text bgGradient='linear(to-l, #319795, #285E61)'
                          bgClip='text'
                          fontWeight='extrabold' fontSize='2xl'>No hay citas para mostrar</Text>
                      </Stack>
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