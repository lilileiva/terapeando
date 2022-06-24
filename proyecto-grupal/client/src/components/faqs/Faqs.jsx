import './Faqs.css';
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
import NavBar from '../NavBar/NavBar.jsx';
import NavbarHome from '../NavbarHome/NavbarHome.jsx';
import Footer from '../Footer/Footer.jsx';

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

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  return (
    <div className='faqsContainer'>
      {
        tokenClient || tokenPsychologist ? <NavbarHome /> : <NavBar />
      }
      <Box p={4} bgColor={'#E2E8F0'}>
        <Link to={'/'}>
          <ArrowLeftIcon color={'green.300'} alignItems={'left'} onClick={() => navigate(-1)} />
        </Link>

        <Stack spacing={4} as={Container} maxW={'6xl'} textAlign={'center'}>
          <Heading fontSize={'3xl'}>Acá podras resolver todas tus dudas</Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            Te explicamos como trabajamos y como podes acceder a la primer consulta con nuestros profesionales.
          </Text>
        </Stack>

        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
          animate={{
            opacity: 1
          }}>
          <Container maxW={'8xl'} mt={10} marginBottom='10%'>
            <Stack spacing={10}>
              {/* {features.map((feature) => (
                <HStack key={feature.id} align={'top'}>
                  <Box color={'green.400'} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text fontWeight={600}>{feature.title}</Text>
                    <Text color={'gray.600'}>{feature.text}</Text>
                  </VStack>
                </HStack>
              ))} */}
              <HStack align={'top'}>
                <Box color={'green.400'} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text fontWeight={600}>¿Como son seleccionados los psicólogos en Terapenado?</Text>
                    <Text color={'gray.600'}>Todos los psicólogos en Terapenado son profesionales con un título obtenido en una institución de educación acreditada. Además, Terapenado revisa los antecedentes de cada psicólogo para evaluar su aceptación en la plataforma. A cada psicólogo registrado se le pide un certificado que acredite la obtención de un título en una institución certificada y un certificado de antecedentes. Además la información sobre la formación de cada psicólogo te es entragada en la sección del perfil del psicólogo.</Text>
                  </VStack>
              </HStack>
              <HStack align={'top'}>
                <Box color={'green.400'} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text fontWeight={600}>¿Como son seleccionados los psicólogos en Terapenado?</Text>
                    <Text color={'gray.600'}>Todos los psicólogos en Terapenado son profesionales con un título obtenido en una institución de educación acreditada. Además, Terapenado revisa los antecedentes de cada psicólogo para evaluar su aceptación en la plataforma. A cada psicólogo registrado se le pide un certificado que acredite la obtención de un título en una institución certificada y un certificado de antecedentes. Además la información sobre la formación de cada psicólogo te es entragada en la sección del perfil del psicólogo.</Text>
                  </VStack>
              </HStack>
              <HStack align={'top'}>
                <Box color={'green.400'} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text fontWeight={600}>¿Como son seleccionados los psicólogos en Terapenado?</Text>
                    <Text color={'gray.600'}>Todos los psicólogos en Terapenado son profesionales con un título obtenido en una institución de educación acreditada. Además, Terapenado revisa los antecedentes de cada psicólogo para evaluar su aceptación en la plataforma. A cada psicólogo registrado se le pide un certificado que acredite la obtención de un título en una institución certificada y un certificado de antecedentes. Además la información sobre la formación de cada psicólogo te es entragada en la sección del perfil del psicólogo.</Text>
                  </VStack>
              </HStack>
              <HStack align={'top'}>
                <Box color={'green.400'} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={'start'}>
                    <Text fontWeight={600}>¿Como son seleccionados los psicólogos en Terapenado?</Text>
                    <Text color={'gray.600'}>Todos los psicólogos en Terapenado son profesionales con un título obtenido en una institución de educación acreditada. Además, Terapenado revisa los antecedentes de cada psicólogo para evaluar su aceptación en la plataforma. A cada psicólogo registrado se le pide un certificado que acredite la obtención de un título en una institución certificada y un certificado de antecedentes. Además la información sobre la formación de cada psicólogo te es entragada en la sección del perfil del psicólogo.</Text>
                  </VStack>
              </HStack>
            </Stack>
          </Container>
        </motion.div>
      </Box>

      <Footer />

    </div>
  );
}