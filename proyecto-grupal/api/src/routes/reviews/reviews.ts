import { Request, Response } from "express";
import reviewsModel from "../../models/Reviews";



const createReview = async (req: Request, res: Response) => {
    const { Content, Stars, IdUserClient, IdUserPsychologist } = req.body

    try {
        const review = new reviewsModel(req.body);
        await review.save();
        res.status(200).send('Review created');

    } catch (error) {
        console.log(error)
    }

};



const getReview = async (req: Request, res: Response) => {

    const { IdUserPsychologist } = req.params;

    try {

        const getReview = await reviewsModel.findById(IdUserPsychologist);
        console.log(getReview)
        res.status(200).send(getReview);

    } catch (error) {
        console.log(error)
    }

};

module.exports = {
    createReview,
    getReview
}
