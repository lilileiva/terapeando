import React from 'react'
import {
   CalendarIcon,
   DeleteIcon,
   EditIcon,
   ExternalLinkIcon,
 } from "@chakra-ui/icons";
 import {
   Heading,
   Avatar,
   Box,
   Center,
   Text,
   Stack,
   Button,
   Badge,
   VStack,
   Container,
   HStack,
 } from "@chakra-ui/react";
 import { useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { Link } from "react-router-dom";
 import { getUserClient, getAppointmentAsClient } from "../../redux/actions";
 import ChangePasswordModal from "../Modals/ChangePasswordModal";
 import Footer from '../Footer/Footer'
 import NavbarHome from "../NavbarHome/NavbarHome";

 const tokenClient = window.localStorage.getItem('tokenClient')
function ClientProfile() {


   const dispatch = useDispatch();
 
   useEffect(() => {
    if(tokenClient){ 
      dispatch(getUserClient()) 
      dispatch(getAppointmentAsClient())
   }}, [dispatch, tokenClient ]);
 
     const clientDetails = useSelector((state) => state.userClientDetail); 
     const appointments = useSelector((state) => state.appointments)
     let appointmentDate;
     let appointmentHour;
  return (
   <>
   <NavbarHome />
   <Center align='center'>
     <Container maxW={'container.lg'} py={6} h={"100%"}>
       <Box
         w={"50%"}
         bg={"gray.200"}
         boxShadow={"2xl"}
         rounded={"lg"}
         p={6}
         textAlign={"center"}
       >

         <Stack
           direction={"row"}
           spacing={4}
           w={"100%"}
           justifyContent={"space-between"}
         >
           <Text fontWeight={500} color={"blackAlpha.800"} mb={10} fontSize="3xl">
             Información Personal
           </Text>
           <Button
             maxW={"40%"}
             fontSize={"sm"}
             rounded={"full"}
             _focus={{
               bg: "teal.600",
             }}
             bg={"green.100"}
             color="teal.500"
             _hover={{
               bg: "green.500",
               color: "white",
             }}
           >
             <Link to={`/editprofile/${clientDetails.firstName}`}>Edit Profile</Link>
           </Button>
         </Stack>
         <Avatar
           size={"2xl"}
           src={clientDetails.profileImage}
           alt={clientDetails.firstName}
           mb={4}
         />
{/*          <Heading color={"blackAlpha.800"} fontSize={"2xl"} fontFamily={"body"}>
           {clientDetails.firstName} {clientDetails.lastName}{" "}
           <ChangePasswordModal />
         </Heading> */}

         <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
           <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
             {clientDetails.email}
           </Badge>
           <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
             {clientDetails.birthDate}
           </Badge>
           <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
             {clientDetails.country}
           </Badge>
         </Stack>

         <Stack mt={"40px"} alignItems="center" w={'100%'}>
           <CalendarIcon />
           <Heading color={"blackAlpha.800"}>Citas</Heading>
           <VStack alignItems="left" spacing="24px" w={'100%'}>
           {appointments.map((a) => {
             appointmentDate = new Date(a.date);
             appointmentHour = new Date(a.hour);
           return (
            <Stack w={'100%'}>
               <Badge
               px={2}
               py={1}
               color={"blackAlpha.800"}
               fontWeight={"600"}
               fontSize="1em" >
               <HStack>
            
               <Avatar
                              src={a.IdUserPsychologist.profileImage}
                              size="sm"
                            />
             <Text color={"blackAlpha.800"}>
               {a.IdUserPsychologist.firstName} {a.IdUserPsychologist.lastName}
             </Text>
             </HStack>
               <Text color={"blackAlpha.800"} mb={"10px"}>
               {appointmentDate.toLocaleDateString()} | 
               {a.hour} hs
               </Text>
               <DeleteIcon mr={"10px"} cursor={"pointer"} />
               <EditIcon cursor={"pointer"} />
             </Badge>
             </Stack>
             )})}
           </VStack>
         </Stack>
       </Box>
     </Container>
   </Center>
   <Footer />
 </>
  )
}

export default ClientProfile