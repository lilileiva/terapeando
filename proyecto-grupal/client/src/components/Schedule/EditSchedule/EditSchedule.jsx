import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TimePicker from 'react-time-picker';
// import TimePicker from 'react-time-picker/dist/entry.nostyle'
import Calendar from 'react-calendar';
import NavbarHome from '../../NavbarHome/NavbarHome';
import Footer from '../../Footer/Footer.jsx';
import { Stack, Button, Select, Text } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
import { createSchedule } from '../../../redux/actions';
import Swal from 'sweetalert2';


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
      ...inputDate,
      date: inputDate,
      hours: [...input.hours.filter(h => h !== e.target.value), e.target.value]
    })
  }
  const handleDeleteHour = (hour) => {
    setInput({
      ...input,
      hours: [...input.hours.filter(h => h !== hour)]
    })
  }

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputDate || input.hours.length === 0) {
      Swal.fire(
        'Datos incompletos',
        'Debes insertar al menos una fecha y horario...',
        'question'
      )
    } else {
      setInput({
        ...inputDate,
        ...input,
        date: inputDate,
        hours: input.hours
      })
    }
    console.log(inputDate)
    console.log(input)
    dispatch(createSchedule(input))
  }

  const todayDate = new Date() //fecha de hoy
  const todayDatePLusMonth = new Date(new Date(todayDate).setMonth(todayDate.getMonth() + 1)) //fecha de hoy más un mes

  let hourList = []
  let start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  let end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  console.log()

  for (let i = 8; i < 21; i++) {
    hourList.push(i + ':00')
  }

  return (
    <Stack direction='column' height='100%' justify='space-between'>
      <NavbarHome />

      <Stack direction='column' width='100%' p='10%' justify='center'>

        <Stack width='100%' direction='row' justify='center'>

          <Calendar
            value={inputDate}
            onChange={setInputDate}
            minDate={todayDate}
            maxDate={todayDatePLusMonth}
          />
        </Stack>

        <Select placeholder='Selecciona un horario' onChange={(e) => handleAddHours(e)}>
          {
            hourList.map((hour) => (
              <option key={hour} value={hour} >{hour}</option>
            ))
          }
        </Select>

        {/* {
          inputDate
            ? <Text>{inputDate.getDate()}/{inputDate.getMonth()}</Text>
            : <Text>Selecciona una fecha</Text>
        } */}
        {
          input.date ? <Text>Fecha:<br />{input.date.getDate()}/{input.date.getMonth()}</Text> : null
        }
        <Text>Horarios: </Text>
        <Stack direction='row' justify='center' align='center'>
          {
            input.hours.length !== 0
              ? (
                input.hours.map((hour) => (
                  <Stack direction='row'>
                    <Text>{hour}</Text>
                    <Button onClick={() => handleDeleteHour(hour)}>X</Button>
                  </Stack>
                ))
              ) : <Text>Añade horarios</Text>
          }
        </Stack>

        <Button colorScheme='teal' variant='solid' onClick={(e) => handleInputSubmit(e)}>
          Agregar fecha a mi agenda
        </Button>

      </Stack>

      <Footer />
    </Stack>
  )
}

export default EditSchedule;