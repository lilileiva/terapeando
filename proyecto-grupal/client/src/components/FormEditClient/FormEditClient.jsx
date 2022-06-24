import React, { useMemo } from "react";
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
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import countryList from 'react-select-country-list';
import { useDispatch, useSelector } from 'react-redux';
import { editClient, editUserPsichologist, getUserClient, getUserPsychologistOne } from '../../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from '../Modals/DeleteModal';
import NotFound from "../404notFound/notFound";

import NavbarHome from '../NavbarHome/NavbarHome.jsx'
import Footer from "../Footer/Footer";


const regNames = /^[A-Za-z]+$/;
const regEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

function validate(input) {
  const error = {};
  if (!regNames.test(input.firstname)) error.firstName = 'El nombre no es valido'
  if (!regNames.test(input.lastname)) error.lastName = 'El apellido no es válido'
  if (!regEmail.test(input.email)) error.email = 'El email no es válido'
  return error
}

function FormEditClient() {

  const countries = useMemo(() => countryList().getData(), [])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { idUserClient } = useParams();
  const clientDetails = useSelector((state) => state.userClientDetail)
  const psychologistDetails = useSelector((state) => state.psychologistProfile)
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    firstName: clientDetails.firstName || psychologistDetails.firstName,
    lastName: clientDetails.lastName || psychologistDetails.lastName,
    email: clientDetails.email || psychologistDetails.email,
    country: clientDetails.country || psychologistDetails.country,
    profileImage: clientDetails.profileImage || psychologistDetails.profileImage,
    DNI: psychologistDetails.DNI,
    Licencia: psychologistDetails.License,
    about: psychologistDetails.about,
  })

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')
  useEffect(() => {
    if (tokenClient) dispatch(getUserClient());
    if (tokenPsychologist) dispatch(getUserPsychologistOne());
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const validation = validate(newInput);
      setError(validation);
      return newInput;
    });
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(error).length > 0) {
      alert("La información no cumple con los requerimientos");
    } else if (
      input.firstName === "" &&
      input.lastName === "" &&
      input.email === "" &&
      input.country === "" &&
      input.profileImage === ""
    ) {
      alert("Tu perfil necesita esta información, por favor no dejes campos en blanco");
    } else {
      if (tokenClient) {
        dispatch(editClient(input))
      } else if (tokenPsychologist) {
        dispatch(editUserPsichologist(input))
      }

      console.log(input)
      setInput({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        profileImage: ''
      })
      navigate("/home")
    }
  }


  return (
    <>
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
                      <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                          Edita tu Información Personal
                        </Heading>
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
                          <FormControl id="country">
                            <FormLabel>Pais de residencia</FormLabel>
                            <Input type="country" name='country' placeholder={clientDetails.country} value={input.country} onChange={(e) => handleChange(e)} />
                          </FormControl>
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
                                bg: 'green.500',
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
                      <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                          Edita tu Información Personal
                        </Heading>
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
                            <FormLabel>Pais de residencia</FormLabel>
                            <Input type="country" name='country' placeholder={psychologistDetails.country} value={input.country} onChange={(e) => handleChange(e)} />
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
                          <Stack spacing={10} pt={2}>

                            <Button
                              loadingText="Submitting"
                              size="lg"
                              bg={'green.100'}
                              color='teal.500'
                              _hover={{
                                bg: 'green.500',
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
    </>
  );
}

export default FormEditClient;