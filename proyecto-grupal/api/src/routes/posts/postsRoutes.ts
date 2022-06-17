import { Router } from "express";
const {
  createPost,
  getAllPosts,
  getAllCategory,
  filterPostsCategory,
  getOnePost,
  getPostAuthors,
  // filterPostsByAuthor
  deletePost
} = require("./posts.ts");
const validate = require("../../middleware/extractJWT");
const postsRouter: Router = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.post("/post", validate, createPost);
postsRouter.get("/filter/:category", filterPostsCategory);
postsRouter.get("/author", getPostAuthors);
// postsRouter.get("/filter/:author", filterPostsByAuthor);
postsRouter.get("/post/:id" ,validate, getOnePost);
postsRouter.post("/post", validate ,createPost);
postsRouter.get("/filter/:category", filterPostsCategory);
postsRouter.delete("/deletePost/:IdPost",deletePost)
module.exports = postsRouter;
