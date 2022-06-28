import React, {useState, useEffect} from 'react'
import {
   Chart as ChartJS,
   CategoryScale, 
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { Center, Container, HStack, Stack, Text } from '@chakra-ui/react'
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar';
import { getAllPayments } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

ChartJS.register(
   CategoryScale, 
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
)

export default function Estadisticas() {
   const dispatch = useDispatch()
   const token = window.localStorage.getItem('tokenAdmin');
   const [chartData, setChartData] = useState({
      datasets: [],
   });

   const [chartOptions, setChartOptions] = useState({});

   useEffect(() => {
      dispatch(getAllPayments())
   })
   
   const payments = useSelector((state) => state.allPayments)

   let pTrim = [2000, 2000, 2500, 2500, 2000, 2500, 2600, 2800];
   let sTrim = [];
   let tTrim = [2000, 2000, 2500, 2500, 2000, 2500, 2600, 2800, 2500, 2000, 2000, 2000];
   let cTrim = [2000, 2000, 2500, 2500, 2000, 2500, 2600, 2800, 2500, 2000, 2000, 2000, 2500, 2000, 1800];

   payments.map((p) => {
      if(p.createdAt.substring(5,7) < 4){
         pTrim.push(p.amount)
      }else if(p.createdAt.substring(5,7) < 7){
         sTrim.push(p.amount)
      }else if(p.createdAt.substring(5,7) < 10){
         tTrim.push(p.amount)
      }else if(p.createdAt.substring(5,7) < 13){
         cTrim.push(p.amount)
      }
   })

const reducer = (accumulator, curr) => accumulator + curr;
let totalsTrim = (sTrim.reduce(reducer))/10
let totalpTrim = (pTrim.reduce(reducer))/10
let totaltTrim = (tTrim.reduce(reducer))/10
let totalcTrim = (cTrim.reduce(reducer))/10

   useEffect(() => {
      setChartData({
         labels: ['1°', '2°', '3°', '4°'],
         datasets: [
            {
               label: "Ganancias",
               data: [totalpTrim, totalsTrim, totaltTrim, totalcTrim],
               borderColor: "#81E6D9",
               backgroundColor: "#B2F5EA",
            },
            {
               label: "Expectativa",
               data: [2500, 5000, 5500, 7000],
               borderColor: "#FEB2B2",
               backgroundColor: "#FC8181"
            }
         ]
      });
      setChartOptions({
         responsive: true,
         updateMode: "active",
         plugins: {
            legend: {
               position: "top"
            },
            title:{
               display: true,
               text: "que es eto"
            }
         }
      })
   }, [])

   return (
      <Container minW={'100%'} minH={'100%'} bg={'gray.100'} >
         <AdminPanelNavbar />
         <HStack alignItems={'flex-start'} justifyContent={'space-around'} mt={'2em'} borderTopWidth={'1px'} borderTopColor={'gray.300'} py={'2em'}>
         <Link to={'/adminpanel/payments'}>
         <ArrowBackIcon fontSize={'2em'} p={'5px'} borderRadius={'full'} bgColor={'green.100'} color={'blackAlpha.800'}/>
         </Link>

      <Center w='10em' h='10em' backgroundColor={'green.100'} p='0.5em' mt='1em'>
      <Stack direction='column' align='center'>
                              <Text fontSize='5xl' fontWeight='600' color='green.700'>
                                {payments.length}
                              </Text>
                              <Text fontSize='xl' fontWeight='500' color='green.700'>
                                Pagos Realizados
                              </Text>
                            </Stack>
      </Center>
      <Container maxW='3xl'>
      <Bar data={chartData} />
      </Container>
      </HStack>
      </Container>
   );
 }