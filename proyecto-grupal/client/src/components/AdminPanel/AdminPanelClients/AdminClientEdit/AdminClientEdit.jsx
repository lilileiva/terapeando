import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text, Input } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { getUserClient, clearClient, deleteUserClient } from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';


function AdminClientEdit() {
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

  const handleAlertEdit = (clientId) => {
    Swal.fire({
      title: '¿Estás seguro que quieres guardar estos cambios?',
      icon: 'info',
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(deleteUserClient(clientId))
        navigate(`/adminpanel/clients/${clientId}`)
        Swal.fire('Usuario editado correctamente!', '', 'success')
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

                  <Stack w='25em' direction='column' justify='center' align='flex-start'>

                    <br />
                    <Stack direction='row'  width='100%'>
                      <Text fontSize='xl' fontWeight='600' > Nombre: </Text>
                      <Input value={userClientDetail.firstName} borderColor='gray' />
                    </Stack>
                    <br />
                    <Stack direction='row' width='100%'>
                      <Text fontSize='xl' fontWeight='600'> Apellido: </Text>
                      <Input value={userClientDetail.lastName} borderColor='gray' width='100%' />
                    </Stack>
                    <br />
                    <Stack direction='row'  width='100%'>
                      <Text fontSize='xl' fontWeight='600'> País: </Text>
                      <Input value={userClientDetail.country} borderColor='gray' />
                    </Stack>
                    <br />
                    <Stack direction='row'  width='100%'>
                      <Text fontSize='xl' fontWeight='600' textAlign='left'> Fecha de nacimiento: </Text>
                      <Input type='date' value={userClientDetail.birthDate} borderColor='gray' />
                    </Stack>
                    <br />
                    <Stack direction='row'  width='100%'>
                      <Text fontSize='xl' fontWeight='600'> Email: </Text>
                      <Input value={userClientDetail.email} borderColor='gray' />
                    </Stack>
                    <br />
                    <Stack direction='row'  width='100%'>
                      <Button width='50%' colorScheme='teal' variant='outline' onClick={() => handleAlertEdit(userClientDetail._id)}>
                        <CheckIcon />
                        <Text pr='0.5em'> Guardar cambios</Text>
                      </Button>
                      <Button width='50%' colorScheme='red' variant='outline' onClick={() => navigate(`/adminpanel/clients/${userClientDetail._id}`)}>
                        <CloseIcon />
                        <Text pr='0.5em'> Cancelar cambios</Text>
                      </Button>
                    </Stack>

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

export default AdminClientEdit;