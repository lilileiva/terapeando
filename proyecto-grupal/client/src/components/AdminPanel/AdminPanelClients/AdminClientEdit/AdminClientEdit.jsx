import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text, Select } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { AdminGetUserClient, clearClient, AdminDeleteUserClient, AdminEditClient } from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';
import NotFound from '../../../404notFound/notFound.jsx';


function AdminClientEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { idUserClient } = useParams();
  useEffect(() => {
    dispatch(AdminGetUserClient(idUserClient))
    return () => {
      dispatch(clearClient())
    }
  }, [dispatch])
  const userClientDetail = useSelector((state) => state.userClientDetail);

  const [inputText, setInputText] = useState({
    role: ""
  });

  const validate = (inputText) => {
    let errors = {};
    if (!inputText.role) {
      errors.role = 'Seleccione un rol'
    }
    if (inputText.role && inputText.role !== 'client' && inputText.role !== 'Admin') {
      errors.role = 'Seleccione un rol válido'
    }
    return errors
  }
  const [formErrors, setFormErrors] = useState({})

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputText({
      role: e.target.value
    })
  }

  const [isSubmit, setIsSubmit] = useState(false)
  const handleInputSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputText))
    setIsSubmit(true)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(AdminEditClient(userClientDetail._id, inputText))
      dispatch(AdminGetUserClient(idUserClient))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario editado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      navigate(`/adminpanel/clients/${userClientDetail._id}`)
    }
  }, [dispatch, inputText, isSubmit])

  const tokenAdmin = window.localStorage.getItem('tokenAdmin');


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
                    <Button colorScheme='teal' variant='outline' onClick={() => navigate(-1)}>
                      <ArrowLeftIcon />
                      <Text ml='0.5em'> Volver</Text>
                    </Button>
                  </Stack>
                  {
                    Object.keys(userClientDetail).length !== 0
                      ? (
                        <Stack w='100%' direction='column' justify='center' align='center' p='2em'>

                          <Avatar src={userClientDetail.profileImage} size='xl' />
                          <br />
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
                            <form>
                              <Stack direction='column'>
                                <Stack direction='row'>
                                  <Text fontSize='xl' fontWeight='600'> Rol: </Text>
                                  <Select name='role' placeholder='Rol' color='gray.500' mt='2em' onChange={handleInputChange} >
                                    <option value='client'>client</option>
                                    <option value='Admin'>Admin</option>
                                  </Select>
                                </Stack>
                                {formErrors.role && <Text fontSize='sm' color='teal.500'>{formErrors.role}</Text>}
                                <br />
                                <Stack direction='row'>
                                  <Button width='50%' colorScheme='green' variant='outline' onClick={handleInputSubmit}>
                                    <CheckIcon />
                                    <Text pr='0.5em'> Guardar rol</Text>
                                  </Button>
                                  <Button width='50%' colorScheme='red' variant='outline' onClick={() => navigate('/adminpanel/clients')}>
                                    <CloseIcon />
                                    <Text pr='0.5em'> Cancelar edición</Text>
                                  </Button>
                                </Stack>
                              </Stack>
                            </form>
                          </Stack>
                        </Stack>
                      ) : <Loader />
                  }
                </Stack>
              </Stack >

              <Footer />
            </div >
          ) : (
            <NotFound />
          )
      }
    </>
  )
}

export default AdminClientEdit;