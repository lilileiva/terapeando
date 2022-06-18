import { ExternalLinkIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import Swal from "sweetalert2";
import { Button, VStack, Container, Divider, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, HStack, Badge, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavbarHome from '../NavbarHome/NavbarHome'
import { useDispatch, useSelector } from "react-redux";
import { getPaymentByClientId } from "../../redux/actions"

const clientId = '62a3a0b4cc3f8656e112d930';

function Payments() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaymentByClientId(clientId));
  }, [dispatch]);
  const payments = useSelector((state) => state.paymentDetailsClient)

  if(payments === "") return (
    Swal.fire('Todavía no tienes un registro de pagos, agenda una sesión antes ✨ ')
  )

  return (
   <>
   <NavbarHome />
    <Container maxW={'container.lg'} p={0}>
      <HStack justifyContent={'space-between'}>
      <Heading py={12}>Historial de Pagos</Heading>
      <VStack alignItems={'flex-start'}>
      <HStack alignItems={'center'}>
      <Text>Filtro por Fecha: </Text>
      <Button  size='sm'><ArrowUpIcon /></Button>
      <Button  size='sm'> <ArrowDownIcon /></Button>
      </HStack>
      <HStack  justifyContent={'flex-end'}>
      <Text>Filtro por Estado: </Text>
      <Badge cursor={'pointer'} colorScheme='green'>Abonado</Badge>
      <Badge cursor={'pointer'} colorScheme='purple'>En Proceso</Badge>
      </HStack>
      </VStack>
      </HStack>
<TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption><Button>Tengo un problema con mis pagos</Button></TableCaption>
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
      {payments.map((payment) => {
        //let date = payment.createdAt.Substring(0,10);
         return(
            <Tr>
            <Td>{payment.createdAt}</Td>
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
    </>
  )
}

export default Payments