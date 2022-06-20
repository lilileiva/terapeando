import { AspectRatio, Divider, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

let psychologistCommission = 80000;
let stripeTax = psychologistCommission*0.04;
let terapeandoTax = psychologistCommission*0.05;
let total = (psychologistCommission + stripeTax + terapeandoTax)

function Cart({last, name, pic}) {
  return (
   <VStack w={'full'} h={'full'} p={10} spacing={10} alignItems='flex-start' bg={'gray.50'}>
      <Heading size={'xl'}>Factura</Heading>
      <HStack spacing={6} alignItems={'center'}  w={'full'}>
      <AspectRatio ratio={1} w={24}>
         <Image src={pic} />
      </AspectRatio>
      <Stack spacing={0} w={'full'} direction={'row'} justifyContent={'space-between'} alignItems='center'>
      <VStack spacing={0} w={'full'} alignItems='flex-start'>
      <Heading size="md">{name} {last}</Heading>
      <Text>Duracion 45 minutos</Text>
      </VStack>
      <Heading size="sm" textAlign="end">${psychologistCommission/100}</Heading>
      </Stack>
      </HStack>

      <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
          <Text color={'gray.600'}>Subtotal</Text>
          <Heading size="sm">${psychologistCommission/100}</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={'gray.600'}>Cargos del sitio</Text>
          <Heading size="sm">${terapeandoTax/100}</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={'gray.600'}>Impuestos (estimated)</Text>
          <Heading size="sm">${stripeTax/100}</Heading>
        </HStack>
      </VStack>
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color={'gray.600'} fontWeight={'bold'}>Total</Text>
        <Heading size="lg">${total/100}</Heading>
      </HStack>
   </VStack>
  )
}

export default Cart