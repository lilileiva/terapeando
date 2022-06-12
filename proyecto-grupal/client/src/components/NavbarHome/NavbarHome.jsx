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
   Image
 } from "@chakra-ui/react";
 import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
 import { Link } from "react-router-dom";
 import './NavbarHome.css';
 import img from '../../assets/logo-01.png'
 
 function removeAcc(str){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return str.trim().split('').map( letra => acentos[letra] || letra).join('').toString().toLowerCase();	
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
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
     <>
     
       <Box bg={useColorModeValue("gray.50", "gray.900")} px={4} position='relative'>
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
              <Image src={img} w={'50px'} />
            </Box>
             
             <div className={'contenedorlinks'}>
              <Link className={'links'} to={'/proximasconsultas'}> Proximas consultas</Link>
              <Link className={'links'} to={'/mipsicologo'}> Mi psicólogo</Link>
              <Link className={'links'} to={'/blog'}> Blog</Link>
             </div>

             {/* <HStack
               as={"nav"} 
               spacing={4}
               display={{ base: "none", md: "flex" }}
             >
               {Links.map((link) => (
                 <NavLink key={link} className={({isActive}) => isActive ? "active" : ""}>{link}</NavLink>
               ))}
             </HStack> */}

           </HStack>
           <Flex alignItems={"center"}>
             <Button
               variant={"solid"}
               colorScheme={"teal"}
               size={"sm"}
               mr={4}
               leftIcon={<AddIcon />}
             >
               Agendar Sesión
             </Button>
             <Menu>
               <MenuButton
                 as={Button}
                 rounded={"full"}
                 variant={"link"}
                 cursor={"pointer"}
                 minW={0}
               >
                 <Avatar
                   size={"sm"}
                   src={
                     "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                   }
                 />
               </MenuButton>
               <MenuList>
                 <Link to={'/home/:idUserClient'}>
                   <MenuItem>Mi Perfil</MenuItem>
                 </Link>
                 <Link to={'/editprofile/:idUserClient'}>
                 <MenuItem>Editar Perfil</MenuItem>
                 </Link>
                 <Link to={'/preguntasfrecuentes'}>
                 <MenuItem>Ayuda</MenuItem>
                 </Link>
                 <MenuDivider />
                 <MenuItem>Mis Pagos</MenuItem>
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
