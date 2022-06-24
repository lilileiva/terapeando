import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { userPsychologist } from './userPsychologist';
import { userClient } from './userClients';

export class Schedule {

    @prop({ type: String, required: true, trim: true })
    date: string

    @prop({ type: String, required: true, trim: true })
    hours: string[]
    
    @prop({ ref: () => userPsychologist })
    IdUserPsychologist: Ref<userPsychologist>
}

const scheduleModel = getModelForClass(Schedule);
export default scheduleModel;