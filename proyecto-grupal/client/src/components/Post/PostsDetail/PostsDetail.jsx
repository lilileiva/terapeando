import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPostDetail } from "../../../redux/actions/index.js";
import Navbar from "../../NavBar/NavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./postdetail.css";
// -----------------------------------
import {
  Box,
  Badge,
} from "@chakra-ui/react";
import { ReactElement } from "react";

export default function PostsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDetail);
    const allPosts = useSelector((state) => state.posts);
    console.log("Allpost: ", allPosts);

  useEffect(() => {
    dispatch(getPostDetail(id));
    dispatch(getAllPosts());
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div >
        {post ? (
          <div className={"container"}>
            
              <div>
                <img src={post.Image} alt="img" className="img"/>
              </div>
              {
                post.Tags?.map((tag) => {
                  return (
                  <Box className={'tags'}>
                    <Badge variant="subtle" colorScheme="cyan" className="Badge">
                      {tag}
                    </Badge>
                  </Box>
                  )
                })
              }
                <h1 className={"title"}>{post.Title}</h1>
                <p className={"content"}>{post.Content}</p>
          </div>
        ) : (
          "Loading"
        )}
      </div>
      <Footer />
    </div>
  );
}
