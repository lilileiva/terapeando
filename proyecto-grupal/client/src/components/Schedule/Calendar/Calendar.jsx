import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Badge, Button, Divider, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react'
import {
   add,
   eachDayOfInterval,
   endOfMonth,
   format,
   getDay,
   isEqual,
   isFuture,
   isPast,
   isToday,
   parse,
   startOfToday,
 } from 'date-fns'
import React, { useState } from 'react'

 const d = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function Calendar(props) {

   const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

   let today = startOfToday()
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
         {days.map((day, dayIdx) => 
            (
            <GridItem colStart={(dayIdx === 0 && colStartClasses[getDay(day)])} rowSpan={1} w='100%' h='10' key={day.toString()}>
               { isFuture(day,today) ?
            <Button onClick={() => props.handleDate(day)} w='100%' colorScheme='teal' bgColor={'gray.100'} color={'blackAlpha.700'} _hover={{ bg: 'teal.400', color:'white' }} _focus={{bg:'teal.300', color:'white'}} _active={{bg:'teal.300', color:'white'}}>
               <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
               </time>
               </Button> : isPast(day) ?
            <Button disabled={'true'} onClick={() => props.handleDate(day)} w='100%' colorScheme='teal' bgColor={'gray.100'} color={'blackAlpha.700'} _hover={{ bg: 'teal.400', color:'white' }}>
            <time dateTime={format(day, 'yyyy-MM-dd')}>
                   {format(day, 'd')}
            </time>
            </Button> :
             <Button onClick={() => props.handleDate(day)} w='100%' colorScheme='teal' bgColor={'gray.100'} color={'blackAlpha.700'} _hover={{ bg: 'teal.400', color:'white' }}>
             <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
             </time>
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
 