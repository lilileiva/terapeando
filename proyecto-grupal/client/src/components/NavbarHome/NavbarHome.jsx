import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon, CalendarIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarHome.css";
import img from "../../assets/logo-01.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserClient, getUserPsychologistOne } from "../../redux/actions";
import { useEffect } from "react";

function removeAcc(str) {
  const acentos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
  };
  return str
    .trim()
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString()
    .toLowerCase();
}

const Links = ["Próximas Consultas", "Mi psicólogo", "Blog"];


const NavLink = ({ children }) => (

  <Link exact to={removeAcc(children)}>
    <Text
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Text>
  </Link>
);

export default function NavbarHome() {
  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  const dispatch = useDispatch()

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    window.localStorage.clear();
  }

  useEffect(() => {
    if (tokenClient) dispatch(getUserClient())
    if (tokenPsychologist) dispatch(getUserPsychologistOne())
  }, [dispatch, tokenClient, tokenPsychologist]);

  const clientDetails = useSelector((state) => state.userClientDetail);
  const userPsichologistDetail = useSelector((state) => state.psychologistProfile)

  return (
    <>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        px={4}
        position="relative"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image src={img} w={"50px"} />
            </Box>
            <Stack direction='row'>

              <Link className={'links'} to={'/home'}>
                <Text fontWeight={'500'} color='gray.600' mr='0.7em' ml='0.7em'>
                  Home
                </Text>
              </Link>
              <Link className={'links'} to={'/blog'}>
                <Text fontWeight={'500'} color='gray.600' mr='0.7em' ml='0.7em'>
                  Blog
                </Text>
              </Link>
            </Stack>
          </HStack>
          <Flex alignItems={"center"}>
            {
              tokenClient
                ? (
                  <Link to='/appointments'>
                    <Button
                      variant={"solid"}
                      colorScheme={"teal"}
                      size={"sm"}
                      mr={4}
                      leftIcon={<CalendarIcon />}
                    >
                      Mis citas
                    </Button>
                  </Link>
                )
                : tokenPsychologist ? (
                  <>
                    <Link to='/appointments'>
                      <Button
                        variant={"solid"}
                        colorScheme={"teal"}
                        size={"sm"}
                        mr={4}
                        leftIcon={<CalendarIcon />}
                      >
                        Mis citas
                      </Button>
                    </Link>
                    <Link to='/editschedule'>
                      <Button
                        variant={"solid"}
                        colorScheme={"teal"}
                        size={"sm"}
                        mr={4}
                        leftIcon={<AddIcon />}
                      >
                        Administrar agenda
                      </Button>
                    </Link>
                  </>
                ) : null
            }
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                {tokenClient ?
                  (
                    <Avatar
                      size={"sm"}
                      src={clientDetails?.profileImage}
                    />)
                  :
                  (
                    <Avatar
                      size={"sm"}
                      src={userPsichologistDetail?.profileImage} />
                  )
                }
              </MenuButton>
              <MenuList>
                {tokenClient ?
                  <>
                    <Link to={`/home/${clientDetails?.firstName}`}>
                      <MenuItem>Mi Perfil</MenuItem>
                    </Link>
                    <Link to={`/editprofile/${clientDetails?.firstName}`}>
                      <MenuItem>Editar Perfil</MenuItem>
                    </Link>
                  </> :
                  <>
                    <Link to={`/home/${userPsichologistDetail.firstName}`}>
                      <MenuItem>Mi Perfil</MenuItem>
                    </Link>
                    <Link to={`/editprofile/${userPsichologistDetail.firstName}`}>
                      <MenuItem>Editar Perfil</MenuItem>
                    </Link>
                  </>
                }

                <Link to={"/preguntasfrecuentes"}>
                  <MenuItem>Ayuda</MenuItem>
                </Link>
                <Link to={"/mypayments"}>
                  <MenuItem>Mis Pagos</MenuItem>
                </Link>
                <MenuDivider />
                <Link to='/'>
                  <MenuItem onClick={handleSignOut}>
                    Cerrar sesión
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}