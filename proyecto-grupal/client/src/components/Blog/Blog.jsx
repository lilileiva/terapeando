import React from "react";
import Post from "../Post/Posts.jsx";
import NavbarHome from "../NavbarHome/NavbarHome.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "../Filter/Filter.jsx";
import { Button, Stack, Text } from "@chakra-ui/react";
import { getAllPosts, clearStatePostDetail, searchPostsByTitle, clearAdminSearchbar } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@chakra-ui/react";
import "./blog.css";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Loader/Loader.jsx";
import Chat from '../Chat/Chat'


export default function Blog() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [noResults, setNoResults] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getAllPosts());
  }

  useEffect(() => {
    dispatch(getAllPosts());
    return () => {
      dispatch(clearStatePostDetail())
      dispatch(clearAdminSearchbar())
    }
  }, [dispatch, getAllPosts, clearStatePostDetail, clearAdminSearchbar]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [setLoader]);

  const posts = useSelector((state) => state.posts)
  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')


  const adminSearchbar = useSelector((state) => state.adminSearchbar)
  useEffect(() => {
    if (adminSearchbar.length !== 0) {
      dispatch(clearStatePostDetail())
      dispatch(searchPostsByTitle(adminSearchbar))
    }
  }, [dispatch, adminSearchbar])

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
              color="green.300"
            >
              Notas sobre psicología
            </Text>

            <Stack direction='row' width='50%' justify='right'>
              <SearchBar width='50%' />
              <Button variant='outline' width='40%' colorScheme='teal' onClick={(e) => handleSubmit(e)}>
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
              {/* </div> */}
            </Stack>
          </div>
          <Filters />
          {
            loader
              ? <Loader />
              : posts && posts.length > 0
                ? <Post allPosts={posts} />
                : <Stack height={'100%'} justify={"flex-start"} mt='7em' >
                  <Text fontSize={'xl'}>No hay resultados</Text>
                </Stack>
          }
        </div>
        <Chat />
      </Stack>
      <Footer />
    </Stack>
  );
}
