import { prop, getModelForClass,Ref } from '@typegoose/typegoose';
import { userPsychologist } from './userPsychologist';
import { userClient } from './userClients';
import { paymentHistory } from './paymentHistory';


export class appointment {
    
    @prop({ref: () => paymentHistory})
    payment: Ref<paymentHistory>
    
    @prop({ type: String, required: true, trim: true})
    date: string
    
    @prop({ type: String, required: true, trim: true })
    hour: string

    @prop({ type: String, required: true, trim: true })
    type: string

    @prop({ type: String, required: true, trim: true })
    IdSchedule: string
    
    @prop({ref: () => userClient})
    IdUserClient: Ref<userClient>

    @prop({ref: () => userPsychologist})
    IdUserPsychologist: Ref<userPsychologist>
}

const appointmentModel = getModelForClass(appointment)
export default appointmentModel;