import { SettingsIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function ChangePasswordModal() {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const initialRef = React.useRef(null)
 
   return (
     <>
       <Button p={'1px'} onClick={onOpen}><SettingsIcon /></Button>
       <Modal
         initialFocusRef={initialRef}
         isOpen={isOpen}
         onClose={onClose}
       >
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Change Password</ModalHeader>
           <ModalCloseButton />
           <ModalBody pb={6}>
             <FormControl>
               <FormLabel>Current Password</FormLabel>
               <Input ref={initialRef} placeholder='Current Password' />
             </FormControl>
 
             <FormControl mt={4}>
               <FormLabel>New Password</FormLabel>
               <Input placeholder='New Password' />
             </FormControl>
           </ModalBody>
 
           <ModalFooter>
             <Button colorScheme='blue' mr={3}>
               Change
             </Button>
             <Button onClick={onClose}>Cancel</Button>
           </ModalFooter>
         </ModalContent>
       </Modal>
     </>
   )
 }

export default ChangePasswordModal