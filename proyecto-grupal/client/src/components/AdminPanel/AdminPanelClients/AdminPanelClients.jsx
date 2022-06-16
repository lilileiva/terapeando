import React, { useEffect, useState } from 'react';
import './AdminPanelClients.css';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Footer/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import { Stack, Text, Box, Wrap, WrapItem, Center, Avatar, Button, Input } from '@chakra-ui/react';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { getAllUserClients, deleteUserClient } from '../../../redux/actions';
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader.jsx';


function AdminPanelClients() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllUserClients())
  }, [dispatch])

  const allUserClients = useSelector((state) => state.usersClients);


  const handleAlertDelete = (clientId) => {
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
        dispatch(deleteUserClient(clientId))
        Swal.fire('Usuario eliminado correctamente!', '', 'success')
      }
    })
  }

  return (

    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>
        <AdminPanelSidebar />
        <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
          {
            allUserClients.length !== 0
              ? (
                <>
                  <Stack direction='row' width='100%'>
                    <Input focusBorderColor='teal.400' placeholder='Buscar usuarios clientes' />
                    <Button colorScheme='teal' variant='outline' onClick={() => dispatch(getAllUserClients())}>
                      <BsSearch />
                    </Button>
                    <Button colorScheme='teal' variant='outline' onClick={() => dispatch(getAllUserClients())}>
                      <BsPeople />
                      <Text pr='0.5em'> Todos los usuarios</Text>
                    </Button>
                  </Stack>

                  <Stack width='100%' height='30em' position='sticky' overflowY='scroll'>
                    <ul className='userClientsList'>
                      {
                        allUserClients.map(client => (
                          <>
                            <hr />
                            <Stack w='100%' direction='row' justify='space-between' align='center' pt='0.5em' pb='0.5em' pr='1em'>

                              <Stack direction='row' align='center' cursor='pointer' onClick={() => navigate(`/adminpanel/clients/${client._id}`)}>
                                <Avatar src={client.profileImage}></Avatar>
                                <Text fontSize='xl'>
                                  {client.firstName} {client.lastName}
                                </Text>
                              </Stack>

                              <Stack direction='row' align='center'>
                                <BsFillEyeFill size='1.5em' color='gray' cursor='pointer' onClick={() => navigate(`/adminpanel/clients/${client._id}`)} />
                                <BsPencilSquare size='1.5em' color='gray' cursor='pointer' />
                                <BsPersonDash size='1.5em' color='gray' cursor='pointer' onClick={() => handleAlertDelete(client._id)} />
                              </Stack>

                            </Stack>
                            <hr />
                          </>
                        ))
                      }
                    </ul>
                  </Stack>
                  {
                    allUserClients
                      ? (
                        <Center w='10em' h='10em' bg='#d6d6d6' p='0.5em' mt='1em'>
                          <Stack direction='column' align='center'>
                            <Text fontSize='5xl' fontWeight='600' color='#2D3748'>
                              {allUserClients.length}
                            </Text>
                            <Text fontSize='xl' fontWeight='500' color='#2D3748'>
                              Usuarios registrados
                            </Text>
                          </Stack>
                        </Center>
                      ) : null
                  }
                </>
              ) : <Loader />
          }
        </Stack>
      </Stack>

      <Footer />
    </div >
  )
}

export default AdminPanelClients;