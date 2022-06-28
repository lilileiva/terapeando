import { CannotBeSymbolError } from "@typegoose/typegoose/lib/internal/errors";
import { Request, Response } from "express";
import reviewsModel from "../../models/Reviews";
import userPsychologistModel from "../../models/userPsychologist";



const createReview = async (req: Request, res: Response) => {
    const { Content, Rating} = req.body
    const {IdUserPsychologist} = req.params;
    

    try {

        const review = await reviewsModel.create({
            Content,
            Rating,
            IdUserClient: req.user,
            IdUserPsychologist
        })

        const filterbyId = await reviewsModel.find({ "IdUserPsychologist": IdUserPsychologist })
        const average = filterbyId.map(el => el.Rating).reduce((a, b) => a + b, 0) / filterbyId.length

        const psichologistid = await userPsychologistModel.findByIdAndUpdate(IdUserPsychologist, { rating: average })

        res.status(200).send('Review created');

    } catch (error) {
        console.log(error)
        res.send({ error: 'error creating review' })
    }
};

const getReviewByPsychologist = async (req: Request, res: Response) => {

    const { IdUserPsychologist } = req.params;

    try {

        const filterbyId = await reviewsModel.find({ "IdUserPsychologist": IdUserPsychologist })
        res.status(200).send(filterbyId);

    } catch (error) {
        console.log(error)
    }

};


const getReview = async (req: Request, res: Response) => {

    const { idUserPsychologist } = req.params;

    try {

        const getReview = await reviewsModel.find()
        res.status(200).send(getReview);

    } catch (error) {
        console.log(error)
    }

};




module.exports = {
    createReview,
    getReview,
    getReviewByPsychologist
}