import React from "react";
import "./searchbar.css";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPostsByTitle } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  function handleInputChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if (name.length === 0) alert("Type name of psychologist");
    // if (isNaN(name) !== true) alert("Psychologist name cannot be a number");
    dispatch(searchPostsByTitle(title));
    setTitle("");
  }

  return (
    <div className="searchbar">
      <Input onChange={(e) => handleInputChange(e)} value={title} placeholder='Buscar notas' />
      <ButtonGroup variant="outline">
        <Button widht={40} onClick={(e) => handleSubmit(e)}>
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
