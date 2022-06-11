import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Text, Stack, Input, InputGroup, Button, InputRightElement, Select } from '@chakra-ui/react';
import { FaGoogle } from "react-icons/fa";
import NavBar from '../NavBar/NavBar.jsx'

//login/logout con google
import {gapi} from 'gapi-script'
import Login from '../LogGoogle/LogInGoogle';
const clientId = '451354418729-kmjdfi10akrfqi9a8ln8ntrieehu21v8.apps.googleusercontent.com';

function LoginForm() {

    //login/logout con google
    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        };
        gapi.load('client:auth2', start)
    });
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

    const navigate = useNavigate()
    const [isSubmit, setIsSubmit] = useState(false)
    const handleInputSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(signinForm))
        setIsSubmit(true)
    }

    const [isCreated, setIsCreated] = useState(false);
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setIsCreated(true)
            navigate('/home')
            setSigninForm({})
        }
    }, [formErrors, signinForm, isSubmit])

    return (
        <div className='background'>

            <NavBar />

            <Stack direction='column' align='left' width='4em' marginLeft='2em' marginTop='2em'>
                <Button bg='green.100' color='teal.500' onClick={() => navigate(-1)} >
                    Volver
                </Button>
            </Stack>

            <Container padding='2em' zIndex='1' centerContent>

                <Text fontSize='2xl' color='green.300' marginBottom='1em'>
                    Inicia sesión
                </Text>

                <Box minWidth='container.sm' bg='green.100' color='#262626' borderRadius='1em' paddingTop='1em' align='center' paddingBottom='3em'>
                    <Box direction='column' align='center' width='60%'>
                        <form onSubmit={handleInputSubmit}>

                            <Input name='email' variant='flushed' placeholder=' Email' bg='white' marginTop='3em' onChange={handleInputChange} />
                            {formErrors.email && <Text fontSize='sm' color='teal.500'>{formErrors.email}</Text>}

                            <InputGroup variant='flushed' size='md' bg='white' marginTop='2em' >
                                <Input
                                    name='password'
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder=' Contraseña'
                                    onChange={handleInputChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {formErrors.password && <Text fontSize='sm' color='teal.500'>{formErrors.password}</Text>}

                            <Stack direction='column' align='center'>
                                <Button type='submit' colorScheme='teal' variant='solid' marginTop='3em'>
                                    Iniciar sesión
                                </Button>

                                <Button bg='green.100' color='teal.500' >
                                    <Login />
                                    {/* Inicia sesión con &nbsp; <FaGoogle /> */}
                                </Button>

                                <Button bg='green.100' color='teal.700' onClick={() => navigate('/signup')} >
                                    ¿Aún no tienes una cuenta?
                                </Button>
                            </Stack>
                        </form>

                    </Box>
                </Box>
            </Container>
        </div >
    )
}


export default LoginForm;
