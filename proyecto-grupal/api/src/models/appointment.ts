import { prop, getModelForClass,Ref } from '@typegoose/typegoose';
import { userClient } from './userClients';
import { userPsychologist } from './userPsychologist';
import { paymentHistory } from './paymentHistory';


export class appointment {
    @prop({ref: () => userClient})
    client: Ref<userClient>

    @prop({ref: () => userPsychologist})
    psicologist: Ref<userPsychologist>

    @prop({ref: () => paymentHistory})
    payment: Ref<paymentHistory>

    @prop({ type: String, required: true, trim: true})
    date: string

    @prop({ type: String, required: true, trim: true })
    hour: string
    
    @prop({ type: String, required: true, trim: true })
    type: string
}

const appointmentModel = getModelForClass(appointment)
export default appointmentModel;