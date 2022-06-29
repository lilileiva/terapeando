import React, { useMemo } from "react";
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Avatar,
  Button,
  Heading,
  Text,
  Badge,
  Select,
  Switch
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import countryList from 'react-select-country-list';
import { useDispatch, useSelector } from 'react-redux';
import { editClient, editUserPsichologist, getUserClient, getUserPsychologistOne } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../Modals/DeleteModal';
import NotFound from "../404notFound/notFound";
import NavbarHome from '../NavbarHome/NavbarHome.jsx'
import Footer from "../Footer/Footer";
import { BiLoader, BiX } from "react-icons/bi";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Swal from "sweetalert2";


function FormEditClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useMemo(() => countryList().getData(), [])

  const clientDetails = useSelector((state) => state.userClientDetail)
  const psychologistDetails = useSelector((state) => state.psychologistProfile)
  console.log(psychologistDetails)
  const [error, setError] = useState({});

  const [address, setAddress] = useState(psychologistDetails.location || "");
  const [coordinates, setCoordinates] = useState({
    lat: psychologistDetails.location || null,
    lng: psychologistDetails.latitude || null
  });

  const [input, setInput] = useState({
    firstName: clientDetails.firstName || psychologistDetails.firstName,
    lastName: clientDetails.lastName || psychologistDetails.lastName,
    email: clientDetails.email || psychologistDetails.email,
    country: clientDetails.country  || '',
    location: psychologistDetails.location || '',
    latitude: '',
    longitude: '',
    profileImage: clientDetails.profileImage || psychologistDetails.profileImage,
    DNI: psychologistDetails.DNI,
    Licencia: psychologistDetails.License,
    about: psychologistDetails.about,
    psychologistStatus: psychologistDetails.psychologistStatus
  })

  const regNames = /^[A-Za-z]+$/;
  const regEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


  function validate(input) {
    const error = {};
    if (!regNames.test(input.firstName)) error.firstName = 'El nombre no es valido'
    if (!regNames.test(input.lastName)) error.lastName = 'El apellido no es válido'
    if (!regEmail.test(input.email)) error.email = 'El email no es válido'
    return error
  }

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  useEffect(() => {
    if (tokenClient) dispatch(getUserClient());
    if (tokenPsychologist) dispatch(getUserPsychologistOne());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const [isSubmit, setIsSubmit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(validate(input))
    setIsSubmit(true)
  }

  useEffect(() => {
    if (isSubmit) {
      if (Object.values(error).length > 0) {
        Swal.fire('Campos inválidos', 'Por favor verifica tu información', 'question')
        setIsSubmit(false)
      }
      if (tokenClient) {
        if (!input.firstName || !input.lastName || !input.email || !input.country || !input.profileImage) {
          Swal.fire('Campos incompletos', 'Por favor no dejes campos en blanco', 'question')
        } else {
          dispatch(editClient(input))
          navigate(`/home/${clientDetails.firstName}`)
          Swal.fire("Su perfil ha sido actualizado exitosamente", "", "success");
        }
      } else if (tokenPsychologist) {
        if (!input.firstName || !input.lastName || !input.email || !input.location || !input.profileImage) {
          Swal.fire('Campos incompletos', 'Por favor no dejes campos en blanco', 'question')
        } else {
          dispatch(editUserPsichologist(input))
          navigate(`/home/${psychologistDetails.firstName}`)
          Swal.fire("Su perfil ha sido actualizado exitosamente", "", "success");
        }
      }
    }
  }, [isSubmit, tokenClient, tokenPsychologist])

  const handleLocation = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(address);
    setCoordinates(latLng)
  }

  useEffect(() => {
    setInput({
      ...input,
      location: address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    })
  }, [address, coordinates])


  return (
    <Stack className='ClientDetailsContainer'>
      {
        tokenClient
          ? (
            <>
              <NavbarHome />
              <form onSubmit={(e) => handleSubmit(e)}>
                <Flex
                  minH={'100vh'}
                  align={'center'}
                  justify={'center'}
                  bg='gray.50'>
                  <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'space-between'}>
                      <Stack direction='row'>
                        <Heading fontSize={'3xl'} textAlign={'left'}>
                          Edita tu Información Personal
                        </Heading>
                        <Button maxW={"40%"} fontSize={"sm"} rounded={"full"} _focus={{ bg: "teal.600" }} bg={"green.100"} color="teal.500" _hover={{ bg: "teal", color: "white" }}>
                          <Link to={`/home/${psychologistDetails.firstName}`}>Cancelar</Link>
                        </Button>
                      </Stack>
                      <Text fontSize={'lg'} color={'gray.600'}>
                        Mantene tus datos actualizados
                      </Text>
                    </Stack>
                    <Box
                      rounded={'lg'}
                      bg='white'
                      boxShadow={'lg'}
                      p={8}>
                      <Stack spacing={4}>
                        <HStack>
                          <Box>
                            <FormControl id="firstName">
                              <FormLabel>Nombre</FormLabel>
                              <Input type="text" name='firstName' placeholder={clientDetails.firstName} value={input.firstName} onChange={(e) => handleChange(e)} />
                              {error.firstName && <Badge colorScheme='red'>{error.firstName}</Badge>}
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl id="lastName">
                              <FormLabel>Apellido</FormLabel>
                              <Input type="text" name='lastName' placeholder={clientDetails.lastName} value={input.lastName} onChange={(e) => handleChange(e)} />
                              {error.lastName && <Badge colorScheme='red'>{error.lastName}</Badge>}
                            </FormControl>
                          </Box>
                        </HStack>
                        <FormControl id="email">
                          <FormLabel>Email</FormLabel>
                          <Input type="email" name='email' placeholder={clientDetails.email} value={input.email} onChange={(e) => handleChange(e)} />
                          {error.email && <Badge colorScheme='red'>{error.email}</Badge>}
                        </FormControl>
                        <FormLabel>Pais de residencia</FormLabel>
                        <Select placeholder=' País' value={input.country} variant='flushed' color='gray.500' bg='white' mt='2em' name='country' onChange={(e) => handleChange(e)} >
                          {
                            countries.map(c => (
                              <option key={c.label} value={c.label}>{c.label}</option>
                            ))
                          }
                        </Select>
                        <FormControl id="profileImage">
                          <FormLabel>Imagen de perfil</FormLabel>
                          <Input type="profileImage" name='profileImage' placeholder={clientDetails.profileImage} value={input.profileImage} onChange={(e) => handleChange(e)} />
                          {error.profileImage && <Badge colorScheme='red'>{error.profileImage}</Badge>}
                          <Avatar
                            size={"2xl"}
                            src={clientDetails.profileImage}
                            mt={4}
                          />
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                          <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={'green.100'}
                            color='teal.500'
                            _hover={{
                              bg: 'teal',
                              color: 'white'
                            }}
                            type='submit'
                            onSubmit={(e) => handleSubmit(e)}>
                            Actualizar
                          </Button>
                          <DeleteModal />
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Flex>
              </form>
              <Footer />
            </>
          )
          : tokenPsychologist ? (
            <>
              <NavbarHome />
              <form onSubmit={(e) => handleSubmit(e)}>
                <Flex
                  minH={'100vh'}
                  align={'center'}
                  justify={'center'}
                  bg='gray.50'>
                  <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'space-between'}>
                      <Stack direction='row'>
                        <Heading fontSize={'3xl'} textAlign={'left'}>
                          Edita tu Información Personal
                        </Heading>
                        <Button maxW={"40%"} fontSize={"sm"} rounded={"full"} _focus={{ bg: "teal.600" }} bg={"green.100"} color="teal.500" _hover={{ bg: "teal", color: "white" }}>
                          <Link to={`/home/${psychologistDetails.firstName}`}>Cancelar</Link>
                        </Button>
                      </Stack>
                      <Text fontSize={'lg'} color={'gray.600'}>
                        Mantene tus datos actualizados
                      </Text>
                    </Stack>
                    <Box                    
                      rounded={'lg'}
                      bg='white'
                      boxShadow={'lg'}
                      p={8}>
                      <Stack spacing={4}>
                        <HStack>
                          <Box>
                            <FormControl id="firstName">
                              <FormLabel>Nombre</FormLabel>
                              <Input type="text" name='firstName' placeholder={psychologistDetails.firstName} value={input.firstName} onChange={(e) => handleChange(e)} />
                              {error.firstName && <Badge colorScheme='red'>{error.firstName}</Badge>}
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl id="lastName">
                              <FormLabel>Apellido</FormLabel>
                              <Input type="text" name='lastName' placeholder={psychologistDetails.lastName} value={input.lastName} onChange={(e) => handleChange(e)} />
                              {error.lastName && <Badge colorScheme='red'>{error.lastName}</Badge>}
                            </FormControl>
                          </Box>
                        </HStack>
                        <FormControl id="email">
                          <FormLabel>Email</FormLabel>
                          <Input type="email" name='email' placeholder={psychologistDetails.email} value={input.email} onChange={(e) => handleChange(e)} />
                          {error.email && <Badge colorScheme='red'>{error.email}</Badge>}
                        </FormControl>
                        <FormControl id="country">
                          <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleLocation} >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                              <div>
                                <Input variant='flushed' color='gray.500' bg='white' mt='2em'{...getInputProps({ placeholder: "Selecciona tu localidad" })} />
                                <div>
                                  {loading ? <BiLoader /> : null}

                                  {suggestions.map(suggestion => {
                                    const style = {
                                      backgroundColor: suggestion.active ? "#718096" : "#fff"
                                    };

                                    return (
                                      <option className='LocationOptions' color='gray.500'
                                        bg='white' mt='2em' width='10px' key={suggestion.description} value={suggestion.description} {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                      </option>
                                    );
                                  })}
                                </div>
                              </div>

                            )}
                          </PlacesAutocomplete>
                        </FormControl>
                        <FormControl id="DNI">
                          <FormLabel>DNI</FormLabel>
                          <Input type="DNI" name='DNI' placeholder={psychologistDetails.DNI} value={input.DNI} onChange={(e) => handleChange(e)} />
                        </FormControl>
                        <FormControl id="License">
                          <FormLabel>Licencia</FormLabel>
                          <Input type="Licencia" name='Licencia' placeholder={psychologistDetails.License} value={input.Licencia} onChange={(e) => handleChange(e)} />
                        </FormControl>
                        <FormControl id="License">
                          <FormLabel>Sobre mí</FormLabel>
                          <Input type="about" name='about' placeholder={psychologistDetails.about} value={input.about} onChange={(e) => handleChange(e)} />
                        </FormControl>
                        <FormControl id="profileImage">
                          <FormLabel>Imagen de perfil</FormLabel>
                          <Input type="profileImage" name='profileImage' placeholder={psychologistDetails.profileImage} value={input.profileImage} onChange={(e) => handleChange(e)} />
                          {error.profileImage && <Badge colorScheme='red'>{error.profileImage}</Badge>}
                          <Avatar
                            size={"2xl"}
                            src={psychologistDetails.profileImage}
                            mt={4}
                          />
                        </FormControl>
                        <FormControl align='center' justify='center'>
                          <Text fontSize='xl' fontWeight='500'>Disponibilidad: {input.psychologistStatus}</Text>
                          {
                            input.psychologistStatus === 'Inactivo'
                              ? <Switch size='lg' onChange={() => setInput({ ...input, psychologistStatus: 'Activo' })} />
                              : <Switch isChecked color='green' size='lg' onChange={() => setInput({ ...input, psychologistStatus: 'Inactivo' })} />
                          }
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                          <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={'green.100'}
                            color='teal.500'
                            _hover={{
                              bg: 'teal',
                              color: 'white'
                            }}
                            type='submit'
                            onSubmit={(e) => handleSubmit(e)}>
                            Actualizar
                          </Button>
                          <DeleteModal />
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Flex>
              </form>
              <Footer />
            </>
          ) : (
            <NotFound />
          )
      }
    </Stack>
  );
}

export default FormEditClient;