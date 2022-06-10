import React from "react";
import Post from "../Post/Posts.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "./Filter/Filter.jsx";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { getAllPosts } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";

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
      <SearchBar />
      <h1 className="title">Notas sobre psicología</h1>
      <ButtonGroup variant="outline" className='btn'>
        <Button onClick={(e) => handleSubmit(e)}>
          Recargar notas
        </Button>
      </ButtonGroup>
      <Filters />
      <Post />
    </div>
  );
}
