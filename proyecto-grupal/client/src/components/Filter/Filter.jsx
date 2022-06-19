import React, { useEffect } from "react";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostOrder,
  getCategories,
  getByCategory,
  filterByAuthor,
  getPostsAuthors,
  getAllPsychologist,
} from "../../redux/actions";
import { Select } from "@chakra-ui/react";

export default function Filters() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const categories = useSelector((state) => state.categories);
  const author = useSelector((state) => state.allUsersPsichologists);
  //console.log('AUTHOR: ', author)
  //author tiene un array de objetos con first y last Name [{},{}]
  let authorNoRepeat = []
  author.map((au) => (
    (!authorNoRepeat.includes(`${au.firstName} ${au.lastName}`))
      ? authorNoRepeat.push(`${au.firstName} ${au.lastName}`) : null
  ))
  //   console.log('nom', posts.map(el => (`${el.idUserPsychologist.firstName} ${el.idUserPsychologist.lastName}`)))
  // posts.filter((a) => {
  //   if (`${a.idUserPsychologist.firstName} ${a.idUserPsychologist.lastName}` === 'Juan Carlos Prieto') {
  //     return a
  //   }
  // });

  console.log("authorNoRepeat: ", authorNoRepeat)

  // useEffect(() => {
  //   dispatch(getCategories());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllPsychologist());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterByAuthor());
  }, []);

  function handleSubmitOrder(e) {
    // console.log(e.target.value);
    dispatch(getPostOrder(e.target.value, posts));
  }
  function handleSubmitCategory(e) {
    dispatch(getByCategory(e.target.value));
  }
  function handleSubmitAuthor(e) {
    e.preventDefault();
    dispatch(filterByAuthor(e.target.value));
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

      {/* <Select
        w="49%"
        placeholder="Filtrar notas por autor"
        onChange={(e) => handleSubmitAuthor(e)}
      >
        <option value="All">Todos los autores</option>

        {/* {
            author.length ? 
            author.map((au)=>{
              return (
                <option key={au.email} value={au.firstName? au.firstName + " " + au.lastName : null}>{au.firstName? au.firstName + " " + au.lastName : null}</option>
              )
            }) : null
          } */}

      <Select
        w="49%"
        placeholder="Filtrar notas por autor"
        onChange={(e) => handleSubmitAuthor(e)}
      >
        <option value="All">Todos los autores</option>
        {authorNoRepeat.length &&
          authorNoRepeat.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
      </Select>
    </div>
  );
}
