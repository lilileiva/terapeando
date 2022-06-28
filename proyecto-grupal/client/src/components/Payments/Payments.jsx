import { ExternalLinkIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { Button, VStack, Container, Divider, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, HStack, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavbarHome from '../NavbarHome/NavbarHome'
import { useDispatch, useSelector } from "react-redux";
import { getPaymentByClientId, getPaymentByPsyId, sortByDateCli, sortByDatePsy } from "../../redux/actions"
import NotFound from '../404notFound/notFound.jsx';
import Paged from '../Paged/Paged'

function Payments() {
  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  const dispatch = useDispatch();
  useEffect(() => {
    if(tokenClient) dispatch(getPaymentByClientId());
    if(tokenPsychologist) dispatch(getPaymentByPsyId());

  }, [dispatch, tokenClient, tokenPsychologist]);

  const paymentsCli = useSelector((state) => state.paymentDetailsClient)
  const psymentsPsy = useSelector((state) => state.paymentDetailsPsychologist)

  let allPosts;
  if(tokenClient) allPosts = paymentsCli;
  if(tokenPsychologist) allPosts = psymentsPsy;
  
  const [order, setOrder] = useState('')
  function handleDateSort(e){
    e.preventDefault();
    if(tokenClient) dispatch(sortByDateCli(e.target.value))
    if(tokenPsychologist) dispatch(sortByDatePsy(e.target.value))
    console.log(e.target.value)
    setOrder(`Order ${e.target.value}`)
    setPage(1)
  }
 
  const [page, setPage] = useState(1);
  const [postPage] = useState(7);
  const quantityPaymentPage = page * postPage;
  const firstPage = quantityPaymentPage - postPage;
  const showPaymentPage = allPosts.slice(firstPage,quantityPaymentPage);

    
  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  return (
    <>
    { tokenPsychologist ?  
      <>
   <NavbarHome />
   <Container maxW={'container.lg'} p={0}>
     <HStack justifyContent={'space-between'}>
       <Heading py={12}>Historial de Pagos</Heading>
       <VStack alignItems={'flex-start'}>
         <HStack alignItems={'center'}>
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
       </VStack>
     </HStack>
     <TableContainer>
       <Table variant='striped' colorScheme='teal'>
         <TableCaption><Button>Tengo un problema con mis cobros</Button>
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
             <Th>Cliente</Th>
             <Th isNumeric>Ingreso</Th>
             <Th >Tipo de pago</Th>
             {/* <Th >Estado</Th> */}
             <Th >Detalle de factura</Th>
           </Tr>
         </Thead>
         <Tbody>
           {showPaymentPage && showPaymentPage.map((p) => {
             return (
               <Tr key={p._id}>
                 <Td>{p.createdAt.substring(0,10)}</Td>
                 <Td>{p.firstName} {p.lastName}</Td>
                 <Td isNumeric>$ {(p.amount - p.amount*0.04 - p.amount*0.05)}</Td>
                 <Td>{p.type}</Td>
              {/*    {p.status ?
                 <> 
                 <Td><Badge cursor={'pointer'} colorScheme='green'>Abonado</Badge></Td> 
                 <Td><Link to='/detail/:idPago'><ExternalLinkIcon /></Link></Td>
                 </>
                 : 
                 <>
                 <Td><Badge cursor={'pointer'} colorScheme='purple'>En Proceso</Badge></Td>
                    
                 </>} */}
                 <Td><ExternalLinkIcon /></Td>
               </Tr>
             )
           })}

         </Tbody>
         <Divider />
       </Table>
     </TableContainer>
   </Container>
 </> 
   : tokenClient ? (
    <>
    <NavbarHome />
              <Container maxW={'container.lg'} p={0}>
                <HStack justifyContent={'space-between'}>
                  <Heading py={12}>Historial de Pagos</Heading>
                  <VStack alignItems={'flex-start'}>
                    <HStack alignItems={'center'}>
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
                  </VStack>
                </HStack>
                <TableContainer>
                  <Table variant='striped' colorScheme='teal'>
                    <TableCaption><Button>Tengo un problema con mis pagos</Button>
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
                      {showPaymentPage && showPaymentPage.map((p) => {
                        return (
                          <Tr key={paymentsCli._id}>
                            <Td>{p.createdAt.substring(0,10)}</Td>
                            <Td>{p.psyName}</Td>
                            <Td isNumeric>$ {p.amount}</Td>
                            <Td>{p.type}</Td>
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
   ) : <NotFound /> }
  </>
              
  )
}

export default Payments