import React from 'react';
import Footer from '../../Footer/Footer.jsx'
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import { Stack } from '@chakra-ui/react';


function AdminPanelHome() {
  return (
    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack direction='row' justifyContent='center'>
        <AdminPanelSidebar />
      </Stack>

      <Footer />
    </div>
  )
}

export default AdminPanelHome;