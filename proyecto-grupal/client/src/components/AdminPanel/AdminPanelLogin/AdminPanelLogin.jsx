import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanelLogin.css';
import Footer from '../../Footer/Footer.jsx';
import { Stack, Text, Input, Button, Link } from '@chakra-ui/react';


function AdminPanelLogin() {

    const navigate = useNavigate();

    return (
        <div className='adminPanelContainer'>


            <Stack width='inherit' height='inherit' mb='10%' ml='1em' mr='1em' direction='column' justifyContent='center' alignItems='center'>
                <Text color='#63caa7' fontSize='2xl' mt='5%' mb='1em'>Panel de administración</Text>
                <Stack width='30em' height='50%' mb='5%' p='4em' bg='gray.100' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} borderRadius='1em' direction='column' justifyContent='space-between'>
                    <Text fontSize='xl'>Inicie sesión como administrador</Text>
                    <Input variant='flushed' placeholder=' Email' bg='white' mb='1em' />
                    <Input variant='flushed' placeholder=' Contraseña' bg='white' mb='1em' />
                    <Button type='submit' size='lg' bg={'#63caa7'} color='white' variant='solid' _hover={[{ color: '#63caa7' }, { bg: 'white' }]} onClick={() => navigate('/adminpanel/home')}>
                        Ingresar
                    </Button>
                </Stack>
            </Stack>

            <Footer />
        </div>

    )
}

export default AdminPanelLogin;