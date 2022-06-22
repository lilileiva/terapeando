import {prop,Ref, getModelForClass} from '@typegoose/typegoose'
import {userPsychologist} from './userPsychologist'

class Post {
    @prop({default:Date.now()})
    Date: string;
    @prop()
    Title:string;
    @prop()
    Content:string;
    @prop()
    Image:string;
    @prop()
    Tags:string[];
    @prop({default: Date.now()})
    createdAt: Date    
    @prop({ref: () => userPsychologist})
    idUserPsychologist: Ref<userPsychologist>;
}
const postModel = getModelForClass(Post)
export default postModel;
