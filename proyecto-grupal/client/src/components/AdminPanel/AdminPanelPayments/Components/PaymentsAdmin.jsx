import { Button, VStack, Container, Divider, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, HStack, Badge, Text, Select } from '@chakra-ui/react'
import { ExternalLinkIcon, ArrowUpIcon, ArrowDownIcon, ArrowBackIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments, getRangeByDate, sortByDate } from "../../../../redux/actions"
import Paged from "../../../Paged/Paged.jsx";
import Swal from "sweetalert2";
import NotFound from '../../../404notFound/notFound';

const month = [
  {name: 'Enero', num: '1'}, 
  {name: 'Febrero', num: '2'}, 
  {name: 'Marzo', num: '3'}, 
  {name: 'Abril', num: '4'}, 
  {name: 'Mayo', num: '5'}, 
  {name: 'Junio', num: '6'}, 
  {name: 'Julio', num: '7'}, 
  {name: 'Agosto', num: '8'}, 
  {name: 'Septiembre', num: '9'}, 
  {name: 'Octubre', num: '10'}, 
  {name: 'Noviembre', num: '11'}, 
  {name: 'Diciembre', num: '12'}]

export default function PaymentsAdmin() {

  const tokenAdmin = window.localStorage.getItem('tokenAdmin')

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);
  const allPosts = useSelector((state) => state.allPayments)
  
  /* Paginado */
  const [page, setPage] = useState(1);
  const [postPage] = useState(7);
  const quantityPaymentPage = page * postPage;
  const firstPage = quantityPaymentPage - postPage;
  const showPaymentPage = allPosts.slice(firstPage,quantityPaymentPage);
  
  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  function handleFilterByRange(e){
    e.preventDefault();
    dispatch(getRangeByDate(e.target.value))
    console.log(e.target.value)
    setPage(1)
  }

  const [order, setOrder] = useState('')
  function handleDateSort(e){
    e.preventDefault();
    dispatch(sortByDate(e.target.value))
    console.log(e.target.value)
    setOrder(`Order ${e.target.value}`)
    setPage(1)
  }
  
  if(allPosts === "") return (
    Swal.fire('Todavía no tienes un registro de pagos')
  ) 
  return (    
    <>
   { tokenAdmin ? (
        <Container maxW={'container.lg'} p={0}>
        <HStack justifyContent={'space-between'}>
        <Link to={'/adminpanel/payments'}>
        <ArrowBackIcon fontSize={'2em'} p={'5px'} borderRadius={'full'} bgColor={'green.100'} color={'blackAlpha.800'}/>
        </Link>
        <Heading py={12}>Historial de Pagos</Heading>
        <HStack alignItems={'center'}>
{/*         <Text>Descargar período:</Text>
    <Select  w={'full'}
    bg='gray.100'
    borderColor='gray'
    color='blackAlpha.800'
    variant="filled"
    placeholder='Elegí un período'
    onChange={handleFilterByRange}>
      {month.map((m) => {
        return(
          <option value={m.num}>{m.name}</ option>
        )
      })}
  </Select> */}
        <Text>Filtro por Fecha: </Text>
        <Select
        w="60%"
        placeholder="Ordenar por fecha:"
        onChange={handleDateSort}
        cursor={"pointer"}
      >
        <option key={0} value='asc'>Ascendente</option>
        <option key={1} value='desc'>Descendente</option>
      </Select>
        </HStack>
        </HStack>
  <TableContainer>
    <Table variant='striped' colorScheme='green'>
    <TableCaption>
          <Paged 
         postPage={postPage}
         allPosts={allPosts.length}
         paged={paged}
         page={page}
         setPage={setPage}
         className='pagedPost'/>
    </TableCaption>
      <Thead>
        <Tr>
          <Th>Fecha</Th>
          <Th>Terapeuta</Th>
          <Th isNumeric>Precio</Th>
          <Th >Tipo de pago</Th>
          <Th >Detalle de factura</Th>
        </Tr>
      </Thead>
      <Tbody>
        {showPaymentPage && showPaymentPage.map((payment) => {
          //let date = payment.createdAt.substring(0,10);
           return(
              <Tr key={payment._id}>
              <Td>{payment.createdAt.substring(0,10)}</Td>
              <Td>{payment.psyName}</Td>
              <Td isNumeric>$ {payment.amount}</Td>
              <Td>{payment.type}</Td>
              <Td><Link to='/detail/:idPago'><ExternalLinkIcon /></Link></Td>
            </Tr>
           )
        })}
  
      </Tbody>
      <Divider />
    </Table>
  </TableContainer>
      </Container>
   ) : (
    <NotFound />
   )}
    </>
   );
 }