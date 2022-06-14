import { Router } from "express";
const {
  createPost,
  getAllPosts,
  getAllCategory,
  filterPostsCategory,
  getOnePost,
} = require("./posts.ts");

const postsRouter: Router = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.get("/post/:id", getOnePost);
postsRouter.post("/post", createPost);
postsRouter.get("/categories", getAllCategory);
postsRouter.get("/filter/:category", filterPostsCategory);
module.exports = postsRouter;
