import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text, List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { clear, deleteUserClient, AdminGetUserPsychologistDetail, AdminDeleteUserPsichologist } from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';
import NotFound from '../../../404notFound/notFound.jsx';


export default function AdminPsichologistDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { IdUserPsychologist } = useParams(); 

  useEffect(() => {
    dispatch(AdminGetUserPsychologistDetail(IdUserPsychologist))
    return () => {
      dispatch(clear())
    }
  }, [dispatch])
  const userPsichologistDetail = useSelector((state) => state.userPsichologistDetail);

  const handleAlertDelete = (psychologistId) => {
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar a este usuario?',
      text: "Estos cambios no se podrán revertir.",
      icon: 'info',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'Sí',
    }).then((result) => {
      if (result.isDenied) {
        dispatch(AdminDeleteUserPsichologist(psychologistId))
        navigate('/adminpanel/psychologists')
        Swal.fire('Usuario eliminado correctamente!', '', 'success')
      }
    })
  }

  const tokenAdmin = window.localStorage.getItem('tokenAdmin')

  return (
    <>
      {
        tokenAdmin
          ? (
            <div className='adminPanelContainer'>
              <AdminPanelNavbar />

              <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>

                <AdminPanelSidebar />

                <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

                  <Stack direction='row' width='100%'>
                    <Button cursor={'pointer'} colorScheme='teal' variant='outline' onClick={() => navigate('/adminpanel/psychologists')}>
                      <ArrowLeftIcon />
                      <Text ml='0.5em'> Volver</Text>
                    </Button>
                  </Stack>
                  {
                    Object.keys(userPsichologistDetail).length !== 0
                      ? (
                        <Stack w='100%' direction='column' justify='center' align='center' position={'relative'} top={-5}>
                          <br />
                          <Stack direction='column'>
                            <Avatar src={userPsichologistDetail.profileImage} size='xl' />
                          </Stack>
                          <Stack direction={'row'} >
                            <Text fontSize='xl' fontWeight='600' > Nombre: </Text>
                            <Text fontSize='xl'> {userPsichologistDetail.firstName} {userPsichologistDetail.lastName} </Text>
                          </Stack>
                          <Stack direction={'row'} >
                            <Text fontSize='xl' fontWeight='600'> País: </Text>
                            <Text fontSize='xl'> {userPsichologistDetail.location} </Text>
                          </Stack>
                          <Stack direction='row' display={'flex'} position='relative'>
                            <Text fontSize='xl' fontWeight='600'> Fecha de nacimiento: </Text>
                            <Text fontSize='xl'> {userPsichologistDetail.birthDate} </Text>
                          </Stack>
                          <Stack direction='row' display={'flex'} position='relative'>
                            <Text fontSize='xl' fontWeight='600'> Email: </Text>
                            <Text fontSize='xl'> {userPsichologistDetail.email} </Text>
                          </Stack>
                          <Stack direction='row' display={'flex'} position='relative'>
                            <Text fontSize='xl' fontWeight='600'> Educación: </Text>
                            <Text fontSize='xl'> {userPsichologistDetail.education} </Text>
                          </Stack>
                          {
                            userPsichologistDetail.about
                              ? (
                                <Stack direction='row' display={'flex'} position='relative' w='40%' height='6em'>
                                  <Text fontSize='xl' fontWeight='600'> Descripción: </Text>
                                  <Text fontSize='xl' overflowY='scroll'> {userPsichologistDetail.about} </Text>
                                </Stack>
                              ) : (
                                <Stack direction='row' display={'flex'} position='relative'>
                                  <Text fontSize='xl' fontWeight='600'> Descripción: </Text>
                                  <Text fontSize='xl'>Sin descripción</Text>
                                </Stack>
                              )
                          }
                          <br />
                          <Stack direction='column'>
                            {userPsichologistDetail.status === 'Pendiente' ? <Text fontSize={'xl'} color={'red'}>Estado: {`${userPsichologistDetail.status} de aprobación`}</Text> :
                              <Text fontSize={'xl'} color={'green'}>Estado: {userPsichologistDetail.status}</Text>}
                            <Text fontSize='xl' fontWeight='600'> DATOS PARA VALIDAR: </Text>

                            {/* <UnorderedList>
                              <ListItem fontSize='m'> {`DNI: ${userPsichologistDetail.DNI}`} </ListItem>
                              <ListItem fontSize='m'> {`LICENCIA: ${userPsichologistDetail.License}`} </ListItem>
                            </UnorderedList> */}

                            <Stack direction='row' display={'flex'} position='relative'>
                              <Text fontSize='xl' fontWeight='600'> DNI: </Text>
                              <Text fontSize='xl'> {userPsichologistDetail.DNI} </Text>
                            </Stack>
                            <Stack direction='row' display={'flex'} position='relative'>
                              <Text fontSize='xl' fontWeight='600'> LICENCIA: </Text>
                              <Text fontSize='xl'> {userPsichologistDetail.License} </Text>
                            </Stack>

                          </Stack>
                          <br />
                          <Stack direction='row'>
                            <Button width='50%' colorScheme='teal' variant='outline' onClick={() => navigate(`/adminpanel/psychologists/edit/${userPsichologistDetail._id}`)}>
                              <BsPencilSquare />
                              <Text pr='0.5em'> Cambiar Estado</Text>
                            </Button>
                            <Button width='50%' colorScheme='red' variant='outline' onClick={() => handleAlertDelete(userPsichologistDetail._id)}>
                              <CloseIcon />
                              <Text pr='0.5em'> Eliminar usuario</Text>
                            </Button>
                          </Stack>
                        </Stack>
                      ) : <Loader />
                  }
                </Stack>

              </Stack>

              <Footer />
            </div>
          ) : (
            <NotFound />
          )
      }
    </>
  )
}