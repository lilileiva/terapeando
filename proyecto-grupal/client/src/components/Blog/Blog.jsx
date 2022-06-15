import React from "react";
import Post from "../Post/Posts.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "../Filter/Filter.jsx";
import { Button, Text } from "@chakra-ui/react";
import { getAllPosts } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";
import { Link } from "@chakra-ui/react";
import "./blog.css";

export default function Blog() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getAllPosts());
  }

  return (
    <div>
      <NavBar />
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
              Recargar notas
            </Button>
            <Link href="/createPost">
              <Button className="btn">Crear Nota</Button>
            </Link>
          </div>
        </div>
        <Filters />

        <Post />
      </div>
      <Footer />
    </div>
  );
}
