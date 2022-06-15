import React from 'react';
import { Container, Stack, Text, Box, Button } from '@chakra-ui/react';
import { BsPersonCircle } from "react-icons/bs";


function AdminPanelNavbar() {
  return (
    <Stack pt='0.5em' pb='0.5em' pr='2em' pl='2em' width='100%' direction='row' height='3em' bg='gray.100' justifyContent='space-between' alignItems='center'>
      
      <Text fontWeight='bold' fontSize='lg' color='#2D3748'>PANEL DE ADMINISTRACIÓN</Text>

      <Button
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color="white"
        bg="#63caa7"
        // href={"/signup"}
        _hover={{
          bg: "#6bdfb7",
        }}
      >
        <Text fontWeight='semibold' fontSize='lg' mr='1em'>Administrador</Text>
        <BsPersonCircle />
      </Button>
    </Stack>
  )
}

export default AdminPanelNavbar;