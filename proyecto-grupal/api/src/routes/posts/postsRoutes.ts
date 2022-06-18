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

const validatePsychologistOrAdmin = require('../../middleware/validatePsychologistOrAdmin')
const ClientOrAdmin = require('../../middleware/validateClientOrAdmin')

const postsRouter: Router = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.get("/post/:id",getOnePost);
postsRouter.post("/post", validatePsychologistOrAdmin, createPost);
postsRouter.get("/categories", getAllCategory);

postsRouter.get("/filter/:category", filterPostsCategory);
postsRouter.delete("/deletePost/:IdPost", validatePsychologistOrAdmin ,deletePost)
module.exports = postsRouter;
