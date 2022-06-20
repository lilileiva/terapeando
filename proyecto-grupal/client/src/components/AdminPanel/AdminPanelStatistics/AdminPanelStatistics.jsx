import React, { useEffect, useState } from 'react';
// import './AdminPanelClients.css';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Footer/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import AdminPanelNavbar from '../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../AdminPanelSidebar/AdminPanelSidebar.jsx';
import AdminSearchbar from '../AdminSearchbar/AdminSearchbar.jsx';
import { Stack, Text, Box, Wrap, WrapItem, Center, Avatar, Button, Input } from '@chakra-ui/react';
import { BsPersonDash, BsPencilSquare, BsPeople, BsFillEyeFill, BsSearch } from "react-icons/bs";
import {
    AdminGetAllUserClients,
    AdminGetAllPsychologist,
    getAllPosts,
    getAllPayments,
    clearClientList,
    clearAdminSearchbar
} from '../../../redux/actions';
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader.jsx';
import NotFound from '../../404notFound/notFound.jsx';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


function AdminPanelStatistics() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(AdminGetAllUserClients())
        dispatch(AdminGetAllPsychologist())
        dispatch(getAllPosts())
        dispatch(getAllPayments())
        return () => {
            dispatch(clearAdminSearchbar())
            dispatch(clearClientList())
        }
    }, [dispatch, AdminGetAllUserClients, clearAdminSearchbar, clearClientList])

    const allUserClients = useSelector((state) => state.usersClients);
    const allUsersPsichologists = useSelector((state) => state.allUsersPsichologists);
    const posts = useSelector((state) => state.posts);
    const allPayments = useSelector((state) => state.allPayments);

    /*---grafico---*/
    const data = {
        labels: ['Clientes', 'Psicólogos', 'Posts', 'Pagos'],
        datasets: [{
            label: 'Totales',
            backgroundColor: '#c6f6d5',
            data: [allUserClients.length, allUsersPsichologists.length, posts.length, allPayments.length]
        }]
    }
    const options = {
        maintainAspectRatio: false,
        responsive: true
    }

    const tokenAdmin = window.localStorage.getItem('tokenAdmin');

    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 1000)
    })

    return (
        <>
            {
                tokenAdmin
                    ? (
                        <div className='adminPanelContainer'>
                            <AdminPanelNavbar />

                            <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>
                                <AdminPanelSidebar />
                                <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='center' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>
                                    {
                                        loader
                                            ? <Loader />
                                            : (
                                                <>
                                                    {
                                                        (allUserClients.length !== 0 && allUsersPsichologists.length !== 0 && posts.length !== 0 && allPayments.length !== 0)
                                                            ? <Stack height='25em' width='100%'>
                                                                <Bar data={data} options={options} />
                                                            </Stack>
                                                            : null
                                                    }
                                                    <Stack direction='row' p='0'>
                                                        {
                                                            allUserClients.length !== 0
                                                                ? (
                                                                    <>
                                                                        <Center w='10em' h='10em' bg='#d6d6d6' p='0.5em'>
                                                                            <Stack direction='column' align='center'>
                                                                                <Text fontSize='5xl' fontWeight='600' color='#2D3748'>
                                                                                    {allUserClients.length}
                                                                                </Text>
                                                                                <Text fontSize='xl' fontWeight='500' color='#2D3748'>
                                                                                    Usuarios Clientes
                                                                                </Text>
                                                                            </Stack>
                                                                        </Center>
                                                                    </>
                                                                ) : null
                                                        }
                                                        {
                                                            allUsersPsichologists.length !== 0
                                                                ? (
                                                                    <>
                                                                        <Center w='10em' h='10em' bg='#d6d6d6' p='0.5em' mt='1em'>
                                                                            <Stack direction='column' align='center'>
                                                                                <Text fontSize='5xl' fontWeight='600' color='#2D3748'>
                                                                                    {allUsersPsichologists.length}
                                                                                </Text>
                                                                                <Text fontSize='xl' fontWeight='500' color='#2D3748'>
                                                                                    Usuarios Psicólogos
                                                                                </Text>
                                                                            </Stack>
                                                                        </Center>
                                                                    </>
                                                                ) : null
                                                        }
                                                        {
                                                            posts.length !== 0
                                                                ? (
                                                                    <>
                                                                        <Center w='10em' h='10em' bg='#d6d6d6' p='0.5em' mt='1em'>
                                                                            <Stack direction='column' align='center'>
                                                                                <Text fontSize='5xl' fontWeight='600' color='#2D3748'>
                                                                                    {posts.length}
                                                                                </Text>
                                                                                <Text fontSize='xl' fontWeight='500' color='#2D3748'>
                                                                                    Posts
                                                                                </Text>
                                                                            </Stack>
                                                                        </Center>
                                                                    </>
                                                                ) : null
                                                        }
                                                        {
                                                            allPayments.length !== 0
                                                                ? (
                                                                    <>
                                                                        <Center w='10em' h='10em' bg='#d6d6d6' p='0.5em' mt='1em'>
                                                                            <Stack direction='column' align='center'>
                                                                                <Text fontSize='5xl' fontWeight='600' color='#2D3748'>
                                                                                    {allPayments.length}
                                                                                </Text>
                                                                                <Text fontSize='xl' fontWeight='500' color='#2D3748'>
                                                                                    Pagos
                                                                                </Text>
                                                                            </Stack>
                                                                        </Center>
                                                                    </>
                                                                ) : null
                                                        }
                                                    </Stack>
                                                </>
                                            )
                                    }
                                </Stack>
                            </Stack>

                            <Footer />
                        </div >
                    ) : (
                        <NotFound />
                    )
            }
        </>
    )
}

export default AdminPanelStatistics;