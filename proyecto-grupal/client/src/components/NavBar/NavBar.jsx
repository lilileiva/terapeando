import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import img from "../../assets/logo-01.png";
import "./navbar.css";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position="relative">
      <Flex
        // bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        // borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to='/'>
          <Image src={img} alt="portal psico" w={"50px"} />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/signin"}
          >
            Sign In
          </Button>

          <Link to="/signup">
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#63caa7"}
              href={"/signup"}
              _hover={{
                bg: "#6bdfb7",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  // const linkColor = useColorModeValue('gray.600', 'gray.200');
  // const linkHoverColor = useColorModeValue('gray.800', 'white');
  // const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <div className={"contenedorlinks"}>
      <Link className={"links"} to={"/home"}>
        <Text fontWeight={"500"} color="gray.600">
          Psicólogos
        </Text>
      </Link>
      <Link className={"links"} to={"/blog"}>
        <Button bg="white" height="1.5em" _hover={{ bg: "#cbd5e0bb" }}>
          Blog
        </Button>
      </Link>
      {/* <Link className={'links'} to={"/psicologos"}>Preguntas Frecuentes</Link>
      <Link className={'links'} to={"/psicologos"}>Psicologos</Link>
      <Link className={'links'} to={"/blog"}>Blog</Link> */}
    </div>
    // <Stack direction={'row'} spacing={4}>
    //   {NAV_ITEMS.map((navItem) => (
    //     <Box key={navItem.label}>
    //       <Popover trigger={'hover'} placement={'bottom-start'}>
    //         <PopoverTrigger>
    //           <Link exact to={`${navItem.href}`}>
    //             <Text
    //              className={({isActive}) => isActive ? "active" : ""}
    //               p={2}
    //               fontSize={'sm'}
    //               fontWeight={500}
    //               cursor={'pointer'}
    //               color={linkColor}
    //               _hover={{
    //                 textDecoration: 'none',
    //                 color: linkHoverColor,
    //               }}>
    //               {navItem.label}
    //             </Text>
    //             </Link>
    //         </PopoverTrigger>

    //         {navItem.children && (
    //           <PopoverContent
    //             border={0}
    //             boxShadow={'xl'}
    //             bg={popoverContentBgColor}
    //             p={4}
    //             rounded={'xl'}
    //             minW={'sm'}>
    //             <Stack>
    //               {navItem.children.map((child) => (
    //                 <DesktopSubNav key={child.label} {...child} />
    //               ))}
    //             </Stack>
    //           </PopoverContent>
    //         )}
    //       </Popover>
    //     </Box>
    //   ))}
    // </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Stack
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Link to={`${href}`}>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "green.300" }}
              fontWeight={500}
            >
              {label}
            </Text>
          </Link>

          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"green.300"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Text key={child.label} py={2} href={child.href}>
                {child.label}
              </Text>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Psicologos",
    href: "psicologos",
  },
  {
    label: "Blog",
    href: "blog",
  },
];
