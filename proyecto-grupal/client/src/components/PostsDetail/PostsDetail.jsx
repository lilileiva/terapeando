import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetail } from "../../redux/actions/index.js";
import NavbarHome from "../NavbarHome/NavbarHome.jsx";
import Footer from "../Footer/Footer.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// -----------------------------------

export default function PostsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postDetail);
  console.log("post: ", post);

  useEffect(() => {
    dispatch(getPostDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <NavbarHome />
      <h1>POST DETAILSSSSSSSS</h1>
      {
        post ? 
        <div>
        <h2>{post.Title}</h2>
        <img src={post.Image} />
        </div> : 'Loading'
      }
      <Footer />
    </div>
  );
}
