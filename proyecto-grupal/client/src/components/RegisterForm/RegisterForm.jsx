import React, { useState, useEffect, useMemo } from 'react';
import './RegisterForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Text, Stack, Input, InputGroup, Button, InputRightElement, Select } from '@chakra-ui/react';
import { FaGoogle } from "react-icons/fa";
import countryList from 'react-select-country-list';
import { specialitiesList } from './specialities';
import { BiLoader, BiX } from "react-icons/bi";
import NavBar from '../NavBar/NavBar.jsx';
import NavbarHome from '../NavbarHome/NavbarHome.jsx';
import Footer from '../Footer/Footer.jsx';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import axios from 'axios';
import { LOCAL_HOST } from "../../redux/actions/types";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
const baseURL = LOCAL_HOST;

function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const countries = useMemo(() => countryList().getData(), [])

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [userClientBtn, setUserClientBtn] = useState(true);
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });
    const [signupForm, setSignupForm] = useState({
        firstname: "",
        lastname: "",
        birthdate: "",
        location: "",
        country: "",
        latitude: '',
        longitude: '',
        email: "",
        profileimage: "",
        license: "",
        dni: "",
        specialities: [],
        education: "",
        password: "",
        repeatpassword: ""
    })

    /*------------------validaciones----------------*/
    const validate = (signupForm) => {
        let errors = {};
        if (!signupForm.firstname) {
            errors.firstname = 'Inserte un nombre'
        }
        if (signupForm.firstname && !(signupForm.firstname).match(/^[A-Za-z]+$/)) {
            errors.firstname = 'Inserte un nombre válido'
        }
        if (!signupForm.lastname) {
            errors.lastname = 'Inserte un apellido'
        }
        if (signupForm.lastname && !(signupForm.lastname).match(/^[A-Za-z]+$/)) {
            errors.lastname = 'Inserte un apellido válido'
        }
        if (!signupForm.birthdate) {
            errors.birthdate = 'Inserte fecha de nacimiento'
        }
        if (signupForm.birthdate && signupForm.birthdate.length > 10) {
            errors.birthdate = 'Inserte fecha de nacimiento válida'
        }
        if (signupForm.birthdate && (((Date.now() - new Date(signupForm.birthdate)) / (31557600000)) < 18)) {
            errors.birthdate = 'Debe ser mayor de 18 años'
        }
        if (!signupForm.email) {
            errors.email = 'Inserte un email'
        }
        if (signupForm.email && !(signupForm.email).match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)) {
            errors.email = 'Inserte un email válido'
        }
        if (!signupForm.profileimage) {
            errors.profileimage = 'Inserte una imagen de perfil'
        }
        if (signupForm.profileimage && !(signupForm.profileimage).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            errors.profileimage = 'URL no válido'
        }
        if (!signupForm.password) {
            errors.password = 'Inserte una contraseña'
        }
        if (signupForm.password && signupForm.password.length < 8) {
            errors.password = 'Contraseña muy corta'
        }
        if (signupForm.password && signupForm.password !== signupForm.repeatpassword) {
            errors.password = 'Las contraseñas no coinciden'
        }
        if (!userClientBtn) {
            if (!signupForm.license) {
                errors.license = 'Inserte matrícula'
            }
            if (signupForm.specialities.length === 0) {
                errors.specialities = 'Inserte al menos una especialidad'
            }
            if (!signupForm.dni) {
                errors.dni = 'Inserte D.N.I.'
            }
            if (!signupForm.education) {
                errors.education = 'Inserte educación'
            }
            if (!signupForm.location) {
                errors.location = 'Selecione una localidad'
            }
            if (signupForm.location && !signupForm.latitude && !signupForm.longitude) {
                errors.location = 'Selecione una localidad válida'
            }
        }
        return errors
    }
    const [formErrors, setFormErrors] = useState({})
    /*------------------fin-validaciones----------------*/

    const handleInputChange = (e) => {
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setSignupForm({
            ...signupForm,
            location: address,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
        })
    }, [address, coordinates])

    const handleLocation = async (address) => {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        setAddress(address);
        setCoordinates(latLng)
    }


    const handleCountries = (e) => {
        setSignupForm({
            ...signupForm,
            country: e.target.value
        })
    }

    const handleSpecialities = (e) => {
        setSignupForm({
            ...signupForm,
            specialities: [...signupForm.specialities.filter(s => s !== e.target.value), e.target.value]
        })
    }

    function handleSpecialitiesDelete(speciality) {
        setSignupForm({
            ...signupForm,
            specialities: signupForm.specialities.filter(s => s !== speciality)
        });
    }

    const [isSubmit, setIsSubmit] = useState(false)

    const handleInputSubmit = async (e) => {
        e.preventDefault()
        console.log(signupForm)
        setFormErrors(validate(signupForm))
        setIsSubmit(true)
    }

    const afterSubmit = async () => {
        if (signupForm.license && signupForm.dni && signupForm.specialities && signupForm.education && Object.keys(formErrors).length === 0 && !userClientBtn) {
            console.log(signupForm)
            const response = await axios.post(`${baseURL}/userpsychologist`, signupForm)
            if (response.status === 201) {
                navigate('/signin')
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario creado correctamente',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                setIsSubmit(false);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Usuario existente',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        } else if (Object.keys(formErrors).length === 0 && userClientBtn) {
            const response = await axios.post(`${baseURL}/userclient/client/register`, signupForm)
            if (response.status === 201) {
                navigate('/signin')

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario creado correctamente',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                setIsSubmit(false);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Usuario existente',
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

    const tokenClient = window.localStorage.getItem('tokenClient')
    const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

    return (
        <div className='backgroundRegister'>
            {
                tokenClient || tokenPsychologist ? <NavbarHome /> : <NavBar />
            }
            <Container zIndex='1' height='inherit' direction='column' justifyContent='center' p='2em' centerContent>
                {
                    tokenClient || tokenPsychologist
                        ? (
                            <Box width='100%' bg='green.100' color='#262626' borderRadius='1em' paddingTop='2em' paddingBottom='2em' align='center'>
                                <Text fontSize='2xl' color={'#285e61'} marginBottom='1em'>
                                    No puedes registrarte mientras tu sesión siga abierta
                                </Text>
                                <Link to='/home'>
                                    <Button type='submit' bg={'#63caa7'} color='white' variant='solid' _hover={[{ color: '#63caa7' }, { bg: 'white' }]}>
                                        Ir al home
                                    </Button>
                                </Link>
                            </Box>
                        ) : (
                            <>
                                <Text fontSize='2xl' color={'#285e61'} paddingBottom='1em'>
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

                                <Box minWidth='container.sm' bg='green.100' color='#262626' borderBottomRadius='1em' pt='1em' pb='2em' align='center'>
                                    <Box direction='column' align='center' width='60%'>
                                        <form onSubmit={handleInputSubmit}>
                                            <Input name='firstname' variant='flushed' placeholder=' Nombre' bg='white' mt='2em' onChange={handleInputChange} />
                                            {formErrors.firstname && <Text fontSize='sm' color='teal.500'>{formErrors.firstname}</Text>}

                                            <Input name='lastname' variant='flushed' placeholder=' Apellido' bg='white' mt='2em' onChange={handleInputChange} />
                                            {formErrors.lastname && <Text fontSize='sm' color='teal.500'>{formErrors.lastname}</Text>}

                                            <Input name='email' variant='flushed' placeholder=' Email' bg='white' mt='2em' onChange={handleInputChange} />
                                            {formErrors.email && <Text fontSize='sm' color='teal.500'>{formErrors.email}</Text>}
                                            <Input
                                                name='birthdate'
                                                variant='flushed'
                                                color='gray.500'
                                                bg='white' mt='2em'
                                                type='text'
                                                placeholder=' Fecha de nacimiento'
                                                onFocus={(e) => (e.target.type = "date")}
                                                onChange={handleInputChange} />
                                            {formErrors.birthdate && <Text fontSize='sm' color='teal.500'>{formErrors.birthdate}</Text>}
                                       <>
                                       {userClientBtn ? (
                                        <>
                                             
                                             <Select variant='flushed' placeholder=' País' color='gray.500' bg='white' mt='2em' onChange={handleCountries} >
                                                {
                                                    countries.map(c => (
                                                        <option key={c.label} value={c.label}>{c.label}</option>
                                                    ))
                                                }
                                            </Select>
                                            {formErrors.country && <Text fontSize='sm' color='teal.500'>{formErrors.country}</Text>}
                                    
                                        </>
                                       ) 
                                       : null}
                                       </>
                                            {
                                                !userClientBtn
                                                    ? (
                                                        <>
                                                            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleLocation} >
                                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                    <div>
                                                                        <Input variant='flushed' color='gray.500' bg='white' mt='2em'{...getInputProps({ placeholder: "Selecciona tu localidad" })} />
                                                                        <div>
                                                                            {loading ? <BiLoader /> : null}

                                                                            {suggestions.map(suggestion => {
                                                                                const style = {
                                                                                    backgroundColor: suggestion.active ? "#718096" : "#fff"
                                                                                };

                                                                                return (
                                                                                    <option className='LocationOptions' color='gray.500'
                                                                                        bg='white' mt='2em' width='10px' key={suggestion.description} value={suggestion.description} {...getSuggestionItemProps(suggestion, { style })}>
                                                                                        {suggestion.description}
                                                                                    </option>
                                                                                );
                                                                            })}

                                                                        </div>
                                                                        {formErrors.location && <Text fontSize='sm' color='teal.500'>{formErrors.location}</Text>}
                                                                    </div>

                                                                )}

                                                            </PlacesAutocomplete>
                                                            <Select onChange={handleSpecialities} name='specialities' variant='flushed' placeholder=' Especialidades' color='gray.500' bg='white' marginTop='2em'>
                                                                {
                                                                    specialitiesList.map(e => (
                                                                        <option key={e} name='specialities' value={e}>{e}</option>
                                                                    ))
                                                                }
                                                            </Select>
                                                            {formErrors.specialities && <Text fontSize='sm' color='teal.500'>{formErrors.specialities}</Text>}

                                                            <ul>
                                                                {signupForm.specialities ? signupForm.specialities.map((e) => (
                                                                    <Stack direction='row' margin='0.2em'>
                                                                        <Text fontSize='md' color='teal.700'>{e}</Text>
                                                                        <BiX onClick={() => handleSpecialitiesDelete(e)} className='iconX' />
                                                                    </Stack>
                                                                ))
                                                                    : null
                                                                }
                                                            </ul>

                                                            <Input name='license' variant='flushed' placeholder=' Matrícula' bg='white' marginTop='2em' onChange={handleInputChange} />
                                                            {formErrors.license && <Text fontSize='sm' color='teal.500'>{formErrors.license}</Text>}

                                                            <Input name='dni' variant='flushed' placeholder=' D.N.I.' bg='white' marginTop='2em' onChange={handleInputChange} />
                                                            {formErrors.dni && <Text fontSize='sm' color='teal.500'>{formErrors.dni}</Text>}

                                                            <Input name='education' variant='flushed' placeholder=' Educacion' bg='white' marginTop='2em' onChange={handleInputChange} />
                                                            {formErrors.education && <Text fontSize='sm' color='teal.500'>{formErrors.education}</Text>}
                                                        </>
                                                    )
                                                    : null
                                            }
                                            <Input name='profileimage' variant='flushed' placeholder=' Profile image link' bg='white' marginTop='2em' onChange={handleInputChange} />
                                            {formErrors.profileimage && <Text fontSize='sm' color='teal.500'>{formErrors.profileimage}</Text>}

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

                                            <InputGroup variant='flushed' size='md' bg='white' marginTop='2em' >
                                                <Input
                                                    name='repeatpassword'
                                                    pr='4.5rem'
                                                    type={show ? 'text' : 'password'}
                                                    placeholder=' Repita la contraseña'
                                                    onChange={handleInputChange}
                                                />
                                                <InputRightElement width='4.5rem' marginBottom='2em' >
                                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>

                                            <Stack direction='column' align='center'>
                                                <Button type='submit' bg={'#63caa7'} color='white' variant='solid' _hover={[{ color: '#63caa7' }, { bg: 'white' }]} marginTop='2em'>
                                                    Registrarse
                                                </Button>
                                                {/* {
                                                    userClientBtn
                                                        ? <Button bg='green.100' color={'#63caa7'} >
                                                            Registrate con &nbsp; <FaGoogle />
                                                        </Button>
                                                        : null
                                                } */}
                                                <Button bg='green.100' color={'#285e61'} onClick={() => navigate('/signin')} >
                                                    ¿Ya tienes una cuenta?
                                                </Button>
                                            </Stack>
                                        </form >

                                    </Box >
                                </Box >
                            </>
                        )
                }
            </Container >
            <Footer />
        </div >
    )
}


export default RegisterForm;