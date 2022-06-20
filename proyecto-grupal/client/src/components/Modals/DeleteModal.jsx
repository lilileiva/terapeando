
import { WarningTwoIcon } from '@chakra-ui/icons'
import { Button,Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearClient, deleteUserClient } from '../../redux/actions'

function DeleteModal() {

  //  const {id} = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   function handleDeleteUser(e){
    e.preventDefault();
    dispatch(deleteUserClient())
    navigate('/')
   }

   const { isOpen, onOpen, onClose } = useDisclosure()
   const initialRef = React.useRef(null)
 
   return (
     <>
       <Button colorScheme='blue' variant='outline' size='sm' onClick={onOpen}>Eliminar cuenta</Button>
       <Modal
         initialFocusRef={initialRef}
         isOpen={isOpen}
         onClose={onClose}
       >
         <ModalOverlay />
         <ModalContent>
           <ModalHeader textAlign={'center'} color='tomato'>Estas seguro que ya no quieres formar parte de nuestro protal?</ModalHeader>
           <ModalCloseButton />
           <ModalBody pb={6} display={'flex'} justifyContent={'center'}>
            <Button onClick={handleDeleteUser}>Si<WarningTwoIcon ml={3}/></Button>
           </ModalBody>
         </ModalContent>
       </Modal>
     </>
   )
 }

export default DeleteModal