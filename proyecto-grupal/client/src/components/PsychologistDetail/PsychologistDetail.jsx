import { Box, Divider, Flex, Img, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

export default function PsychologistDetail() {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  return (
    <div>
         <Flex
        maxW="1000px"
        w={["90vw", "90vw", "90vw", "70vw"]}
        direction={["column", "column", "row", "row"]}
        justify="center"
        bg={bgColor[colorMode]}
        boxShadow="md"
        rounded="lg"
        p="4"
      >
        <Flex align="center" mx="2">
          <Img
            height="78px"
            width="62px"
            src="https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Box mx="4">
            <Text as="h2" fontSize="x1" fontWeight="bold" mb="2">
              Specialties:
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              Family, Cuople
            </Text>
          </Box>
        </Flex>
        <Divider orientation="vertical" borderColor="gray.300" my="2" />
        <Flex align="center" mx="2">
          <Img
            height="150px"
            width="150px"
            src="https://images.pexels.com/photos/4101164/pexels-photo-4101164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Flex>
        <Divider orientation="vertical" borderColor="gray.300" my="2" />
        <Flex align="center" mx="2">
          <Img
            height="78px"
            width="62px"
            src="https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Box mx="4">
            <Text as="h2" fontSize="x1" fontWeight="bold" mb="2">
              Rating{" "}
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              aqui van estrellas 🎇
            </Text>
          </Box>
        </Flex>
        <Divider orientation="vertical" borderColor="gray.300" my="5" />
      </Flex>
      <Flex
        maxW="1000px"
        w={["90vw", "90vw", "90vw", "70vw"]}
        direction={["column", "column", "column", "column"]}
        justify="center"
        bg={bgColor[colorMode]}
        boxShadow="md"
        rounded="lg"
        p="4"
      >
        <Flex align="center" mx="2">
          <Img
            height="78px"
            width="62px"
            src="https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Box mx="4">
            <Text as="h2" fontSize="x1" fontWeight="bold" mb="2">
              Name
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              Perenganito Perez
            </Text>
          </Box>
        </Flex>
        <Divider orientation="vertical" borderColor="gray.300" my="2" />
        <Flex align="center" mx="2">
          <Img
            height="78px"
            width="62px"
            src="https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Box mx="4">
            <Text as="h2" fontSize="x1" fontWeight="bold" mb="2">
              email
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              Perenganito@gmail.com
            </Text>
          </Box>
        </Flex>
        <Divider orientation="vertical" borderColor="gray.300" my="2" />
        <Flex align="center" mx="2">
          <Img
            height="78px"
            width="62px"
            src="https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Box mx="4">
            <Text as="h2" fontSize="x1" fontWeight="bold" mb="2">
              Country
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              UpsideDown
            </Text>
          </Box>
        </Flex>
        <Divider orientation="vertical" borderColor="gray.300" my="2" />
        <Flex align="center" mx="2">
          <Img
            height="78px"
            width="62px"
            src="https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Box mx="4">
            <Text as="h2" fontSize="x1" fontWeight="bold" mb="2">
              License
            </Text>
            <Text as="h3" fontSize="lg" fontWeight="light">
              as654das6d54a6sd54a6sd54
            </Text>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
