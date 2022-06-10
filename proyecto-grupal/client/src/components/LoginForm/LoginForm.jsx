import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { Container, Box, Text, Stack, Input, InputGroup, Button, InputRightElement, Select } from '@chakra-ui/react';
import { FaGoogle } from "react-icons/fa";
import NavBar from '../NavBar/NavBar.jsx';
import { useDispatch } from 'react-redux';
// import { getUserClient }


function LoginForm() {
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
        console.log(signinForm)
        setIsSubmit(true)
    }

    const [isCreated, setIsCreated] = useState(false);
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setIsCreated(true)
            setSigninForm({})
        }
    }, [formErrors, signinForm, isSubmit])

    return (
        <div className='background'>

            <NavBar />

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
                                    {/* <Link to='/home'> */}
                                    Iniciar sesión
                                    {/* </Link> */}
                                </Button>

                                <Button bg='green.100' color='teal.500' >
                                    Inicia sesión con &nbsp; <FaGoogle />
                                </Button>

                                <Button bg='green.100' color='teal.700' >
                                    ¿Ya tienes una cuenta?
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
