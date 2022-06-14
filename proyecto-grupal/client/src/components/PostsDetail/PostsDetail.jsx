import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPostDetail } from "../../redux/actions/index.js";
import Navbar from "../NavBar/NavBar.jsx"
import Footer from "../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./postdetail.css"
// -----------------------------------
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  Box,
  Badge,
} from "@chakra-ui/react";
import { ReactElement } from "react";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function PostsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDetail);

  useEffect(() => {
    dispatch(getPostDetail(id));
  }, [dispatch, id]);

  return (
    <div >
      <Navbar />
    <Container maxW={"5xl"} py={12}>
      <div>
        {post ? (
          <div>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Stack spacing={4}>
                <Heading>{post.Title}</Heading>
                <Text color={"gray.500"} fontSize={"lg"}>
                  {post.Content}
                </Text>
                <Stack
                  spacing={4}
                  divider={
                    <StackDivider borderColor={("gray.100", "gray.700")} />
                  }
                >
                  <Box>
                    <Badge variant="subtle" className="Badge">
                      {post.Tags}                      
                    </Badge>
                    {post.idUserPsychologist ? <p>{post.idUserPsychologist.firstName}</p> : <p>nada</p>}
                    {post.idUserPsychologist ? <p>{post.idUserPsychologist.lastName}</p> : <p>nada</p>}
                  </Box>
                </Stack>
              </Stack>


              <Flex>
                <Image
                  rounded={"md"}
                  alt={"feature image"}
                  src={post.Image}
                  objectFit={"cover"}
                />
              </Flex>
            </SimpleGrid>

            {/* <h2>{post.Title}</h2> */}
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </Container>
        <Footer />
    </div>
  );
}
