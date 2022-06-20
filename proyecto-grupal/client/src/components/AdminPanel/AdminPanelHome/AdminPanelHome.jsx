import React from 'react';
import Footer from '../../Footer/Footer.jsx';
import { Link } from 'react-router-dom';
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import { Stack, Text, Box, Wrap, WrapItem, Center } from '@chakra-ui/react';
import { BsFileEarmarkRichtext, BsCashCoin, BsKanban, BsPerson, BsPersonFill } from "react-icons/bs";
import NotFound from '../../404notFound/notFound.jsx';


function AdminPanelHome() {

  const token = window.localStorage.getItem('tokenAdmin')

  return (
    <>
      {
        token
          ? (
            <div className='adminPanelContainer'>
              <AdminPanelNavbar />

              <Stack bg='#d6d6d6' height='fit-content' direction='row' justifyContent='center' pl='0' pt='2%' pb='2%' pr='2%'>
                <AdminPanelSidebar />

                <Stack width='100%' bg='white' p='2%' direction='column' justifyContent='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                  <Wrap justify='center'>
                    <WrapItem>
                      <Link to='/adminpanel/clients'>
                        <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100' }}>
                          <Stack direction='column' align='center'>
                            <BsPerson size='50%' />
                            <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                              USUARIOS CLIENTES
                            </Text>
                          </Stack>
                        </Center>
                      </Link>
                    </WrapItem>
                    <WrapItem>
                      <Link to='/adminpanel/psychologists'>
                        <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100' }}>
                          <Stack direction='column' align='center'>
                            <BsPersonFill size='50%' />
                            <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                              USUARIOS PSICÓLOGOS
                            </Text>
                          </Stack>
                        </Center>
                      </Link>
                    </WrapItem>
                    <WrapItem>
                      <Link to='/adminpanel/posts'>
                        <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100' }}>
                          <Stack direction='column' align='center'>
                            <BsFileEarmarkRichtext size='50%' />
                            <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                              POSTS
                            </Text>
                          </Stack>
                        </Center>
                      </Link>
                    </WrapItem>
                    <WrapItem>
                      <Link to='/adminpanel/payments'>
                        <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100' }}>
                          <Stack direction='column' align='center'>
                            <BsCashCoin size='50%' />
                            <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                              PAGOS
                            </Text>
                          </Stack>
                        </Center>
                      </Link>
                    </WrapItem>
                    <WrapItem>
                      <Link to='/adminpanel/statistics'>
                        <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100' }}>
                          <Stack direction='column' align='center'>
                            <BsKanban size='50%' />
                            <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                              ESTADÍSTICAS
                            </Text>
                          </Stack>
                        </Center>
                      </Link >
                    </WrapItem>
                  </Wrap>
                </Stack>
              </Stack>

              <Footer />
            </div>
          ) : (
            <NotFound />
          )
      }
    </>
  )
}

export default AdminPanelHome;