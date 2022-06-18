import React from "react";
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
import { useDispatch } from 'react-redux';
import { editClient, getUserClient } from '../../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from '../Modals/DeleteModal';

const regNames = /^[A-Za-z]+$/;
const regEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
/* const regUrlImage = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g; */

function validate(input) {
  const error = {};
  if(!regNames.test(input.firstname)) error.firstName = 'El nombre no es valido'
  if(!regNames.test(input.lastname)) error.lastName = 'El apellido no es válido'
  if(!regEmail.test(input.email)) error.email = 'El email no es válido'
  /* if(!regUrlImage.test(input.profileimage)) error.profileImage = 'La URL de la imagen no es valida' */
  return error
}

function FormEditClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {idUserClient} = useParams();
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    profileImage: ""
  })

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
      dispatch(editClient(idUserClient, input))
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
        <form onSubmit={(e) => handleSubmit(e)}>
         <Flex
       minH={'100vh'}
       align={'center'}
       justify={'center'}
       bg={useColorModeValue('gray.50', 'gray.800')}>
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
           bg={useColorModeValue('white', 'gray.700')}
           boxShadow={'lg'}
           p={8}>
           <Stack spacing={4}>
             <HStack>
               <Box>
                 <FormControl id="firstName">
                   <FormLabel>Nombre</FormLabel>
                   <Input type="text" name='firstName' value={input.firstName} onChange={(e) => handleChange(e)}/>
                   {error.firstName && <Badge colorScheme='red'>{error.firstName}</Badge>}
                 </FormControl>
               </Box>
               <Box>
                 <FormControl id="lastName">
                   <FormLabel>Apellido</FormLabel>
                   <Input type="text" name='lastName' value={input.lastName} onChange={(e) => handleChange(e)}/>
                   {error.lastName && <Badge colorScheme='red'>{error.lastName}</Badge>}
                 </FormControl>
               </Box>
             </HStack>
             <FormControl id="email">
               <FormLabel>Email</FormLabel>
               <Input type="email" name='email' value={input.email} onChange={(e) => handleChange(e)}/>
               {error.email && <Badge colorScheme='red'>{error.email}</Badge>}
             </FormControl>
             <FormControl id="country">
               <FormLabel>Pais de residencia</FormLabel>
               <Input type="country" name='country' value={input.country} onChange={(e) => handleChange(e)}/>
             </FormControl>
             <FormControl id="profileImage">
               <FormLabel>Imagen de perfil</FormLabel>
               <Input type="profileImage" name='profileImage' value={input.profileImage} onChange={(e) => handleChange(e)}/>
               {error.profileImage && <Badge colorScheme='red'>{error.profileImage}</Badge>}
               <Avatar
          size={"2xl"}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&usqp=CAU'
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
                   color:'white'
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

  );
}

export default FormEditClient;
