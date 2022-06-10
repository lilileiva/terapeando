import {
  Box,
  Container,
  Heading,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { ArrowLeftIcon, CheckIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Replace test data with your own
const features = Array.apply(null, Array(4)).map(function (x, i) {
  return {
    id: i,
    title: '¿Cómo seleccionamos a los psicologos?',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
  };
});

export default function Faqs() {

  const navigate = useNavigate();

  return (
    <Box p={4} bgColor={'#EDF2F7'}>
       <Link to={'/'}>
       <ArrowLeftIcon color={'green.300'} alignItems={'left'} onClick={() => navigate(-1)}/>
       </Link>
      <Stack spacing={4} as={Container} maxW={'6xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Acá podras resolver todas tus dudas</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Te explicamos como trabajamos y como podes acceder a la primer consulta con nuestros profesionales.
        </Text>
      </Stack>
      <motion.div 
         initial={{opacity: 0}}
         transition={{ duration: 1.3 }}
         animate={{
           opacity: 1}}>
      <Container maxW={'8xl'} mt={10}>
        <Stack spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </Stack>
      </Container>
      </motion.div>
    </Box>
  );
}