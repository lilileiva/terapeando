import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword} from "../../redux/actions";
import Swal from "sweetalert2";
import './ForgotPassword.css';
import { Input, Text, Box, Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, useDisclosure, Select } from "@chakra-ui/react"




export default function Reviews() {

  const Colors = {
    orange: "#FFC107",
    grey: "#a9a9a9",
  };

  // estados del componente modal de chakra para el renderizado 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  


  // estado para capturar el valor y el contenido de la reseña del usuario al psicologo
  const [input_email, setInput_email] = useState({
    email: "",
  });

  // estado para habilitar o deshabilitar el boton de enviar review

  const [isSubmit, setIsSubmit] = useState(true);

  const dispatch = useDispatch();



  const handleInputChange = (e) => {
    setInput_email({
      ...input_email,
      [e.target.name]: e.target.value
    })
  };

  // validando errores

  const validate = (input_email) => {

    let errors = {};
        if (!input_email.email) {
            errors.email = 'Inserte su email'
        }
        if (input_email.email && !(input_email.email).match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)) {
            errors.email = 'Email inválido'
        }
    return errors;

  };

  const [errorsEmail, setErrorsEmail] = useState({});


  useEffect(() => {
    setErrorsEmail(validate(input_email))
    console.log(errorsEmail)
    Object.keys(errorsEmail).length === 0 ?
      setIsSubmit(false) : setIsSubmit(true);
  }, [input_email, isSubmit]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorsEmail(validate(input_email))
    dispatch(forgotPassword(input_email))
    onClose()
    Swal.fire('Hemos enviado una nueva contaseña a tu email', '', 'success');
    setInput_email({
      email: ""
    });
  };



  return (

    <Stack align={'center'} >

      <Button onClick={onOpen} bg='green.100' color={'#285e61'} >Olvide mi contraseña</Button>
      <Modal

        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >

        <ModalOverlay />
        <ModalContent>

          <ModalHeader  fontSize='xl' color={'#285e61'}>Ingresa el email con el que te registraste para enviarte una nueva contraseña</ModalHeader>
          <ModalCloseButton />


          <ModalBody pb={5}>
            <FormControl >
              <Input type="text" className="input_calificacion" name='email' onChange={(e) => handleInputChange(e)} placeholder="Ej: terapeando@gmail.com" />
             {errorsEmail && <Text fontWeight={'semibold'} color={'#285e61'} >{`${errorsEmail.email ? `>${errorsEmail.email}`: ""}`}</Text>}
              <Select>
                <option value="Psicologo">Psicologo</option>
                <option value="Psicologo">Paciente</option>
              </Select>
              
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' disabled={isSubmit}  bg={'#285e61'} color='white' variant='outline' _hover={[{ color: '#63caa7' }, { bg: 'white' }]}  onClick={(e) => { handleSubmit(e) }} colorScheme='blue' mr={1}>
              Enviar
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>

    </Stack>
  )
};





