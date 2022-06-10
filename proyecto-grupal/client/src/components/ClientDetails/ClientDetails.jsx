import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clientDetails, fetchUserClient } from "../../redux/actions";
import Loader from "../Loader/Loader";



export default function ClientDetails() {

  const dispatch = useDispatch();
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(fetchUserClient(id));
  /*   return () => {
      dispatch(clientDetails())
    } */
  }, [dispatch, id])

  const clientDetails = useSelector((state) => state.userClientDetail)
  console.log(clientDetails)

  let arr = Object.values(clientDetails)

  return (

    arr.length <=1 ? <Loader /> : 
    <Center py={6} h={"100%"}>
      <Box
        w={"80%"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={clientDetails.profileImage}
          alt={clientDetails.firstName}
          mb={4}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
        {clientDetails.firstName} {clientDetails.lastName}
        </Heading>

        <Text fontWeight={600} color={"gray.500"} mb={4}>
          Información Personal
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={'gray.50'}
            fontWeight={"600"}
          >
            {clientDetails.email}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={"gray.50"}
            fontWeight={"600"}
          >
            birthDate
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={'gray.50'}
            fontWeight={"600"}
          >
            {clientDetails.country}
          </Badge>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            maxW={"40%"}
            fontSize={"sm"}
            rounded={"full"}
            bg={"green.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "green.300",
            }}
            _focus={{
              bg: "teal.600",
            }}
          >
            Edit Profile
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
