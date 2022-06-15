import { Request, Response } from "express";
import reviewsModel from "../../models/Reviews";



const createReview = async (req: Request, res: Response) => {
    const { Content, Rating , IdUserClient, IdUserPsychologist } = req.body

    try {
        //por el moemnto solo esta recibiendo el contenido de la reseña y la calificació
        const review = new reviewsModel({Content, Rating});
        await review.save();
        res.status(200).send('Review created');

    } catch (error) {
        console.log(error)
    }
};



const getReview = async (req: Request, res: Response) => {

    const { idUserPsychologist } = req.params;
  
    try {

        const getReview = await reviewsModel.find({idUserPsychologist})
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
