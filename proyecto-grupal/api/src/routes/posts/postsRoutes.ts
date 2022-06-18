import { Router } from "express";
const {
  createPost,
  getAllPosts,
  getAllCategory,
  filterPostsCategory,
  getOnePost,
  deletePost
} = require("./posts.ts");
const validate = require('../../middleware/extractJWT')
const postsRouter: Router = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.get("/post/:id" ,validate, getOnePost);
postsRouter.post("/post", validate ,createPost);
postsRouter.get("/categories", getAllCategory);
postsRouter.get("/filter/:category", filterPostsCategory);
postsRouter.delete("/deletePost/:IdPost",deletePost)
module.exports = postsRouter;
