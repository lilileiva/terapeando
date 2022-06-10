import React from "react";
import Post from "../Post/Posts.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filters from "./Filter/Filter.jsx";
import "./blog.css";

export default function Blog() {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <h1 className="title">Notas sobre psicología</h1>
      <Filters />
      <Post />
    </div>
  );
}
