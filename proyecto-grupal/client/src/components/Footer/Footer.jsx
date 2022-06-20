import React from "react";
import img from "../../assets/logo-01.png";
// import { Link } from "react-router-dom";
import {
  Box,
  chakra,
  Container,
  Link,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "grey.100")}
      bottom="0"
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      position="relative"
      left={0}
      bottom={0}
      width="100%"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      zIndex="3"
    >
      <Container
        as={Stack}
        maxW={"100%"}
        pb={1}
        pt={1}
        pl={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image src={img} w={"50px"} />
        <Text>© 2022 Terapeando. All rights reserved</Text>

        <Stack direction={"row"} spacing={6}>
          <Link href="https://twitter.com/mundopsicologos" isExternal>
            <SocialButton label={"Twitter"}>
              <FaTwitter />
            </SocialButton>
          </Link>

          <Link
            href="https://www.youtube.com/channel/UCu3jiy_GRyMbseyNXovh2ZQ"
            isExternal
          >
            <SocialButton label={"YouTube"}>
              <FaYoutube />
            </SocialButton>
          </Link>

          <Link href="https://www.instagram.com/mundopsicologos/" isExternal>
            <SocialButton label={"Instagram"}>
              <FaInstagram />
            </SocialButton>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
