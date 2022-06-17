import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text , List, ListItem, ListIcon, OrderedList, UnorderedList } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import { getUserClient, clearClient, deleteUserClient , getUserPsychologistOne, deleteUserPsichologist } from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';


export default  function AdminPsichologisttDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { idUserPsichologist } = useParams();
  console.log(idUserPsichologist)
  useEffect(() => {
    dispatch(getUserPsychologistOne(idUserPsichologist))
    return () => {
      dispatch(clearClient())
    }
  }, [dispatch])
  const userPsichologistDetail = useSelector((state) => state.userPsichologistDetail);

  const handleAlertDelete = (psychologistId) => {
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar a este usuario?',
      text: "Estos cambios no se podrán revertir.",
      icon: 'info',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'Sí',
    }).then((result) => {
      if (result.isDenied) {
        dispatch(deleteUserPsichologist(psychologistId))
        navigate('/adminpanel/psychologists')
        Swal.fire('Usuario eliminado correctamente!', '', 'success')
      }
    })
  }

  return (

    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>

        <AdminPanelSidebar />

        <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

          <Stack direction='row' width='100%'>
            <Button cursor={'pointer'} colorScheme='teal' variant='outline' onClick={() => navigate('/adminpanel/psychologists')}>
              <ArrowLeftIcon />
              <Text ml='0.5em'> Volver</Text>
            </Button>
          </Stack>
          {
            Object.keys(userPsichologistDetail).length !== 0
              ? (
                <Stack w='100%' direction='column' justify='center' align='center' position={'relative'} top={-12} >

                  <Stack direction='column'>
                  <Avatar src={userPsichologistDetail.profileImage} size='xl' />
                  </Stack>
                  <Stack direction={'row'} >
                    <Text fontSize='xl' fontWeight='600' > Nombre: </Text>
                    <Text fontSize='xl'> {userPsichologistDetail.firstName} {userPsichologistDetail.lastName} </Text>
                    <Text fontSize='xl' fontWeight='600'> País: </Text>
                    <Text fontSize='xl'> {userPsichologistDetail.country} </Text>
                    
                    
                    </Stack>
              
                  <Stack direction='row' display={'flex'} position='relative'>
                    <Text fontSize='xl' fontWeight='600'> Fecha de nacimiento: </Text>
                    <Text fontSize='xl'> {userPsichologistDetail.birthDate} </Text>
                    </Stack>
                    <Stack direction='row' display={'flex'} position='relative'>
                    <Text fontSize='xl' fontWeight='600'> Email: </Text>
                    <Text fontSize='xl'> {userPsichologistDetail.email} </Text>
                  </Stack>
                
                  <br />
                  <Stack direction='column'>
                    <Text fontSize='xl' fontWeight='600'> Especialidades: </Text>
                    {userPsichologistDetail.Specialties && userPsichologistDetail.Specialties.map( el => {
                      return(
                        <UnorderedList>
                         <ListItem fontSize='xl' key={el}> {el} </ListItem>
                        </UnorderedList>
                      )
                    })}
                  </Stack>
                  <br />
                  <Stack direction='row'>
                    <Button width='50%' colorScheme='teal' variant='outline'>
                      <BsPencilSquare />
                      <Text pr='0.5em'> Editar usuario</Text>
                    </Button>
                    <Button width='50%' colorScheme='red' variant='outline' onClick={() => handleAlertDelete(userPsichologistDetail._id)}>
                      <CloseIcon />
                      <Text pr='0.5em'> Eliminar usuario</Text>
                    </Button>
                  </Stack>

                </Stack>
              ) : <Loader />
          }
        </Stack>

      </Stack>

      <Footer />
    </div>
  )
}

