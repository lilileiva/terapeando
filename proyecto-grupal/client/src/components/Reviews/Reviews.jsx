import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GoStar } from "react-icons/go";
import { createReview, getUserPsychologistDetailsasClient } from "../../redux/actions";
import Swal from "sweetalert2";
import './Reviews.css';
import { Text, Box, Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, useDisclosure } from "@chakra-ui/react"


export default function Reviews({ idPsychologist }) {
  const Colors = {
    orange: "#FFC107",
    grey: "#a9a9a9",
  };

  // estados del componente modal de chakra para el renderizado 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // estado rating para la calificacion de 1 a 5 del usuario al psicologo 
  // y stado hover para el color de la estrella segun el rating
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);

  const stars = Array(5).fill(0);

  // estado para capturar el valor y el contenido de la reseña del usuario al psicologo
  const [input_review, setInput_review] = useState({
    Content: "",
    Rating: rating
  });

  // estado para habilitar o deshabilitar el boton de enviar review
  const [isSubmit, setIsSubmit] = useState(true);

  const dispatch = useDispatch();

  //me traigo la info del psicólogo para conocer sus reviews previas
  const userPsichologistDetail = useSelector((state) => state.userPsichologistDetail)
  useEffect(() => {
    dispatch(getUserPsychologistDetailsasClient(idPsychologist))
  }, [dispatch])

  //nuevo estado que voy a usar para actualizar rating de psico
  const [updatePsycoRating, setUpdatePsycoRating] = useState({
    Rating: []
  })

  const handleClick = (value) => {
    setRating(value);
    setInput_review({
      ...input_review,
      Rating: value
    })

    setUpdatePsycoRating({
      ...updatePsycoRating,
      Rating: [...userPsichologistDetail.Rating, value] //creo un nuevo rating sumando a los valores previos el actual
    })
  };

  const handleMouseOver = (value) => {
    setHoverStar(value);
  };

  const handleInputChange = (e) => {
    setInput_review({
      ...input_review,
      [e.target.name]: e.target.value
    })
  };

  // validando errores
  const validate = (input_review) => {

    let errors = {};
    if (input_review.Content.length < 10) {
      errors.Content = "La reseña debe tener al menos 10 caracteres";
    };

    if (input_review.Rating === 0) {
      errors.Rating = "Debes asignarle estrellas al psicólogo";
    };

    return errors;

  };

  const [errorsReview, setErrorsReview] = useState({});


  useEffect(() => {
    setErrorsReview(validate(input_review))
    Object.keys(errorsReview).length === 0 ?
      setIsSubmit(false) : setIsSubmit(true);
  }, [input_review, isSubmit]);



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview(idPsychologist, input_review))    
    onClose()
    Swal.fire('Tu reseña fue enviada con exito', '', 'success');
    setRating(0);
    setHoverStar(undefined);
    setInput_review({
      Content: "",
      Rating: rating,
    });
  };



  return (

    <Stack align={'center'} >

      <Button onClick={onOpen} bg='green.100' color={'#285e61'} >CALIFICA A TU PSICÓLOGO</Button>
      <Modal

        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >

        <ModalOverlay />
        <ModalContent>

          <ModalHeader margin={'auto'} fontSize='2xl' color={'#285e61'}>CALIFICA A TU PSICÓLOGO</ModalHeader>
          <ModalCloseButton />

          <Box className="startsarray">
            {stars.map((star, index) => {
              return (
                <GoStar size={30} style={{ display: 'inline-block', marginRight: '8px', cursor: 'pointer' }}
                  color={(hoverStar || rating) > index ? Colors.orange : Colors.grey}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  key={index}
                  name="Rating"
                  value={input_review.Rating}
                />
              )
            })}
          </Box>

          <ModalBody pb={5}>
            <FormControl >
              <textarea type="text" className="input_calificacion" value={input_review.Content} name='Content' onChange={(e) => handleInputChange(e)} placeholder="Deja un reseña sobre tu Psicólogo" />
              {errorsReview.Rating && <Text fontWeight={'semibold'} color={'#285e61'} >{`> ${errorsReview.Rating}`}</Text>}
              {errorsReview.Content && <Text fontWeight={'semibold'} color={'#285e61'} >{`> ${errorsReview.Content}`}</Text>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' bg={'#285e61'} color='white' variant='outline' _hover={[{ color: '#63caa7' }, { bg: 'white' }]} disabled={isSubmit} onClick={(e) => { handleSubmit(e) }} colorScheme='blue' mr={1}>
              Enviar
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>

    </Stack>
  )
};





