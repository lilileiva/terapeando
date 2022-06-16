import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { getUserClient } from '../../../../redux/actions';


function AdminClientDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { idUserClient } = useParams();
  console.log(idUserClient)

  useEffect(() => {
    dispatch(getUserClient(idUserClient))
  }, [dispatch])

  const userClientDetail = useSelector((state) => state.userClientDetail);
  console.log(userClientDetail)

  return (

    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>

        <AdminPanelSidebar />

        <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

          <Stack direction='row' width='100%'>

            <Button colorScheme='teal' variant='outline' onClick={() => navigate('/adminpanel/clients')}>
              <ArrowLeftIcon />
              <Text pr='0.5em'> Volver</Text>
            </Button>

          </Stack>

          <Stack width='100%' height='30em' position='sticky' overflowY='scroll'>
            <ul className='userClientsList'>
              {
                userClientDetail
                  ?
                  <>
                    <Stack w='100%' direction='column' justify='center' align='center' p='1em'>

                      <Avatar src={userClientDetail.profileImage} size='xl'></Avatar>
                      <Stack direction='row'>
                        <Text fontSize='xl'> Nombre: </Text>
                        <Text fontSize='xl'> {userClientDetail.firstName} </Text>
                      </Stack>
                      <Stack direction='row'>
                        <Text fontSize='xl'> Apellido: </Text>
                        <Text fontSize='xl'> {userClientDetail.lastName} </Text>
                      </Stack>
                      <Stack direction='row'>
                        <Text fontSize='xl'> País: </Text>
                        <Text fontSize='xl'> {userClientDetail.country} </Text>
                      </Stack>
                      <Stack direction='row'>
                        <Text fontSize='xl'> Fecha de nacimiento: </Text>
                        <Text fontSize='xl'> {userClientDetail.birthDate} </Text>
                      </Stack>

                    </Stack>
                    <hr />
                  </>
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