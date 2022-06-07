import { prop, getModelForClass, Ref} from '@typegoose/typegoose';
import { userPsychologist } from './userPsychologist';

class Schedule {
    
    @prop({ ref: () => userPsychologist })
    idUserPsychologist: Ref<userPsychologist>
    ///
    @prop({ type: Date, default: Date.now })
    date: Date
    ///
    @prop({ type: String })
    time: string
}

const scheduleModule = getModelForClass(Schedule);
export default scheduleModule;