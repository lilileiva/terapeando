import { Avatar, Container, Text, Box} from '@chakra-ui/react'
import React from 'react'

function ClientDetails() {
  return (
    <div className='content'>
       <Container d="flex" alignItems="center" py="10" >
          <Avatar src='https://wallpaperaccess.com/full/4595683.jpg' size='2xl' mb='-40px' />
          <Box bg="#E2E8F0" py="12"
          borderRadius="8px" lineHeight={8}>
          <Text fontSize='2xl'>Nombre y Apellido</Text>
          <Text fontSize='md'>BirdthDay</Text>
          <Text fontSize='md'>Country</Text>
          <Text fontSize='md' variant="link">Email</Text>
          </Box>
       </Container>
    </div>
  )
}

export default ClientDetails