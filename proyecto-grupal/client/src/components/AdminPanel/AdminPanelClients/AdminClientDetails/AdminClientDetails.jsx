import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import { Stack, Button, Avatar, Text } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";

function AdminClientDetails() {
  const navigate = useNavigate();

  return (

    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>

        <AdminPanelSidebar />

        <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

          <Stack direction='row' width='100%'>

            <Button colorScheme='teal' variant='outline' onClick={() => navigate('/adminpanel/clients')}>
              <ArrowLeftIcon />
              <Text pr='0.5em'>Volver</Text>
            </Button>

          </Stack>

          <Stack width='100%' height='30em' position='sticky' overflowY='scroll'>
            <ul className='userClientsList'>
              {
                allUserClients
                  ? allUserClients.map(client => (
                    <>
                      <hr />
                      <Stack w='100%' direction='row' justify='space-between' align='center' pt='0.5em' pb='0.5em' pr='1em'>

                        <Stack direction='row' align='center'>
                          <Avatar src={client.profileImage}></Avatar>
                          <Text fontSize='xl'>
                            {client.firstName} {client.lastName}
                          </Text>
                        </Stack>

                        <Stack direction='row' align='center'>
                          <BsFillEyeFill size='1.5em' color='gray' cursor='pointer' onClick={() => navigate(`/adminpanel/clients/${client._id}`)} />
                          <BsPencilSquare size='1.5em' color='gray' cursor='pointer' />
                          <BsPersonDash size='1.5em' color='gray' cursor='pointer' onClick={handleAlertDelete} />
                        </Stack>

                      </Stack>
                      <hr />
                    </>
                  ))
                  : null
              }
            </ul>
          </Stack>


        </Stack>

      </Stack>

      <Footer />
    </div>
  )
}

export default AdminClientDetails;