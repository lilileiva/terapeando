import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Footer/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import AdminSearchbar from '../AdminSearchbar/AdminSearchbar.jsx';
import { Stack, Text, Box, Wrap, WrapItem, Center, Avatar, Button, Input } from '@chakra-ui/react';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { AdminGetAllPsychologist, AdminDeleteUserPsichologist, AdminGetUserPsychologistByName, clearPsychologistList, clearAdminSearchbar } from '../../../redux/actions';
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader.jsx';
import NotFound from '../../404notFound/notFound.jsx';


function AdminPanelPsychologists() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(AdminGetAllPsychologist())
    return () => {
      dispatch(clearAdminSearchbar())
      dispatch(clearPsychologistList())
    }
  }, [dispatch])


  const allUsersPsichologists = useSelector((state) => state.allUsersPsichologists);

  const handleAlertDelete = (IdUserPsychologist) => {
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
        dispatch(AdminDeleteUserPsichologist(IdUserPsychologist))
        dispatch(AdminGetAllPsychologist())
        Swal.fire('Usuario eliminado correctamente!', '', 'success')
      }
    })
  }

  const adminSearchbar = useSelector((state) => state.adminSearchbar);
  useEffect(() => {
    if (adminSearchbar.length !== 0) {
      dispatch(clearPsychologistList())
      dispatch(AdminGetUserPsychologistByName(adminSearchbar))
    }
  }, [dispatch, adminSearchbar])

  const token = window.localStorage.getItem('tokenAdmin')

  return (
    <>
      {
        token
          ? (
            <div className='adminPanelContainer'>
              <AdminPanelNavbar />

              <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>
                <AdminPanelSidebar />
                <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                  <Stack direction='row' width='100%'>

                    <AdminSearchbar />

                    <Button colorScheme='teal' variant='outline' onClick={() => dispatch(AdminGetAllPsychologist())}>
                      <BsPeople />
                      <Text pr='0.5em'> Todos los psicólogos</Text>
                    </Button>
                  </Stack>

                  {
                    allUsersPsichologists.length !== 0
                      ? (
                        <>
                          <Stack width='100%' height='30em' position='sticky' overflowY='scroll'>
                            <ul className='userClientsList'>
                              {
                                allUsersPsichologists.map((psychologist) => (
                                  <>
                                    <hr />
                                    <Stack w='100%' direction='row' justify='space-between' align='center' pt='0.5em' pb='0.5em' pr='1em'>

                                      <Stack direction='row' align='center' cursor='pointer' onClick={() => navigate(`/adminpanel/psychologists/${psychologist._id}`)}>
                                        <Avatar src={psychologist.profileImage}></Avatar>
                                        <Text fontSize='xl'>
                                          {psychologist.firstName} {psychologist.lastName}
                                        </Text>
                                      </Stack>

                                      <Stack direction='row' align='center'>
                                        <BsFillEyeFill size='1.5em' color='gray' cursor='pointer' onClick={() => navigate(`/adminpanel/psychologists/${psychologist._id}`)} />
                                        <BsPencilSquare size='1.5em' color='gray' cursor='pointer' onClick={() => navigate(`/adminpanel/psychologists/edit/${psychologist._id}`)} />
                                        <BsPersonDash size='1.5em' color='gray' cursor='pointer' onClick={() => handleAlertDelete(psychologist._id)} />
                                      </Stack>

                                    </Stack>
                                    <hr />
                                  </>
                                ))
                              }
                            </ul>
                          </Stack>

                          <Center w='10em' h='10em' bg='#d6d6d6' p='0.5em' mt='1em'>
                            <Stack direction='column' align='center'>
                              <Text fontSize='5xl' fontWeight='600' color='#2D3748'>

                                {allUsersPsichologists.length}
                              </Text>
                              <Text fontSize='xl' fontWeight='500' color='#2D3748'>
                                Usuarios Registrados
                              </Text>
                            </Stack>
                          </Center>

                        </>
                      ) : <Loader />
                  }
                </Stack>
              </Stack>

              <Footer />
            </div >
          ) : (
            <NotFound />
          )
      }
    </>
  )
}

export default AdminPanelPsychologists;