import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Badge, Button, Divider, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react'
import {
   add,
   eachDayOfInterval,
   endOfMonth,
   format,
   formatISO,
   getDay,
   isEqual,
   isFuture,
   isPast,
   isToday,
   parse,
   startOfToday,
 } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getScheduleAsClient } from '../../redux/actions'

 const d = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function CalendarApp({handleDate, IdUserPsychologist}) {
   const dispatch = useDispatch()
   const tokenClient = window.localStorage.getItem('tokenClient')
   const schedule = useSelector((state) => state.schedule)
   useEffect(() => {
      if (tokenClient) dispatch(getScheduleAsClient(IdUserPsychologist));
    }, [dispatch, tokenClient])

   let today = startOfToday()
   
   let available = []
   schedule.map((s) => {
      available.push(s.date.toString().substring(0,10))
   })

   let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
   let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

   let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth(e) {
      e.preventDefault()
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth(e) {
      e.preventDefault()
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

  return (
   <VStack w={'100%'} alignItems={'space-between'}>
      <HStack justifyContent={'space-between'}>
      <Text>{format(firstDayCurrentMonth, 'MMMM yyyy')}</Text>
      <HStack>
      <Button onClick={previousMonth}><ChevronLeftIcon /></Button>
      <Button onClick={nextMonth}><ChevronRightIcon /></Button>
      </HStack>
      </HStack>
      <Divider my={'8px'}/>
      <Grid templateColumns='repeat(7, 1fr)' templateRows='repeat(7, 1fr)' gap={3}>
         {d.map((d) => (
            <GridItem colSpan={1} w='100%' h='10'><Badge w='100%' colorScheme='teal' fontSize='xl' fontWeight='bold'>{d}</Badge></GridItem>
         ) )}
         {days.map((day, dayIdx) => {
               return (
            <GridItem colStart={(dayIdx === 0 && colStartClasses[getDay(day)])} rowSpan={1} w='100%' h='10' key={day.toString()}>
               { isEqual(day,today) ?
            <Button disabled w='100%' colorScheme='teal' bgColor={'gray.100'} color={'blackAlpha.700'} _hover={{ bg: 'teal.400', color:'white' }} _focus={{bg:'teal.300', color:'white'}} _active={{bg:'teal.300', color:'white'}}>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> : (available && available.includes(formatISO(new Date(day)).substring(0,10))) ?
             <Button onClick={() => handleDate(day)} w='100%' colorScheme='teal' bgColor={'gray.100'} color={'blackAlpha.700'} _hover={{ bg: 'teal.400', color:'white' }} _focus={{bg:'teal.300', color:'white'}} _active={{bg:'teal.300', color:'white'}}>
             <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
             </time>
             </Button> : 
             <Button disabled w='100%' colorScheme='teal' bgColor={'gray.50'} color={'blackAlpha.700'} _hover={{ bg: 'gray.200', color:'white' }}>
             <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
             </time>
             </Button>
            }
               
            </GridItem>
         )})}
      </Grid>

   </VStack>
  )
}

export default CalendarApp

let colStartClasses = [
   '',
   '1',
   '2',
   '3',
   '4',
   '5',
   '6',
   '7',
 ]
 