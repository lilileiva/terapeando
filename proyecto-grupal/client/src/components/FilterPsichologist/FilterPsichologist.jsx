import React, { useEffect } from "react";
import './FilterPsichologist.css'
import { useDispatch, useSelector } from "react-redux";
import { getBySpecialties, orderByRating } from "../../redux/actions";
import { Select } from "@chakra-ui/react";
import { specialitiesList } from './specialities';




export default function FiltersPsichologist() {
  const dispatch = useDispatch();
  const psichologist = useSelector((state) => state.allUsersPsichologists);

 








  function handleSubmitOrder(e) {
    // console.log(e.target.value);
    dispatch(orderByRating());
  }
  function handleSubmitCategory(e) {
    dispatch(getBySpecialties(e.target.value, psichologist));
  }

  return (
    <div className="filterContainer">
      <Select
        w='49%'
        placeholder="Ordenar por"
        onChange={handleSubmitOrder}
        cursor={"pointer"}
      >
        <option key={0}>Titulo de A-Z</option>
        <option key={1}>Titulo de Z-A</option>
      </Select>
      <Select
        w='49%'
        placeholder="Filtrar notas por categoria"
        onChange={(e) => handleSubmitCategory(e)}
      >
        {
          specialitiesList && specialitiesList.map(s => {
            return (
              <option key={s} value={s}> {s}</option>
            )
          })
        }
      </Select>
    </div>
  );
}
