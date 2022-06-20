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
const Reviews_1 = __importDefault(require("../../models/Reviews"));
const userPsychologist_1 = __importDefault(require("../../models/userPsychologist"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Content, Rating, IdUserClient, IdUserPsychologist } = req.body;
    try {
        //por el moemnto solo esta recibiendo el contenido de la reseña y la calificació
        const Psychologist = userPsychologist_1.default.findById(IdUserPsychologist);
        let promedio = 0;
        let reviews = Psychologist.reviews.map((e) => e.rating);
        for (let i = 0; i < reviews.length; i++) {
            promedio += Rating;
        }
        promedio = promedio / reviews.length;
        const review = new Reviews_1.default({ Content, Rating });
        const psychologistUpdated = userPsychologist_1.default.findByIdAndUpdate(IdUserPsychologist, { rating: promedio }, { new: true });
        yield review.save();
        res.status(200).send('Review created');
    }
    catch (error) {
        console.log(error);
    }
});
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUserPsychologist } = req.params;
    try {
        const getReview = yield Reviews_1.default.find({ idUserPsychologist });
        console.log(getReview);
        res.status(200).send(getReview);
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = {
    createReview,
    getReview
};
