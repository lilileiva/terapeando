import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanelLogin.css';
import Footer from '../../Footer/Footer.jsx';
import { Stack, Text, Input, Button, Link } from '@chakra-ui/react';


function AdminPanelLogin() {

    const navigate = useNavigate();

    return (
        <div className='adminPanelContainer'>


            <Stack width='100%' height='80%' direction='column' justifyContent='center' alignContent='center' alignItems='center'>

                <Stack width='inherit' height='inherit' ml='1em' mr='1em' direction='column' justifyContent='center' alignItems='center'>

                    <Stack width='30em' bg='#d6d6d6' borderRadius='2em' pr='1em' pl='1em' mb='2em'>
                        <Text color='#2d3748' fontSize='2xl' mt='0.5em' mb='0.5em'>Panel de administración</Text>
                    </Stack>

                    <Stack width='30em' height='70%' p='3em' pl='4em' pr='4em' bg='gray.100' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} borderRadius='1em' direction='column' justifyContent='space-between'>
                        <Text fontSize='2xl'>Inicia sesión</Text>
                        <Input variant='flushed' placeholder=' Email' bg='white' mb='1em' />
                        <Input variant='flushed' placeholder=' Contraseña' bg='white' mb='1em' />
                        <Button type='submit' size='lg' bg='#63caa7' color='white' variant='solid'
                            _hover={[{ color: '#63caa7' }, { bg: 'green.100' }]}
                            onClick={() => navigate('/adminpanel/inicio')}>
                            Ingresar
                        </Button>
                    </Stack>
                </Stack>

            </Stack >

            <Footer />
        </div >

    )
}

export default AdminPanelLogin;