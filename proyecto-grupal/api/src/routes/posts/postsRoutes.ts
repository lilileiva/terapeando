import { Router} from "express";
const {createPost,getAllPosts} = require('./posts.ts');

const postsRouter: Router = Router();

postsRouter.get('/posts',getAllPosts)
postsRouter.post('/post',createPost)
postsRouter.get('/categories')
module.exports = postsRouter;