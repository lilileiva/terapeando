import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostDetail,
  clearStatePostDetail,
} from "../../../redux/actions/index.js";
import Navbar from "../../NavBar/NavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./postdetail.css";
// -----------------------------------
import { Box, Badge } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function PostsDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector((state) => state.postDetail);
  

  useEffect(() => {
    dispatch(getPostDetail(id));
    return () => {
      dispatch(clearStatePostDetail());
    }
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div>
        {post ? (
          <div className={"container"}>
            <div>
              <img src={post.Image} alt="img" className="img" />
            </div>
            {post.Tags?.map((tag) => {
              return (
                <Box className={"tags"}>
                  <Badge variant="subtle" colorScheme="cyan" className="Badge">
                    {tag}
                  </Badge>
                </Box>
              );
            })}
            <h1 className={"title"}>{post.Title}</h1>
            <p className={"content"}>{post.Content}</p>
            <p>Fecha: {post.Date}</p>
            <p>Escrito por: {post.idUserPsychologist.firstName ? post.idUserPsychologist.firstName : 'Algo falla'} </p>
            {/* <p>{post.idUserPsychologist.country}</p> */}
          </div>
        ) : (
          "Loading"
        )}
      </div>
      <Footer />
    </div>
  );
}
