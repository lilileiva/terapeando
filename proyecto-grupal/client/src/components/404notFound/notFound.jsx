import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './notfoundContainer.css'


export default function NotFound() {

  const navigate = useNavigate()

  return (
    <div className='notfoundContainer'>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, green.300, green.300, green.500)"
          backgroundClip="text">
          404
        </Heading>
        <Text fontSize="24px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'green.400'} mb={6} fontSize="24px">
          Esta página no existe! Volve a tu perfil o ingresa para seguir navegando.
        </Text>

        {/* <Link to='/home'> */}
        <Button
          bgGradient="linear(to-r, green.300, green.400, green.500)"
          color="white"
          variant="solid"
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
        {/* </Link> */}
      </Box>
    </div>
  );
}