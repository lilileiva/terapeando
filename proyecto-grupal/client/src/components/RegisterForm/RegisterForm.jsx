import React, { useState, useMemo } from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import { Container, Box, Text, Stack, Input, InputGroup, Button, InputRightElement, Select } from '@chakra-ui/react';
import { FaGoogle } from "react-icons/fa";
import countryList from 'react-select-country-list';
import { specialities } from './specialities';


function RegisterForm() {
    const countries = useMemo(() => countryList().getData(), [])

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [userClientBtn, setUserClientBtn] = useState(true);

    return (
        <div className='background'>
            <Container padding='5em' zIndex='1' centerContent>

                <Text fontSize='2xl' color='green.300' marginBottom='1em'>
                    Registro
                </Text>

                <Box minWidth='container.sm' direction='row' align='center' >
                    <Button
                        bg={userClientBtn ? 'green.100' : 'blackAlpha.200'}
                        variant='solid'
                        width='50%'
                        color='teal.800'
                        onClick={() => setUserClientBtn(true)}
                    >
                        Usuario
                    </Button>
                    <Button
                        bg={userClientBtn ? 'blackAlpha.200' : 'green.100'}
                        variant='solid'
                        width='50%'
                        color='teal.800'
                        onClick={() => setUserClientBtn(false)}
                    >
                        Psicólogo
                    </Button>
                </Box>

                <Box minWidth='container.sm' bg='green.100' color='#262626' borderBottomRadius='1em' marginBottom='2em' align='center'>
                    <Box direction='column' align='center' width='60%'>
                        <form>
                            <Input variant='flushed' placeholder=' Nombre' bg='white' marginTop='2em' marginBottom='2em' />
                            <Input variant='flushed' placeholder=' Apellido' bg='white' marginBottom='2em' />
                            <Input variant='flushed' placeholder=' Email' bg='white' marginBottom='2em' />
                            <Input type='date' variant='flushed' placeholder=' Email' color='gray.500' bg='white' marginBottom='2em' />
                            <Select variant='flushed' placeholder=' País' color='gray.500' bg='white' marginBottom='2em'>
                                {
                                    countries.map(c => (
                                        <option value='option1'>{c.label}</option>
                                    ))
                                }
                            </Select>
                            {
                                !userClientBtn
                                    ? (
                                        <>
                                            <Select variant='flushed' placeholder=' Especialidades' color='gray.500' bg='white' marginBottom='2em'>
                                                {
                                                    specialities.map(e => (
                                                        <option value='option1'>{e}</option>
                                                    ))
                                                }
                                            </Select>
                                            <Input variant='flushed' placeholder=' Matrícula' bg='white' marginBottom='2em' />
                                            <Input variant='flushed' placeholder=' D.N.I.' bg='white' marginBottom='2em' />
                                        </>
                                    )
                                    : null
                            }
                            <Input variant='flushed' placeholder=' Profile image link' bg='white' marginBottom='2em' />
                            <InputGroup variant='flushed' size='md' bg='white' marginBottom='2em' >
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder=' Contraseña'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <InputGroup variant='flushed' size='md' bg='white' marginBottom='2em' >
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder=' Repita la contraseña'
                                />
                                <InputRightElement width='4.5rem' marginBottom='2em' >
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Stack direction='column' align='center'>
                                <Link to='/home'>
                                    <Button colorScheme='teal' variant='solid'>
                                        Registrarse
                                    </Button>
                                </Link>
                                {
                                    userClientBtn
                                        ? <Button bg='green.100' color='teal.500' >
                                            Registrate con &nbsp; <FaGoogle />
                                        </Button>
                                        : null
                                }
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


export default RegisterForm;
