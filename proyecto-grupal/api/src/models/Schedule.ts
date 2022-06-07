import { prop, getModelForClass, Ref, modelOptions} from '@typegoose/typegoose';
import { userPsychologist } from './userPsychologist';

@modelOptions({
    schemaOptions: {
        _id: false,
    }
})

class dateTime {
    @prop()
    monday: string[]
    @prop()
    tuesday: string[]
    @prop()
    wensday: string[]
    @prop()
    thursday: string[]
    @prop()
    friday: string[]
    @prop()
    saturday: string[]
    @prop()
    sunday: string[]
}

export class Schedule {

    @prop({ ref: () => userPsychologist })
    idUserPsychologist: Ref<userPsychologist>
    
    @prop({type: () => [dateTime]})
    dateTime: dateTime[]

}

const scheduleModule = getModelForClass(Schedule);
export default scheduleModule;