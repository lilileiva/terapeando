import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GoStar } from "react-icons/go";
import { createReview } from "../../redux/actions";
import Swal from "sweetalert2";
import './Reviews.css';
import {
  Box,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useDisclosure,
} from "@chakra-ui/react"



export default function Reviews() {

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


  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});


const validate = () => {
  let  errors = {};
  
  if (input_review.Content.length < 10) {
    errors.Content = "La reseña debe tener al menos 10 caracteres";
  }
  return errors;
};



  const handleClick = (value) => {
    setRating(value);
    setInput_review({
      ...input_review,
      Rating: value
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
    setErrors(validate({
      ...input_review,
      [e.target.name]: e.target.value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
   setErrors(validate(errors));
    dispatch(createReview(input_review));
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

      <Button onClick={onOpen}>Califica a tu Psicologo</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >

        <ModalOverlay />
        <ModalContent>

          <ModalHeader>Califica a tu Psicologo</ModalHeader>
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
              <textarea type="text" className="input_calificacion" value={input_review.Content} name='Content' onChange={(e) => handleInputChange(e)} placeholder="Deja un reseña sobre tu Psicologo" />
               {errors.Content && <p className="error">{errors.Content}</p>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' disabled={Object.keys(errors).length > 0 ? true : false} onClick={(e) => { handleSubmit(e) }} colorScheme='blue' mr={1}>
              Enviar
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>

    </Stack>
  )
};






