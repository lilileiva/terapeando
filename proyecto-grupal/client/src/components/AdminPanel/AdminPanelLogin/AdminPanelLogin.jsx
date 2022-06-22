import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanelLogin.css';
import Footer from '../../Footer/Footer.jsx';
import { Container, Box, Text, Stack, Input, InputGroup, Button, InputRightElement } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { LOCAL_HOST } from "../../../redux/actions/types";
import { useDispatch } from 'react-redux';
import { signInAdmin } from '../../../redux/actions';
const baseURL = LOCAL_HOST;
// import { FaGoogle } from "react-icons/fa";
//login/logout con google
// import {gapi} from 'gapi-script'
// import Login from '../LogGoogle/LogInGoogle';
// const clientId = '451354418729-kmjdfi10akrfqi9a8ln8ntrieehu21v8.apps.googleusercontent.com';

function AdminPanelLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    //login/logout con google
    //  useEffect(() => {
    //     function start(){
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope: ''
    //         })
    //     };
    //     gapi.load('client:auth2', start)
    // });
    //var accessToken = gapi.auth.getToken().acces_token;

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [signinForm, setSigninForm] = useState({
        email: "",
        password: ""
    })
    /*------------------validaciones----------------*/
    const validate = (signinForm) => {
        let errors = {};
        if (!signinForm.email) {
            errors.email = 'Inserte su email'
        }
        if (signinForm.email && !(signinForm.email).match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)) {
            errors.email = 'Email inválido'
        }
        if (!signinForm.password) {
            errors.password = 'Inserte su contraseña'
        }
        return errors
    }
    const [formErrors, setFormErrors] = useState({})
    /*------------------fin-validaciones----------------*/

    const handleInputChange = (e) => {
        setSigninForm({
            ...signinForm,
            [e.target.name]: e.target.value
        })
    }
    const [isSubmit, setIsSubmit] = useState(false)

    const handleInputSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(signinForm))
        setIsSubmit(true)
    }

    const afterSubmit = async () => {
        if (Object.keys(formErrors).length === 0) {
            // console.log('signInForm', signinForm)
            let response;
            try {
                response = await axios.post(`${baseURL}/admin/login`, signinForm)
                const token = response.data.token
                window.localStorage.setItem('tokenAdmin', token)
                // console.log('Este es el .data del response', response.data)
                // console.log('Este es todo el token', token)
                if (response.status === 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Bienvenido',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    navigate('/adminpanel/inicio')
                }
            } catch (error) {
                setIsSubmit(false);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Datos incorrectos',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        } else {
            setIsSubmit(false);
        }
    }

    if (isSubmit) {
        afterSubmit();
    }

    const token = window.localStorage.getItem('tokenAdmin');

    return (
        <div className='adminPanelContainer'>

            <Stack width='100%' height='80%' direction='column' justifyContent='center' alignContent='center' alignItems='center'>
                <Stack width='inherit' height='inherit' ml='1em' mr='1em' direction='column' justifyContent='center' alignItems='center'>

                    <Stack pr='1em' pl='1em' mb='0.5em'>
                        <Text color='#63caa7' fontSize='5xl' fontWeight='500' mt='0.5em' mb='0.5em'>Terapeando</Text>
                    </Stack>
                    
                    <Stack width='30em' bg='gray.100' borderRadius='1em' pr='1em' pl='1em' mb='2em' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                        <Text color='#2d3748' fontSize='2xl' mt='0.5em' mb='0.5em'>Panel de administración</Text>
                    </Stack>

                    <Stack width='30em' height='fit-content' mt='1em' p='3em' pl='4em' pr='4em' bg='gray.100' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`} borderRadius='1em' direction='column' justifyContent='space-between'>
                        {
                            token
                                ? (
                                    <Text fontSize='2xl'>Ya has iniciado sesión</Text>
                                ) : (
                                    <>
                                        <Text fontSize='2xl'>Inicia sesión</Text>

                                        <form onSubmit={handleInputSubmit}>
                                            <Input variant='flushed' name='email' placeholder=' Email' bg='white' mb='1em' onChange={handleInputChange} />
                                            {formErrors.email && <Text mt='0' mb='1em' fontSize='sm' color='teal.500'>{formErrors.email}</Text>}

                                            <InputGroup variant='flushed' size='md' bg='white' marginTop='2em' >
                                                <Input variant='flushed' name='password' type={show ? 'text' : 'password'} placeholder=' Contraseña' bg='white' mb='1em' onChange={handleInputChange} />

                                                <InputRightElement width='4.5rem'>
                                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {formErrors.password && <Text mb='1em' fontSize='sm' color='teal.500'>{formErrors.password}</Text>}

                                            <Button type='submit' mt='1em' size='lg' bg='#63caa7' color='white' variant='solid' _hover={[{ color: '#63caa7' }, { bg: 'green.100' }]}>
                                                Ingresar
                                            </Button>
                                        </form>
                                    </>
                                )
                        }
                    </Stack>
                </Stack>
            </Stack >

            <Footer />
        </div >
    )
}

export default AdminPanelLogin;