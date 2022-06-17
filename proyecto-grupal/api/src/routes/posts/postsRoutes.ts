import { Router } from "express";
const {
  createPost,
  getAllPosts,
  getAllCategory,
  filterPostsCategory,
  getOnePost,
  getPostAuthors,
  // filterPostsByAuthor
} = require("./posts.ts");
const validate = require("../../middleware/extractJWT");
const postsRouter: Router = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.get("/post/:id", getOnePost);
postsRouter.post("/post", validate, createPost);
postsRouter.get("/categories", getAllCategory);
postsRouter.get("/filter/:category", filterPostsCategory);
postsRouter.get("/author", getPostAuthors);
// postsRouter.get("/filter/:author", filterPostsByAuthor);
module.exports = postsRouter;
