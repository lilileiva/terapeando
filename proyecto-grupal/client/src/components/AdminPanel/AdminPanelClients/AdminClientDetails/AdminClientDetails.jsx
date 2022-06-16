import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { getUserClient, clearClient, deleteUserClient } from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';


function AdminClientDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { idUserClient } = useParams();
  useEffect(() => {
    dispatch(getUserClient(idUserClient))
    return () => {
      dispatch(clearClient())
    }
  }, [dispatch])
  const userClientDetail = useSelector((state) => state.userClientDetail);

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
        navigate('/adminpanel/clients')
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

          <Stack direction='row' width='100%'>
            <Button colorScheme='teal' variant='outline' onClick={() => navigate('/adminpanel/clients')}>
              <ArrowLeftIcon />
              <Text ml='0.5em'> Volver</Text>
            </Button>
          </Stack>
          {
            Object.keys(userClientDetail).length !== 0
              ? (
                <Stack w='100%' direction='column' justify='center' align='center' p='2em'>

                  <Avatar src={userClientDetail.profileImage} size='xl' />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600' > Nombre: </Text>
                    <Text fontSize='xl'> {userClientDetail.firstName} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> Apellido: </Text>
                    <Text fontSize='xl'> {userClientDetail.lastName} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> País: </Text>
                    <Text fontSize='xl'> {userClientDetail.country} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> Fecha de nacimiento: </Text>
                    <Text fontSize='xl'> {userClientDetail.birthDate} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Text fontSize='xl' fontWeight='600'> Email: </Text>
                    <Text fontSize='xl'> {userClientDetail.email} </Text>
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Button width='50%' colorScheme='teal' variant='outline'>
                      <BsPencilSquare />
                      <Text pr='0.5em'> Editar usuario</Text>
                    </Button>
                    <Button width='50%' colorScheme='red' variant='outline' onClick={() => handleAlertDelete(userClientDetail._id)}>
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
  )
}

export default AdminClientDetails;