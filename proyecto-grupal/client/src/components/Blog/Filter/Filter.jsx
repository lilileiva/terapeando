import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import { getPostOrder } from "../../../redux/actions";
import { Select } from '@chakra-ui/react'
export default function Filters(){
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    function handleSubmitOrder(e){
        console.log(e.target.value)
        dispatch(getPostOrder(e.target.value, posts))
    }
    return(
        <Select placeholder='Ordenar por' onChange={handleSubmitOrder} cursor={"pointer"}>
          <option key={0}>Titulo de A-Z</option>
          <option key={1}>Titulo de Z-A</option>
        </Select>
    )
}
