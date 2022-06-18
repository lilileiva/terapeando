import { Request, Response } from "express";
import reviewsModel from "../../models/Reviews";
import userPsychologistModel from "../../models/userPsychologist";



const createReview = async (req: Request, res: Response) => {
    const createReview = async (req: Request, res: Response) => {
        const { Content, Rating , IdUserClient, IdUserPsychologist } = req.body
    
        try {
            //por el moemnto solo esta recibiendo el contenido de la reseña y la calificació
            const Psychologist = userPsychologistModel.findById(IdUserPsychologist)
            let promedio = 0;
            let reviews = Psychologist.reviews.map((e:any)=> e.rating) 
            for (let i = 0; i < reviews.length; i++) {
                promedio += Rating
            }
            promedio = promedio / reviews.length;
            const review = new reviewsModel({Content, Rating});
            const psychologistUpdated = userPsychologistModel.findByIdAndUpdate(IdUserPsychologist,{ rating: promedio}, {new: true})
            await review.save();
            res.status(200).send('Review created');
    
        } catch (error) {
            console.log(error)
        }
    };
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
