import React from 'react';
import Footer from '../../Footer/Footer.jsx'
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import { Stack, Text } from '@chakra-ui/react';


function AdminPanelClients() {
  return (
    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack height='100%' direction='row' justifyContent='center' pl='0' pt='2%' pb='2%' pr='2%' mr='5%'>
        <AdminPanelSidebar />


        <Stack width='100%' bg='white' m='0'>
          <Text>Contenido clients</Text>
        </Stack>

      </Stack>

      <Footer />
    </div>
  )
}

export default AdminPanelClients;