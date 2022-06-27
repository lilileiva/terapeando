import React from 'react'
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion'
import './landingpage.css'
import Chat from '../Chat/Chat'
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  return (
    <>
      {
        tokenClient || tokenPsychologist
          ? (
            <Home />
          ) : (
            <div className='landingPage'>
              <NavBar />
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1.3 }}
                animate={{
                  opacity: 1
                }}>
                <Container maxW={'8xl'} bgColor={'#E2E8F0'}>
                  <Stack
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}
                    direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                      <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                          as={'span'}
                          position={'relative'}
                          _after={{
                            content: "''",
                            width: 'full',
                            height: '30%',
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            bg: 'green.100',
                            zIndex: -1,
                          }}>
                          Terapeando
                        </Text>
                        <br />
                        <Text as={'span'} color={'green.300'}>
                          Tener salud mental tambien es tener salud
                        </Text>
                      </Heading>
                      <Text color={'gray.500'}>
                        Brindamos los mejores profesionales y recursos para cuidarte. El primer paso siempre es el más dificil, registrate para empezar!

                        Somos una plataforma psicológica online donde podes realizar sesiones a distancia como asi encontrar articulos escritos por los mismos profesionales.
                      </Text>
                    </Stack>
                    <Flex
                      flex={1}
                      justify={'center'}
                      align={'center'}
                      position={'relative'}
                      w={'full'}>
                      <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}>
                        <IconButton
                          aria-label={'Play Button'}
                          variant={'ghost'}
                          _hover={{ bg: 'transparent' }}
                          size={'lg'}
                          color={'white'}
                          position={'absolute'}
                          left={'50%'}
                          top={'50%'}
                          transform={'translateX(-50%) translateY(-50%)'}
                        />
                        <Image
                          alt={'Hero Image'}
                          fit={'cover'}
                          align={'center'}
                          w={'100%'}
                          h={'100%'}
                          src={
                            'https://images.unsplash.com/photo-1495653797063-114787b77b23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                          }
                          />
                      </Box>
                    </Flex>
                    <Chat/>
                  </Stack>
                </Container>
              </motion.div>
              <Footer />
            </div>
          )
      }
    </>
  )
}


export default LandingPage