import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { userClient } from './userClients';
//import { Userpsychologist } from './userClients';


export class Reviews{
    @prop({required: true})  
    Content: string 
    @prop({required: true, min: 1, max: 5})  
    Stars: number
    @prop({ref: () => userClient})
    IdUserClient: Ref<userClient>
    // @prop({ref: () => Userpsychologist})
    // IdUserPsychologist: Ref<Userpsychologist>
}

const reviewsModel = getModelForClass(Reviews)
export default reviewsModel