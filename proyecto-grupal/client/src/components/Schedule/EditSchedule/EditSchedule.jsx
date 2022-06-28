import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Calendar from '../Calendar/Calendar';
import NavbarHome from '../../NavbarHome/NavbarHome';
import Footer from '../../Footer/Footer.jsx';
import { Stack, Button, Select, Text, HStack, VStack } from '@chakra-ui/react';
import { createSchedule } from '../../../redux/actions';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import startOfToday from 'date-fns/startOfToday/index';
import { daysToWeeks } from 'date-fns';


function EditSchedule() {
  const dispatch = useDispatch()

  const [inputDate, setInputDate] = useState(new Date())
  const [input, setInput] = useState({
    date: "",
    hours: []
  })

  const handleAddHours = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      date: input.date,
      hours: [...input.hours.filter(h => new Date(h).getHours() !== (new Date(e.target.value)).getHours()), e.target.value]
    })
  }
  const handleDeleteHour = (hour) => {
    setInput({
      ...input,
      hours: [...input.hours.filter(h => h !== hour)]
    })
  }

  const handleInputChange = (inputDate) => {
    setInput({
      ...input,
      date: inputDate,
      hours: [...input.hours]
    })
  }

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!input.date || input.hours.length === 0) {
      Swal.fire(
        'Datos incompletos',
        'Debes insertar al menos una fecha y horario...',
        'question'
      )
    }
    dispatch(createSchedule(input))
  }

  let hourList = []
  const startOfDay = new Date(0,0,0,0);
  for (let i = 0; i < 24; i++) {
    const hour = new Date(startOfDay.setUTCHours((startOfDay.getUTCHours() + 1)))
    if (input.hours.length < 8) {
      hourList.push(hour)
    } else {
      Swal.fire('Pruedes agregar un máximo de ocho horarios por fecha', '', 'info')
    }
  }

  return (
    <Stack direction='column' minHeight='100%' justify='space-between'>
      <NavbarHome />

      <Stack direction='column' width='100%' pr='10%' pl='10%' justify='center'>

        <VStack maxW={'100%'} justifyContent={'center'} px={'20%'}>

          {/* <Calendar handleDate={inputDate => setInputDate(inputDate)} */}
          <Calendar handleDate={inputDate => handleInputChange(inputDate)}
          />

          <Select w={'100%'} placeholder='Selecciona un horario' onChange={(e) => handleAddHours(e)}>
            {
              hourList.map((hour) => {
                let hourUTC = new Date(hour)
                return (
                  <option key={hour} value={hourUTC}>{hourUTC.getHours()}:00</option>
                )
              })
            }
          </Select>
        </VStack>

        <VStack w={'100%'} px={'20%'} alignItems={'flex-start'}>
          {
            inputDate
              ? <Stack direction='row' align='center'>
                <Text fontSize='xl'>Fecha: </Text>
                {
                  input.date
                    ? <Text bg='teal.100' p='0.5em' borderRadius='0.5em'>
                      {input.date.getDate()}/{input.date.getMonth()}
                    </Text>
                    : <Text mb='1em'>Añade una fecha</Text>
                }
              </Stack>
              : <Text mt='1em' mb='1em'>Selecciona una fecha</Text>
          }
          <Text fontSize='xl'>Horarios: </Text>
          <Stack direction='row' justify='center' align='center'>
            {
              input.hours.length !== 0
                ? (
                  input.hours.map((hour) => {
                    let hourUTC = new Date(hour)
                    return (
                      <Stack direction='row' align='center' bg='teal.100' p='0.5em' borderRadius='0.5em'>
                        <Text>{hourUTC.getHours()+1}:00</Text>
                        <Text cursor='pointer' onClick={() => handleDeleteHour(hour)}>X</Text>
                      </Stack>
                    )
                  })
                ) : <Text mb='1em'>Añade horarios disponibles</Text>
            }
          </Stack>
          <Button colorScheme='teal' variant='solid' onClick={(e) => handleInputSubmit(e)}>
            Agregar fecha a mi agenda
          </Button>
        </VStack>
      </Stack>
      <Footer />
    </Stack>
  )
}

export default EditSchedule;