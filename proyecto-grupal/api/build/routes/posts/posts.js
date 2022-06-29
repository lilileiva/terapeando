"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../models/Post"));
const Category_1 = __importDefault(require("../../models/Category"));
//estaas son las rutas para las notas
const getAllPosts = (req, res, next) => {
    //busco todos mis post en mi db
    const { title } = req.query;
    if (title) {
        Post_1.default.find({ Title: { $regex: title, $options: "i" } })
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
            .catch((error) => next(error));
    }
    else {
        Post_1.default.find()
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
            .catch((error) => next(error));
    }
};
const getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let response = yield Post_1.default.findById(id).populate("idUserPsychologist", {
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
    }
    catch (error) {
        console.error(error);
    }
});
const getPostsByPsychologistId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUserPsychologist } = req.params;
    try {
        let response = yield Post_1.default.find({ 'idUserPsychologist': idUserPsychologist });
        res.status(200).send(response);
    }
    catch (error) {
        console.error(error);
    }
});
const createPost = (req, res, next) => {
    const { Date, Title, Image, Tags, Content } = req.body;
    req.user;
    //me creo el post con el objeto ue me llega de body
    Post_1.default.create({
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
        .catch((error) => next(error));
};
//estas son las rutas para las categorias
//traer todas las categorias
const getAllCategory = (req, res, next) => {
    Category_1.default.find()
        .then((categories) => {
        res.status(200).json(categories);
    })
        .catch((error) => next(error));
};
const filterPostsCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    const postTotals = yield Post_1.default.find().populate("idUserPsychologist", {
        firstName: 1,
        lastName: 1,
        email: 1,
        location: 1,
        License: 1,
        Specialties: 1,
    });
    let postFilters = [];
    for (let i = 0; i < postTotals.length; i++) {
        postTotals[i].Tags.forEach((tag) => {
            if (tag === category) {
                postFilters.push(postTotals[i]);
            }
        });
    }
    res.json(postFilters);
});
//eliminar nota
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdPost } = req.params;
    try {
        const postDelete = yield Post_1.default.findOneAndDelete({ _id: IdPost, idUserPsychologist: req.user });
        res.status(200).send("Post eliminado correctamente");
    }
    catch (err) {
        res.status(404).send("error: " + err);
    }
});
//editando nota
const putPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdPost } = req.params;
    try {
        const post = yield Post_1.default.findByIdAndUpdate(IdPost, req.body);
        res.status(200).send('Post editado correctamente');
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
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
