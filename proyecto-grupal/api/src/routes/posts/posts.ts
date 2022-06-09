import {Response, Request, NextFunction} from 'express';
import Post from '../../models/Post';

interface error{
    status: number;
    message:string;
}

const getAllPosts = (req:Request, res:Response,next:NextFunction) => {
    //busco todos mis post en mi db
    const {title} = req.query;
    if(title){
        Post.find({Title:{$regex : `.*${title}.*`}})
            .then((posts) => {
                res.status(200).json(posts)
            })
            .catch((error:error) => next(error))
    }else{
        Post.find()
            .populate("idUserPsychologist",{
                firstName:1,
                lastName:1,
                email:1,
                country:1,
                License:1,
                Specialties:1
            })
            .then((posts) => {
                res.status(200).json(posts)
            })
            //si hay un error lo envio al siguiente
            .catch((error:error) => next(error))
    }
}
const createPost = (req:Request, res:Response, next:NextFunction) => {
    const post = req.body;
    //me creo el post con el objeto ue me llega de body
    Post.create(post)
        .then((createdPost) => {
            createdPost.save()
            res.send(createdPost)
        })
        .catch((error:error) => next(error))
}

module.exports ={createPost,getAllPosts}