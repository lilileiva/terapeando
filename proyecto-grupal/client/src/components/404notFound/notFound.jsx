import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h1"
        size="2xl"
        bgGradient="linear(to-r, green.400, green.500, green.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="24px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'green.500'} mb={6} fontSize="24px">
        Esta página no existe! Volve a tu perfil o ingresa para seguir navegando.
      </Text>

      <Link to='/'>
      <Button
        bgGradient="linear(to-r, green.400, green.500, green.600)"
        color="white"
        variant="solid">
        Go to Home
      </Button>
      </Link>
    </Box>
  );
}