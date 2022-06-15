import React from 'react';
import Footer from '../../Footer/Footer.jsx';
import { Link } from 'react-router-dom';
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import { Stack, Text, Box, Wrap, WrapItem, Center } from '@chakra-ui/react';
import { BsPersonDash, BsPencilSquare, BsPeople, BsKanban } from "react-icons/bs";


function AdminPanelClients() {
  return (
    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack bg='#2D3748' height='fit-content' direction='row' justifyContent='center' pl='0' pt='2%' pb='2%' pr='2%'>
        <AdminPanelSidebar />

        <Stack width='100%' bg='white' p='2%' direction='column' justifyContent='center'>
          <Wrap justify='center'>
            <WrapItem>
              <Link to=''>
                <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100', scale: '110%' }}>
                  <Stack direction='column' align='center'>
                    <BsPeople size='50%' />
                    <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                      TODOS LOS USUARIOS
                    </Text>
                  </Stack>
                </Center>
              </Link>
            </WrapItem>
            <WrapItem>
              <Link to=''>
                <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100', scale: '110%' }}>
                  <Stack direction='column' align='center'>
                    <BsPencilSquare size='50%' />
                    <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                      EDITAR USUARIOS
                    </Text>
                  </Stack>
                </Center>
              </Link>
            </WrapItem>
            <WrapItem>
              <Link to=''>
                <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100' }}>
                  <Stack direction='column' align='center'>
                    <BsPersonDash size='50%' />
                    <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                      ELIMINAR USUARIOS
                    </Text>
                  </Stack>
                </Center>
              </Link>
            </WrapItem>
            <WrapItem>
              <Link to=''>
                <Center w='20em' h='20em' p='1em' m='1em' bg='blackAlpha.300' _hover={{ bg: 'green.100' }}>
                  <Stack direction='column' align='center'>
                    <BsKanban size='50%' />
                    <Text fontSize='2xl' fontWeight='500' color='#2D3748'>
                      ESTADÍSTICAS USUARIOS
                    </Text>
                  </Stack>
                </Center>
              </Link>
            </WrapItem>
          </Wrap>

        </Stack>

      </Stack>

      <Footer />
    </div>
  )
}

export default AdminPanelClients;