"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { createPost, getAllPosts, getAllCategory, filterPostsCategory, getOnePost, getPostAuthors, 
// filterPostsByAuthor
deletePost } = require("./posts.ts");
const validatePsychologistOrAdmin = require('../../middleware/validatePsychologistOrAdmin');
const ClientOrAdmin = require('../../middleware/validateClientOrAdmin');
const postsRouter = (0, express_1.Router)();
postsRouter.get("/posts", getAllPosts);
postsRouter.get("/post/:id", getOnePost);
postsRouter.post("/post", validatePsychologistOrAdmin, createPost);
postsRouter.get("/categories", getAllCategory);
postsRouter.get("/posts/authors", getPostAuthors);
postsRouter.get("/filter/:category", filterPostsCategory);
postsRouter.delete("/deletePost/:IdPost", validatePsychologistOrAdmin, deletePost);
module.exports = postsRouter;
