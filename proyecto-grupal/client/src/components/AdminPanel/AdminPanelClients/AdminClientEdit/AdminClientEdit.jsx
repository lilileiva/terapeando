import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text, Input, Select } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { AdminGetUserClient, clearClient, AdminDeleteUserClient } from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';
import countryList from 'react-select-country-list';
import NotFound from '../../../404notFound/notFound.jsx';


function AdminClientEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useMemo(() => countryList().getData(), [])

  const { idUserClient } = useParams();

  useEffect(() => {
    dispatch(AdminGetUserClient(idUserClient))
    return () => {
      dispatch(clearClient())
    }
  }, [dispatch])
  const userClientDetail = useSelector((state) => state.userClientDetail);
  console.log(userClientDetail)

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

  const [inputText, setInputText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    profileImage: ""
  })

  /*------------------validaciones----------------*/
  const validate = (inputText) => {
    let errors = {};
    if (!inputText.firstname) {
      errors.firstname = 'Inserte un nombre'
    }
    if (inputText.firstname && !(inputText.firstname).match(/^[A-Za-z]+$/)) {
      errors.firstname = 'Inserte un nombre válido'
    }
    if (!inputText.lastname) {
      errors.lastname = 'Inserte un apellido'
    }
    if (inputText.lastname && !(inputText.lastname).match(/^[A-Za-z]+$/)) {
      errors.lastname = 'Inserte un apellido válido'
    }
    if (!inputText.birthdate) {
      errors.birthdate = 'Inserte fecha de nacimiento'
    }
    if (inputText.birthdate && inputText.birthdate.length > 10) {
      errors.birthdate = 'Inserte fecha de nacimiento válida'
    }
    if (inputText.birthdate && (((Date.now() - new Date(inputText.birthdate)) / (31557600000)) < 18)) {
      errors.birthdate = 'Debe ser mayor de 18 años'
    }
    if (!inputText.email) {
      errors.email = 'Inserte un email'
    }
    if (inputText.email && !(inputText.email).match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)) {
      errors.email = 'Inserte un email válido'
    }
    if (!inputText.country) {
      errors.country = 'Inserte país'
    }
    if (!inputText.profileimage) {
      errors.profileimage = 'Inserte una imagen de perfil'
    }
    if (inputText.profileimage && !(inputText.profileimage).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      errors.profileimage = 'URL no válido'
    }
    return errors
  }
  const [formErrors, setFormErrors] = useState({})
  /*------------------fin-validaciones----------------*/

  const handleCountries = (e) => {
    setInputText({
      ...inputText,
      country: e.target.value
    })
  }

  const handleInputChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value
    })
  }

  const handleInputSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputText))
  }

  const token = window.localStorage.getItem('token');

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
                            <form onSubmit={handleInputSubmit}>
                              <Stack direction='row' width='100%'>
                                <Text fontSize='xl' fontWeight='600' textAlign='left'> Imagen de perfil: </Text>
                                <Input name='profileImage' value={inputText.profileImage} placeholder={userClientDetail.profileImage} borderColor='gray' onChange={handleInputChange} />
                                {formErrors.profileImage && <Text fontSize='sm' color='teal.500'>{formErrors.profileImage}</Text>}
                              </Stack>
                              <br />
                              <Stack direction='row' width='100%'>
                                <Text fontSize='xl' fontWeight='600' > Nombre: </Text>
                                <Input name='firstName' value={inputText.firstName} placeholder={userClientDetail.firstName} borderColor='gray' onChange={handleInputChange} />
                                {formErrors.firstname && <Text fontSize='sm' color='teal.500'>{formErrors.firstname}</Text>}
                              </Stack>
                              <br />
                              <Stack direction='row' width='100%'>
                                <Text fontSize='xl' fontWeight='600'> Apellido: </Text>
                                <Input name='lastName' value={inputText.lastName} placeholder={userClientDetail.lastName} borderColor='gray' width='100%' onChange={handleInputChange} />
                                {formErrors.lastName && <Text fontSize='sm' color='teal.500'>{formErrors.lastName}</Text>}
                              </Stack>
                              <br />
                              <Stack direction='row' width='100%'>
                                <Text fontSize='xl' fontWeight='600'> País: </Text>
                                <Select placeholder=' País' color='gray.500' mt='2em' onChange={handleCountries} >
                                  {
                                    countries.map(c => (
                                      <option key={c.label} value={c.label}>{c.label}</option>
                                    ))
                                  }
                                </Select>
                                {formErrors.country && <Text fontSize='sm' color='teal.500'>{formErrors.country}</Text>}
                              </Stack>
                              <br />
                              <Stack direction='row' width='100%'>
                                <Text fontSize='xl' fontWeight='600' textAlign='left'> Fecha de nacimiento: </Text>
                                <Input type='date' value={inputText.date} placeholder={userClientDetail.birthDate} borderColor='gray' onChange={handleInputChange} />
                                {formErrors.date && <Text fontSize='sm' color='teal.500'>{formErrors.date}</Text>}
                              </Stack>
                              <br />
                              <Stack direction='row' width='100%'>
                                <Text fontSize='xl' fontWeight='600'> Email: </Text>
                                <Input name='email' value={inputText.email} placeholder={userClientDetail.email} borderColor='gray' onChange={handleInputChange} />
                                {formErrors.email && <Text fontSize='sm' color='teal.500'>{formErrors.email}</Text>}
                              </Stack>
                            </form>
                            <br />
                            <Stack direction='row' width='100%'>
                              <Button width='50%' colorScheme='teal' variant='outline' onClick={handleInputSubmit}>
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
          ) : (
            <NotFound />
          )
      }
    </>
  )
}

export default AdminClientEdit;