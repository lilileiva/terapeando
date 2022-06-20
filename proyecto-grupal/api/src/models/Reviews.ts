import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { userClient } from './userClients';
import { userPsychologist } from './userPsychologist'
import userPsychologistModel from './userPsychologist';





export class Reviews{
    @prop({required: true})  
    Content: string 
    @prop({required: true, min: 1, max: 5})  
    Rating: number
    @prop({ref: () => userClient})
    IdUserClient: Ref<userClient>
    @prop({ref: () => userPsychologist})
    IdUserPsychologist: Ref<userPsychologist>
 }

const reviewsModel = getModelForClass(Reviews)
export default reviewsModel