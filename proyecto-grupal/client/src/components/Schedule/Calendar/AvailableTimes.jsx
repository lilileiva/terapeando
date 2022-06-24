import { CalendarIcon } from "@chakra-ui/icons";
import { Badge, Button, Checkbox, Container, Heading, HStack, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addAvailablesTimes } from "../../../redux/actions";

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const regexHorario = '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'

function validate(input) {
  const error = {};
/*    if (!input.days.length)
    error.days = "Por favor elija uno o más días"; */
  if (!input.inicio)
    error.inicio = 'Por favor establezca un horario de inicio'
  if (input.inicio.length > 5 || input.inicio.length < 5)
    error.inicio = 'Este horario no es válido'  
  if (input.fin.length > 5 || input.fin.length < 5)
    error.fin = 'Este horario no es válido'  
  if(!input.fin)
    error.fin = 'Por favor establezca un horario de fin'
/*     if(!regexHorario.test(input.inicio) || !regexHorario.test(input.fin))
  error.inicio = 'Este horario no es válido' */

  return error;
}


export default function AvailableTimes() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    dias: [],
    inicio: '',
    fin: ''
  });

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

  function handleCheckBox(e) {
    let arr = input.dias;
    let find = arr.indexOf(e.target.value);
    if (find >= 0) {
      arr.splice(find, 1);
    } else {
      arr.push(e.target.value);
    }

    setInput({
      ...input,
      dias: arr,
    });
    const validation = validate(input);
    setError(validation);
  }
  
  function handleSubmit(e){
    e.preventDefault();

    if (Object.values(error).length > 0) {
      Swal.fire('Es necesario que rellenes los campos para empezar a usar la plataforma!');
    } else {
      console.log(input.dias)
      dispatch(addAvailablesTimes(input));
      Swal.fire('Tu disponibilidad fue agregada!')
      setInput({
        dias: [],
        inicio: '',
        fin: ''
      });
    }

  }


  return (
    <>
    <Button p={'1px'} onClick={onOpen}><CalendarIcon /></Button>
    <Modal onClose={onClose} size={'2xl'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Selecciona tu franja horaria disponible!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Text>¿Que días estas disponible?</Text>
        <br />
        <HStack w={'100%'} justifyContent={'center'} flexWrap={'wrap'} gap={'15px'}>
        {dias.map((d) => (
          <div key={d}>
          <label>{d}</label>
          <input type="checkbox" name={d} value={d} onChange={(e) => handleCheckBox(e)}/>
          </div>
        ))}
        </HStack>
        {error.dias && <Badge colorScheme={'red'}>{error.dias}</Badge>}
        <br />
        <br />
        <Text>¿En qué horario?</Text>
        <br />
        <InputGroup gap={'15px'} mb={'10px'} w={'70%'}>
    <InputLeftAddon children='Inicio' w={'70px'}/>
    <Input variant='flushed' placeholder='00:00' value={input.inicio} name='inicio' onChange={(e) => handleChange(e)}/>
    </InputGroup>
    {error.inicio && <Badge colorScheme={'red'}>{error.inicio}</Badge>}
    <br />
    <InputGroup gap={'15px'} w={'70%'}>
    <InputLeftAddon children='Fin' w={'70px'}/>
    <Input variant='flushed' placeholder='00:00' value={input.fin} name='fin' onChange={(e) => handleChange(e)}/>
    </InputGroup>
    {error.fin && <Badge colorScheme={'red'}>{error.fin}</Badge>}
        </ModalBody>
          <ModalFooter>
            <VStack alignItems={'center'} w={'100%'}>
            <Spacer />
            <Button onClick={(e) => handleSubmit(e)}>Agregar</Button>
            <Spacer />
             <Badge>Por el momento solo podras elegir una franja para los dias de la semana que elijas</Badge>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  );
}
