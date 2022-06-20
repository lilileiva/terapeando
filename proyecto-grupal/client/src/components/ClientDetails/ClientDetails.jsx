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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserClient, getUserPsychologistOne } from "../../redux/actions";
import ChangePasswordModal from "../Modals/ChangePasswordModal";
import Loader from "../Loader/Loader";
import NotFound from '../404notFound/notFound.jsx';


export default function ClientDetails() {

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  const dispatch = useDispatch();

  useEffect(() => {
    if(tokenClient) dispatch(getUserClient())
    if(tokenPsychologist) dispatch(getUserPsychologistOne())
  }, [dispatch, tokenClient, tokenPsychologist]);

    const clientDetails = useSelector((state) => state.userClientDetail);
    const psychologistDetails = useSelector((state) => state.psychologistProfile)

  
  

  let arr = Object.values(clientDetails);
  let arr1 = Object.values(psychologistDetails)

  return (
    <>
      {
        tokenClient
          ? (
            <>
              {
                arr.length <= 1
                  ? (
                    <Loader />
                  ) : (
                    <Center>
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
                          <Heading color={"blackAlpha.800"} fontSize={"2xl"} fontFamily={"body"}>
                            {clientDetails.firstName} {clientDetails.lastName}{" "}
                            <ChangePasswordModal />
                          </Heading>

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

                          <Stack mt={"40px"} alignItems="center">
                            <CalendarIcon />
                            <Heading color={"blackAlpha.800"}>Citas</Heading>
                            <VStack alignItems="left" spacing="24px">
                              <Text color={"blackAlpha.800"}>
                                Terapeuta: Ana Gomez <ExternalLinkIcon cursor={"pointer"} />
                              </Text>
                              <Badge
                                px={2}
                                py={1}
                                color={"blackAlpha.800"}
                                fontWeight={"600"}
                                fontSize="1em"
                              >
                                <Text color={"blackAlpha.800"} mb={"10px"}> Martes 14, | 15:00 - 15:45 </Text>
                                <DeleteIcon mr={"10px"} cursor={"pointer"} />
                                <EditIcon cursor={"pointer"} />
                              </Badge>
                              <Badge
                                px={2}
                                py={1}
                                color={"blackAlpha.800"}
                                fontWeight={"600"}
                                fontSize="1em"
                                w={"100%"}
                              >
                                🛎️ 10 minutos antes
                              </Badge>
                            </VStack>
                          </Stack>
                        </Box>
                      </Container>
                    </Center>
                  )
              }
            </>

          ) : tokenPsychologist ? ( 
              <>
                        {
                arr1.length <= 1
                  ? (
                    <Loader />
                  ) : (
                    <Center>
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
                              <Link to={`/editprofile/${psychologistDetails.firstName}`}>Edit Profile</Link>
                            </Button>
                          </Stack>
                          <Avatar
                            size={"2xl"}
                            src={psychologistDetails.profileImage}
                            alt={psychologistDetails.firstName}
                            mb={4}
                          />
                          <Heading color={"blackAlpha.800"} fontSize={"2xl"} fontFamily={"body"}>
                            {psychologistDetails.firstName} {psychologistDetails.lastName}{" "}
                            <ChangePasswordModal />
                          </Heading>

                          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
                            <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                              {psychologistDetails.email}
                            </Badge>
                            <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                              {psychologistDetails.birthDate}
                            </Badge>
                            <Badge px={2} py={1} color={"blackAlpha.800"} fontWeight={"600"}>
                              {psychologistDetails.country}
                            </Badge>
                          </Stack>

                          <Stack mt={"40px"} alignItems="center">
                            <CalendarIcon />
                            <Heading color={"blackAlpha.800"}>Citas</Heading>
                          </Stack>
                        </Box>
                      </Container>
                    </Center>
                  )
              }
            </>
            )
          : (<NotFound />)
          }
    </>
  );
}
