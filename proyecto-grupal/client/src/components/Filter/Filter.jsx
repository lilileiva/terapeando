import React, { useEffect } from "react";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostOrder,
  getCategories,
  getByCategory,
} from "../../redux/actions";
import { Select } from "@chakra-ui/react";

export default function Filters( {setPage} ) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleSubmitOrder(e) {
    e.preventDefault()
    dispatch(getPostOrder(e.target.value, posts));
    //setPage(1)
  }
  function handleSubmitCategory(e) {
    dispatch(getByCategory(e.target.value));
    //setPage(1)
  }

  return (
    <div className="filterContainer">
      <Select
        w="49%"
        placeholder="Ordenar por"
        onChange={handleSubmitOrder}
        cursor={"pointer"}
      >
        <option key={0}>Titulo de A-Z</option>
        <option key={1}>Titulo de Z-A</option>
      </Select>
      <Select
        w="49%"
        placeholder="Filtrar notas por categoria"
        onChange={(e) => handleSubmitCategory(e)}
      >
        {categories &&
          categories.map((category) => {
            return (
              <option key={category.name} value={category.name}>
                {" "}
                {category.name}
              </option>
            );
          })}
      </Select>
    </div>
  );
}
