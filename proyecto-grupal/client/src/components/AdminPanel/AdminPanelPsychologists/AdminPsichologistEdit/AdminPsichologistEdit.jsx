import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Select, Switch } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch, BsChevronCompactLeft, } from "react-icons/bs";
import { AdminEditUserPsichologist, AdminGetUserPsychologistDetail, AdminDeleteUserPsichologist } from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';


export default function AdminPsichologisttDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { IdUserPsychologist } = useParams();
    console.log(IdUserPsychologist)

    useEffect(() => {
        dispatch(AdminGetUserPsychologistDetail(IdUserPsychologist))
    }, [dispatch])

    const userPsichologistDetail = useSelector((state) => state.userPsichologistDetail);

    const handleAlertEdit = (e, psychologistId) => {
        Swal.fire({
            title: '¿Estás seguro que quieres cambiar el estado de este usuario?',
            text: "Verifica la informacion del usuario antes de cambiar el estado",
            icon: 'info',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: 'Sí',
        }).then((result) => {
            if (result.isDenied) {
                e.target.value === 'Pendiente' ?
                    dispatch(AdminEditUserPsichologist(psychologistId, { status: 'Activo' }))
                    : dispatch(AdminEditUserPsichologist(psychologistId, { status: 'Pendiente' }))
                navigate(`/adminpanel/psychologists/${psychologistId}`)
                Swal.fire('Cambio de estado exitoso!', '', 'success')
            } else {
                navigate(`/adminpanel/psychologists/${psychologistId}`)
            }
        })
    }

    const handleLabel = (e) => {
        e.target.value === 'Pendiente' ?
            document.getElementById('lbl').innerText = "Pendiente" :
            document.getElementById('lbl').innerText = "Activo"
    };

    const handleInputChange = (e, psychologistId) => {
        handleAlertEdit(e, psychologistId)
        handleLabel(e)
    };

    return (

        <div className='adminPanelContainer'>
            <AdminPanelNavbar />

            <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>

                <AdminPanelSidebar />

                <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

                    <Stack direction='row' width='100%'>
                        <Button cursor={'pointer'} colorScheme='teal' variant='outline' onClick={() => navigate(-1)}>
                            <ArrowLeftIcon />
                            <Text ml='0.5em'> Volver</Text>
                        </Button>
                    </Stack>


                    {
                        Object.keys(userPsichologistDetail).length !== 0
                            ? (
                                <Stack w='100%' direction='column' justify='center' align='center' position={'relative'} top={-5}>
                                    <br />
                                    <Stack direction='column'>
                                        <Avatar src={userPsichologistDetail.profileImage} size='xl' />
                                    </Stack>
                                    <Text fontSize={'xl'}>{userPsichologistDetail.firstName} {userPsichologistDetail.lastName}</Text>
                                    <br />
                                    <Stack>
                                        {userPsichologistDetail.status === 'Pendiente' ?
                                            <Text color={'red.500'} fontSize={'2xl'}> Cambia el estado del usuario a activo solo si su informacíon esta completa</Text> :
                                            <Text color={'red.500'} fontSize={'2xl'}> Cambia el estado del usuario a pendiente si hay inconsistencias en su informacíon</Text>}


                                    </Stack>
                                    <Stack border={'solid'} padding={'15px'} borderRadius={10} borderColor={'#63caa7'} Stack direction='column'>
                                        <FormControl display='flex' alignItems='center'>
                                            <FormLabel fontSize={'xl'} id="lbl" mb='0'>{`Estado ${userPsichologistDetail.status}`}</FormLabel>
                                            {userPsichologistDetail.status === 'Pendiente' ?
                                                <Switch size='lg' name={'status'} value={userPsichologistDetail.status} onChange={(e) => handleInputChange(e, userPsichologistDetail._id)} /> :
                                                <Switch isChecked size='lg' name={'status'} value={userPsichologistDetail.status} onChange={(e) => handleInputChange(e, userPsichologistDetail._id)} />}
                                        </FormControl>
                                    </Stack>

                                </Stack>
                            ) : <Loader />
                    }
                </Stack>

            </Stack>

            <Footer />
        </div>
    )
}
