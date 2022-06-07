import {prop,Ref, getModelForClass} from '@typegoose/typegoose'
import {userPsychologist} from './userPsychologist'

class Post {
    @prop()
    Date: string;
    @prop()
    Title:string;
    @prop()
    Content:string;
    @prop()
    Image:string;
    @prop()
    Tags:string[];
    @prop({ref: () => userPsychologist})
    idUserPsychologist: Ref<userPsychologist>;
}
const postModel = getModelForClass(Post)
export default postModel;