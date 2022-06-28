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
    const { Content, Rating } = req.body;
    const { IdUserPsychologist } = req.params;
    try {
        const review = yield Reviews_1.default.create({
            Content,
            Rating,
            IdUserClient: req.user,
            IdUserPsychologist
        });
        const filterbyId = yield Reviews_1.default.find({ "IdUserPsychologist": IdUserPsychologist });
        const average = filterbyId.map(el => el.Rating).reduce((a, b) => a + b, 0) / filterbyId.length;
        const psichologistid = yield userPsychologist_1.default.findByIdAndUpdate(IdUserPsychologist, { rating: average });
        res.status(200).send('Review created');
    }
    catch (error) {
        console.log(error);
        res.send({ error: 'error creating review' });
    }
});
const getReviewByPsychologist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserPsychologist } = req.params;
    try {
        const filterbyId = yield Reviews_1.default.find({ "IdUserPsychologist": IdUserPsychologist });
        res.status(200).send(filterbyId);
    }
    catch (error) {
        console.log(error);
    }
});
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUserPsychologist } = req.params;
    try {
        const getReview = yield Reviews_1.default.find();
        res.status(200).send(getReview);
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = {
    createReview,
    getReview,
    getReviewByPsychologist
};
