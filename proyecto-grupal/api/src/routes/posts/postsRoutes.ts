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

const validateAdmin = require('../../middleware/ValidateAdminToken')
const validateClient = require('../../middleware/validateClient')
const validatePsychologist = require('../../middleware/validatePsychologist')

const postsRouter: Router = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.get("/post/:id", getOnePost);
postsRouter.post("/post", validatePsychologist, createPost);
postsRouter.get("/categories", getAllCategory);

postsRouter.get("/filter/:category", filterPostsCategory);
postsRouter.delete("/deletePost/:IdPost", validatePsychologist, deletePost)
module.exports = postsRouter;
