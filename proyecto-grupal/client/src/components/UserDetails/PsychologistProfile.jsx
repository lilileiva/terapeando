import {
  ArrowLeftIcon,
   CalendarIcon,
   DeleteIcon,
   EditIcon,
   ExternalLinkIcon,
   HamburgerIcon,
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
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   IconButton,
 } from "@chakra-ui/react";
 import {
  format,
  parseISO,
  startOfToday,
} from 'date-fns'
 import { useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { Link } from "react-router-dom";
 import { getAppointmentAsPsychologist, getUserPsychologistOne } from "../../redux/actions";
 import ChangePasswordModal from "../Modals/ChangePasswordModal";
 import Loader from "../Loader/Loader";
 import NotFound from '../404notFound/notFound.jsx';
import Footer from '../Footer/Footer'
import NavbarHome from "../NavbarHome/NavbarHome";
 
 
 export default function PsychologistProfile() {
  let today = startOfToday()

   const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')
 
   const dispatch = useDispatch();
 
   useEffect(() => {
     if(tokenPsychologist) {
      dispatch(getUserPsychologistOne())
    }
   }, [dispatch, tokenPsychologist]);
 
   const psychologistDetails = useSelector((state) => state.psychologistProfile)
   console.log(psychologistDetails)

   const appoints = useSelector((state) => state.appointments)
   console.log(appoints)

   let arr = Object.values(psychologistDetails)
 
   return (
     <>
       {tokenPsychologist ? ( 
               <>
               <NavbarHome />
                         {
                 arr.length <= 1
                   ? (
                     <Loader />
                   ) : (
                     <VStack  bg={"gray.200"}
                     boxShadow={"2xl"}
                     rounded={"lg"}
                     p={6}
                     h={'78vh'}>
                       <Link to={'/home'}>
                     <ArrowLeftIcon />
                     </Link>
                         <HStack
                           w={"100vw"}                          
                           textAlign={"center"}
                           justifyContent={'center'}
                         >
                      <VStack>
                           <Avatar size={"2xl"} src={psychologistDetails.profileImage} alt={psychologistDetails.firstName} mb={4} />
                           <HStack justifyContent={'center'}>
                             <ChangePasswordModal mr={'5px'}/>
                           </HStack>
                           <Text color={"blackAlpha.800"} fontSize={"2xl"} fontFamily={"body"}>
                             {psychologistDetails.firstName} {psychologistDetails.lastName}{" "}
                           </Text>
                           <HStack align={"center"} justify={"center"} direction={"row"} mt={6}>
                             <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                               {psychologistDetails.email}
                             </Badge>
                             <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                               {psychologistDetails.birthDate}
                             </Badge>
                             <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                               {psychologistDetails.country}
                             </Badge>
                      </HStack>
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
                     </VStack>
                   )
               }
             </>
             )
           : (<NotFound />)
           }
           <Footer />
     </>
   );
 }