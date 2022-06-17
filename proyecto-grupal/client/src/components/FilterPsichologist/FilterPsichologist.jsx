import React, { useEffect, useState } from "react";
import './FilterPsichologist.css'
import { useDispatch, useSelector } from "react-redux";
import { getBySpecialties, orderByRating } from "../../redux/actions";
import { Select } from "@chakra-ui/react";
import { specialitiesList } from './specialities';


export default function FiltersPsichologist() {
  const dispatch = useDispatch();


  const psichologists = useSelector((state) => state.allUsersPsichologists);


  function handleSubmitOrder(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value, psichologists));
    console.log(e.target.value);
  }

  function handleSubmitCategory(e) {
    dispatch(getBySpecialties(e.target.value));
  }

  return (
    <div className="filterContainer">
      <Select
        w='49%'
        placeholder="Ordenar por calificación"
        onChange={handleSubmitOrder}
        cursor={"pointer"}
      >
        <option key={0} value="Ascendente" >Ascendente</option>
        <option key={1} value="Desendente" >Desendente</option>

      </Select>
      <Select
        w='49%'
        placeholder="Filtrar por especialidad"
        onChange={(e) => handleSubmitCategory(e)}
      >
        {
          specialitiesList && specialitiesList.map(s => {
            return (
              <option key={s} value={s}>{s}</option>
            )
          })
        }
      </Select>
    </div>
  );
}
