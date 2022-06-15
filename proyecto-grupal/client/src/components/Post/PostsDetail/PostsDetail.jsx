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
  const { id } = useParams();
  // console.log('id: ', id)
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDetail);
  console.log("post: ", post);

  useEffect(() => {
    dispatch(getPostDetail(id));
    dispatch(clearStatePostDetail());
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

            {post.idUserPsychologist ? (
              <div className="psyinfo">
                <image src={post.idUserPsychologist.profileImage} alt='img not found'/>
                <p className='psytext'>
                  Por <p className='name'>{post.idUserPsychologist.firstName}{" "}
                  {post.idUserPsychologist.lastName}</p>
                </p>
                <p className='psytext'>Fecha: {post.Date}</p>
                <p className='psytext'>{post.idUserPsychologist.country}</p>
              </div>
            ) : null}

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
            <div className={"content"}>{post.Content}</div>

          </div>
        ) : (
          "Loading"
        )}
      </div>
      <Footer />
    </div>
  );
}
