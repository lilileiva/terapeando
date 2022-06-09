import React from "react";
import "./searchbar.css";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <Input />
      <ButtonGroup variant="outline">
        <Button 
        widht={40}>
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
