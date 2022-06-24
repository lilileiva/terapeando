import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Badge, Button, Divider, Grid, GridItem, Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import {
   add,
   eachDayOfInterval,
   endOfMonth,
   format,
   getDay,
   isEqual,
   isSameDay,
   isSameMonth,
   isToday,
   parse,
   parseISO,
   startOfToday,
 } from 'date-fns'
import React, { useState } from 'react'

 const d = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function Calendar({idPsychologist}) {

   const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

   let today = startOfToday()
   let [selectedDay, setSelectedDay] = useState(today)
   let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
   let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())


   let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })
  

    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }


/*   let selectedDayMeetings = appoints.filter((a) =>
    isSameDay(parseISO(a.startDateTime), selectedDay)
  )
  console.log(selectedDayMeetings) */
   


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
         {days.map((day, dayIdx) => (

            <GridItem colStart={(dayIdx === 0 && colStartClasses[getDay(day)])} rowSpan={1} w='100%' h='10' key={day.toString()}>

               {
               /* dia de hoy */
               isEqual(day, selectedDay) ? 
               <Button onClick={() => setSelectedDay(day)} w='100%' colorScheme='teal'>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> 

               /* si selecciono otro dia que no es hoy el de hoy */
               : !isEqual(day, selectedDay) && isToday(day) ?  
               <Button onClick={() => setSelectedDay(day)} w='100%' bgColor={'teal.100'}>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> 

               /*  */
               : !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) ?
               <Button onClick={() => setSelectedDay(day)} w='100%' color={'gray.500'}>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> 

               : !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) ?
               <Button onClick={() => setSelectedDay(day)} w='100%' color={'gray.300'}>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> 
               
               : isEqual(day, selectedDay) && isToday(day) ? 
               <Button onClick={() => setSelectedDay(day)} w='100%' bgColor={'teal.400'}>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> 
               
               : isEqual(day, selectedDay) && !isToday(day) ? 
               <Button onClick={() => setSelectedDay(day)} w='100%' bgColor={'blackAlpha.700'} color={'white'}>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> 
               
               : <Button onClick={() => setSelectedDay(day)} w='100%'>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               {/* {appoints.some((appoint) => isSameDay(parseISO(appoint.startDatetime), day)) ? (
                     <TriangleUpIcon color={'papayawhip'} />
                    ) : <></>} */}
               </Button>
            }
            </GridItem>
         ))}
      </Grid>

   </VStack>
  )
}

export default Calendar

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
 