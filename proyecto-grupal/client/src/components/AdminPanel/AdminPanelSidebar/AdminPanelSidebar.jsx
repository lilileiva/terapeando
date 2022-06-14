import React from 'react';
import './AdminPanelSidebar.css';
import { NavLink } from 'react-router-dom';
import { Container, Stack, Text, Button } from '@chakra-ui/react';


function AdminPanelSidebar() {
  return (
    <Container width='20%' p='0' height='fit-content' direction='row'>

      <Stack direction='column'>
        <NavLink exact to='/adminpanel/inicio'
          className='sidebarButtons'
          style={({ isActive }) => ({
            color: isActive ? '#63caa7' : 'white',
            background: isActive ? 'white' : '#63caa7',
          })}>
          Inicio
        </NavLink>
        <NavLink exact to='/adminpanel/clients'
          className='sidebarButtons'
          style={({ isActive }) => ({
            color: isActive ? '#63caa7' : 'white',
            background: isActive ? 'white' : '#63caa7',
          })}>
          Usuarios Clientes
        </NavLink>
        <NavLink exact to='/adminpanel/psychologists'
          className='sidebarButtons'
          style={({ isActive }) => ({
            color: isActive ? '#63caa7' : 'white',
            background: isActive ? 'white' : '#63caa7',
          })}>
          Usuarios Psicólogos
        </NavLink>
        <NavLink exact to='/adminpanel/posts'
          className='sidebarButtons'
          style={({ isActive }) => ({
            color: isActive ? '#63caa7' : 'white',
            background: isActive ? 'white' : '#63caa7',
          })}>
          Posts
        </NavLink>
        <NavLink exact to='/adminpanel/payments'
          className='sidebarButtons'
          style={({ isActive }) => ({
            color: isActive ? '#63caa7' : 'white',
            background: isActive ? 'white' : '#63caa7',
          })}>
          Historial de pagos
        </NavLink>
      </Stack>

    </Container>
  )
}

export default AdminPanelSidebar;