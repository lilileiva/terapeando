import React from "react";
import "./searchbar.css";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPostsByTitle, clearStatePostDetail } from "../../redux/actions";

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
    dispatch(clearStatePostDetail());
    dispatch(searchPostsByTitle(title));
    setTitle("");
  }

  return (
    // <div className="searchbar">
      
      <form className='formSearchbar' onSubmit={(e) => handleSubmit(e)}>
        <Input focusBorderColor='teal.400' onChange={(e) => handleInputChange(e)} value={title} placeholder='Buscar notas...' />
        {/* <ButtonGroup direction='row' variant="outline"> */}
          <Button variant='outline' colorScheme='teal' type='submit'  ml='0.5em'>
            <BsSearch />
          </Button>
        {/* </ButtonGroup> */}
      </form>

    // </div>
  );
}
