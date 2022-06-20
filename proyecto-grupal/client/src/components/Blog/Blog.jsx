import React from "react";
import Post from "../Post/Posts.jsx";
import NavbarHome from "../NavbarHome/NavbarHome.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "../Filter/Filter.jsx";
import { Button, Stack, Text } from "@chakra-ui/react";
import { getAllPosts } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@chakra-ui/react";
import "./blog.css";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Loader/Loader.jsx";

export default function Blog() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getAllPosts());
  }

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [dispatch]);

  const posts = useSelector((state) => state.posts)
  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  return (
    <Stack minHeight='100%' maxHeight='fit-content' justify='space-between'>
      <Stack>
        {
          tokenClient || tokenPsychologist ? <NavbarHome /> : <NavBar />
        }
        <div className="blogContainer">
          <div className="row">
            <Text
              fontWeight="semibold"
              fontSize="3xl"
              marginBottom="0.5em"
              color="green.300"
            >
              Notas sobre psicología
            </Text>
            <div className="syb">
              <SearchBar />
              <Button className="btn" onClick={(e) => handleSubmit(e)}>
                Todas las notas
              </Button>
              {
                tokenPsychologist
                  ? (
                    <Link href="/createPost">
                      <Button className="btn">Crear Nota</Button>
                    </Link>
                  ) : null
              }
            </div>
          </div>
          <Filters />

          {posts && posts.length > 0 ? loader ? <Loader></Loader> : <Post /> : <Stack height={'100%'} justify={"flex-start"} mt='7em' ><Text fontSize={'xl'}>No hay resultados</Text></Stack>}
        </div>
      </Stack>
      <Footer />
    </Stack>
  );
}
