import {
  ArrowLeftIcon,
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
   Spacer,
 } from "@chakra-ui/react";
 import { useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { Link } from "react-router-dom";
 import { getUserPsychologistOne } from "../../redux/actions";
 import ChangePasswordModal from "../Modals/ChangePasswordModal";
 import Loader from "../Loader/Loader";
 import NotFound from '../404notFound/notFound.jsx';
import AvailableTimes from "../Schedule/Calendar/AvailableTimes";
import Calendar from "../Schedule/Calendar/Calendar";
 
 
 export default function PsychologistProfile() {
   const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')
 
   const dispatch = useDispatch();
 
   useEffect(() => {
     if(tokenPsychologist) dispatch(getUserPsychologistOne())
   }, [dispatch, tokenPsychologist]);
 
   const psychologistDetails = useSelector((state) => state.psychologistProfile)
   console.log(psychologistDetails)
   
   let arr = Object.values(psychologistDetails)
 
   return (
     <>
       {tokenPsychologist ? ( 
               <>
                         {
                 arr.length <= 1
                   ? (
                     <Loader />
                   ) : (
                     <>
                     <Link to={'/home'}>
                     <ArrowLeftIcon />
                     </Link>
                     <HStack w={'100%'} justifyContent={'flex-start'} maxH={'100vh'}>
                         <HStack
                           w={"15vw"}
                           h={'100vh'}
                           bg={"gray.200"}
                           boxShadow={"2xl"}
                           rounded={"lg"}
                           p={6}
                           textAlign={"center"}
                           justifyContent={'flex-start'}
                         >
                      <VStack>
                           <Avatar size={"2xl"} src={psychologistDetails.profileImage} alt={psychologistDetails.firstName} mb={4} />
                           <HStack justifyContent={'center'}>
                             <ChangePasswordModal mr={'5px'}/>
                             <AvailableTimes />
                           </HStack>
                           <Text color={"blackAlpha.800"} fontSize={"2xl"} fontFamily={"body"}>
                             {psychologistDetails.firstName} {psychologistDetails.lastName}{" "}
                           </Text>
                           <VStack align={"center"} justify={"center"} direction={"row"} mt={6}>
                             <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                               {psychologistDetails.email}
                             </Badge>
                             <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                               {psychologistDetails.birthDate}
                             </Badge>
                             <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                               {psychologistDetails.country}
                             </Badge>
                      </VStack>
                           <Button
                               maxW={"100px"}
                               fontSize={"sm"}
                               rounded={"full"}
                               _focus={{
                                 bg: "blackAlpha.400",
                               }}
                               bg={"blackAlpha.600"}
                               color="white"
                               _hover={{
                                 bg: "blackAlpha.800",
                                 color: "white",
                               }}
                             >
                               <Link to={`/editprofile/${psychologistDetails.firstName}`}>Edit Profile</Link>
                             </Button>
                           </VStack>
                         </HStack>
                         <Container w={'85vw'} alignItems={'center'}>
                         <Calendar />
                         </Container>
                     </HStack>
                     </>
                   )
               }
             </>
             )
           : (<NotFound />)
           }
     </>
   );
 }