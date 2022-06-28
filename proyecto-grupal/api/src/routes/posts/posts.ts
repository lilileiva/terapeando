import { Response, Request, NextFunction } from "express";
import Post from "../../models/Post";
import Category from "../../models/Category";
import userPsychologistModel from "../../models/userPsychologist";
interface error {
  status: number;
  message: string;
}
//estaas son las rutas para las notas
const getAllPosts = (req: Request, res: Response, next: NextFunction) => {
  //busco todos mis post en mi db
  const { title } = req.query;
  if (title) {
    Post.find({ Title: { $regex: title, $options: "i" } })
      .populate("idUserPsychologist", {
        firstName: 1,
        lastName: 1,
        email: 1,
        location: 1,
        License: 1,
        Specialties: 1,
      })
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((error: error) => next(error));
  } else {
    Post.find()
      .populate("idUserPsychologist", {
        firstName: 1,
        lastName: 1,
        email: 1,
        location: 1,
        License: 1,
        Specialties: 1,
      })
      .then((posts) => {
        res.status(200).json(posts);
      })
      //si hay un error lo envio al siguiente
      .catch((error: error) => next(error));
  }
};

const getOnePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let response = await Post.findById(id).populate("idUserPsychologist", {
      firstName: 1,
      lastName: 1,
      email: 1,
      profileImage: 1,
      about: 1,
      location: 1,
      License: 1,
      Specialties: 1,
    });
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
  }
};

const getPostsByPsychologistId = async (req: Request, res: Response) => {
  const { idUserPsychologist } = req.params;
  try {
    let response = await Post.find({'idUserPsychologist': idUserPsychologist})
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
  }
};

const createPost = (req: Request, res: Response, next: NextFunction) => {
  const {Date, Title, Image, Tags, Content} = req.body;
  req.user
  //me creo el post con el objeto ue me llega de body
  Post.create({
    Date,
    Title,
    Image,
    Tags,
    Content,
    idUserPsychologist: req.user
    
  })
    .then((createdPost) => {
      createdPost.save();
      res.status(201).send(createdPost);
    })
    .catch((error: error) => next(error));
};
//estas son las rutas para las categorias
//traer todas las categorias
const getAllCategory = (req: Request, res: Response, next: NextFunction) => {
  Category.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error: error) => next(error));
};

const filterPostsCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.params;

  const postTotals = await Post.find().populate("idUserPsychologist", {
    firstName: 1,
    lastName: 1,
    email: 1,
    location: 1,
    License: 1,
    Specialties: 1,
  });
  let postFilters: object[] = [];
  for (let i = 0; i < postTotals.length; i++) {
    postTotals[i].Tags.forEach((tag: string) => {
      if (tag === category) {
        postFilters.push(postTotals[i]);
      }
    });
  }
  res.json(postFilters);
};

//eliminar nota
const deletePost = async (req: Request, res: Response) => {
  const { IdPost } = req.params;
  try {
    const postDelete = await Post.findOneAndDelete({ _id: IdPost, idUserPsychologist: req.user });
    res.status(200).send("Post eliminado correctamente");
  } catch (err) {
    res.status(404).send("error: " + err);
  }
};

//editando nota
const putPost = async (req: Request, res: Response) => {

  const {IdPost} = req.params;
  try {
     const post = await Post.findByIdAndUpdate(IdPost, req.body)
     res.status(200).send('Post editado correctamente')
  } catch (err) {
     res.status(404).send('There was an error...');
  }
}
module.exports = {
  createPost,
  getAllPosts,
  getAllCategory,
  filterPostsCategory,
  getOnePost,
  getPostsByPsychologistId,
  deletePost,
  putPost
};
