import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <>
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
      El pago fue cancelado!
      </Heading>
      <Text color={'gray.500'} pb={5}>
      Para más informacion puede comunicarse a través de nuestro email.
      </Text>
      <Link to='/home'>
      <Button>Volver a inicio</Button>
      </Link>
    </Box>
    </>
  );
}
