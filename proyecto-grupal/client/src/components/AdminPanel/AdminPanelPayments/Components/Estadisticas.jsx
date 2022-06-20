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
import { Container } from '@chakra-ui/react'

ChartJS.register(
   CategoryScale, 
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
)

export default function Estadisticas(props) {

   const [chartData, setChartData] = useState({
      datasets: [],
   });

   const [chartOptions, setChartOptions] = useState({});

   useEffect(() => {
      setChartData({
         labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
         datasets: [
            {
               label: "Ganancias",
               data: [12, 33, 20 ,42 ,65, 80, 39, 50, 74, 92, 80, 78],
               borderColor: "#81E6D9",
               backgroundColor: "#B2F5EA",
            },
            {
               label: "Expectativa",
               data: [10, 25, 30 ,40 ,50, 60, 65, 70, 80, 80, 85, 90],
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
      <Container minW={'100%'} minH={'100%'} bg={'#EDF2F7'}>
         <Container maxW='3xl'>
      <Bar data={chartData} />
      </Container>
      </Container>
   );
 }
 
