import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {
  getPostDetail,
  clearStatePostDetail,
} from "../../../redux/actions/index.js";
import NavBar from "../../NavBar/NavBar.jsx";
import NavbarHome from "../../NavbarHome/NavbarHome.jsx";
import Footer from "../../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./postdetail.css";
// -----------------------------------
import { Box, Badge, Avatar, Stack, Text } from "@chakra-ui/react";
import { ArrowLeftIcon } from '@chakra-ui/icons';
import Loader from "../../Loader/Loader.jsx";

export default function PostsDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const post = useSelector((state) => state.postDetail);

  useEffect(() => {
    dispatch(getPostDetail(id));
    return () => {
      dispatch(clearStatePostDetail());
    }
  }, [dispatch, id]);

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  let postDate = post.createdAt
  postDate = new Date(postDate)

  return (
    <div>
      {
        tokenClient || tokenPsychologist
          ? (<NavbarHome />) : <NavBar />
      }
      {
        Object.keys(post).length !== 0 ? (
          <div className={"containerA"}>

            <Text color='green.300' fontSize='2xl' textAlign='left' cursor='pointer' onClick={() => navigate(-1)}>
              <ArrowLeftIcon />   Volver
            </Text>

            <div className="postImgContainer">
              <img src={post.Image} alt="post img" className="postImg" />
              {post.idUserPsychologist ? (
                <div className="psyinfo">
                  <Link to={`/detailPsychologist/${post.idUserPsychologist._id}`}>
                    <Avatar
                      src={post.idUserPsychologist.profileImage}
                      alt="img not found"
                      mr='0.5em'
                    />
                  </Link>

                  <Stack direction='row' align='flex-end'>
                    <p className="psytext">
                      Por{" "}
                    </p>
                    <p className="name">
                      <Link to={`/detailPsychologist/${post.idUserPsychologist._id}`}>
                        {post.idUserPsychologist.firstName}{" "}
                        {post.idUserPsychologist.lastName}
                      </Link>
                    </p>
                    <p className="psytext">Fecha: {postDate.getUTCFullYear()}-{postDate.getUTCMonth()}-{postDate.getUTCDate()}</p>
                    <p className="psytext">{post.idUserPsychologist.location}</p>
                  </Stack>
                </div>
              ) : null}
            </div>

            <Box className={"tags"}>
              {post.Tags?.map((tag) => {
                return (
                  <Badge variant="subtle" colorScheme="cyan" className="Badge">
                    {tag}
                  </Badge>
                );
              })}
            </Box>

            <h1 className={"title"}>{post.Title}</h1>
            <div className={"content"}>{post.Content}</div>

            {post.idUserPsychologist ? (
              <Stack mt='2.5em' align='end'>
                <Stack direction='row' align='flex-end'>
                  <p className="psytext">
                    Por {post.idUserPsychologist.firstName}{" "}
                    {post.idUserPsychologist.lastName}.
                  </p>
                  <br />
                  <p className="psytext"> Fecha: {postDate.getUTCFullYear()}-{postDate.getUTCMonth()}-{postDate.getUTCDate()}.</p>
                  <p className="psytext"> {post.idUserPsychologist.location}</p>
                </Stack>
              </Stack>
            ) : null}

          </div>
        )
          : <Loader />
      }
      <Footer />
    </div>
  );
}
