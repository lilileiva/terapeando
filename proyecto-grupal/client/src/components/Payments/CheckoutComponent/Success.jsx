import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
      El pago fue realizado!
      </Heading>
      <Text color={'gray.500'} pb={5}>
      Gracias por confiar en nuestros profesionales.
      </Text>
      <Link to='/home'>
      <Button>Volver a inicio</Button>
      </Link>
    </Box>
  );
}
