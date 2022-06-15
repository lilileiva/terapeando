import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllPosts } from "../../redux/actions";
import { Tag, TagLabel, Text, Stack, Link } from "@chakra-ui/react";
import "./post.css";
import Paged from "../Paged/Paged";
import smoothscroll from "../../animations";
import { SimpleGrid, Box } from "@chakra-ui/react";

export default function Post() {
  //me traigo todos los posts apenas se me monte el componente
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const allPosts = useSelector((state) => state.posts);
  /* Paginado */
  const [page, setPage] = useState(1);
  const [postPage] = useState(6);
  const quantityPostPage = page * postPage;
  const firstPage = quantityPostPage - postPage;
  const showPostPage = allPosts.slice(firstPage, quantityPostPage);

  const paged = function (pageNumber) {
    setPage(pageNumber);
    smoothscroll();
  };

  //empiezo a renderizar cada una de mis notas
  return (
    <>
      <div className="postContainer">
        <SimpleGrid columns={3} spacing={10}>
          
            {showPostPage &&
              showPostPage.map((post) => {
                return (
                  <Box>
                  <Link href={`/postdetail/${post._id}`} className='postdetaillink'>
                    <div className="card" key={post._id}>
                      <div className="imgen">
                        <img src={post.Image} alt="img" />
                      </div>
                      <div className="card-body">
                        <Text fontSize="3xl" marginTop="0em" className="pTitle">
                          {post.Title}
                        </Text>
                        {/* <p>{post.Content.slice(0,400)}...</p> */}
                        <Text fontSize="20px" className='cardInfo'>
                          Nota de {post.idUserPsychologist.firstName}
                          {" ​​​​"}
                          {post.idUserPsychologist.lastName}
                        </Text>
                        <Text fontSize="15px" className='cardInfo'>
                          Correo {post.idUserPsychologist.email} | Origen{" "}
                          {"​​🌎 ​"}
                          {post.idUserPsychologist.country}
                        </Text>
                        <h5>Fecha {post.Date}</h5>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          marginTop="2em"
                          marginBottom="1.5em"
                        >
                          {post.Tags?.map((tag) => {
                            return (
                              <Tag
                                size="lg"
                                colorScheme="cyan"
                                borderRadius="full"
                              >
                                <TagLabel>{tag}</TagLabel>
                              </Tag>
                            );
                          })}
                        </Stack>
                      </div>
                    </div>
                  </Link>
                  </Box>
                );
              })}
          
        </SimpleGrid>
      </div>
      <div>
        <Paged
          postPage={postPage}
          allPosts={allPosts.length}
          paged={paged}
          page={page}
          setPage={setPage}
          className='pagedPost'
        />
      </div>
    </>
  );
}
