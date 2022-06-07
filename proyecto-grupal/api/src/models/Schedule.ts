import { prop, getModelForClass, Ref} from '@typegoose/typegoose';
import { userPsychologist } from './userPsychologist';

export class Schedule {

    @prop({ ref: () => userPsychologist, required: true, unique: true })
    idUserPsychologist: Ref<userPsychologist>
    ///
    @prop({ type: Date, default: Date.now , required: true })
    date: Date
    ///
    @prop({ type: String , required: true })
    time: string
}

const scheduleModule = getModelForClass(Schedule);
export default scheduleModule;