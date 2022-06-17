import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByAuthor } from "../../redux/actions";
import { Select } from "@chakra-ui/react";

export default function FilterByAuthor () {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)

    useEffect(()=> {
        dispatch(filterByAuthor())
    }, [dispatch])

    return (
        <div>
            
        </div>
    )
}